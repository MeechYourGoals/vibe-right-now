
import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Location } from '@/types';
import { cityCoordinates } from '@/utils/locations/cityDatabase';
import CityMarkers from './city-markers/CityMarkers';
import { Button } from '@/components/ui/button';
import { Share2 } from 'lucide-react';
import { toast } from 'sonner';

// Define the component properties
interface OpenStreetMapProps {
  userLocation: GeolocationCoordinates | null;
  locations: Location[];
  searchedCity: string;
  mapStyle: "default" | "terrain" | "satellite";
  onLocationSelect: (location: Location) => void;
  selectedLocation?: Location | null;
  showDistances?: boolean;
  userAddressLocation?: [number, number] | null;
  showAllCities?: boolean;
}

// Function to calculate distance between two coordinates
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
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
const shareVenue = (location: Location) => {
  if (navigator.share) {
    navigator.share({
      title: `Check out ${location.name} on Vibe Right Now!`,
      text: `I found ${location.name} in ${location.city} on Vibe Right Now and thought you might be interested!`,
      url: `${window.location.origin}/venue/${location.id}`
    })
    .then(() => toast.success("Shared successfully!"))
    .catch((error) => {
      console.error('Error sharing:', error);
      toast.error("Couldn't share. Try copying the link instead.");
    });
  } else {
    // Fallback for browsers that don't support navigator.share
    const url = `${window.location.origin}/venue/${location.id}`;
    navigator.clipboard.writeText(url)
      .then(() => toast.success("Link copied to clipboard!"))
      .catch(() => toast.error("Couldn't copy link. Please try again."));
  }
};

// Helper component to recenter the map based on props
function MapRecenter({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

// Main OpenStreetMap component
const OpenStreetMap: React.FC<OpenStreetMapProps> = ({
  userLocation,
  locations,
  searchedCity,
  mapStyle,
  selectedLocation = null, // Default value
  onLocationSelect,
  showDistances = false,
  userAddressLocation = null, // Default value
  showAllCities = true
}) => {
  // State for hover effects on markers
  const [hoveredLocationId, setHoveredLocationId] = useState<string | null>(null);
  
  // Determine map center based on available location data
  let mapCenter: [number, number] = [34.0522, -118.2437]; // Default to Los Angeles
  let zoom = 10;

  if (userLocation) {
    mapCenter = [userLocation.latitude, userLocation.longitude];
    zoom = 12;
  } else if (userAddressLocation) {
    mapCenter = userAddressLocation;
    zoom = 12;
  } else if (searchedCity && cityCoordinates[searchedCity.toLowerCase()]) {
    const city = cityCoordinates[searchedCity.toLowerCase()];
    mapCenter = [city.lat, city.lng];
    zoom = 12;
  }

  // Determine the tile layer URL based on the selected map style
  let tileLayerUrl = 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';
  let tileLayerAttribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';
  
  if (mapStyle === 'terrain') {
    tileLayerUrl = 'https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.png';
    tileLayerAttribution = 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
  } else if (mapStyle === 'satellite') {
    tileLayerUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
    tileLayerAttribution = 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community';
  }

  // Create custom icon factory for locations
  const createCustomIcon = (type: string, isSelected: boolean, isHovered: boolean) => {
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
  const userIcon = new L.Icon({
    iconUrl: `data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="%239b87f5" stroke="%23FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"%3E%3Ccircle cx="12" cy="12" r="10"%3E%3C/circle%3E%3Ccircle cx="12" cy="12" r="3"%3E%3C/circle%3E%3C/svg%3E`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    shadowSize: [41, 41],
    shadowAnchor: [12, 41]
  });

  return (
    <MapContainer
      style={{ 
        height: "100%", 
        width: "100%", 
        borderRadius: "0.5rem",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
      }}
      center={mapCenter}
      zoom={zoom}
      scrollWheelZoom={false}
      zoomControl={false} // We'll add custom-positioned zoom controls
    >
      <TileLayer
        attribution={tileLayerAttribution}
        url={tileLayerUrl}
      />
      
      {/* Add zoom control to bottom right */}
      <div className="leaflet-bottom leaflet-right">
        <div className="leaflet-control-zoom leaflet-bar leaflet-control" style={{margin: "10px"}}>
          <a className="leaflet-control-zoom-in" href="#" title="Zoom in" role="button" aria-label="Zoom in"></a>
          <a className="leaflet-control-zoom-out" href="#" title="Zoom out" role="button" aria-label="Zoom out"></a>
        </div>
      </div>
      
      <MapRecenter center={mapCenter} zoom={zoom} />

      {/* Show city markers if showAllCities is true and no specific city is searched */}
      {showAllCities && !searchedCity && (
        <CityMarkers />
      )}

      {/* User location marker */}
      {userLocation && (
        <Marker position={[userLocation.latitude, userLocation.longitude]} icon={userIcon}>
          <Popup className="custom-popup">
            <div className="px-1 py-1">
              <p className="font-medium text-center">You are here</p>
            </div>
          </Popup>
        </Marker>
      )}

      {/* Location markers */}
      {locations.map((location) => {
        const isSelected = selectedLocation?.id === location.id;
        const isHovered = hoveredLocationId === location.id;
        const icon = createCustomIcon(location.type, isSelected, isHovered);
        
        let distance: number | null = null;
        if (showDistances && userLocation) {
          distance = calculateDistance(
            userLocation.latitude,
            userLocation.longitude,
            location.lat,
            location.lng
          );
        } else if (showDistances && userAddressLocation) {
          distance = calculateDistance(
            userAddressLocation[0],
            userAddressLocation[1],
            location.lat,
            location.lng
          );
        }
        
        return (
          <Marker
            key={location.id}
            position={[location.lat, location.lng]}
            icon={icon}
            eventHandlers={{
              click: () => {
                onLocationSelect(location);
              },
              mouseover: () => setHoveredLocationId(location.id),
              mouseout: () => setHoveredLocationId(null)
            }}
          >
            <Popup className="custom-popup">
              <div className="p-1">
                <h3 className="font-semibold text-base">{location.name}</h3>
                <p className="text-sm text-muted-foreground">{location.address}, {location.city}</p>
                {distance !== null && (
                  <p className="text-sm mt-1 font-medium">
                    <span className="inline-block px-2 py-0.5 bg-primary/10 text-primary rounded-full">
                      {distance.toFixed(1)} miles away
                    </span>
                  </p>
                )}
                <div className="flex gap-2 mt-3">
                  <Button
                    size="sm"
                    className="flex-1 bg-primary hover:bg-primary/90"
                    onClick={() => window.location.href = `/venue/${location.id}`}
                  >
                    View Venue
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="px-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      shareVenue(location);
                    }}
                    title="Share this venue"
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Popup>
          </Marker>
        );
      })}

      {/* Add global styles for Leaflet customization */}
      <style jsx global>{`
        .leaflet-container {
          font-family: var(--font-sans);
        }
        
        .custom-popup .leaflet-popup-content-wrapper {
          border-radius: 0.5rem;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }
        
        .custom-popup .leaflet-popup-content {
          margin: 0.5rem;
          min-width: 200px;
        }
        
        .custom-popup .leaflet-popup-tip {
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }
        
        .leaflet-control-zoom a {
          background-color: white;
          color: #333;
          border: 1px solid rgba(0,0,0,0.2);
          font-size: 18px;
          height: 30px;
          width: 30px;
          line-height: 30px;
          border-radius: 4px;
          margin-bottom: 5px;
        }
        
        .leaflet-control-zoom a:hover {
          background-color: #f4f4f5;
        }
      `}</style>
    </MapContainer>
  );
};

export default OpenStreetMap;
