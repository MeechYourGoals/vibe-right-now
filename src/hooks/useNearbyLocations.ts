
import { useState, useEffect } from 'react';
import { Location } from '@/types';
import { mockCities } from '@/data/mockCities';

interface Coordinates {
  lat: number;
  lng: number;
}

export const useNearbyLocations = () => {
  const [nearbyLocations, setNearbyLocations] = useState<Location[]>([]);
  const [userLocation, setUserLocation] = useState<Coordinates | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchedCity, setSearchedCity] = useState<string>("");
  const [userAddressLocation, setUserAddressLocation] = useState<Coordinates | null>(null);
  
  useEffect(() => {
    // Try to get user's current location
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
  
  useEffect(() => {
    const effectiveLocation = userAddressLocation || userLocation;
    
    if (!effectiveLocation) {
      // Return all locations from mock cities if no user location
      const allLocations = mockCities.flatMap(city => city.venues);
      setNearbyLocations(allLocations.slice(0, 20)); // Limit to 20 for performance
      return;
    }
    
    // Calculate distance and find nearby locations
    const allLocations = mockCities.flatMap(city => city.venues);
    const locationsWithDistance = allLocations.map(location => ({
      ...location,
      distance: calculateDistance(effectiveLocation.lat, effectiveLocation.lng, location.lat, location.lng)
    }));
    
    // Sort by distance and take closest 20
    const nearby = locationsWithDistance
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 20)
      .map(({ distance, ...location }) => location);
    
    setNearbyLocations(nearby);
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

// Helper function to calculate distance between two coordinates
function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c;
  return distance;
}
