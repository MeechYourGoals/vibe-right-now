
import { useState, useEffect } from 'react';
import { Location, Coordinates } from '@/types';
import { locationsRepo } from '@/services/data';

/**
 * Nearby venues sourced through `locationsRepo.nearby` (Supabase with mock fallback).
 * A searched city is resolved via `locationsRepo.byCity`. Works with zero API keys.
 */
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
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      try {
        let results: Location[];
        if (searchedCity && searchedCity.trim()) {
          results = await locationsRepo.byCity(searchedCity.trim());
        } else {
          const effective = userAddressLocation || userLocation;
          results = await locationsRepo.nearby(effective?.lat ?? 0, effective?.lng ?? 0);
        }
        if (!cancelled) setNearbyLocations(results.slice(0, 20));
      } catch (err) {
        console.error('Error loading nearby locations:', err);
        if (!cancelled) setNearbyLocations([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [userLocation, userAddressLocation, searchedCity]);

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
