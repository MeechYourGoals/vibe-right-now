
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Map, X, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SearchVibesProps {
  onSearch: (query: string, filter: string) => void;
}

const SearchVibes = ({ onSearch }: SearchVibesProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

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
    onSearch(searchQuery, selectedFilter);
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

  return (
    <div className="space-y-3 sticky top-16 z-10 bg-background p-4">
      <div className="relative flex">
        <Input
          type="search"
          placeholder="Search venues, events, vibes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
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
