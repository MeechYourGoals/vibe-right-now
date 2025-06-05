
import { useState, useCallback } from 'react';
import { googlePlacesService } from '@/services/googlePlacesService';
import { Location, PlaceSearchRequest } from '@/types';
import { toast } from 'sonner';

export const usePlacesSearch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [places, setPlaces] = useState<Location[]>([]);
  const [error, setError] = useState<string | null>(null);

  const searchPlaces = useCallback(async (request: PlaceSearchRequest) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const googlePlaces = await googlePlacesService.searchPlaces(request);
      const locations = googlePlaces.map(place => 
        googlePlacesService.convertGooglePlaceToLocation(place)
      );
      
      setPlaces(locations);
      
      if (locations.length === 0) {
        toast.info("No places found for your search. Try different keywords or location.");
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to search places';
      setError(errorMessage);
      toast.error(`Search failed: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getNearbyPlaces = useCallback(async (
    location: { lat: number; lng: number }, 
    radius: number = 5000, 
    type?: string
  ) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const googlePlaces = await googlePlacesService.getNearbyPlaces(location, radius, type);
      const locations = googlePlaces.map(place => 
        googlePlacesService.convertGooglePlaceToLocation(place)
      );
      
      setPlaces(locations);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get nearby places';
      setError(errorMessage);
      toast.error(`Failed to load nearby places: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearPlaces = useCallback(() => {
    setPlaces([]);
    setError(null);
  }, []);

  return {
    places,
    isLoading,
    error,
    searchPlaces,
    getNearbyPlaces,
    clearPlaces
  };
};
