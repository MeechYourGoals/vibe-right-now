
import React, { useState, useEffect, useCallback } from 'react';
import { Calendar, MapPin, Search, ExternalLink } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DatePickerWithRange } from '@/components/ui/date-picker-with-range';
import { format } from 'date-fns';
import { Location } from '@/types/location';
import { findCityByName, searchVenues } from '@/data/mockCities';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface EnhancedSearchSectionProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedDates: { from: Date; to: Date } | null;
  onDateChange: (dates: { from: Date; to: Date } | null) => void;
  location: string;
  onLocationChange: (location: string) => void;
  onPlaceSelect: (place: Location) => void;
  onVenueSelect: (place: Location) => void;
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
  const [locationResults, setLocationResults] = useState<any[]>([]);
  const [venueResults, setVenueResults] = useState<Location[]>([]);

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
        const city = findCityByName(query);
        if (city) {
          setLocationResults([{
            name: city.name,
            formatted_address: `${city.name}${city.state ? `, ${city.state}` : ''}, ${city.country}`,
            ...city
          }]);
        } else {
          setLocationResults([]);
        }
        setShowLocationSuggestions(true);
      }
    }, 300),
    [location]
  );

  // Debounced venue search
  const debouncedVenueSearch = useCallback(
    debounce((query: string) => {
      if (query.trim() && query !== searchQuery) {
        const venues = searchVenues(query, location);
        setVenueResults(venues);
        setShowVenueSuggestions(true);
      }
    }, 300),
    [searchQuery, location]
  );

  // Handle location input changes
  useEffect(() => {
    if (locationInput.trim() && locationInput !== location) {
      debouncedLocationSearch(locationInput);
    } else {
      setLocationResults([]);
      setShowLocationSuggestions(false);
    }
  }, [locationInput, debouncedLocationSearch, location]);

  // Handle venue input changes
  useEffect(() => {
    if (venueInput.trim() && venueInput !== searchQuery) {
      debouncedVenueSearch(venueInput);
    } else {
      setVenueResults([]);
      setShowVenueSuggestions(false);
    }
  }, [venueInput, debouncedVenueSearch, searchQuery]);

  const handleLocationSelect = (cityData: any) => {
    const placeName = cityData.name;
    setLocationInput(placeName);
    onLocationChange(placeName);

    // Create a location object for the city center
    const cityLocation: Location = {
      id: `city-${cityData.name.toLowerCase()}`,
      name: cityData.name,
      address: cityData.formatted_address,
      city: cityData.name,
      state: cityData.state,
      country: cityData.country,
      lat: cityData.lat,
      lng: cityData.lng,
      type: 'city'
    };

    onPlaceSelect(cityLocation);
    setShowLocationSuggestions(false);
    setLocationResults([]);
    toast.success(`Location set to ${placeName}`);
  };

  const handleVenueSelect = (venue: Location) => {
    const venueName = venue.name || '';
    setVenueInput(venueName);
    onSearchChange(venueName);
    onVenueSelect(venue);
    setShowVenueSuggestions(false);
    setVenueResults([]);
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
          </div>

          {/* Enhanced Venue Suggestions */}
          {showVenueSuggestions && venueResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-background border border-border rounded-md shadow-lg max-h-80 overflow-y-auto">
              {venueResults.map((venue, index) => (
                <button
                  key={index}
                  className="w-full text-left p-3 hover:bg-muted border-b border-border last:border-b-0 transition-colors"
                  onClick={() => handleVenueSelect(venue)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="font-medium">{venue.name}</div>
                      {venue.address && (
                        <div className="text-sm text-muted-foreground">{venue.address}</div>
                      )}
                      <div className="flex items-center gap-2 mt-1">
                        {venue.rating && (
                          <Badge variant="secondary" className="text-xs">
                            ⭐ {venue.rating}
                          </Badge>
                        )}
                        {venue.business_status === 'OPERATIONAL' && (
                          <Badge variant="outline" className="text-xs text-green-600">
                            Open
                          </Badge>
                        )}
                        <Badge variant="secondary" className="text-xs">
                          {venue.type.replace(/_/g, ' ')}
                        </Badge>
                        {venue.vibes && venue.vibes.slice(0, 2).map((vibe, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {vibe}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    {venue.google_maps_url && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          openInGoogleMaps(venue.google_maps_url!);
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
          </div>

          {/* Enhanced Location Suggestions */}
          {showLocationSuggestions && locationResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-background border border-border rounded-md shadow-lg max-h-60 overflow-y-auto">
              {locationResults.map((cityData, index) => (
                <button
                  key={index}
                  className="w-full text-left p-3 hover:bg-muted border-b border-border last:border-b-0 transition-colors"
                  onClick={() => handleLocationSelect(cityData)}
                >
                  <div className="font-medium">{cityData.name}</div>
                  {cityData.formatted_address && (
                    <div className="text-sm text-muted-foreground">{cityData.formatted_address}</div>
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
