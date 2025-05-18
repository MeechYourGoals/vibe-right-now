
import React, { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, SlidersHorizontal, Ticket, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { mockUsers } from "@/mock/data";
import { mockLocations } from "@/mock/data";
import { DateRange } from "react-day-picker";
import { Link } from "react-router-dom";
import DateRangeSelector from "@/components/DateRangeSelector";

interface SearchSectionProps {
  showDateFilter: boolean;
  dateRange: DateRange | undefined;
  onSearch: (query: string, filterType: string, category: string) => void;
  onDateRangeChange: (range: DateRange | undefined) => void;
  onClearDates: () => void;
}

const SearchSection: React.FC<SearchSectionProps> = ({
  showDateFilter,
  dateRange,
  onSearch,
  onDateRangeChange,
  onClearDates
}) => {
  const [searchText, setSearchText] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [activeSearchTab, setActiveSearchTab] = useState("all");
  const [suggestedUsers, setSuggestedUsers] = useState<any[]>([]);
  const [suggestedVenues, setSuggestedVenues] = useState<any[]>([]);
  const popoverRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsPopoverOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchText, selectedFilter, activeSearchTab === "places" ? "places" : "all");
    setIsPopoverOpen(false);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);
    
    if (value.length > 0) {
      // Filter users based on input
      const filteredUsers = mockUsers
        .filter(user => 
          user.username.toLowerCase().includes(value.toLowerCase()) ||
          (user.name && user.name.toLowerCase().includes(value.toLowerCase()))
        )
        .slice(0, 5);
      
      // Filter venues based on input
      const filteredVenues = mockLocations
        .filter(venue => 
          venue.name.toLowerCase().includes(value.toLowerCase()) ||
          venue.city.toLowerCase().includes(value.toLowerCase())
        )
        .slice(0, 5);
      
      setSuggestedUsers(filteredUsers);
      setSuggestedVenues(filteredVenues);
      setIsPopoverOpen(true);
    } else {
      setIsPopoverOpen(false);
    }
  };
  
  const handleSearchTabChange = (value: string) => {
    setActiveSearchTab(value);
  };
  
  return (
    <div className="relative mb-6" ref={popoverRef}>
      <div className="mb-2">
        <Tabs 
          defaultValue="all" 
          className="w-full"
          value={activeSearchTab} 
          onValueChange={handleSearchTabChange}
        >
          <TabsList className="grid grid-cols-4">
            <TabsTrigger value="all" className="text-xs sm:text-sm">All</TabsTrigger>
            <TabsTrigger value="places" className="text-xs sm:text-sm">Places</TabsTrigger>
            <TabsTrigger value="users" className="text-xs sm:text-sm">Users</TabsTrigger>
            <TabsTrigger value="dates" className="text-xs sm:text-sm">Dates</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      {showDateFilter ? (
        <DateRangeSelector
          dateRange={dateRange}
          onDateRangeChange={onDateRangeChange}
          onClear={onClearDates}
        />
      ) : (
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <div className="relative flex-1">
            <Input
              type="text"
              placeholder={
                activeSearchTab === "places"
                  ? "Search for restaurants, bars, events..."
                  : activeSearchTab === "users"
                  ? "Search for people..."
                  : "Search for places, people, or vibes..."
              }
              className="pl-10 pr-10 py-6 bg-background"
              value={searchText}
              onChange={handleInputChange}
              onFocus={() => searchText.length > 0 && setIsPopoverOpen(true)}
            />
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            
            {isPopoverOpen && (
              <div className="absolute w-full bg-popover shadow-lg rounded-md mt-1 z-50 border">
                {activeSearchTab === "all" || activeSearchTab === "users" ? (
                  <div>
                    <h3 className="px-3 py-2 text-sm font-semibold text-muted-foreground">Suggested Users</h3>
                    {suggestedUsers.length > 0 ? (
                      <div className="max-h-60 overflow-y-auto">
                        {suggestedUsers.map(user => (
                          <Link 
                            to={`/user/${user.username}`}
                            key={user.id} 
                            className="flex items-center gap-3 px-3 py-2 hover:bg-accent"
                            onClick={() => setIsPopoverOpen(false)}
                          >
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={user.profilePic} alt={user.username} />
                              <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium">{user.name || user.username}</p>
                              <p className="text-xs text-muted-foreground">@{user.username}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <p className="px-3 py-2 text-sm text-muted-foreground">No users found</p>
                    )}
                  </div>
                ) : null}
                
                {activeSearchTab === "all" || activeSearchTab === "places" ? (
                  <div>
                    <h3 className="px-3 py-2 text-sm font-semibold text-muted-foreground">Suggested Places</h3>
                    {suggestedVenues.length > 0 ? (
                      <div className="max-h-60 overflow-y-auto">
                        {suggestedVenues.map(venue => (
                          <Link 
                            to={`/venue/${venue.id}`}
                            key={venue.id} 
                            className="flex items-center gap-3 px-3 py-2 hover:bg-accent"
                            onClick={() => setIsPopoverOpen(false)}
                          >
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={venue.image} alt={venue.name} />
                              <AvatarFallback>{venue.name[0].toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium">{venue.name}</p>
                              <p className="text-xs text-muted-foreground">{venue.city}, {venue.state}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <p className="px-3 py-2 text-sm text-muted-foreground">No places found</p>
                    )}
                  </div>
                ) : null}
              </div>
            )}
          </div>
          <Button type="submit" size="icon" className="h-10 w-10">
            <Search className="h-4 w-4" />
          </Button>
        </form>
      )}
    </div>
  );
};

export default SearchSection;
