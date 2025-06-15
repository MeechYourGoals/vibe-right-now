import { useState, useEffect } from "react";
import { mockCitiesData, findCityByName } from "@/data/mockCities";
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
          setLoading(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setLoading(false);
        },
        { enableHighAccuracy: true }
      );
    } else {
      setLoading(false);
    }
  }, []);

  // Update venues to show based on searched city or location/address
  useEffect(() => {
    setLoading(true);

    // If city search is present, show venues for that city
    if (searchedCity?.trim()) {
      // Try to find a matching city (case insensitive)
      const cityData = findCityByName(searchedCity.trim());
      if (cityData && cityData.venues.length > 0) {
        setNearbyLocations(cityData.venues);
        setLoading(false);
        return;
      }
    }

    // If user typed in a lat/lng address, could add geocoding support here
    if (userAddressLocation) {
      // Just show all venues sorted by distance (optional future)
      const locations: Location[] = [];
      mockCitiesData.forEach((city) => {
        locations.push(...city.venues);
      });
      setNearbyLocations(locations.slice(0, 10));
      setLoading(false);
      return;
    }

    // If using actual geolocation, show all venues (default)
    if (userLocation) {
      const locations: Location[] = [];
      mockCitiesData.forEach((city) => {
        locations.push(...city.venues);
      });
      setNearbyLocations(locations.slice(0, 10));
      setLoading(false);
      return;
    }

    // Fallback: show first 10 venues in data set
    const fallbackVenues: Location[] = [];
    mockCitiesData.forEach((city) => fallbackVenues.push(...city.venues));
    setNearbyLocations(fallbackVenues.slice(0, 10));
    setLoading(false);
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
