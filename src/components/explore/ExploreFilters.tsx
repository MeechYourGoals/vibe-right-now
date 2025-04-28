
import React from 'react';
import { Button } from "@/components/ui/button";
import { DateRange } from "react-day-picker";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { CalendarRange, X } from "lucide-react";

interface ExploreFiltersProps {
  dateRange: DateRange | undefined;
  showDateFilter: boolean;
  setShowDateFilter: (show: boolean) => void;
  handleDateRangeChange: (range: DateRange | undefined) => void;
  vibeFilter: string;
  setVibeFilter: (vibe: string) => void;
}

export const ExploreFilters: React.FC<ExploreFiltersProps> = ({
  dateRange,
  showDateFilter,
  setShowDateFilter,
  handleDateRangeChange,
  vibeFilter,
  setVibeFilter
}) => {
  return (
    <div className="flex flex-wrap gap-2 items-center justify-center mb-4">
      <Button
        variant="outline"
        size="sm"
        className={showDateFilter ? "bg-primary/10" : ""}
        onClick={() => setShowDateFilter(!showDateFilter)}
      >
        <CalendarRange className="h-4 w-4 mr-2" />
        {dateRange?.from ? (
          <>
            {format(dateRange.from, "MMM d")}
            {dateRange.to ? ` - ${format(dateRange.to, "MMM d")}` : ""}
          </>
        ) : (
          "Select Dates"
        )}
      </Button>

      {vibeFilter && (
        <Badge className="bg-primary/20 text-primary hover:bg-primary/30">
          {vibeFilter}
          <Button
            variant="ghost"
            size="icon"
            className="h-4 w-4 ml-1 hover:bg-transparent"
            onClick={() => setVibeFilter("")}
          >
            <X className="h-3 w-3" />
          </Button>
        </Badge>
      )}
    </div>
  );
};
