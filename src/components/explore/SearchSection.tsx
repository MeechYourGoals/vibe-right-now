
import React from 'react';
import SearchVibes from "@/components/SearchVibes";
import DateRangeSelector from "@/components/DateRangeSelector";
import RealPlacesSearch from "@/components/explore/RealPlacesSearch";
import { Calendar } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Update DateRange to match our fixed interface
interface DateRange {
  from: Date | undefined;
  to: Date | undefined;
}

interface SearchSectionProps {
  showDateFilter: boolean;
  dateRange: DateRange | undefined;
  onSearch: (query: string, filterType: string, category: string) => void;
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
  const [activeSearchMode, setActiveSearchMode] = React.useState<'real' | 'vibes'>('real');

  return (
    <div className="max-w-xl mx-auto mb-6">
      {/* Search Mode Tabs */}
      <Tabs value={activeSearchMode} onValueChange={(value) => setActiveSearchMode(value as 'real' | 'vibes')} className="w-full mb-4">
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="real">Real Places</TabsTrigger>
          <TabsTrigger value="vibes">Vibes & Discovery</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Conditional Search Component */}
      {activeSearchMode === 'real' ? (
        <RealPlacesSearch />
      ) : (
        <SearchVibes onSearch={onSearch} />
      )}
      
      {/* Date Filter (only show for vibes mode) */}
      {activeSearchMode === 'vibes' && showDateFilter && (
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
            dateRange={dateRange} 
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
