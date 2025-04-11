
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const LocationSearch = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleSearch = () => {
    setIsOpen(!isOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality here
    console.log('Searching for:', searchQuery);
  };

  if (!isOpen) {
    return (
      <Button 
        onClick={toggleSearch}
        className="fixed right-6 bottom-24 h-12 w-12 rounded-full shadow-lg bg-white dark:bg-gray-800 text-primary flex items-center justify-center p-0 z-10"
        aria-label="Search locations"
      >
        <Search className="h-5 w-5" />
      </Button>
    );
  }

  return (
    <Card className="fixed right-6 bottom-24 w-80 shadow-lg z-10">
      <CardContent className="p-3">
        <form onSubmit={handleSearch} className="flex space-x-2">
          <div className="relative flex-1">
            <MapPin className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search locations..."
              className="pl-8 pr-3"
            />
          </div>
          <Button type="submit" size="sm">
            Search
          </Button>
          <Button type="button" size="sm" variant="outline" onClick={toggleSearch}>
            Cancel
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default LocationSearch;
