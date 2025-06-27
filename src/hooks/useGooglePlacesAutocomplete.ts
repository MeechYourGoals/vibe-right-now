
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
      // Check if Google Places is available
      if (typeof google !== 'undefined' && google.maps && google.maps.places) {
        const service = new google.maps.places.AutocompleteService();
        
        service.getPlacePredictions(
          {
            input,
            types: ['(cities)'],
          },
          (predictions, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK && predictions) {
              setSuggestions(predictions);
            } else {
              setSuggestions([]);
            }
            setIsLoading(false);
          }
        );
      } else {
        // Fallback to mock results
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
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error searching places:', error);
      setSuggestions([]);
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
