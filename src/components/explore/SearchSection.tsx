
import React, { useState } from 'react';
import { Search, Filter, MapPin, Calendar } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DateRange } from '@/types';
import DateFilterSection from './DateFilterSection';

interface SearchSectionProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  dateRange: DateRange;
  onDateRangeChange: (range: DateRange) => void;
  onSearch: () => void;
}

const SearchSection: React.FC<SearchSectionProps> = ({
  searchQuery,
  onSearchChange,
  dateRange,
  onDateRangeChange,
  onSearch
}) => {
  const [showFilters, setShowFilters] = useState(false);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
      {/* Search Input */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          type="text"
          placeholder="Search venues, events, or experiences..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          onKeyPress={handleKeyPress}
          className="pl-10 pr-4 py-3"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 mb-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2"
        >
          <Filter className="w-4 h-4" />
          Filters
        </Button>
        <Button
          size="sm"
          onClick={onSearch}
          className="flex items-center gap-2"
        >
          <Search className="w-4 h-4" />
          Search
        </Button>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <DateFilterSection
            dateRange={dateRange}
            onDateRangeChange={onDateRangeChange}
          />
        </div>
      )}
    </div>
  );
};

export default SearchSection;
