
import { useState, useEffect } from "react";
import { Location } from "@/types";
import { usePlacesSearch } from "./usePlacesSearch";
import { toast } from "sonner";

export const useNearbyLocations = () => {
  const [userLocation, setUserLocation] = useState<GeolocationCoordinates | null>(null);
  const [searchedCity, setSearchedCity] = useState("");
  const [userAddressLocation, setUserAddressLocation] = useState<[number, number] | null>(null);
  
  const { places, isLoading, searchPlaces, getNearbyPlaces, clearPlaces } = usePlacesSearch();

  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation(position.coords);
          // Get nearby places when location is available
          getNearbyPlaces(
            { 
              lat: position.coords.latitude, 
              lng: position.coords.longitude 
            },
            10000 // 10km radius
          );
        },
        (error) => {
          console.error("Error getting location:", error);
          toast.error("Unable to get your location. Please enable location services.");
        }
      );
    }
  }, [getNearbyPlaces]);

  // Search for places when city changes
  useEffect(() => {
    if (searchedCity && searchedCity.trim() !== "") {
      searchPlaces({
        query: searchedCity,
        location: userLocation ? {
          lat: userLocation.latitude,
          lng: userLocation.longitude
        } : undefined
      });
    } else if (!searchedCity) {
      // If no city is searched, show nearby places
      if (userLocation) {
        getNearbyPlaces(
          { 
            lat: userLocation.latitude, 
            lng: userLocation.longitude 
          },
          10000
        );
      }
    }
  }, [searchedCity, userLocation, searchPlaces, getNearbyPlaces]);

  return {
    userLocation,
    nearbyLocations: places,
    loading: isLoading,
    searchedCity,
    setSearchedCity,
    userAddressLocation,
    setUserAddressLocation,
    clearPlaces
  };
};
