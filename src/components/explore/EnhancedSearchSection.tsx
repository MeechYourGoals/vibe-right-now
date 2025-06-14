
import React, { useState, useEffect, useCallback } from 'react';
import { Calendar, MapPin, Search, ExternalLink } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DatePickerWithRange } from '@/components/ui/date-picker-with-range';
import { format } from 'date-fns';
import { useEnhancedGooglePlaces, EnhancedPlace } from '@/hooks/useEnhancedGooglePlaces';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface EnhancedSearchSectionProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedDates: { from: Date; to: Date } | null;
  onDateChange: (dates: { from: Date; to: Date } | null) => void;
  location: string;
  onLocationChange: (location: string) => void;
  onPlaceSelect: (place: EnhancedPlace) => void;
  onVenueSelect: (place: EnhancedPlace) => void;
}

const EnhancedSearchSection: React.FC<EnhancedSearchSectionProps> = ({
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

  const {
    searchResults: locationResults,
    loading: locationLoading,
    error: locationError,
    spellingSuggestions: locationSpelling,
    searchCities,
    clearResults: clearLocationResults
  } = useEnhancedGooglePlaces();

  const {
    searchResults: venueResults,
    loading: venueLoading,
    error: venueError,
    spellingSuggestions: venueSpelling,
    searchVenues,
    clearResults: clearVenueResults
  } = useEnhancedGooglePlaces();

  // Debounced search function
  const debounce = useCallback((func: Function, wait: number) => {
    let timeout: NodeJS.Timeout;
    return function executedFunction(...args: any[]) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }, []);

  // Debounced location search
  const debouncedLocationSearch = useCallback(
    debounce((query: string) => {
      if (query.trim() && query !== location) {
        searchCities(query);
        setShowLocationSuggestions(true);
      }
    }, 300),
    [searchCities, location]
  );

  // Debounced venue search
  const debouncedVenueSearch = useCallback(
    debounce((query: string, locationCoords?: { lat: number, lng: number }) => {
      if (query.trim() && query !== searchQuery) {
        searchVenues(query, locationCoords);
        setShowVenueSuggestions(true);
      }
    }, 300),
    [searchVenues, searchQuery]
  );

  // Handle location input changes
  useEffect(() => {
    if (locationInput.trim() && locationInput !== location) {
      debouncedLocationSearch(locationInput);
    } else {
      clearLocationResults();
      setShowLocationSuggestions(false);
    }
  }, [locationInput, debouncedLocationSearch, clearLocationResults, location]);

  // Handle venue input changes
  useEffect(() => {
    if (venueInput.trim() && venueInput !== searchQuery) {
      // Try to get coordinates from current location for better venue search
      let locationCoords: { lat: number, lng: number } | undefined;
      
      // If we have a location, we might want to search venues near it
      // For now, we'll search without location constraints
      debouncedVenueSearch(venueInput, locationCoords);
    } else {
      clearVenueResults();
      setShowVenueSuggestions(false);
    }
  }, [venueInput, debouncedVenueSearch, clearVenueResults, searchQuery]);

  const handleLocationSelect = (place: EnhancedPlace) => {
    const placeName = place.name || place.formatted_address?.split(',')[0] || '';
    setLocationInput(placeName);
    onLocationChange(placeName);
    onPlaceSelect(place);
    setShowLocationSuggestions(false);
    clearLocationResults();
    toast.success(`Location set to ${placeName}`);
  };

  const handleVenueSelect = (place: EnhancedPlace) => {
    const venueName = place.name || '';
    setVenueInput(venueName);
    onSearchChange(venueName);
    onVenueSelect(place);
    setShowVenueSuggestions(false);
    clearVenueResults();
    toast.success(`Found ${venueName}`);
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

  const handleSpellingSuggestion = (suggestion: string, isVenue: boolean) => {
    if (isVenue) {
      handleVenueInputChange(suggestion);
    } else {
      handleLocationInputChange(suggestion);
    }
  };

  const openInGoogleMaps = (googleMapsUrl: string) => {
    window.open(googleMapsUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Enhanced Venue Search */}
        <div className="relative flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search venues, events, places..."
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

          {/* Enhanced Venue Suggestions */}
          {showVenueSuggestions && (venueResults.length > 0 || venueSpelling.length > 0 || venueError) && (
            <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-background border border-border rounded-md shadow-lg max-h-80 overflow-y-auto">
              {venueSpelling.length > 0 && (
                <div className="p-3 border-b border-border">
                  <p className="text-sm text-muted-foreground mb-2">Did you mean:</p>
                  <div className="flex gap-2 flex-wrap">
                    {venueSpelling.map((suggestion, idx) => (
                      <Button
                        key={idx}
                        variant="outline"
                        size="sm"
                        onClick={() => handleSpellingSuggestion(suggestion, true)}
                        className="text-xs"
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
              
              {venueError && (
                <div className="p-3 text-sm text-destructive border-b border-border">
                  {venueError}
                </div>
              )}
              
              {venueResults.map((place, index) => (
                <button
                  key={index}
                  className="w-full text-left p-3 hover:bg-muted border-b border-border last:border-b-0 transition-colors"
                  onClick={() => handleVenueSelect(place)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="font-medium">{place.name}</div>
                      {place.formatted_address && (
                        <div className="text-sm text-muted-foreground">{place.formatted_address}</div>
                      )}
                      <div className="flex items-center gap-2 mt-1">
                        {place.rating && (
                          <Badge variant="secondary" className="text-xs">
                            ⭐ {place.rating}
                          </Badge>
                        )}
                        {place.business_status === 'OPERATIONAL' && (
                          <Badge variant="outline" className="text-xs text-green-600">
                            Open
                          </Badge>
                        )}
                        {place.types && place.types.slice(0, 2).map((type, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {type.replace(/_/g, ' ')}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    {place.google_maps_url && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          openInGoogleMaps(place.google_maps_url!);
                        }}
                        className="ml-2"
                      >
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Enhanced Location Search */}
        <div className="relative w-full md:w-64">
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="City, State, Country"
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

          {/* Enhanced Location Suggestions */}
          {showLocationSuggestions && (locationResults.length > 0 || locationSpelling.length > 0 || locationError) && (
            <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-background border border-border rounded-md shadow-lg max-h-60 overflow-y-auto">
              {locationSpelling.length > 0 && (
                <div className="p-3 border-b border-border">
                  <p className="text-sm text-muted-foreground mb-2">Did you mean:</p>
                  <div className="flex gap-2 flex-wrap">
                    {locationSpelling.map((suggestion, idx) => (
                      <Button
                        key={idx}
                        variant="outline"
                        size="sm"
                        onClick={() => handleSpellingSuggestion(suggestion, false)}
                        className="text-xs"
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
              
              {locationError && (
                <div className="p-3 text-sm text-destructive border-b border-border">
                  {locationError}
                </div>
              )}
              
              {locationResults.map((place, index) => (
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

export default EnhancedSearchSection;
