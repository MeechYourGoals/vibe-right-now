
import { useState, useCallback } from 'react';
import { Location } from '@/types';

export const usePlacesSearch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchPlaces = useCallback(async (query: string): Promise<Location[]> => {
    setIsLoading(true);
    setError(null);

    try {
      // Mock search results
      const mockResults: Location[] = [
        {
          id: '1',
          name: 'Sample Restaurant',
          address: '123 Main St',
          city: 'Sample City',
          state: 'CA',
          country: 'USA',
          lat: 37.7749,
          lng: -122.4194,
          type: 'restaurant' as const,
          verified: true
        }
      ];

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      return mockResults;
    } catch (err) {
      setError('Failed to search places');
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    searchPlaces,
    isLoading,
    error
  };
};
