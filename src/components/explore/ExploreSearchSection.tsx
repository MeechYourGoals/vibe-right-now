
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, MapPin, Search } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Location } from "@/types";

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
  const [locationInputValue, setLocationInputValue] = useState(location);

  const handleLocationInputChange = (value: string) => {
    setLocationInputValue(value);
    onLocationChange(value);
  };

  const handleLocationSelect = (selectedLocation: string) => {
    setLocationInputValue(selectedLocation);
    onLocationChange(selectedLocation);
    setIsLocationOpen(false);
    
    // Create a mock place object for the selection
    const mockPlace: Location = {
      id: `search-${Date.now()}`,
      name: selectedLocation,
      address: selectedLocation,
      city: selectedLocation,
      country: "USA",
      lat: 40.7128,
      lng: -74.0060,
      type: "city",
      verified: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    onPlaceSelect(mockPlace);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-0">
      <div className="flex flex-col gap-3 mb-4">
        {/* Search Input - Full width on mobile */}
        <div className="w-full">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search venues, vibes, or experiences..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 h-12 text-base md:text-lg"
              />
          </div>
        </div>

        {/* Location and Date - Stack on mobile, side by side on larger screens */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Location Input */}
          <div className="flex-1">
            <Popover open={isLocationOpen} onOpenChange={setIsLocationOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full h-12 justify-start text-left font-normal overflow-hidden"
                >
                  <MapPin className="mr-2 h-4 w-4 flex-shrink-0" />
                  <span className="truncate">{location || "Select location..."}</span>
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
                  <div className="max-h-60 overflow-y-auto overscroll-contain scroll-smooth">
                    {["New York", "Los Angeles", "Chicago", "Miami", "San Francisco", "Las Vegas", "Austin", "Boston"].map((city, index) => (
                      <Button
                        key={index}
                        variant="ghost"
                        className="w-full justify-start text-left p-2 h-auto"
                        onClick={() => handleLocationSelect(city)}
                      >
                        <div>
                          <div className="font-medium">{city}</div>
                          <div className="text-sm text-muted-foreground">
                            United States
                          </div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {/* Date Range Picker */}
          <div className="flex-1">
            <Popover open={isDateOpen} onOpenChange={setIsDateOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full h-12 justify-start text-left font-normal overflow-hidden",
                    !dateRange && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4 flex-shrink-0" />
                  <span className="truncate">
                    {dateRange?.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, "MMM dd")} -{" "}
                          {format(dateRange.to, "MMM dd, y")}
                        </>
                      ) : (
                        format(dateRange.from, "MMM dd, y")
                      )
                    ) : (
                      "Pick dates"
                    )}
                  </span>
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
                  numberOfMonths={1}
                  className="overscroll-contain"
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreSearchSection;
