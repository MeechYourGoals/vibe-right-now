
import { useState } from 'react';

interface PlacesResult {
  id: string;
  name: string;
  address: string;
  types: string[];
  rating?: number;
  priceLevel?: number;
  photos?: string[];
}

export const useGooglePlacesService = () => {
  const [results, setResults] = useState<PlacesResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchNearbyPlaces = async (query: string, location: { lat: number, lng: number }) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Mock implementation for now
      const mockResults: PlacesResult[] = [
        {
          id: '1',
          name: 'Coffee Shop',
          address: '123 Main St',
          types: ['cafe', 'restaurant'],
          rating: 4.5,
          priceLevel: 2
        },
        {
          id: '2',
          name: 'Restaurant',
          address: '456 Oak St',
          types: ['restaurant'],
          rating: 4.2,
          priceLevel: 3
        }
      ];
      
      setTimeout(() => {
        setResults(mockResults);
        setIsLoading(false);
      }, 500);
    } catch (err) {
      setError('Error searching for places');
      setIsLoading(false);
    }
  };

  return {
    results,
    isLoading,
    error,
    searchNearbyPlaces
  };
};

export default useGooglePlacesService;
