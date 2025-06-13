
import { useState, useCallback, useRef } from 'react';
import { Location } from '@/types';

interface MapSyncState {
  center: { lat: number; lng: number };
  zoom: number;
  selectedPlace: google.maps.places.PlaceResult | null;
  realPlaces: google.maps.places.PlaceResult[];
}

export const useMapSync = () => {
  const [mapState, setMapState] = useState<MapSyncState>({
    center: { lat: 39.8283, lng: -98.5795 },
    zoom: 4,
    selectedPlace: null,
    realPlaces: []
  });

  const mapRef = useRef<google.maps.Map | null>(null);

  const setMapRef = useCallback((map: google.maps.Map | null) => {
    mapRef.current = map;
  }, []);

  const updateMapCenter = useCallback((place: google.maps.places.PlaceResult) => {
    if (!place.geometry?.location) return;

    const newCenter = {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng()
    };

    setMapState(prev => ({
      ...prev,
      center: newCenter,
      zoom: place.types?.includes('locality') ? 12 : 15,
      selectedPlace: place
    }));

    // Update actual map if ref exists
    if (mapRef.current) {
      mapRef.current.setCenter(newCenter);
      mapRef.current.setZoom(place.types?.includes('locality') ? 12 : 15);
    }
  }, []);

  const updateRealPlaces = useCallback((places: google.maps.places.PlaceResult[]) => {
    setMapState(prev => ({
      ...prev,
      realPlaces: places
    }));
  }, []);

  const zoomToPlace = useCallback((place: google.maps.places.PlaceResult) => {
    if (!place.geometry?.location || !mapRef.current) return;

    const bounds = new google.maps.LatLngBounds();
    bounds.extend(place.geometry.location);
    
    // Add some padding around the place
    const offset = 0.01;
    bounds.extend({
      lat: place.geometry.location.lat() + offset,
      lng: place.geometry.location.lng() + offset
    });
    bounds.extend({
      lat: place.geometry.location.lat() - offset,
      lng: place.geometry.location.lng() - offset
    });

    mapRef.current.fitBounds(bounds);
    
    setMapState(prev => ({
      ...prev,
      selectedPlace: place
    }));
  }, []);

  return {
    mapState,
    setMapRef,
    updateMapCenter,
    updateRealPlaces,
    zoomToPlace
  };
};
