
import { useState, useCallback } from 'react';
import { Location } from '../types';

export const useGooglePlacesService = () => {
  const [results, setResults] = useState<Location[]>([]);
  const [loading, setLoading] = useState(false);

  const searchNearby = useCallback(async (query: string, location: { lat: number; lng: number }) => {
    setLoading(true);
    try {
      const searchTerms = Array.isArray(query) ? query : query.split(' ');
      const searchQuery = searchTerms.filter(Boolean).join(' ');

      // For now, return empty array as we're using OpenRouter
      setResults([]);
    } catch (error) {
      console.error('Error in Google Places search:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    results,
    loading,
    searchNearby
  };
};
