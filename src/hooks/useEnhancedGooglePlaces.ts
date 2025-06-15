
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface EnhancedPlace {
  place_id: string;
  name: string;
  formatted_address: string;
  geometry: {
    location: { lat: number, lng: number };
    viewport?: any;
  };
  types: string[];
  rating?: number;
  price_level?: number;
  photos?: Array<{
    photo_reference: string;
    width: number;
    height: number;
  }>;
  opening_hours?: {
    open_now: boolean;
    weekday_text?: string[];
  };
  business_status?: string;
  website?: string;
  formatted_phone_number?: string;
  google_maps_url?: string;
  confidence_score?: number;
  search_relevance?: number;
}

export interface SearchResult {
  results: EnhancedPlace[];
  status: string;
  spelling_suggestions?: string[];
  next_page_token?: string;
}

export const useEnhancedGooglePlaces = () => {
  const [searchResults, setSearchResults] = useState<EnhancedPlace[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [spellingSuggestions, setSpellingSuggestions] = useState<string[]>([]);

  const searchPlaces = useCallback(async (
    query: string,
    options: {
      searchType?: 'city' | 'venue' | 'category';
      location?: { lat: number, lng: number };
      radius?: number;
      type?: string;
    } = {}
  ): Promise<EnhancedPlace[]> => {
    if (!query.trim()) {
      setSearchResults([]);
      setSpellingSuggestions([]);
      return [];
    }

    setLoading(true);
    setError(null);
    setSpellingSuggestions([]);

    try {
      console.log('Enhanced search request:', { query, options });

      const { data, error: functionError } = await supabase.functions.invoke('google-places', {
        body: {
          query,
          searchType: options.searchType,
          location: options.location,
          radius: options.radius,
          type: options.type,
          fields: [
            'place_id', 'name', 'formatted_address', 'geometry', 'types',
            'rating', 'price_level', 'photos', 'opening_hours', 'business_status',
            'website', 'formatted_phone_number'
          ]
        }
      });

      if (functionError) {
        console.error('Error calling enhanced google-places function:', functionError);
        setError('Search service unavailable');
        return [];
      }

      const results = data?.results || [];
      setSearchResults(results);

      if (data?.spelling_suggestions && data.spelling_suggestions.length > 0) {
        setSpellingSuggestions(data.spelling_suggestions);
      }

      if (results.length === 0 && data?.status === 'ZERO_RESULTS') {
        setError('No results found. Try a different search term.');
      }

      console.log(`Found ${results.length} enhanced results`);
      return results;

    } catch (err) {
      console.error('Error in enhanced places search:', err);
      setError('Search failed. Please try again.');
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const getPlaceDetails = useCallback(async (placeId: string): Promise<EnhancedPlace | null> => {
    setLoading(true);
    setError(null);

    try {
      const { data, error: functionError } = await supabase.functions.invoke('google-places', {
        body: {
          placeId,
          fields: [
            'place_id', 'name', 'formatted_address', 'geometry', 'types',
            'rating', 'price_level', 'photos', 'opening_hours', 'business_status',
            'website', 'formatted_phone_number', 'reviews'
          ]
        }
      });

      if (functionError) {
        console.error('Error getting place details:', functionError);
        setError('Unable to get place details');
        return null;
      }

      return data?.result || null;

    } catch (err) {
      console.error('Error getting place details:', err);
      setError('Failed to get place details');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const searchCities = useCallback(async (query: string): Promise<EnhancedPlace[]> => {
    return searchPlaces(query, { searchType: 'city' });
  }, [searchPlaces]);

  const searchVenues = useCallback(async (
    query: string,
    location?: { lat: number, lng: number }
  ): Promise<EnhancedPlace[]> => {
    return searchPlaces(query, {
      searchType: 'venue',
      location,
      type: 'establishment'
    });
  }, [searchPlaces]);

  const clearResults = useCallback(() => {
    setSearchResults([]);
    setSpellingSuggestions([]);
    setError(null);
  }, []);

  return {
    searchResults,
    loading,
    error,
    spellingSuggestions,
    searchPlaces,
    getPlaceDetails,
    searchCities,
    searchVenues,
    clearResults
  };
};
