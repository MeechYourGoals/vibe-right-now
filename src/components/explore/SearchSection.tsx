
import React from "react";
import SearchVibes from "@/components/SearchVibes";
import DateFilterSection from "./DateFilterSection";
import { AppDateRange } from "@/types";

interface SearchSectionProps {
  city: string;
  setCity: (city: string) => void;
  category: string;
  setCategory: (category: string) => void;
  dateRange: AppDateRange;
  setDateRange: (range: AppDateRange) => void;
  onSearch: () => Promise<void>;
  isLoading: boolean;
}

const SearchSection = ({ 
  city,
  setCity,
  category,
  setCategory,
  dateRange, 
  setDateRange,
  onSearch,
  isLoading
}: SearchSectionProps) => {
  const handleSearch = (query: string, searchCategory: "places" | "events") => {
    // Update the city and category based on the search
    setCity(query.split(',')[0].trim() || city);
    setCategory(searchCategory);
    onSearch();
  };

  return (
    <div className="space-y-4">
      <SearchVibes onSearch={handleSearch} />
      <div className="flex justify-center">
        <DateFilterSection
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          onClearDates={() => setDateRange({})}
        />
      </div>
    </div>
  );
};

export default SearchSection;
