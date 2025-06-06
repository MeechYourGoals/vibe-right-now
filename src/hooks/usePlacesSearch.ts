
import { useState, useCallback } from 'react';
import { googlePlacesService, GooglePlace } from '@/services/GooglePlacesService';
import { Location } from '@/types';

export const usePlacesSearch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [places, setPlaces] = useState<GooglePlace[]>([]);

  const convertGooglePlaceToLocation = (place: GooglePlace): Location => {
    return {
      id: place.place_id,
      name: place.name,
      address: place.formatted_address,
      city: place.formatted_address.split(',')[1]?.trim() || '',
      country: 'US',
      lat: place.geometry.location.lat,
      lng: place.geometry.location.lng,
      type: place.types.includes('restaurant') ? 'restaurant' : 
            place.types.includes('bar') ? 'bar' :
            place.types.includes('tourist_attraction') ? 'attraction' : 
            place.types.includes('cafe') ? 'cafe' :
            place.types.includes('museum') ? 'museum' :
            place.types.includes('night_club') ? 'nightclub' : 'other',
      verified: true,
      rating: place.rating,
      tags: place.types
    };
  };

  const searchPlaces = useCallback(async (query: string, location?: { lat: number; lng: number }) => {
    if (!query.trim()) {
      setPlaces([]);
      return [];
    }

    setIsLoading(true);
    setError(null);

    try {
      console.log('usePlacesSearch: Searching for:', query);
      const results = await googlePlacesService.searchPlaces(query, location);
      console.log('usePlacesSearch: Found', results.length, 'results');
      
      setPlaces(results);
      const convertedLocations = results.map(convertGooglePlaceToLocation);
      console.log('usePlacesSearch: Converted to', convertedLocations.length, 'locations');
      
      return convertedLocations;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to search places';
      setError(errorMessage);
      console.error('Places search error:', err);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getNearbyPlaces = useCallback(async (location: { lat: number; lng: number }, radius = 5000, type?: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const results = await googlePlacesService.getNearbyPlaces(location, radius, type);
      setPlaces(results);
      return results.map(convertGooglePlaceToLocation);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get nearby places';
      setError(errorMessage);
      console.error('Nearby places error:', err);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearResults = useCallback(() => {
    setPlaces([]);
    setError(null);
  }, []);

  return {
    isLoading,
    error,
    places,
    searchPlaces,
    getNearbyPlaces,
    clearResults
  };
};
