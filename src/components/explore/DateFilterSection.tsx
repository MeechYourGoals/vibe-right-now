
import React from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, X } from "lucide-react";
import { format } from "date-fns";
import { DateRange } from "@/types";

interface DateFilterSectionProps {
  dateRange: DateRange | undefined;
  onDateRangeChange: (range: DateRange | undefined) => void;
  onClearDates: () => void;
  showDateFilter: boolean;
}

const DateFilterSection: React.FC<DateFilterSectionProps> = ({
  dateRange,
  onDateRangeChange,
  onClearDates,
  showDateFilter
}) => {
  if (!showDateFilter) return null;

  return (
    <div className="flex items-center gap-2 mb-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-auto justify-start text-left font-normal">
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dateRange?.from ? (
              dateRange.to ? (
                <>
                  {format(dateRange.from, "LLL dd, y")} -{" "}
                  {format(dateRange.to, "LLL dd, y")}
                </>
              ) : (
                format(dateRange.from, "LLL dd, y")
              )
            ) : (
              "Pick a date range"
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={dateRange?.from}
            selected={dateRange && dateRange.from && dateRange.to ? { from: dateRange.from, to: dateRange.to } : undefined}
            onSelect={(range) => {
              if (range?.from) {
                onDateRangeChange({ from: range.from, to: range.to });
              }
            }}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
      
      {dateRange?.from && (
        <Button variant="ghost" size="sm" onClick={onClearDates}>
          <X className="h-4 w-4" />
          Clear dates
        </Button>
      )}
    </div>
  );
};

export default DateFilterSection;
