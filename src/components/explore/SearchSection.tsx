
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SearchVibes from "@/components/SearchVibes";
import DateRangeSelector from "@/components/DateRangeSelector";
import { Calendar } from "lucide-react";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface SearchSectionProps {
  activeSearchTab: string;
  showDateFilter: boolean;
  dateRange: DateRange | undefined;
  onSearchTabChange: (value: string) => void;
  onSearch: (query: string, filterType: string, category: string) => void;
  onDateRangeChange: (range: DateRange | undefined) => void;
  onClearDates: () => void;
}

const SearchSection: React.FC<SearchSectionProps> = ({
  activeSearchTab,
  showDateFilter,
  dateRange,
  onSearchTabChange,
  onSearch,
  onDateRangeChange,
  onClearDates
}) => {
  return (
    <div className="max-w-xl mx-auto mb-6">
      <Tabs defaultValue={activeSearchTab} value={activeSearchTab} onValueChange={onSearchTabChange} className="w-full mb-4">
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="places">Places</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="vibes">Vibes</TabsTrigger>
          <TabsTrigger value="dates">
            <Calendar className="h-4 w-4 mr-2" />
            Dates
          </TabsTrigger>
        </TabsList>
      </Tabs>
      
      <SearchVibes onSearch={onSearch} />
      
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
            dateRange={dateRange} 
            onDateRangeChange={onDateRangeChange} 
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
