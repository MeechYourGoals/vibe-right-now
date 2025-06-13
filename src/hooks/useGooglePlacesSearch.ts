
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useGooglePlacesSearch = (location: string) => {
  const [suggestions, setSuggestions] = useState<google.maps.places.PlaceResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [spellingSuggestion, setSpellingSuggestion] = useState<string | null>(null);

  const searchVenues = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSuggestions([]);
      setSpellingSuggestion(null);
      return;
    }

    setLoading(true);
    try {
      const searchQuery = location ? `${query} in ${location}` : query;
      
      const { data, error } = await supabase.functions.invoke('google-places', {
        body: {
          query: searchQuery,
          type: 'establishment'
        }
      });

      if (error) {
        console.error('Error fetching venues:', error);
        setSuggestions([]);
        return;
      }

      if (data?.results) {
        const filteredResults = data.results.filter((place: google.maps.places.PlaceResult) => 
          place.types?.some(type => 
            ['restaurant', 'bar', 'night_club', 'stadium', 'tourist_attraction', 
             'amusement_park', 'gym', 'spa', 'shopping_mall', 'movie_theater',
             'bowling_alley', 'casino', 'park', 'museum'].includes(type)
          )
        );
        
        setSuggestions(filteredResults.slice(0, 8));
        
        // Simple spelling suggestion logic
        if (filteredResults.length === 0 && query.length > 3) {
          // If no results, try a simplified version of the query
          const simplified = query.toLowerCase().replace(/[^a-z\s]/g, '');
          if (simplified !== query.toLowerCase()) {
            setSpellingSuggestion(simplified);
          }
        } else {
          setSpellingSuggestion(null);
        }
      } else {
        setSuggestions([]);
        setSpellingSuggestion(null);
      }
    } catch (error) {
      console.error('Error in useGooglePlacesSearch:', error);
      setSuggestions([]);
      setSpellingSuggestion(null);
    } finally {
      setLoading(false);
    }
  }, [location]);

  const clearSuggestions = useCallback(() => {
    setSuggestions([]);
    setSpellingSuggestion(null);
  }, []);

  return {
    suggestions,
    loading,
    spellingSuggestion,
    searchVenues,
    clearSuggestions
  };
};
