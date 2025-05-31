import React from 'react';
import { Calendar, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { DateRange } from '@/types';

interface DateFilterSectionProps {
  dateRange: DateRange;
  setDateRange: (range: DateRange) => void;
}

const DateFilterSection: React.FC<DateFilterSectionProps> = ({
  dateRange,
  setDateRange,
}) => {
  const handleDateSelect = (range: DateRange | undefined) => {
    if (range) {
      setDateRange(range);
    }
  };

  const formatDateRange = () => {
    if (!dateRange.from) {
      return "Select dates";
    }
    if (dateRange.from && !dateRange.to) {
      return format(dateRange.from, "LLL dd, y");
    }
    if (dateRange.from && dateRange.to) {
      return `${format(dateRange.from, "LLL dd")} - ${format(dateRange.to, "LLL dd, y")}`;
    }
    return "Select dates";
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        When
      </h3>
      <div className="grid grid-cols-2 gap-3">
        <Button
          variant="outline"
          className="h-12 justify-start text-left bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          <Calendar className="mr-2 h-4 w-4 text-gray-500" />
          Today
        </Button>
        <Button
          variant="outline"
          className="h-12 justify-start text-left bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          <Calendar className="mr-2 h-4 w-4 text-gray-500" />
          Tomorrow
        </Button>
        <Button
          variant="outline"
          className="h-12 justify-start text-left bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          <Calendar className="mr-2 h-4 w-4 text-gray-500" />
          This Weekend
        </Button>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="h-12 justify-between text-left bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium">
                  {formatDateRange()}
                </span>
              </div>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <CalendarComponent
              initialFocus
              mode="range"
              defaultMonth={dateRange?.from}
              selected={dateRange.from && dateRange.to ? { from: dateRange.from, to: dateRange.to } : undefined}
              onSelect={handleDateSelect}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default DateFilterSection;
