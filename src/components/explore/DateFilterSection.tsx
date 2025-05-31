
import React from 'react';
import { CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { DateRange } from '@/types';
import { format } from 'date-fns';

interface DateFilterSectionProps {
  dateRange: DateRange;
  onDateRangeChange: (range: DateRange) => void;
}

const DateFilterSection: React.FC<DateFilterSectionProps> = ({
  dateRange,
  onDateRangeChange
}) => {
  const handleDateSelect = (range: DateRange | undefined) => {
    if (range) {
      onDateRangeChange(range);
    }
  };

  const formatDateRange = () => {
    if (dateRange.from && dateRange.to) {
      return `${format(dateRange.from, 'MMM dd')} - ${format(dateRange.to, 'MMM dd')}`;
    }
    if (dateRange.from) {
      return format(dateRange.from, 'MMM dd, yyyy');
    }
    return 'Select dates';
  };

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-gray-900 dark:text-gray-100">
        Date Range
      </h3>
      
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-start text-left font-normal"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {formatDateRange()}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={dateRange.from}
            selected={dateRange.from && dateRange.to ? {
              from: dateRange.from,
              to: dateRange.to
            } : undefined}
            onSelect={handleDateSelect}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>

      <div className="space-y-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDateRangeChange({ from: new Date(), to: undefined })}
          className="w-full justify-start"
        >
          Today
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            const today = new Date();
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);
            onDateRangeChange({ from: today, to: tomorrow });
          }}
          className="w-full justify-start"
        >
          This Weekend
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            const today = new Date();
            const nextWeek = new Date(today);
            nextWeek.setDate(nextWeek.getDate() + 7);
            onDateRangeChange({ from: today, to: nextWeek });
          }}
          className="w-full justify-start"
        >
          Next Week
        </Button>
      </div>
    </div>
  );
};

export default DateFilterSection;
