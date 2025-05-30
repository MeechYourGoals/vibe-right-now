
import { useState, useEffect } from "react";
import { mockLocations } from "@/mock/locations";
import { Location } from "@/types";
import { cityCoordinates } from "@/utils/locations";
import { getLocationsByCity, getNearbyLocations } from "@/mock/cityLocations";

// Improved version that uses city data
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

  // Update locations when city search or user location changes
  useEffect(() => {
    if (searchedCity) {
      // If we have a city search, prioritize that
      const cityKey = Object.keys(cityCoordinates).find(
        key => cityCoordinates[key].name.toLowerCase() === searchedCity.toLowerCase()
      );
      
      if (cityKey) {
        const cityData = cityCoordinates[cityKey];
        // Get locations for the searched city
        const cityLocations = getLocationsByCity(cityData.name);
        setNearbyLocations(cityLocations);
        setLoading(false);
      } else {
        // Fallback for cities not in our database
        setNearbyLocations(mockLocations.slice(0, 10));
        setLoading(false);
      }
    } else if (userAddressLocation) {
      // If we have a custom address location but no city search
      const [lng, lat] = userAddressLocation;
      const nearbyLocs = getNearbyLocations(lat, lng);
      setNearbyLocations(nearbyLocs);
      setLoading(false);
    } else if (userLocation) {
      // Use actual user location if available and no city search
      const nearbyLocs = getNearbyLocations(userLocation.latitude, userLocation.longitude);
      setNearbyLocations(nearbyLocs);
      setLoading(false);
    } else {
      // Default to some sample locations if nothing else is available
      setNearbyLocations(mockLocations.slice(0, 10));
      setLoading(false);
    }
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
