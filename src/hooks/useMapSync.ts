
import { useState, useCallback, useRef } from 'react';
import { Location } from '@/types/location';

interface MapSyncState {
  center: { lat: number; lng: number };
  zoom: number;
  selectedPlace: Location | null;
  realPlaces: Location[];
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

  const updateMapCenter = useCallback((place: Location) => {
    if (!place.lat || !place.lng) return;

    const newCenter = {
      lat: place.lat,
      lng: place.lng
    };

    setMapState(prev => ({
      ...prev,
      center: newCenter,
      zoom: place.type === 'city' ? 12 : 15,
      selectedPlace: place
    }));

    // Update actual map if ref exists
    if (mapRef.current) {
      mapRef.current.setCenter(newCenter);
      mapRef.current.setZoom(place.type === 'city' ? 12 : 15);
    }
  }, []);

  const updateRealPlaces = useCallback((places: Location[]) => {
    setMapState(prev => ({
      ...prev,
      realPlaces: places
    }));
  }, []);

  const zoomToPlace = useCallback((place: Location) => {
    if (!place.lat || !place.lng || !mapRef.current) return;

    const bounds = new google.maps.LatLngBounds();
    bounds.extend({ lat: place.lat, lng: place.lng });
    
    // Add some padding around the place
    const offset = 0.01;
    bounds.extend({
      lat: place.lat + offset,
      lng: place.lng + offset
    });
    bounds.extend({
      lat: place.lat - offset,
      lng: place.lng - offset
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
