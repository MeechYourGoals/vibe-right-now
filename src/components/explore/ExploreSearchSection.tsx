
import React, { useState, useEffect, useMemo } from 'react';
import { Search, Filter, MapPin, Star, Calendar, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Location } from '@/types';
import DateRangeSelector from '@/components/DateRangeSelector';
import { useGooglePlacesAutocomplete } from '@/hooks/useGooglePlacesAutocomplete';

interface ExploreSearchSectionProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  dateRange: { from: Date; to: Date } | null;
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
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const {
    suggestions: placeSuggestions,
    isLoading,
    searchPlaces,
    clearSuggestions
  } = useGooglePlacesAutocomplete();

  // Handle location input changes
  const handleLocationInputChange = (value: string) => {
    onLocationChange(value);
    if (value.length > 2) {
      searchPlaces(value);
      setShowSuggestions(true);
    } else {
      clearSuggestions();
      setShowSuggestions(false);
    }
  };

  // Handle place selection
  const handlePlaceClick = (place: any) => {
    onLocationChange(place.description || place.name || '');
    
    // Convert to Location format and call onPlaceSelect
    const locationData: Location = {
      id: place.place_id || `place-${Date.now()}`,
      name: place.structured_formatting?.main_text || place.name || '',
      address: place.description || place.formatted_address || '',
      city: place.structured_formatting?.secondary_text?.split(',')[0] || '',
      state: '',
      zip: '',
      country: '',
      lat: place.geometry?.location?.lat() || 0,
      lng: place.geometry?.location?.lng() || 0,
      type: 'city' as const,
      verified: false,
      rating: 0,
      vibes: [],
      tags: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    onPlaceSelect(locationData);
    setShowSuggestions(false);
    clearSuggestions();
  };

  const handleDateRangeChange = (range: { from: Date | undefined; to: Date | undefined }) => {
    if (range.from && range.to) {
      onDateChange({ from: range.from, to: range.to });
    } else if (range.from) {
      onDateChange({ from: range.from, to: range.from });
    } else {
      onDateChange(null);
    }
  };

  const handleClearDates = () => {
    onDateChange(null);
    setShowDateFilter(false);
  };

  return (
    <div className="relative space-y-4">
      {/* Search and Location Row */}
      <div className="flex gap-2">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search venues, events, activities..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
        
        {/* Location Input */}
        <div className="relative flex-1">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Enter city or location"
            value={location}
            onChange={(e) => handleLocationInputChange(e.target.value)}
            className="pl-10"
          />
          
          {/* Location Suggestions */}
          {showSuggestions && placeSuggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 bg-background border rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
              {placeSuggestions.slice(0, 5).map((place, index) => (
                <button
                  key={place.place_id || index}
                  onClick={() => handlePlaceClick(place)}
                  className="w-full px-4 py-3 text-left hover:bg-muted flex items-center gap-3 border-b last:border-b-0"
                >
                  <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <div className="flex-1">
                    <div className="font-medium">
                      {place.structured_formatting?.main_text || place.name || place.description}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {place.structured_formatting?.secondary_text || place.formatted_address}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
        
        {/* Date Filter Toggle */}
        <Button
          variant="outline"
          onClick={() => setShowDateFilter(!showDateFilter)}
          className={dateRange ? "border-primary" : ""}
        >
          <Calendar className="h-4 w-4 mr-2" />
          Dates
        </Button>
      </div>

      {/* Date Filter Section */}
      {showDateFilter && (
        <div className="p-4 bg-muted/50 rounded-lg">
          <div className="flex items-center gap-4">
            <DateRangeSelector
              dateRange={{ from: dateRange?.from, to: dateRange?.to }}
              onDateRangeChange={handleDateRangeChange}
              onClear={handleClearDates}
            />
          </div>
        </div>
      )}

      {/* Active Filters Display */}
      {(dateRange || location) && (
        <div className="flex flex-wrap gap-2">
          {location && (
            <Badge variant="secondary" className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {location}
              <button
                onClick={() => onLocationChange('')}
                className="ml-1 hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {dateRange && (
            <Badge variant="secondary" className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {dateRange.from.toLocaleDateString()}
              {dateRange.to && dateRange.to !== dateRange.from && ` - ${dateRange.to.toLocaleDateString()}`}
              <button
                onClick={handleClearDates}
                className="ml-1 hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};

export default ExploreSearchSection;
