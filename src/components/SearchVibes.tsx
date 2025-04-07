import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Map, X, ChevronDown, User, Building, CalendarDays, MapPin, Star } from "lucide-react";
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
import { mockUsers } from "@/mock/users";
import { mockLocations } from "@/mock/locations";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { cityCoordinates } from "@/utils/cityLocations";

interface SearchVibesProps {
  onSearch: (query: string, filterType: string, category: string) => void;
}

const SearchVibes = ({ onSearch }: SearchVibesProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [searchCategory, setSearchCategory] = useState("all");
  const [showUserSuggestions, setShowUserSuggestions] = useState(false);
  const [showPlaceSuggestions, setShowPlaceSuggestions] = useState(false);
  const [citySuggestions, setCitySuggestions] = useState<string[]>([]);
  const [showCitySuggestions, setShowCitySuggestions] = useState(false);
  
  const location = useLocation();

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

  const suggestedUsers = mockUsers.slice(0, 5);
  
  const premiumPlaces = mockLocations
    .filter(location => location.verified)
    .slice(0, 5)
    .map(location => ({
      ...location,
      isPremium: Math.random() > 0.4
    }));
    
  const allCities = Object.values(cityCoordinates).map(city => 
    `${city.name}${city.state ? `, ${city.state}` : ''}, ${city.country}`
  );

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get('q');
    
    if (q) {
      setSearchQuery(q);
      setSearchCategory("places");
    }
  }, [location.search]);

  useEffect(() => {
    if (searchCategory === "users") {
      setShowUserSuggestions(true);
      setShowPlaceSuggestions(false);
    } else if (searchCategory === "places") {
      setShowPlaceSuggestions(true);
      setShowUserSuggestions(false);
    } else {
      setShowUserSuggestions(false);
      setShowPlaceSuggestions(false);
    }
  }, [searchCategory]);

  const handleSearch = () => {
    onSearch(searchQuery, selectedFilter, searchCategory);
    setShowUserSuggestions(false);
    setShowPlaceSuggestions(false);
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
    onSearch(searchQuery, selectedFilter, category);
  };

  const handleUserSelect = (username: string) => {
    setSearchQuery(username);
    setShowUserSuggestions(false);
    onSearch(username, selectedFilter, searchCategory);
  };

  const handlePlaceSelect = (placeName: string) => {
    setSearchQuery(placeName);
    setShowPlaceSuggestions(false);
    onSearch(placeName, selectedFilter, searchCategory);
  };
  
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    if (searchCategory === 'places' && value.length > 1) {
      const filtered = allCities.filter(city => 
        city.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 5);
      
      setCitySuggestions(filtered);
      setShowCitySuggestions(filtered.length > 0);
    } else {
      setShowCitySuggestions(false);
    }
  };
  
  const handleCitySelect = (city: string) => {
    setSearchQuery(city);
    setCitySuggestions([]);
    setShowCitySuggestions(false);
    onSearch(city, selectedFilter, searchCategory);
  };

  const handleInputClick = () => {
    if (searchCategory === "users") {
      setShowUserSuggestions(true);
    } else if (searchCategory === "places") {
      setShowPlaceSuggestions(true);
    }
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
          onChange={handleSearchInputChange}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          onClick={handleInputClick}
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

      <Collapsible open={showCitySuggestions && searchCategory === "places"} className="w-full">
        <CollapsibleContent className="overflow-hidden">
          <Card className="mt-1 w-full p-2 shadow-md border border-border">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground px-2 py-1">Suggested Cities</p>
              {citySuggestions.map((city, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-2 p-2 hover:bg-muted rounded-md cursor-pointer"
                  onClick={() => handleCitySelect(city)}
                >
                  <div className="h-8 w-8 flex items-center justify-center rounded-md bg-primary/10">
                    <MapPin className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{city}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible open={showUserSuggestions && searchCategory === "users"} className="w-full">
        <CollapsibleContent className="overflow-hidden">
          <Card className="mt-1 w-full p-2 shadow-md border border-border">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground px-2 py-1">Suggested Users</p>
              {suggestedUsers.map((user) => (
                <div 
                  key={user.id} 
                  className="flex items-center gap-2 p-2 hover:bg-muted rounded-md cursor-pointer"
                  onClick={() => handleUserSelect(user.username)}
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{user.name}</span>
                    <span className="text-xs text-muted-foreground">@{user.username}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible open={showPlaceSuggestions && searchCategory === "places"} className="w-full">
        <CollapsibleContent className="overflow-hidden">
          <Card className="mt-1 w-full p-2 shadow-md border border-border">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground px-2 py-1 flex items-center">
                Featured Venues <Star className="h-3 w-3 text-amber-500 ml-1 fill-amber-500" />
              </p>
              {premiumPlaces.map((place) => (
                <div 
                  key={place.id} 
                  className={`flex items-center gap-2 p-2 hover:bg-muted rounded-md cursor-pointer my-1 ${place.isPremium ? 'bg-amber-500/10 border border-amber-500/30' : ''}`}
                  onClick={() => handlePlaceSelect(place.name)}
                >
                  <div className={`h-8 w-8 flex items-center justify-center rounded-md ${place.isPremium ? 'bg-amber-500/20' : 'bg-primary/10'}`}>
                    <MapPin className={`h-4 w-4 ${place.isPremium ? 'text-amber-500' : 'text-primary'}`} />
                  </div>
                  <div className="flex flex-col flex-1">
                    <span className="text-sm font-medium flex items-center">
                      {place.name}
                      {place.isPremium && <Star className="h-3 w-3 text-amber-500 ml-1 fill-amber-500" />}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {place.city}, {place.state}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </CollapsibleContent>
      </Collapsible>

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
