
import React from 'react';
import { Button } from "@/components/ui/button";
import { CalendarDays } from "lucide-react";

export const DAYS_OF_WEEK = [
  { name: "Sunday", value: 0 },
  { name: "Monday", value: 1 },
  { name: "Tuesday", value: 2 },
  { name: "Wednesday", value: 3 },
  { name: "Thursday", value: 4 },
  { name: "Friday", value: 5 },
  { name: "Saturday", value: 6 },
];

interface DayOfWeekFilterProps {
  selectedDays: number[];
  onDayToggle: (dayIndex: number) => void;
  onClearFilters: () => void;
}

const DayOfWeekFilter: React.FC<DayOfWeekFilterProps> = ({ 
  selectedDays, 
  onDayToggle, 
  onClearFilters 
}) => {
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium flex items-center">
          <CalendarDays className="h-4 w-4 mr-2" />
          Filter by day of week
        </h3>
        
        {selectedDays.length > 0 && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClearFilters}
            className="h-7 px-2 text-xs"
          >
            Clear filters
          </Button>
        )}
      </div>
      
      <div className="flex flex-wrap gap-2">
        {DAYS_OF_WEEK.map((day) => (
          <Button
            key={day.value}
            variant={selectedDays.includes(day.value) ? "default" : "outline"}
            size="sm"
            onClick={() => onDayToggle(day.value)}
            className={`${selectedDays.includes(day.value) ? "bg-primary" : ""} transition-colors`}
          >
            {day.name.substring(0, 3)}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default DayOfWeekFilter;
