
import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';

interface MapRecenterProps {
  center: [number, number];
  zoom: number;
}

// Helper component to recenter the map based on props
const MapRecenter: React.FC<MapRecenterProps> = ({ center, zoom }) => {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  
  return null;
};

export default MapRecenter;
