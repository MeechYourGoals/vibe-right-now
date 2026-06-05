import { useState, useEffect } from 'react';
import { Location } from '@/types';
import { Coordinates } from '@/types/coordinates';
import { locationsRepo } from '@/services/data';

/**
 * Provides nearby venues for the Explore map. Data is sourced through `locationsRepo`
 * (Supabase with automatic mock fallback): a searched city uses `byCity`, otherwise we
 * fall back to `nearby` around the user's coordinates. Works with zero API keys.
 */
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
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setLoading(false);
        },
        (error) => {
          console.log('Geolocation error:', error);
          setLoading(false);
        }
      );
    }
  }, []);

  // Load venues whenever the searched city, user location, or address changes.
  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      try {
        let results: Location[];
        if (searchedCity && searchedCity.trim()) {
          results = await locationsRepo.byCity(searchedCity.trim());
        } else {
          const lat = userAddressLocation ? userAddressLocation[1] : userLocation?.lat ?? 0;
          const lng = userAddressLocation ? userAddressLocation[0] : userLocation?.lng ?? 0;
          results = await locationsRepo.nearby(lat, lng);
        }
        if (!cancelled) {
          setNearbyLocations(results.filter((l) => l.lat && l.lng));
        }
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
  }, [searchedCity, userLocation, userAddressLocation]);

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
