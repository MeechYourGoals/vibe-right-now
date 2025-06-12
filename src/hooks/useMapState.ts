
import { useState, useEffect, useCallback } from 'react';
import { Location } from '@/types';
import { supabase } from '@/integrations/supabase/client';

interface MapState {
  center: { lat: number; lng: number };
  zoom: number;
  selectedLocation: Location | null;
  locations: Location[];
}

export const useMapState = () => {
  const [mapState, setMapState] = useState<MapState>({
    center: { lat: 39.8283, lng: -98.5795 }, // Default center USA
    zoom: 4,
    selectedLocation: null,
    locations: []
  });

  const updateMapCenter = useCallback(async (city: string, placeId?: string) => {
    if (!city) return;

    try {
      let lat: number, lng: number;

      if (placeId) {
        // Get exact coordinates from Google Places
        const { data, error } = await supabase.functions.invoke('google-places', {
          body: {
            placeId,
            fields: ['geometry']
          }
        });

        if (error) throw error;

        if (data && data.result && data.result.geometry) {
          lat = data.result.geometry.location.lat;
          lng = data.result.geometry.location.lng;
        } else {
          throw new Error('No geometry data found');
        }
      } else {
        // Fallback: geocode the city name
        const { data, error } = await supabase.functions.invoke('google-places', {
          body: {
            query: city,
            type: 'locality'
          }
        });

        if (error) throw error;

        if (data && data.results && data.results.length > 0) {
          const result = data.results[0];
          lat = result.geometry.location.lat;
          lng = result.geometry.location.lng;
        } else {
          throw new Error('City not found');
        }
      }

      setMapState(prev => ({
        ...prev,
        center: { lat, lng },
        zoom: 12
      }));

    } catch (error) {
      console.error('Error updating map center:', error);
    }
  }, []);

  const updateLocations = useCallback((locations: Location[]) => {
    setMapState(prev => ({
      ...prev,
      locations
    }));
  }, []);

  const selectLocation = useCallback((location: Location | null) => {
    setMapState(prev => ({
      ...prev,
      selectedLocation: location,
      center: location ? { lat: location.lat, lng: location.lng } : prev.center,
      zoom: location ? 15 : prev.zoom
    }));
  }, []);

  return {
    mapState,
    updateMapCenter,
    updateLocations,
    selectLocation
  };
};
