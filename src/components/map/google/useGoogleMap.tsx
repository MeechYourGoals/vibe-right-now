import { useState, useCallback, useEffect } from 'react';
import { useJsApiLoader } from '@react-google-maps/api';
import { Location } from "@/types";

// Google Maps API key loaded from Vite environment variables
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export const useGoogleMap = (
  userLocation: GeolocationCoordinates | null, 
  userAddressLocation: [number, number] | null,
  locations: Location[],
  searchedCity: string,
  selectedLocation: Location | null
) => {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLE_MAPS_API_KEY
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<Location | null>(selectedLocation);
  const [mapCenter, setMapCenter] = useState({
    lat: 39.8283,
    lng: -98.5795
  });
  const [mapZoom, setMapZoom] = useState(searchedCity ? 12 : 4);

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  // Set map center based on locations
  useEffect(() => {
    if (userLocation) {
      setMapCenter({ 
        lat: userLocation.latitude, 
        lng: userLocation.longitude 
      });
    } else if (userAddressLocation) {
      setMapCenter({
        lat: userAddressLocation[1],
        lng: userAddressLocation[0]
      });
    } else if (locations.length > 0 && searchedCity) {
      setMapCenter({
        lat: locations[0].lat,
        lng: locations[0].lng
      });
      setMapZoom(12);
    }
  }, [userLocation, userAddressLocation, locations, searchedCity]);

  // Keep selectedMarker in sync with selectedLocation
  useEffect(() => {
    setSelectedMarker(selectedLocation);
  }, [selectedLocation]);

  // Method for resizing the map
  const resizeMap = useCallback(() => {
    if (map) {
      google.maps.event.trigger(map, "resize");
      
      if (userLocation) {
        map.setCenter({
          lat: userLocation.latitude,
          lng: userLocation.longitude
        });
      }
    }
  }, [map, userLocation]);

  // Expose resize method to window
  useEffect(() => {
    if (window) {
      window.resizeMap = resizeMap;
    }
    
    return () => {
      if (window) {
        delete window.resizeMap;
      }
    };
  }, [resizeMap]);

  // Handle marker click
  const handleMarkerClick = useCallback((location: Location) => {
    setSelectedMarker(location);
    
    if (map) {
      map.panTo({ lat: location.lat, lng: location.lng });
      map.setZoom(15);
    }
  }, [map]);

  return {
    isLoaded,
    loadError,
    map,
    mapCenter,
    mapZoom,
    selectedMarker,
    setSelectedMarker,
    onLoad,
    onUnmount,
    handleMarkerClick
  };
};

export default useGoogleMap;
