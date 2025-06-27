
import { useState } from 'react';

export interface PlaceResult {
  place_id?: string;
  description?: string;
  name?: string;
  formatted_address?: string;
  structured_formatting?: {
    main_text?: string;
    secondary_text?: string;
  };
  geometry?: {
    location?: {
      lat: () => number;
      lng: () => number;
    };
  };
}

export const useGooglePlacesAutocomplete = () => {
  const [suggestions, setSuggestions] = useState<PlaceResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const searchPlaces = async (input: string) => {
    if (!input || input.length < 3) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    
    try {
      // Mock implementation for now - replace with actual Google Places API call
      const mockResults: PlaceResult[] = [
        {
          place_id: `place_${Date.now()}_1`,
          description: `${input}, City, State`,
          structured_formatting: {
            main_text: input,
            secondary_text: 'City, State'
          }
        }
      ];
      
      setSuggestions(mockResults);
    } catch (error) {
      console.error('Error searching places:', error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearSuggestions = () => {
    setSuggestions([]);
  };

  return {
    suggestions,
    isLoading,
    loading: isLoading,
    searchPlaces,
    searchLocation: searchPlaces,
    clearSuggestions
  };
};
