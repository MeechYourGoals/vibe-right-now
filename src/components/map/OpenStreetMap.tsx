
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Location } from '@/types';
import { cityCoordinates } from '@/utils/locations/cityDatabase';
import CityMarkers from './city-markers/CityMarkers';
import MapRecenter from './components/MapRecenter';
import UserLocationMarker from './components/UserLocationMarker';
import LocationMarker from './components/LocationMarker';
import MapStyles from './components/MapStyles';
import { getMapTiles } from './utils/mapUtils';

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

  // Get the tile layer details based on the selected map style
  const { tileLayerUrl, tileLayerAttribution } = getMapTiles(mapStyle);

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
    >
      <TileLayer
        attribution={tileLayerAttribution}
        url={tileLayerUrl}
      />
      
      {/* Add zoom control to bottom right */}
      <ZoomControl position="bottomright" />
      
      <MapRecenter center={mapCenter} zoom={zoom} />

      {/* Show city markers if showAllCities is true and no specific city is searched */}
      {showAllCities && !searchedCity && (
        <CityMarkers />
      )}

      {/* User location marker */}
      {userLocation && (
        <UserLocationMarker userLocation={userLocation} />
      )}

      {/* Location markers */}
      {locations.map((location) => (
        <LocationMarker
          key={location.id}
          location={location}
          isSelected={selectedLocation?.id === location.id}
          userLocation={userLocation}
          userAddressLocation={userAddressLocation}
          showDistances={showDistances}
          onLocationSelect={onLocationSelect}
        />
      ))}

      {/* Add global styles for Leaflet customization */}
      <MapStyles />
    </MapContainer>
  );
};

export default OpenStreetMap;
