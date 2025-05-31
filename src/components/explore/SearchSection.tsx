
import React from 'react';
import SearchVibes from '@/components/SearchVibes';
import DateFilterSection from './DateFilterSection';
import { DateRange } from '@/types';

interface SearchSectionProps {
  showDateFilter: boolean;
  dateRange: DateRange | undefined;
  onSearch: (query: string, city?: string, state?: string) => void;
  onDateRangeChange: (range: DateRange | undefined) => void;
  onClearDates: () => void;
}

const SearchSection: React.FC<SearchSectionProps> = ({
  showDateFilter,
  dateRange,
  onSearch,
  onDateRangeChange,
  onClearDates
}) => {
  return (
    <div className="mb-6 space-y-4">
      <SearchVibes onSearch={onSearch} />
      
      <DateFilterSection
        dateRange={dateRange}
        onDateRangeChange={onDateRangeChange}
        onClearDates={onClearDates}
        showDateFilter={showDateFilter}
      />
    </div>
  );
};

export default SearchSection;
