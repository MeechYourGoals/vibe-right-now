
import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SearchSectionProps {
  onSearch: (query: string, filterType: string, category?: string) => void;
}

const SearchSection = ({ onSearch }: SearchSectionProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [category, setCategory] = useState('All');

  const handleSearch = () => {
    onSearch(searchQuery, filterType, category);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-2">
        <div className="relative flex-grow">
          <Input
            type="text"
            placeholder="Search for locations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="pl-10 w-full"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        </div>
        
        <div className="flex gap-2">
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="Restaurant">Restaurants</SelectItem>
                <SelectItem value="Bar">Bars</SelectItem>
                <SelectItem value="Event">Events</SelectItem>
                <SelectItem value="Attraction">Attractions</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          
          <Button onClick={handleSearch}>Search</Button>
        </div>
      </div>
    </div>
  );
};

export default SearchSection;
