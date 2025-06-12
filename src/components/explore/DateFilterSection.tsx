
import React from 'react';
import { Calendar, CalendarDays } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { format, addDays } from 'date-fns';
import { DateRange } from 'react-day-picker';

interface DateFilterSectionProps {
  selectedDates: { from: Date; to: Date } | null;
  onDateChange: (dates: { from: Date; to: Date } | null) => void;
}

const DateFilterSection: React.FC<DateFilterSectionProps> = ({
  selectedDates,
  onDateChange
}) => {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: selectedDates?.from || new Date(),
    to: selectedDates?.to || addDays(new Date(), 7),
  });

  const quickDateOptions = [
    { label: 'Today', days: 0 },
    { label: 'This Weekend', days: 5 },
    { label: 'Next Week', days: 7 },
    { label: 'This Month', days: 30 },
  ];

  const handleQuickDate = (days: number) => {
    const from = new Date();
    const to = addDays(from, days || 1);
    const newDates = { from, to };
    setDate({ from, to });
    onDateChange(newDates);
  };

  const handleDateSelect = (selectedDate: DateRange | undefined) => {
    setDate(selectedDate);
    if (selectedDate?.from && selectedDate?.to) {
      onDateChange({ from: selectedDate.from, to: selectedDate.to });
    }
  };

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <CalendarDays className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-lg">When are you going?</h3>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
          {quickDateOptions.map((option) => (
            <Button
              key={option.label}
              variant="outline"
              size="sm"
              onClick={() => handleQuickDate(option.days)}
              className="text-sm"
            >
              {option.label}
            </Button>
          ))}
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <Calendar className="mr-2 h-4 w-4" />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "LLL dd, y")} -{" "}
                    {format(date.to, "LLL dd, y")}
                  </>
                ) : (
                  format(date.from, "LLL dd, y")
                )
              ) : (
                <span>Pick custom dates</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <CalendarComponent
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={handleDateSelect}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </CardContent>
    </Card>
  );
};

export default DateFilterSection;
