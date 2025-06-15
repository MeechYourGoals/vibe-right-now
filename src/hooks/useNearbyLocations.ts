
import { useState, useEffect } from "react";
import { mockCitiesData } from "@/data/mockCities";
import { Location } from "@/types";

// Hook to display venues based on city search or user location
export const useNearbyLocations = () => {
  const [userLocation, setUserLocation] = useState<GeolocationCoordinates | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchedCity, setSearchedCity] = useState<string>("");
  const [nearbyLocations, setNearbyLocations] = useState<Location[]>([]);
  const [userAddressLocation, setUserAddressLocation] = useState<[number, number] | null>(null);

  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation(position.coords);
        },
        (error) => {
          console.error("Error getting location:", error);
        },
        { enableHighAccuracy: true }
      );
    }
  }, []);

  // Load ALL venues from all cities once on mount.
  // This ensures all markers are always present on the map.
  useEffect(() => {
    setLoading(true);
    const allVenues: Location[] = [];
    mockCitiesData.forEach((city) => {
      allVenues.push(...city.venues);
    });
    setNearbyLocations(allVenues);
    setLoading(false);
  }, []); // Empty dependency array ensures this runs only once.

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
