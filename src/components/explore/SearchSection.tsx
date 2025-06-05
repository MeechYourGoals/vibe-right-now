
import React from 'react';
import PlacesAutocomplete from '@/components/places/PlacesAutocomplete';
import DateRangeSelector from "@/components/DateRangeSelector";
import { Calendar } from "lucide-react";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Location } from '@/types';

interface SearchSectionProps {
  showDateFilter: boolean;
  dateRange: DateRange | undefined;
  onSearch: (query: string, filterType: string, category: string) => void;
  onPlaceSelect?: (location: Location) => void;
  onDateRangeChange: (range: DateRange | undefined) => void;
  onClearDates: () => void;
  userLocation?: { lat: number; lng: number };
}

const SearchSection: React.FC<SearchSectionProps> = ({
  showDateFilter,
  dateRange,
  onSearch,
  onPlaceSelect,
  onDateRangeChange,
  onClearDates,
  userLocation
}) => {
  const handlePlaceSelect = (location: Location) => {
    if (onPlaceSelect) {
      onPlaceSelect(location);
    }
    // Also trigger the search with the place name
    onSearch(location.name, "All", "places");
  };

  const handleSearch = (query: string) => {
    onSearch(query, "All", "places");
  };

  return (
    <div className="max-w-xl mx-auto mb-6">
      <PlacesAutocomplete
        onPlaceSelect={handlePlaceSelect}
        onSearch={handleSearch}
        placeholder="Search places with Google Maps..."
        userLocation={userLocation}
      />
      
      {showDateFilter && (
        <div className="p-3 bg-card border border-input rounded-lg max-w-xl mx-auto mt-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-primary" />
              Find Future Vibes
            </h3>
            {dateRange && dateRange.from && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-7 text-xs" 
                onClick={onClearDates}
              >
                Clear Dates
              </Button>
            )}
          </div>
          <DateRangeSelector 
            dateRange={dateRange} 
            onDateRangeChange={onDateRangeChange} 
          />
          {dateRange?.from && (
            <p className="text-xs text-foreground mt-2">
              {dateRange.to 
                ? `Showing events from ${format(dateRange.from, "MMM d, yyyy")} to ${format(dateRange.to, "MMM d, yyyy")}` 
                : `Showing events from ${format(dateRange.from, "MMM d, yyyy")}`}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchSection;
