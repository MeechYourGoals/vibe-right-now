
import { useState, useEffect } from 'react';
import { Location } from '@/types';
import { GeoCoordinates } from '@/types';
import { getNearbyLocations } from '@/mock/cityLocations';

interface UseNearbyLocationsReturn {
  userLocation: GeolocationCoordinates | null;
  nearbyLocations: Location[];
  loading: boolean;
  searchedCity: string;
  setSearchedCity: (city: string) => void;
  userAddressLocation: GeoCoordinates | null;
  setUserAddressLocation: (coords: GeoCoordinates | null) => void;
  locations: Location[];
  isLoading: boolean;
}

export const useNearbyLocations = (coordinates?: GeoCoordinates): UseNearbyLocationsReturn => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userLocation, setUserLocation] = useState<GeolocationCoordinates | null>(null);
  const [nearbyLocations, setNearbyLocations] = useState<Location[]>([]);
  const [searchedCity, setSearchedCity] = useState('');
  const [userAddressLocation, setUserAddressLocation] = useState<GeoCoordinates | null>(null);

  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation(position.coords);
          const nearby = getNearbyLocations(position.coords.latitude, position.coords.longitude);
          setNearbyLocations(nearby);
          setLocations(nearby);
        },
        (error) => {
          console.error("Error getting location:", error);
          const defaultLocations = getNearbyLocations(34.0522, -118.2437);
          setNearbyLocations(defaultLocations);
          setLocations(defaultLocations);
        }
      );
    }
  }, []);

  useEffect(() => {
    if (!coordinates) return;

    setIsLoading(true);
    // Mock implementation - replace with actual API call
    setTimeout(() => {
      const nearby = getNearbyLocations(coordinates.lat, coordinates.lng);
      setLocations(nearby);
      setNearbyLocations(nearby);
      setIsLoading(false);
    }, 1000);
  }, [coordinates]);

  return {
    userLocation,
    nearbyLocations,
    loading: isLoading,
    searchedCity,
    setSearchedCity,
    userAddressLocation,
    setUserAddressLocation,
    locations,
    isLoading
  };
};
