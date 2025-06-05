
import React, { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MapPin, Search, ExternalLink } from 'lucide-react';
import { googlePlacesService } from '@/services/googlePlacesService';
import { Location } from '@/types';

interface PlacesAutocompleteProps {
  onPlaceSelect: (location: Location) => void;
  onSearch: (query: string) => void;
  placeholder?: string;
  userLocation?: { lat: number; lng: number };
}

const PlacesAutocomplete: React.FC<PlacesAutocompleteProps> = ({
  onPlaceSelect,
  onSearch,
  placeholder = "Search for places...",
  userLocation
}) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (query.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    // Debounce the API call
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(async () => {
      setIsLoading(true);
      try {
        const predictions = await googlePlacesService.getPlaceAutocomplete(query, userLocation);
        setSuggestions(predictions);
        setShowSuggestions(predictions.length > 0);
      } catch (error) {
        console.error('Error fetching autocomplete suggestions:', error);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [query, userLocation]);

  const handleSuggestionClick = async (prediction: any) => {
    setQuery(prediction.description);
    setShowSuggestions(false);
    
    try {
      const placeDetails = await googlePlacesService.getPlaceDetails(prediction.place_id);
      if (placeDetails) {
        const location = googlePlacesService.convertGooglePlaceToLocation(placeDetails);
        onPlaceSelect(location);
      }
    } catch (error) {
      console.error('Error fetching place details:', error);
      // Fallback to text search
      onSearch(prediction.description);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setShowSuggestions(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className="relative w-full">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <Input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder={placeholder}
            className="pr-10"
          />
          <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
        <Button type="submit" disabled={isLoading || !query.trim()}>
          <Search className="h-4 w-4" />
        </Button>
      </form>

      {showSuggestions && suggestions.length > 0 && (
        <Card className="absolute top-full left-0 right-0 mt-1 max-h-60 overflow-y-auto z-50 bg-background border shadow-lg">
          <div className="p-2">
            {suggestions.map((prediction, index) => (
              <div
                key={prediction.place_id || index}
                className="flex items-center gap-3 p-2 hover:bg-muted rounded-md cursor-pointer transition-colors"
                onClick={() => handleSuggestionClick(prediction)}
              >
                <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    {prediction.structured_formatting?.main_text || prediction.description}
                  </p>
                  {prediction.structured_formatting?.secondary_text && (
                    <p className="text-xs text-muted-foreground truncate">
                      {prediction.structured_formatting.secondary_text}
                    </p>
                  )}
                </div>
                <ExternalLink className="h-3 w-3 text-muted-foreground" />
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default PlacesAutocomplete;
