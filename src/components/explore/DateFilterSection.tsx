
import React from 'react';
import { Calendar } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import DateRangeSelector from "@/components/DateRangeSelector";

interface DateRange {
  from: Date | undefined;
  to: Date | undefined;
}

interface DateFilterSectionProps {
  showDateFilter: boolean;
  dateRange: DateRange | undefined;
  onDateRangeChange: (range: DateRange | undefined) => void;
  onClearDates: () => void;
}

const DateFilterSection: React.FC<DateFilterSectionProps> = ({
  showDateFilter,
  dateRange,
  onDateRangeChange,
  onClearDates
}) => {
  if (!showDateFilter) return null;

  return (
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
  );
};

export default DateFilterSection;
