
import React, { useState, useEffect } from 'react';
import { Search, MapPin, Calendar, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useGooglePlacesAutocomplete } from '@/hooks/useGooglePlacesAutocomplete';
import { Location } from '@/types';

interface SearchSectionProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  location: string;
  onLocationChange: (location: string) => void;
  onPlaceSelect: (place: Location) => void;
  className?: string;
}

const SearchSection: React.FC<SearchSectionProps> = ({
  searchQuery,
  onSearchChange,
  location,
  onLocationChange,
  onPlaceSelect,
  className = ""
}) => {
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  
  const {
    suggestions,
    loading,
    searchLocation,
    clearSuggestions
  } = useGooglePlacesAutocomplete();

  // Handle location input changes
  const handleLocationInputChange = (value: string) => {
    onLocationChange(value);
    if (value.length > 2) {
      searchLocation(value);
      setShowLocationSuggestions(true);
    } else {
      clearSuggestions();
      setShowLocationSuggestions(false);
    }
  };

  // Handle place selection from autocomplete
  const handlePlaceClick = (place: any) => {
    const locationName = place.structured_formatting?.main_text || place.name || place.description || '';
    onLocationChange(locationName);
    
    // Convert to Location format for onPlaceSelect
    const locationData: Location = {
      id: place.place_id || `place-${Date.now()}`,
      name: locationName,
      address: place.description || place.formatted_address || '',
      city: place.structured_formatting?.secondary_text?.split(',')[0] || '',
      state: place.structured_formatting?.secondary_text?.split(',')[1]?.trim() || '',
      zip: '',
      country: '',
      lat: place.geometry?.location?.lat?.() || 0,
      lng: place.geometry?.location?.lng?.() || 0,
      type: 'city' as const,
      verified: false,
      rating: 0,
      vibes: [],
      tags: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    onPlaceSelect(locationData);
    setShowLocationSuggestions(false);
    clearSuggestions();
  };

  // Hide suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowLocationSuggestions(false);
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search venues, events, activities..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 h-12"
        />
      </div>

      {/* Location Input with Autocomplete */}
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Enter city or location"
          value={location}
          onChange={(e) => handleLocationInputChange(e.target.value)}
          className="pl-10 h-12"
          onClick={(e) => e.stopPropagation()}
        />
        
        {/* Loading indicator */}
        {loading && (
          <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 animate-spin" />
        )}
        
        {/* Location Suggestions */}
        {showLocationSuggestions && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 bg-background border rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
            {suggestions.slice(0, 5).map((place, index) => (
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
    </div>
  );
};

export default SearchSection;
