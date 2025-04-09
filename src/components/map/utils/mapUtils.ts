
import L from 'leaflet';
import { Location } from '@/types';

// Calculate distance between two coordinates
export const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers
  return distance * 0.621371; // Convert to miles
};

// Helper function to share a venue
export const shareVenue = async (location: Location) => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: `Check out ${location.name} on Vibe Right Now!`,
        text: `I found ${location.name} in ${location.city} on Vibe Right Now and thought you might be interested!`,
        url: `${window.location.origin}/venue/${location.id}`
      });
      return { success: true, message: "Shared successfully!" };
    } catch (error) {
      console.error('Error sharing:', error);
      return { success: false, message: "Couldn't share. Try copying the link instead." };
    }
  } else {
    // Fallback for browsers that don't support navigator.share
    try {
      const url = `${window.location.origin}/venue/${location.id}`;
      await navigator.clipboard.writeText(url);
      return { success: true, message: "Link copied to clipboard!" };
    } catch (error) {
      return { success: false, message: "Couldn't copy link. Please try again." };
    }
  }
};

// Create custom icon factory for locations
export const createCustomIcon = (type: string, isSelected: boolean, isHovered: boolean) => {
  // Determine color based on location type
  let markerColor = "#6b66ff"; // Default blue for generic locations
  if (type === 'restaurant') markerColor = "#ff6b6b"; // Red for restaurants
  else if (type === 'bar') markerColor = "#6b66ff"; // Blue for bars
  else if (type === 'sports') markerColor = "#66ff6b"; // Green for sports
  else if (type === 'event' || type === 'attraction') markerColor = "#ffbb66"; // Orange for events/attractions
  
  // Modify size and shadow for selected or hovered markers
  const size = isSelected || isHovered ? 32 : 28;
  const iconUrl = `data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="${markerColor}" stroke="%23FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"%3E%3Cpath d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"%3E%3C/path%3E%3Ccircle cx="12" cy="10" r="3"%3E%3C/circle%3E%3C/svg%3E`;
  
  return new L.Icon({
    iconUrl: iconUrl,
    iconSize: [size, size],
    iconAnchor: [size/2, size],
    popupAnchor: [0, -size],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    shadowSize: [41, 41],
    shadowAnchor: [12, 41]
  });
};

// Custom icon for the user's location
export const createUserIcon = () => {
  return new L.Icon({
    iconUrl: `data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="%239b87f5" stroke="%23FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"%3E%3Ccircle cx="12" cy="12" r="10"%3E%3C/circle%3E%3Ccircle cx="12" cy="12" r="3"%3E%3C/circle%3E%3C/svg%3E`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    shadowSize: [41, 41],
    shadowAnchor: [12, 41]
  });
};

export const getMapTiles = (mapStyle: "default" | "terrain" | "satellite") => {
  let tileLayerUrl = 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';
  let tileLayerAttribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';
  
  if (mapStyle === 'terrain') {
    tileLayerUrl = 'https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.png';
    tileLayerAttribution = 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
  } else if (mapStyle === 'satellite') {
    tileLayerUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
    tileLayerAttribution = 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community';
  }

  return { tileLayerUrl, tileLayerAttribution };
};
