import React from 'react';
import { Search, MapPin, Calendar } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DateRange } from '@/types';

interface SearchSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  location: string;
  setLocation: (location: string) => void;
  dateRange: DateRange;
  setDateRange: (range: DateRange) => void;
}

const SearchSection: React.FC<SearchSectionProps> = ({
  searchQuery,
  setSearchQuery,
  location,
  setLocation,
  dateRange,
  setDateRange,
}) => {
  const handleSearch = () => {
    // Ensure both dates are set for search
    const searchDateRange = dateRange.from && dateRange.to 
      ? { from: dateRange.from, to: dateRange.to }
      : { from: new Date(), to: new Date() };
    
    console.log('Searching with:', {
      query: searchQuery,
      location,
      dateRange: searchDateRange,
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            type="text"
            placeholder="What are you looking for?"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 text-lg bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 focus:border-primary dark:focus:border-primary"
          />
        </div>
        
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            type="text"
            placeholder="Where?"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="pl-10 h-12 text-lg bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 focus:border-primary dark:focus:border-primary"
          />
        </div>

        <Button
          onClick={handleSearch}
          className="w-full h-12 text-lg font-medium bg-primary hover:bg-primary/90"
        >
          <Search className="mr-2 h-5 w-5" />
          Search Experiences
        </Button>
      </div>
    </div>
  );
};

export default SearchSection;
