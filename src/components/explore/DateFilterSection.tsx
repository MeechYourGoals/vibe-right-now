
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { format, addMonths } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, CalendarRange, X, Sparkles } from "lucide-react";
import DateRangeSelector from "@/components/DateRangeSelector";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate, useLocation } from "react-router-dom";

interface DateFilterSectionProps {
  dateRange: DateRange | undefined;
  setDateRange: (range: DateRange | undefined) => void;
  showDateFilter: boolean;
  setShowDateFilter: (show: boolean) => void;
  searchedCity: string;
  handleDateRangeChange: (range: DateRange | undefined) => void;
  vibeFilter: string;
  setVibeFilter: (vibe: string) => void;
  searchQuery: string;
  searchCategory: string;
  handleSearch: (query: string, filterType: string, category: string) => void;
}

const DateFilterSection = ({
  dateRange,
  setDateRange,
  showDateFilter,
  setShowDateFilter,
  searchedCity,
  handleDateRangeChange,
  vibeFilter,
  setVibeFilter,
  searchQuery,
  searchCategory,
  handleSearch
}: DateFilterSectionProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const toggleDateFilter = () => {
    setShowDateFilter(!showDateFilter);
    if (!showDateFilter && !dateRange) {
      const today = new Date();
      const validDateRange: DateRange = { 
        from: today, 
        to: addMonths(today, 1) 
      };
      setDateRange(validDateRange);
    }
  };

  const clearDateFilter = () => {
    setDateRange(undefined);
    setShowDateFilter(false);
    
    const searchParams = new URLSearchParams(location.search);
    searchParams.delete('from');
    searchParams.delete('to');
    navigate(`/explore?${searchParams.toString()}`, { replace: true });
    
    toast({
      title: "Date filter cleared",
      description: "Showing events for all upcoming dates",
      duration: 3000,
    });
  };

  return (
    <div className="max-w-xl mx-auto mb-4 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        {vibeFilter && (
          <Badge className="bg-indigo-800 dark:bg-indigo-900 text-white px-3 py-1 text-sm flex items-center">
            <Sparkles className="h-4 w-4 mr-1 text-amber-300" />
            Filtering by vibe: {vibeFilter}
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-5 w-5 ml-2 rounded-full text-white hover:bg-indigo-700" 
              onClick={() => {
                setVibeFilter("");
                handleSearch(searchQuery, "All", searchCategory);
              }}
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        )}
        
        <Button 
          variant="outline" 
          size="sm" 
          className={`bg-background text-foreground ${showDateFilter ? "border-primary" : "border-input"}`}
          onClick={toggleDateFilter}
        >
          <CalendarRange className="h-4 w-4 mr-2" />
          {showDateFilter ? "Hide Date Filter" : "Filter by Date"}
        </Button>
      </div>
      
      {showDateFilter && (
        <div className="p-3 bg-card border border-input rounded-lg">
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
                onClick={clearDateFilter}
              >
                Clear Dates
              </Button>
            )}
          </div>
          <DateRangeSelector 
            dateRange={dateRange} 
            onDateRangeChange={handleDateRangeChange} 
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

export default DateFilterSection;
