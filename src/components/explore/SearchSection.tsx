
import React from "react";
import SearchVibes from "@/components/SearchVibes";
import DateFilterSection from "./DateFilterSection";
import { DateRange } from "@/types";

interface SearchSectionProps {
  showDateFilter: boolean;
  dateRange: DateRange;
  onSearch: (query: string, category: "places" | "events", filters?: any) => void;
  onDateRangeChange: (range: DateRange) => void;
  onClearDates: () => void;
}

const SearchSection = ({ 
  showDateFilter, 
  dateRange, 
  onSearch, 
  onDateRangeChange, 
  onClearDates 
}: SearchSectionProps) => {
  return (
    <div className="space-y-4">
      <SearchVibes onSearch={onSearch} />
      {showDateFilter && (
        <div className="flex justify-center">
          <DateFilterSection
            dateRange={dateRange}
            onDateRangeChange={onDateRangeChange}
            onClearDates={onClearDates}
          />
        </div>
      )}
    </div>
  );
};

export default SearchSection;
