
import React from 'react';
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, X } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { DateRange as ReactDayPickerDateRange } from "react-day-picker";
import { DateRange } from "@/types";

export interface DateRangeSelectorProps {
  dateRange: DateRange;
  onDateRangeChange: (range: DateRange | undefined) => void;
  onClear: () => void;
}

const DateRangeSelector: React.FC<DateRangeSelectorProps> = ({
  dateRange,
  onDateRangeChange,
  onClear
}) => {
  const handleDateRangeSelect = (range: ReactDayPickerDateRange | undefined) => {
    if (range) {
      onDateRangeChange({ from: range.from, to: range.to });
    } else {
      onDateRangeChange({ from: undefined, to: undefined });
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-[280px] justify-start text-left font-normal",
              !dateRange.from && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dateRange.from ? (
              dateRange.to ? (
                <>
                  {format(dateRange.from, "LLL dd, y")} -{" "}
                  {format(dateRange.to, "LLL dd, y")}
                </>
              ) : (
                format(dateRange.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={dateRange.from}
            selected={dateRange as ReactDayPickerDateRange}
            onSelect={handleDateRangeSelect}
            numberOfMonths={2}
            className="pointer-events-auto"
          />
        </PopoverContent>
      </Popover>
      
      {(dateRange.from || dateRange.to) && (
        <Button variant="ghost" size="sm" onClick={onClear}>
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export default DateRangeSelector;
