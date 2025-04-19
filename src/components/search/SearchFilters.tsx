
import { Button } from "../ui/button";
import { X, Map, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface SearchFiltersProps {
  showFilters: boolean;
  activeFilters: string[];
  filters: string[];
  clearFilters: () => void;
  toggleFilter: (filter: string) => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  showFilters,
  activeFilters,
  filters,
  clearFilters,
  toggleFilter,
}) => {
  if (!showFilters) return null;

  return (
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
            variant={activeFilters.includes(filter.toLowerCase()) ? "secondary" : "outline"}
            size="sm"
            onClick={() => toggleFilter(filter.toLowerCase())}
            className="h-7 text-xs"
          >
            {filter}
            {activeFilters.includes(filter.toLowerCase()) && (
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
  );
};

export default SearchFilters;
