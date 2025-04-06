
import { useState, useEffect } from "react";
import { Location } from "@/types";
import { filterLocationsByDistance } from "@/utils/locationUtils";
import { mockLocations } from "@/mock/locations";

export function useNearbyLocations() {
  const [userLocation, setUserLocation] = useState<GeolocationCoordinates | null>(null);
  const [nearbyLocations, setNearbyLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchedCity, setSearchedCity] = useState("");
  const [userAddressLocation, setUserAddressLocation] = useState<[number, number] | null>(null);
  
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation(position.coords);
          
          const nearbyVenues = filterLocationsByDistance(
            mockLocations,
            position.coords.latitude,
            position.coords.longitude,
            10
          );
          
          setNearbyLocations(nearbyVenues);
          setLoading(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setNearbyLocations(mockLocations);
          setLoading(false);
        }
      );
    } else {
      setNearbyLocations(mockLocations);
      setLoading(false);
    }
  }, []);
  
  return {
    userLocation,
    nearbyLocations,
    loading,
    searchedCity,
    setSearchedCity,
    userAddressLocation,
    setUserAddressLocation
  };
}
