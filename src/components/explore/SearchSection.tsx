import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin, CalendarDays } from "lucide-react";
import { CategorySelect } from "./CategorySelect";
import DateFilterSection from "./DateFilterSection";
import { DateRange } from "@/types";

interface SearchSectionProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedDateRange: DateRange | undefined;
  onDateRangeChange: (dateRange: DateRange) => void;
  className?: string;
}

const SearchSection: React.FC<SearchSectionProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
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
    <div className={`grid gap-4 md:grid-cols-search ${className}`}>
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="search"
          placeholder="Search for vibes, venues, events..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Category Select */}
      <CategorySelect
        selectedCategory={selectedCategory}
        onCategoryChange={onCategoryChange}
      />

      {/* Date Filter */}
      <DateFilterSection
        selectedDateRange={selectedDateRange}
        onDateRangeChange={onDateRangeChange}
      />

      {/* Search Button */}
      <Button>
        <Search className="mr-2 h-4 w-4" />
        Search
      </Button>
    </div>
  );
};

export default SearchSection;
