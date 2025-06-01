
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export interface SearchVibesProps {
  className?: string;
  placeholder?: string;
}

const SearchVibes: React.FC<SearchVibesProps> = ({ 
  className = "",
  placeholder = "Search for vibes, venues, or events..."
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');

  const handleSearch = () => {
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery, 'Filter:', filterType);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className={`flex gap-2 ${className}`}>
      <div className="flex-1 relative">
        <Input
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          className="pr-10"
        />
        <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
      </div>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setFilterType('all')}>
            All
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setFilterType('venues')}>
            Venues
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setFilterType('events')}>
            Events
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setFilterType('people')}>
            People
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      <Button onClick={handleSearch}>
        Search
      </Button>
    </div>
  );
};

export default SearchVibes;
