
import { useEffect, useRef, useState } from "react";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Location } from "@/types";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Navigation, Pin } from "lucide-react";

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

const MapboxMap = ({ 
  userLocation, 
  locations, 
  searchedCity, 
  mapStyle,
  onLocationSelect,
  showDistances = false,
  userAddressLocation = null
}: MapboxMapProps) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Initialize map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    
    const defaultLat = userLocation?.latitude || 39.8283;
    const defaultLng = userLocation?.longitude || -98.5795;
    
    // Create new map
    const newMap = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: mapStyle === 'satellite' 
        ? 'mapbox://styles/mapbox/satellite-streets-v12'
        : mapStyle === 'terrain' 
          ? 'mapbox://styles/mapbox/outdoors-v12' 
          : 'mapbox://styles/mapbox/streets-v12',
      center: [defaultLng, defaultLat],
      zoom: searchedCity ? 12 : 4,
      projection: 'mercator'
    });
    
    // Add navigation controls
    newMap.addControl(new mapboxgl.NavigationControl(), 'top-right');
    
    // Add markers for locations
    newMap.on('load', () => {
      setIsLoaded(true);
      
      // Add markers
      if (locations.length > 0) {
        addMarkersToMap(newMap, locations);
      }
      
      // Add user location marker
      if (userLocation) {
        new mapboxgl.Marker({ color: '#FF9900' })
          .setLngLat([userLocation.longitude, userLocation.latitude])
          .addTo(newMap);
      }
      
      // Add user address location marker if provided
      if (userAddressLocation) {
        new mapboxgl.Marker({ color: '#F97316' })
          .setLngLat(userAddressLocation)
          .addTo(newMap);
      }
    });
    
    mapRef.current = newMap;

    // Add CSS for marker animations
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes pulse {
        0% { transform: translate(-5px, -5px) scale(1); opacity: 1; }
        100% { transform: translate(-5px, -5px) scale(1.5); opacity: 0; }
      }
      
      .location-marker-container {
        position: relative;
        width: 20px;
        height: 20px;
      }
      
      .location-marker-label {
        position: absolute;
        bottom: -24px;
        left: 50%;
        transform: translateX(-50%);
        white-space: nowrap;
        background-color: rgba(0, 0, 0, 0.7);
        color: white;
        padding: 2px 5px;
        border-radius: 4px;
        font-size: 11px;
        pointer-events: none;
      }
      
      .location-marker-name {
        position: absolute;
        top: -24px;
        left: 50%;
        transform: translateX(-50%);
        white-space: nowrap;
        background-color: rgba(var(--primary), 0.8);
        color: white;
        padding: 2px 5px;
        border-radius: 4px;
        font-size: 11px;
        pointer-events: none;
      }
    `;
    document.head.appendChild(style);
    
    // Cleanup function
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
      // Clear all markers
      markersRef.current.forEach(marker => marker.remove());
      markersRef.current = [];
      document.head.removeChild(style);
    };
  }, []);

  // Update map when style changes
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setStyle(
        mapStyle === 'satellite' 
          ? 'mapbox://styles/mapbox/satellite-streets-v12'
          : mapStyle === 'terrain' 
            ? 'mapbox://styles/mapbox/outdoors-v12' 
            : 'mapbox://styles/mapbox/streets-v12'
      );
    }
  }, [mapStyle]);
  
  // Calculate distance between two points in miles
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 3958.8; // Earth's radius in miles
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    
    return distance < 1 ? `${(distance * 10).toFixed(1)} mi` : `${distance.toFixed(1)} mi`;
  };
  
  // Add markers to map
  const addMarkersToMap = (map: mapboxgl.Map, locations: Location[]) => {
    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];
    
    // Reference point for distance calculation (either userAddressLocation or userLocation)
    const referencePoint = userAddressLocation 
      ? { lat: userAddressLocation[1], lng: userAddressLocation[0] }
      : userLocation 
        ? { lat: userLocation.latitude, lng: userLocation.longitude }
        : null;
    
    locations.forEach((loc, index) => {
      // Create container for marker and labels
      const container = document.createElement('div');
      container.className = 'location-marker-container';
      
      // Create marker element
      const el = document.createElement('div');
      el.className = 'location-marker';
      el.style.width = '20px';
      el.style.height = '20px';
      el.style.borderRadius = '50%';
      el.style.backgroundColor = 'rgba(var(--primary), 0.9)';
      el.style.border = '2px solid white';
      el.style.cursor = 'pointer';
      container.appendChild(el);
      
      // Create a pulse effect element
      const pulse = document.createElement('div');
      pulse.className = 'location-marker-pulse';
      pulse.style.position = 'absolute';
      pulse.style.width = '30px';
      pulse.style.height = '30px';
      pulse.style.borderRadius = '50%';
      pulse.style.backgroundColor = 'rgba(var(--primary), 0.2)';
      pulse.style.border = '1px solid rgba(var(--primary), 0.3)';
      pulse.style.transform = 'translate(-5px, -5px)';
      pulse.style.animation = 'pulse 2s infinite';
      pulse.style.animationDelay = `${index * 0.1}s`;
      el.appendChild(pulse);
      
      // Add venue name above marker if showDistances is enabled
      if (showDistances) {
        const nameLabel = document.createElement('div');
        nameLabel.className = 'location-marker-name';
        nameLabel.textContent = loc.name;
        container.appendChild(nameLabel);
      }
      
      // Add distance label below marker if showDistances is enabled and we have a reference point
      if (showDistances && referencePoint) {
        const distanceLabel = document.createElement('div');
        distanceLabel.className = 'location-marker-label';
        const distance = calculateDistance(
          referencePoint.lat, 
          referencePoint.lng, 
          loc.lat, 
          loc.lng
        );
        distanceLabel.textContent = `${distance} Away`;
        container.appendChild(distanceLabel);
      }
      
      // Create and add marker
      const marker = new mapboxgl.Marker(container)
        .setLngLat([loc.lng, loc.lat])
        .addTo(map);
      
      // Add popup on hover
      const popup = new mapboxgl.Popup({ offset: 25, closeButton: false, closeOnClick: false })
        .setHTML(`
          <div style="padding: 8px;">
            <div style="font-weight: bold;">${loc.name}</div>
            <div style="font-size: 12px; color: #666;">${loc.type} in ${loc.city}</div>
          </div>
        `);
      
      // Show popup on hover
      el.addEventListener('mouseenter', () => {
        marker.setPopup(popup);
        popup.addTo(map);
      });
      
      // Hide popup on leave
      el.addEventListener('mouseleave', () => {
        popup.remove();
      });
      
      // Handle click on marker
      el.addEventListener('click', () => {
        onLocationSelect(loc);
        
        // Fly to location
        map.flyTo({
          center: [loc.lng, loc.lat],
          zoom: 15,
          speed: 1.2,
          curve: 1,
          essential: true
        });
      });
      
      // Store marker for later cleanup
      markersRef.current.push(marker);
    });
  };

  // Update markers when locations change
  useEffect(() => {
    if (mapRef.current && isLoaded && locations.length > 0) {
      addMarkersToMap(mapRef.current, locations);
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

  // Expose resize method to parent
  useEffect(() => {
    if (window && mapRef.current) {
      window.resizeMap = resizeMap;
    }
    
    return () => {
      if (window) {
        delete window.resizeMap;
      }
    };
  }, [mapRef.current]);

  return (
    <div ref={mapContainerRef} className="h-full w-full" />
  );
};

export default MapboxMap;
