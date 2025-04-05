
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Map, X, ChevronDown, User, Building, CalendarDays } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

interface SearchVibesProps {
  onSearch: (query: string, filterType: string, category: string) => void;
}

const SearchVibes = ({ onSearch }: SearchVibesProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [searchCategory, setSearchCategory] = useState("all");

  const filters = [
    "Restaurants",
    "Bars",
    "Sports",
    "Events",
    "Attractions",
    "Outdoor Vibes",
    "Happening Tonight",
    "Free Events",
    "Ticketed Events"
  ];

  const handleSearch = () => {
    onSearch(searchQuery, selectedFilter, searchCategory);
  };

  const toggleFilter = (filter: string) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter(f => f !== filter));
    } else {
      setActiveFilters([...activeFilters, filter]);
    }
  };

  const clearFilters = () => {
    setActiveFilters([]);
  };

  const handleCategoryChange = (category: string) => {
    setSearchCategory(category);
    // Auto-search when changing between all/places/users tabs
    onSearch(searchQuery, selectedFilter, category);
  };

  return (
    <div className="space-y-3 sticky top-16 z-10 bg-background p-4">
      <Tabs 
        value={searchCategory} 
        onValueChange={handleCategoryChange} 
        className="w-full mb-3"
      >
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="all" className="flex items-center gap-1">
            <Search className="h-3.5 w-3.5" />
            <span>All</span>
          </TabsTrigger>
          <TabsTrigger value="places" className="flex items-center gap-1">
            <Building className="h-3.5 w-3.5" />
            <span>Places</span>
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-1">
            <User className="h-3.5 w-3.5" />
            <span>Users</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="relative flex">
        <Input
          type="search"
          placeholder={
            searchCategory === "users" 
              ? "Search users by name or username..." 
              : searchCategory === "places"
                ? "Search cities, venues, events..."
                : "Search venues, events, vibes, users..."
          }
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          className="pr-20"
        />
        <div className="absolute right-0 top-0 flex h-full">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setShowFilters(!showFilters)}
            className="h-full rounded-none"
          >
            <ChevronDown className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleSearch}
            className="h-full rounded-none rounded-r-md"
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {showFilters && (
        <div className="bg-muted/20 p-3 rounded-md glass-effect">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-sm font-medium">Filter by</h4>
            {activeFilters.length > 0 && (
              <Button variant="ghost" size="sm" onClick={clearFilters} className="h-7 text-xs">
                Clear all
              </Button>
            )}
          </div>
          
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <Button
                key={filter}
                variant={activeFilters.includes(filter) ? "secondary" : "outline"}
                size="sm"
                onClick={() => toggleFilter(filter)}
                className="h-7 text-xs"
              >
                {filter}
                {activeFilters.includes(filter) && (
                  <X className="ml-1 h-3 w-3" />
                )}
              </Button>
            ))}
          </div>
          
          <div className="flex justify-between mt-3">
            <Button variant="ghost" size="sm" className="text-xs gap-1">
              <Map className="h-3 w-3" /> 
              Near me
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-xs gap-1">
                  Sort by <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-40">
                <DropdownMenuLabel>Sort options</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>Most Recent</DropdownMenuItem>
                  <DropdownMenuItem>Most Popular</DropdownMenuItem>
                  <DropdownMenuItem>Closest to Me</DropdownMenuItem>
                  <DropdownMenuItem>Happening Now</DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchVibes;
