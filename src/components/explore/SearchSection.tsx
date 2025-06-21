
import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DatePickerWithRange } from '@/components/ui/date-picker-with-range';
import { format } from 'date-fns';
import { useGooglePlacesAutocomplete } from '@/hooks/useGooglePlacesAutocomplete';
import { useGooglePlacesSearch } from '@/hooks/useGooglePlacesSearch';
import { cn } from '@/lib/utils';

interface SearchSectionProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedDates: { from: Date; to: Date } | null;
  onDateChange: (dates: { from: Date; to: Date } | null) => void;
  location: string;
  onLocationChange: (location: string) => void;
  onPlaceSelect: (place: google.maps.places.PlaceResult) => void;
  onVenueSelect: (place: google.maps.places.PlaceResult) => void;
}

const SearchSection: React.FC<SearchSectionProps> = ({
  searchQuery,
  onSearchChange,
  selectedDates,
  onDateChange,
  location,
  onLocationChange,
  onPlaceSelect,
  onVenueSelect
}) => {
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const [showVenueSuggestions, setShowVenueSuggestions] = useState(false);
  const [locationInput, setLocationInput] = useState(location);
  const [venueInput, setVenueInput] = useState(searchQuery);

  // Location autocomplete
  const {
    suggestions: locationSuggestions,
    loading: locationLoading,
    searchLocation,
    clearSuggestions: clearLocationSuggestions
  } = useGooglePlacesAutocomplete('cities');

  // Venue search
  const {
    suggestions: venueSuggestions,
    loading: venueLoading,
    spellingSuggestion,
    searchVenues,
    clearSuggestions: clearVenueSuggestions
  } = useGooglePlacesSearch(location);

  // Handle location input changes
  useEffect(() => {
    if (locationInput.trim() && locationInput !== location) {
      searchLocation(locationInput);
      setShowLocationSuggestions(true);
    } else {
      clearLocationSuggestions();
      setShowLocationSuggestions(false);
    }
  }, [locationInput, searchLocation, clearLocationSuggestions, location]);

  // Handle venue input changes
  useEffect(() => {
    if (venueInput.trim() && venueInput !== searchQuery) {
      searchVenues(venueInput);
      setShowVenueSuggestions(true);
    } else {
      clearVenueSuggestions();
      setShowVenueSuggestions(false);
    }
  }, [venueInput, searchVenues, clearVenueSuggestions, searchQuery]);

  const handleLocationSelect = (place: google.maps.places.PlaceResult) => {
    const placeName = place.name || place.formatted_address?.split(',')[0] || '';
    setLocationInput(placeName);
    onLocationChange(placeName);
    onPlaceSelect(place);
    setShowLocationSuggestions(false);
    clearLocationSuggestions();
  };

  const handleVenueSelect = (place: google.maps.places.PlaceResult) => {
    const venueName = place.name || '';
    setVenueInput(venueName);
    onSearchChange(venueName);
    onVenueSelect(place);
    setShowVenueSuggestions(false);
    clearVenueSuggestions();
  };

  const handleLocationInputChange = (value: string) => {
    setLocationInput(value);
    if (!value.trim()) {
      onLocationChange('');
      setShowLocationSuggestions(false);
    }
  };

  const handleVenueInputChange = (value: string) => {
    setVenueInput(value);
    onSearchChange(value);
    if (!value.trim()) {
      setShowVenueSuggestions(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Venue Search */}
        <div className="relative flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search Venues, eVents, Vibes..."
              value={venueInput}
              onChange={(e) => handleVenueInputChange(e.target.value)}
              className="pl-10"
              onFocus={() => {
                if (venueInput.trim()) {
                  setShowVenueSuggestions(true);
                }
              }}
              onBlur={() => {
                setTimeout(() => setShowVenueSuggestions(false), 200);
              }}
            />
            {venueLoading && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-r-transparent" />
              </div>
            )}
          </div>

          {/* Venue Suggestions Dropdown */}
          {showVenueSuggestions && (venueSuggestions.length > 0 || spellingSuggestion) && (
            <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-background border border-border rounded-md shadow-lg max-h-80 overflow-y-auto">
              {spellingSuggestion && (
                <div className="p-3 border-b border-border">
                  <p className="text-sm text-muted-foreground">
                    Did you mean: 
                    <Button 
                      variant="link" 
                      className="p-0 h-auto ml-1 text-primary"
                      onClick={() => handleVenueInputChange(spellingSuggestion)}
                    >
                      {spellingSuggestion}
                    </Button>
                  </p>
                </div>
              )}
              
              {venueSuggestions.map((place, index) => (
                <button
                  key={index}
                  className="w-full text-left p-3 hover:bg-muted border-b border-border last:border-b-0 transition-colors"
                  onClick={() => handleVenueSelect(place)}
                >
                  <div className="font-medium">{place.name}</div>
                  {place.formatted_address && (
                    <div className="text-sm text-muted-foreground">{place.formatted_address}</div>
                  )}
                    {place.types && (
                      <div className="flex gap-2 mt-1">
                      {place.types.slice(0, 2).map((type, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {type.replace(/_/g, ' ')}
                        </Badge>
                      ))}
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Location Search */}
        <div className="relative w-full md:w-64">
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Location (e.g., Chicago)"
              value={locationInput}
              onChange={(e) => handleLocationInputChange(e.target.value)}
              className="pl-10"
              onFocus={() => {
                if (locationInput.trim()) {
                  setShowLocationSuggestions(true);
                }
              }}
              onBlur={() => {
                setTimeout(() => setShowLocationSuggestions(false), 200);
              }}
            />
            {locationLoading && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-r-transparent" />
              </div>
            )}
          </div>

          {/* Location Suggestions Dropdown */}
          {showLocationSuggestions && locationSuggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-background border border-border rounded-md shadow-lg max-h-60 overflow-y-auto">
              {locationSuggestions.map((place, index) => (
                <button
                  key={index}
                  className="w-full text-left p-3 hover:bg-muted border-b border-border last:border-b-0 transition-colors"
                  onClick={() => handleLocationSelect(place)}
                >
                  <div className="font-medium">{place.name}</div>
                  {place.formatted_address && (
                    <div className="text-sm text-muted-foreground">{place.formatted_address}</div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Date Picker */}
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 z-10" />
          <DatePickerWithRange
            selected={selectedDates}
            onSelect={onDateChange}
            className="pl-10"
            placeholder="Select dates..."
          />
        </div>
      </div>

      {/* Selected Filters */}
      {(selectedDates || location) && (
        <div className="flex flex-wrap gap-2">
          {selectedDates && (
            <Badge variant="secondary" className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {format(selectedDates.from, 'MMM dd')} - {format(selectedDates.to, 'MMM dd')}
              <button 
                onClick={() => onDateChange(null)}
                className="ml-1 hover:text-destructive"
              >
                ×
              </button>
            </Badge>
          )}
          {location && (
            <Badge variant="secondary" className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {location}
              <button 
                onClick={() => {
                  onLocationChange('');
                  setLocationInput('');
                }}
                className="ml-1 hover:text-destructive"
              >
                ×
              </button>
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchSection;
