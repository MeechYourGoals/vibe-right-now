
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useGooglePlacesAutocomplete = (types: 'cities' | 'establishments' = 'cities') => {
  const [suggestions, setSuggestions] = useState<google.maps.places.PlaceResult[]>([]);
  const [loading, setLoading] = useState(false);

  const searchLocation = useCallback(async (input: string) => {
    if (!input.trim()) {
      setSuggestions([]);
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('google-places', {
        body: {
          query: input,
          type: types === 'cities' ? 'geocode' : 'establishment'
        }
      });

      if (error) {
        console.error('Error fetching places:', error);
        setSuggestions([]);
        return;
      }

      if (data?.results) {
        setSuggestions(data.results.slice(0, 5)); // Limit to 5 suggestions
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error('Error in useGooglePlacesAutocomplete:', error);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  }, [types]);

  const clearSuggestions = useCallback(() => {
    setSuggestions([]);
  }, []);

  return {
    suggestions,
    loading,
    searchLocation,
    clearSuggestions
  };
};
