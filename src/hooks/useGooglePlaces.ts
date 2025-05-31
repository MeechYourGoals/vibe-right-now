
import { useState, useEffect } from 'react';
import { GooglePlacesService } from '@/services/GooglePlacesService';
import { Location } from '@/types';

export const useGooglePlaces = (
  userLocation: GeolocationCoordinates | null,
  searchQuery?: string
) => {
  const [places, setPlaces] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPlaces = async () => {
    if (!userLocation) return;

    setIsLoading(true);
    setError(null);

    try {
      let results: any[] = [];

      if (searchQuery) {
        // Text search if query provided
        results = await GooglePlacesService.textSearch(
          searchQuery,
          { lat: userLocation.latitude, lng: userLocation.longitude }
        );
      } else {
        // Nearby search for popular place types
        const promises = [
          GooglePlacesService.searchNearby(
            { lat: userLocation.latitude, lng: userLocation.longitude },
            5000,
            'restaurant'
          ),
          GooglePlacesService.searchNearby(
            { lat: userLocation.latitude, lng: userLocation.longitude },
            5000,
            'bar'
          ),
          GooglePlacesService.searchNearby(
            { lat: userLocation.latitude, lng: userLocation.longitude },
            5000,
            'tourist_attraction'
          )
        ];

        const allResults = await Promise.all(promises);
        results = allResults.flat();
      }

      // Convert to our Location format and remove duplicates
      const locations = results
        .map((place, index) => GooglePlacesService.convertToLocation(place, index))
        .filter((location, index, array) => 
          array.findIndex(l => l.name === location.name) === index
        )
        .slice(0, 20); // Limit to 20 results

      setPlaces(locations);
    } catch (err) {
      console.error('Error fetching places:', err);
      setError('Failed to fetch places');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPlaces();
  }, [userLocation, searchQuery]);

  return { places, isLoading, error, refetch: fetchPlaces };
};
