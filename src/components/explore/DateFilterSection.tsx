
import React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, X } from "lucide-react";
import { DateRange } from "@/types";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface DateFilterSectionProps {
  dateRange: DateRange;
  onDateRangeChange: (range: DateRange) => void;
  onClearDates: () => void;
}

const DateFilterSection = ({ dateRange, onDateRangeChange, onClearDates }: DateFilterSectionProps) => {
  return (
    <div className="flex items-center gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-[280px] justify-start text-left font-normal",
              !dateRange && "text-muted-foreground"
            )}
          >
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
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={(range) => onDateRangeChange(range || { from: undefined, to: undefined })}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
      
      {dateRange?.from && (
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onClearDates}
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export default DateFilterSection;
