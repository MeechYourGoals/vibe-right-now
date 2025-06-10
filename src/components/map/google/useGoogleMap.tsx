
import { useState, useCallback, useEffect } from 'react';
import { useJsApiLoader } from '@react-google-maps/api';
import { Location } from "@/types";
import { supabase } from "@/integrations/supabase/client";

// Global state to track if the API has been loaded
let globalApiKey: string = '';
let isApiKeyFetched = false;

export const useGoogleMap = (
  userLocation: GeolocationCoordinates | null, 
  userAddressLocation: [number, number] | null,
  locations: Location[],
  searchedCity: string,
  selectedLocation: Location | null
) => {
  const [apiKey, setApiKey] = useState<string>(globalApiKey);

  // Fetch API key from Supabase secrets only once globally
  useEffect(() => {
    const fetchApiKey = async () => {
      if (isApiKeyFetched && globalApiKey) {
        setApiKey(globalApiKey);
        return;
      }

      try {
        const { data, error } = await supabase.functions.invoke('google-places', {
          body: { action: 'get-api-key' }
        });
        
        if (!error && data?.apiKey) {
          globalApiKey = data.apiKey;
          isApiKeyFetched = true;
          setApiKey(data.apiKey);
        } else {
          console.error('Failed to fetch Google Maps API key');
        }
      } catch (err) {
        console.error('Error fetching API key:', err);
      }
    };

    fetchApiKey();
  }, []);

  // Only load the API if we have a valid API key
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
    libraries: ['maps']
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
    console.log('Map centering logic - locations:', locations.length, 'searchedCity:', searchedCity);
    
    if (locations.length > 0) {
      // If we have search results, center on them
      const firstLocation = locations[0];
      console.log('Centering map on first location:', firstLocation.name, firstLocation.lat, firstLocation.lng);
      
      setMapCenter({
        lat: firstLocation.lat,
        lng: firstLocation.lng
      });
      
      if (locations.length === 1) {
        setMapZoom(15);
      } else {
        setMapZoom(12);
      }
    } else if (userLocation) {
      console.log('Centering map on user location:', userLocation.latitude, userLocation.longitude);
      setMapCenter({ 
        lat: userLocation.latitude, 
        lng: userLocation.longitude 
      });
      setMapZoom(12);
    } else if (userAddressLocation) {
      console.log('Centering map on address location:', userAddressLocation);
      setMapCenter({
        lat: userAddressLocation[1],
        lng: userAddressLocation[0]
      });
      setMapZoom(12);
    } else {
      console.log('Using default map center');
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
    isLoaded: isLoaded && !!apiKey,
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
