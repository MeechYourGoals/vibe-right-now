
import React from 'react';
import EnhancedSearchVibes from "./EnhancedSearchVibes";
import DateRangeSelector from "@/components/DateRangeSelector";
import { Calendar } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Location, DateRange } from "@/types";

interface SearchSectionProps {
  showDateFilter: boolean;
  dateRange: DateRange | undefined;
  onSearch: (query: string, filterType: string, category: string) => void;
  onDateRangeChange: (range: DateRange | undefined) => void;
  onClearDates: () => void;
  onRealPlaceSelect?: (location: Location) => void;
}

const SearchSection: React.FC<SearchSectionProps> = ({
  showDateFilter,
  dateRange,
  onSearch,
  onDateRangeChange,
  onClearDates,
  onRealPlaceSelect
}) => {
  return (
    <div className="max-w-xl mx-auto mb-6">
      <EnhancedSearchVibes 
        onSearch={onSearch}
        onRealPlaceSelect={onRealPlaceSelect}
      />
      
      {showDateFilter && (
        <div className="p-3 bg-card border border-input rounded-lg max-w-xl mx-auto mt-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-primary" />
              Find Future Vibes
            </h3>
            {dateRange && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-7 text-xs" 
                onClick={onClearDates}
              >
                Clear Dates
              </Button>
            )}
          </div>
          <DateRangeSelector 
            dateRange={dateRange || { from: undefined, to: undefined }}
            onDateRangeChange={onDateRangeChange}
            onClear={onClearDates}
          />
          {dateRange?.from && (
            <p className="text-xs text-foreground mt-2">
              {dateRange.to 
                ? `Showing events from ${format(dateRange.from, "MMM d, yyyy")} to ${format(dateRange.to, "MMM d, yyyy")}` 
                : `Showing events from ${format(dateRange.from, "MMM d, yyyy")}`}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchSection;
