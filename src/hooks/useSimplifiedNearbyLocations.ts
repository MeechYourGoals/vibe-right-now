import { useState, useEffect } from 'react';
import { Location } from '@/types';
import { Coordinates, UserLocation, toCoordinates } from '@/types/coordinates';

export const useSimplifiedNearbyLocations = () => {
  const [nearbyLocations, setNearbyLocations] = useState<Location[]>([]);
  const [userLocation, setUserLocation] = useState<Coordinates | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchedCity, setSearchedCity] = useState<string>("");
  const [userAddressLocation, setUserAddressLocation] = useState<[number, number] | null>(null);
  
  useEffect(() => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords: Coordinates = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(coords);
          setLoading(false);
        },
        (error) => {
          console.log('Geolocation error:', error);
          setLoading(false);
        }
      );
    }
  }, []);
  
  // For now, we'll keep nearby locations empty since we're removing mock data
  // This will be populated later with real Google Places API data
  useEffect(() => {
    setNearbyLocations([]);
  }, [userLocation, userAddressLocation]);
  
  return {
    userLocation,
    nearbyLocations,
    loading,
    searchedCity,
    setSearchedCity,
    userAddressLocation,
    setUserAddressLocation
  };
};
