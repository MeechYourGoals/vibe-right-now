
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, MapPin, Search } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Location } from "@/types";
import { useGooglePlacesAutocomplete } from "@/hooks/useGooglePlacesAutocomplete";

interface ExploreSearchSectionProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  dateRange?: { from: Date; to: Date } | null;
  onDateChange: (dates: { from: Date; to: Date } | null) => void;
  location: string;
  onLocationChange: (location: string) => void;
  onPlaceSelect: (place: Location) => void;
  onVenueSelect: (venue: Location) => void;
}

const ExploreSearchSection: React.FC<ExploreSearchSectionProps> = ({
  searchQuery,
  onSearchChange,
  dateRange,
  onDateChange,
  location,
  onLocationChange,
  onPlaceSelect,
  onVenueSelect
}) => {
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);

  const {
    inputValue: locationInputValue,
    setInputValue: setLocationInputValue,
    suggestions,
    isLoading,
    handleInputChange,
    handleSuggestionSelect,
    clearSuggestions
  } = useGooglePlacesAutocomplete({
    onPlaceSelect: (place) => {
      onPlaceSelect(place);
      onLocationChange(place.name);
      setIsLocationOpen(false);
    }
  });

  const handleLocationInputChange = (value: string) => {
    setLocationInputValue(value);
    onLocationChange(value);
    handleInputChange(value);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        {/* Search Input */}
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search venues, vibes, or experiences..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 h-12"
            />
          </div>
        </div>

        {/* Location Input */}
        <div className="sm:w-64">
          <Popover open={isLocationOpen} onOpenChange={setIsLocationOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full h-12 justify-start text-left font-normal"
              >
                <MapPin className="mr-2 h-4 w-4" />
                {location || "Select location..."}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="start">
              <div className="p-4">
                <Input
                  placeholder="Enter city or address..."
                  value={locationInputValue}
                  onChange={(e) => handleLocationInputChange(e.target.value)}
                  className="mb-2"
                />
                {isLoading && (
                  <div className="text-sm text-muted-foreground p-2">
                    Searching...
                  </div>
                )}
                {suggestions.length > 0 && (
                  <div className="max-h-60 overflow-y-auto">
                    {suggestions.map((suggestion, index) => (
                      <Button
                        key={index}
                        variant="ghost"
                        className="w-full justify-start text-left p-2 h-auto"
                        onClick={() => handleSuggestionSelect(suggestion)}
                      >
                        <div>
                          <div className="font-medium">{suggestion.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {suggestion.city}, {suggestion.country}
                          </div>
                        </div>
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Date Range Picker */}
        <div className="sm:w-64">
          <Popover open={isDateOpen} onOpenChange={setIsDateOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full h-12 justify-start text-left font-normal",
                  !dateRange && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange?.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "LLL dd")} -{" "}
                      {format(dateRange.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(dateRange.from, "LLL dd, y")
                  )
                ) : (
                  "Pick dates"
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={dateRange?.from}
                selected={dateRange ? { from: dateRange.from, to: dateRange.to } : undefined}
                onSelect={(range) => {
                  if (range?.from) {
                    onDateChange({
                      from: range.from,
                      to: range.to || range.from
                    });
                  } else {
                    onDateChange(null);
                  }
                  setIsDateOpen(false);
                }}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default ExploreSearchSection;
