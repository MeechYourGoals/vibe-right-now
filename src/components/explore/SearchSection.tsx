
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Search, MapPin, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import DateFilterSection from './DateFilterSection';
import { useGooglePlacesAutocomplete } from '@/hooks/useGooglePlacesAutocomplete';
import { useGooglePlacesSearch } from '@/hooks/useGooglePlacesSearch';

interface SearchSectionProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedDates: { from: Date; to: Date } | null;
  onDateChange: (dates: { from: Date; to: Date } | null) => void;
  location: string;
  onLocationChange: (location: string) => void;
  onPlaceSelect?: (place: google.maps.places.PlaceResult) => void;
  onVenueSelect?: (venue: google.maps.places.PlaceResult) => void;
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
  const [didYouMean, setDidYouMean] = useState<string | null>(null);
  
  const locationInputRef = useRef<HTMLInputElement>(null);
  const venueInputRef = useRef<HTMLInputElement>(null);

  const {
    suggestions: locationSuggestions,
    loading: locationLoading,
    searchLocation,
    clearSuggestions: clearLocationSuggestions
  } = useGooglePlacesAutocomplete('cities');

  const {
    suggestions: venueSuggestions,
    loading: venueLoading,
    searchVenues,
    clearSuggestions: clearVenueSuggestions,
    spellingSuggestion
  } = useGooglePlacesSearch(location);

  const handleLocationInputChange = useCallback((value: string) => {
    onLocationChange(value);
    if (value.trim().length > 2) {
      searchLocation(value);
      setShowLocationSuggestions(true);
    } else {
      setShowLocationSuggestions(false);
      clearLocationSuggestions();
    }
  }, [onLocationChange, searchLocation, clearLocationSuggestions]);

  const handleVenueInputChange = useCallback((value: string) => {
    onSearchChange(value);
    if (value.trim().length > 2) {
      searchVenues(value);
      setShowVenueSuggestions(true);
    } else {
      setShowVenueSuggestions(false);
      clearVenueSuggestions();
      setDidYouMean(null);
    }
  }, [onSearchChange, searchVenues, clearVenueSuggestions]);

  const handleLocationSelect = (place: google.maps.places.PlaceResult) => {
    if (place.formatted_address) {
      onLocationChange(place.formatted_address);
    }
    setShowLocationSuggestions(false);
    onPlaceSelect?.(place);
  };

  const handleVenueSelect = (place: google.maps.places.PlaceResult) => {
    if (place.name) {
      onSearchChange(place.name);
    }
    
    // Auto-populate location if venue has address
    if (place.formatted_address && !location) {
      const city = extractCityFromAddress(place.formatted_address);
      if (city) {
        onLocationChange(city);
      }
    }
    
    setShowVenueSuggestions(false);
    onVenueSelect?.(place);
  };

  const extractCityFromAddress = (address: string): string => {
    const parts = address.split(',');
    if (parts.length >= 2) {
      return parts[parts.length - 2].trim();
    }
    return '';
  };

  const handleDidYouMeanClick = () => {
    if (spellingSuggestion) {
      handleVenueInputChange(spellingSuggestion);
      setDidYouMean(null);
    }
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (locationInputRef.current && !locationInputRef.current.contains(event.target as Node)) {
        setShowLocationSuggestions(false);
      }
      if (venueInputRef.current && !venueInputRef.current.contains(event.target as Node)) {
        setShowVenueSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Update did you mean when spelling suggestion changes
  useEffect(() => {
    if (spellingSuggestion && spellingSuggestion !== searchQuery) {
      setDidYouMean(spellingSuggestion);
    } else {
      setDidYouMean(null);
    }
  }, [spellingSuggestion, searchQuery]);

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <Search className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-lg">What are you looking for?</h3>
          </div>
          
          <div className="space-y-3">
            {/* Venue Search Field */}
            <div className="relative" ref={venueInputRef}>
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search Venues, eVents, Vibes..."
                value={searchQuery}
                onChange={(e) => handleVenueInputChange(e.target.value)}
                className="pl-10"
              />
              
              {/* Did You Mean Suggestion */}
              {didYouMean && (
                <div className="absolute top-full mt-1 left-0 right-0 z-50">
                  <Card className="shadow-lg">
                    <CardContent className="p-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleDidYouMeanClick}
                        className="w-full justify-start text-sm"
                      >
                        Did you mean: <strong className="ml-1">{didYouMean}</strong>?
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              )}
              
              {/* Venue Suggestions */}
              {showVenueSuggestions && venueSuggestions.length > 0 && (
                <div className="absolute top-full mt-1 left-0 right-0 z-50 max-h-60 overflow-y-auto">
                  <Card className="shadow-lg">
                    <CardContent className="p-0">
                      {venueSuggestions.map((place, index) => (
                        <Button
                          key={index}
                          variant="ghost"
                          onClick={() => handleVenueSelect(place)}
                          className="w-full justify-start p-3 text-left hover:bg-muted/50"
                        >
                          <div className="flex items-start gap-2">
                            <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <div className="font-medium truncate">{place.name}</div>
                              {place.formatted_address && (
                                <div className="text-xs text-muted-foreground truncate">
                                  {place.formatted_address}
                                </div>
                              )}
                              {place.types && (
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {place.types.slice(0, 2).map((type, typeIndex) => (
                                    <Badge key={typeIndex} variant="outline" className="text-xs">
                                      {type.replace(/_/g, ' ')}
                                    </Badge>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </Button>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              )}
              
              {venueLoading && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                </div>
              )}
            </div>
            
            {/* Location Search Field */}
            <div className="relative" ref={locationInputRef}>
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Enter location..."
                value={location}
                onChange={(e) => handleLocationInputChange(e.target.value)}
                className="pl-10"
              />
              
              {/* Location Suggestions */}
              {showLocationSuggestions && locationSuggestions.length > 0 && (
                <div className="absolute top-full mt-1 left-0 right-0 z-50 max-h-60 overflow-y-auto">
                  <Card className="shadow-lg">
                    <CardContent className="p-0">
                      {locationSuggestions.map((place, index) => (
                        <Button
                          key={index}
                          variant="ghost"
                          onClick={() => handleLocationSelect(place)}
                          className="w-full justify-start p-3 text-left hover:bg-muted/50"
                        >
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <div className="font-medium truncate">{place.name || place.formatted_address}</div>
                              {place.formatted_address && place.name && (
                                <div className="text-xs text-muted-foreground truncate">
                                  {place.formatted_address}
                                </div>
                              )}
                            </div>
                          </div>
                        </Button>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              )}
              
              {locationLoading && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <DateFilterSection
        selectedDates={selectedDates}
        onDateChange={onDateChange}
      />
    </div>
  );
};

export default SearchSection;
