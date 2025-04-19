
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem 
} from "@/components/ui/dropdown-menu";

// Types of vibes/locations that can be searched
const VIBE_TYPES = [
  "All",
  "Restaurants",
  "Bars",
  "Nightlife",
  "Events",
  "Comedy",
  "Sports"
];

interface SearchVibesProps {
  onSearch: (query: string, type: string) => void;
  initialQuery?: string;
}

const SearchVibes = ({ onSearch, initialQuery = "" }: SearchVibesProps) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedType, setSelectedType] = useState("All");
  
  // Update searchQuery when initialQuery changes
  useEffect(() => {
    if (initialQuery) {
      setSearchQuery(initialQuery);
    }
  }, [initialQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery, selectedType);
  };

  const clearSearch = () => {
    setSearchQuery("");
    onSearch("", selectedType);
  };

  return (
    <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-2">
      <div className="relative flex-1">
        <Input
          type="text"
          placeholder="Search for locations or vibes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pr-10"
        />
        {searchQuery && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
            onClick={clearSearch}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" type="button">
            {selectedType}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {VIBE_TYPES.map((type) => (
            <DropdownMenuItem 
              key={type}
              onClick={() => setSelectedType(type)}
            >
              {type}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      
      <Button type="submit">
        <Search className="mr-2 h-4 w-4" />
        Search
      </Button>
    </form>
  );
};

export default SearchVibes;
