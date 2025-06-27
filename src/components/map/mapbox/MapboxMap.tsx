
import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Location } from "@/types";
import { getMapboxStyle, getMarkerStyles } from './MapboxStyles';
import { createLocationMarker, createUserMarker } from './MapboxMarker';
import { getReferencePoint } from '../common/DistanceCalculator';

// Temporary Mapbox token - in production, this should be stored in environment variables
const MAPBOX_TOKEN = 'pk.eyJ1IjoiZXhhbXBsZXVzZXIiLCJhIjoiY2xyMXp5eWJoMDJ1bTJpcGV3ZXRiZms5dCJ9.hMHS6RL9nNpwqMYlXn8l5A';
mapboxgl.accessToken = MAPBOX_TOKEN;

interface MapboxMapProps {
  userLocation: GeolocationCoordinates | null;
  locations: Location[];
  searchedCity: string;
  mapStyle: "default" | "terrain" | "satellite";
  onLocationSelect: (location: Location) => void;
  showDistances?: boolean;
  userAddressLocation?: [number, number] | null;
}

export interface MapboxMapHandle {
  resize: () => void;
}

const MapboxMap = forwardRef<MapboxMapHandle, MapboxMapProps>(({ 
  userLocation,
  locations,
  searchedCity,
  mapStyle,
  onLocationSelect,
  showDistances = false,
  userAddressLocation = null
}: MapboxMapProps, ref) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const styleRef = useRef<HTMLStyleElement | null>(null);
  
  // Initialize map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    
    const defaultLat = userLocation?.latitude || 39.8283;
    const defaultLng = userLocation?.longitude || -98.5795;
    
    // Create new map
    const newMap = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: getMapboxStyle(mapStyle),
      center: [defaultLng, defaultLat],
      zoom: searchedCity ? 12 : 4,
      projection: 'mercator'
    });
    
    // Add navigation controls
    newMap.addControl(new mapboxgl.NavigationControl(), 'top-right');
    
    // Add CSS for marker animations
    styleRef.current = document.createElement('style');
    styleRef.current.innerHTML = getMarkerStyles();
    document.head.appendChild(styleRef.current);
    
    // Set up map on load
    newMap.on('load', () => {
      setIsLoaded(true);
    });
    
    mapRef.current = newMap;
    
    // Cleanup function
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
      // Clear all markers
      markersRef.current.forEach(marker => marker.remove());
      markersRef.current = [];
      
      // Remove style element
      if (styleRef.current) {
        document.head.removeChild(styleRef.current);
      }
    };
  }, []);

  // Update map when style changes
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setStyle(getMapboxStyle(mapStyle));
    }
  }, [mapStyle]);
  
  // Update markers when locations or display options change
  useEffect(() => {
    if (mapRef.current && isLoaded && locations.length > 0) {
      addMarkersToMap();
    }
  }, [locations, isLoaded, showDistances, userAddressLocation]);
  
  // Method to resize map (exposed for parent component)
  const resizeMap = () => {
    if (mapRef.current) {
      setTimeout(() => {
        mapRef.current?.resize();
        
        // Re-center the map if user location is available
        if (userLocation) {
          mapRef.current?.setCenter([userLocation.longitude, userLocation.latitude]);
        }
      }, 100);
    }
  };

  useImperativeHandle(ref, () => ({
    resize: resizeMap
  }), [resizeMap]);
  
  // Add markers to map
  const addMarkersToMap = () => {
    if (!mapRef.current) return;
    
    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];
    
    // Get reference point for distance calculation
    const referencePoint = getReferencePoint(userAddressLocation, userLocation);
    
    // Add location markers
    const newMarkers = locations.map((location, index) => {
      return createLocationMarker({
        location,
        map: mapRef.current!,
        index,
        onLocationSelect,
        showDistances,
        referencePoint
      });
    });
    
    // Add user location marker if available
    if (userLocation) {
      newMarkers.push(
        createUserMarker(
          [userLocation.longitude, userLocation.latitude],
          mapRef.current
        )
      );
    }
    
    // Add user address location marker if provided
    if (userAddressLocation) {
      newMarkers.push(
        createUserMarker(
          userAddressLocation,
          mapRef.current,
          '#F97316'
        )
      );
    }
    
    // Store markers for later cleanup
    markersRef.current = newMarkers;
  };

  return (
    <div ref={mapContainerRef} className="h-full w-full" />
  );
});

export default MapboxMap;
