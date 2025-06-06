import { useState, useCallback, useEffect } from 'react';
import { useJsApiLoader } from '@react-google-maps/api';
import { Location } from "@/types";

// Google Maps API key
const GOOGLE_MAPS_API_KEY = "AIzaSyAWm0vayRrQJHpMc6XcShcge52hGTt9BV4";

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
  const [mapZoom, setMapZoom] = useState(4);

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  // Set map center and zoom based on locations and search
  useEffect(() => {
    if (locations.length > 0) {
      // If we have search results, center on them
      if (locations.length === 1) {
        // Single result - center on that location
        setMapCenter({
          lat: locations[0].lat,
          lng: locations[0].lng
        });
        setMapZoom(15);
      } else {
        // Multiple results - center on the first result but zoom out to show more
        setMapCenter({
          lat: locations[0].lat,
          lng: locations[0].lng
        });
        setMapZoom(12);
      }
    } else if (userLocation) {
      // No search results but have user location
      setMapCenter({ 
        lat: userLocation.latitude, 
        lng: userLocation.longitude 
      });
      setMapZoom(12);
    } else if (userAddressLocation) {
      // Use address location
      setMapCenter({
        lat: userAddressLocation[1],
        lng: userAddressLocation[0]
      });
      setMapZoom(12);
    } else if (searchedCity) {
      // Keep existing zoom for city search without results
      setMapZoom(12);
    } else {
      // Default view
      setMapCenter({
        lat: 39.8283,
        lng: -98.5795
      });
      setMapZoom(4);
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
      
      // Re-center based on current state
      if (locations.length > 0) {
        map.setCenter({
          lat: locations[0].lat,
          lng: locations[0].lng
        });
      } else if (userLocation) {
        map.setCenter({
          lat: userLocation.latitude,
          lng: userLocation.longitude
        });
      }
    }
  }, [map, userLocation, locations]);

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
