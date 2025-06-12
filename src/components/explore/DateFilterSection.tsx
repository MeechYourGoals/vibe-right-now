import React from 'react';
import { DateRange } from "@/types";
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils";

interface DateFilterSectionProps {
  selectedDateRange: DateRange | undefined;
  onDateRangeChange: (dateRange: DateRange | undefined) => void;
  className?: string;
}

const DateFilterSection: React.FC<DateFilterSectionProps> = ({
  selectedDateRange,
  onDateRangeChange,
  className
}) => {
  const handleDateRangeSelect = (range: DateRange | undefined) => {
    if (range?.from && range?.to) {
      onDateRangeChange({ from: range.from, to: range.to });
    }
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <button
            className={cn(
              "flex items-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
              !selectedDateRange?.from && "text-muted-foreground"
            )}
          >
            {selectedDateRange?.from ? (
              `${selectedDateRange.from?.toLocaleDateString()} - ${selectedDateRange.to?.toLocaleDateString()}`
            ) : (
              <span>Pick a date range</span>
            )}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            mode="range"
            defaultMonth={selectedDateRange?.from}
            selected={selectedDateRange}
            onSelect={handleDateRangeSelect}
            numberOfMonths={2}
            pagedNavigation
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DateFilterSection;
