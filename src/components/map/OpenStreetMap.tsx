
import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Location } from '@/types';
import { cityCoordinates } from '@/utils/locations';
import CityMarkers from './city-markers/CityMarkers';

// Define the component properties
interface OpenStreetMapProps {
  userLocation: GeolocationCoordinates | null;
  locations: Location[];
  searchedCity: string;
  mapStyle: "default" | "terrain" | "satellite";
  onLocationSelect: (location: Location) => void;
  selectedLocation?: Location | null; // Make optional
  showDistances?: boolean;
  userAddressLocation?: [number, number] | null; // Make optional
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
  let tileLayerUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  if (mapStyle === 'terrain') {
    tileLayerUrl = 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png';
  } else if (mapStyle === 'satellite') {
    tileLayerUrl = 'https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}';
  }

  // Custom icon for the user's location
  const userIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  // Custom icon for the selected location
  const selectedLocationIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  // Custom icon for other locations
  const locationIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  return (
    <MapContainer
      style={{ height: "100%", width: "100%" }}
      center={mapCenter}
      zoom={zoom}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url={tileLayerUrl}
      />
      
      <MapRecenter center={mapCenter} zoom={zoom} />

      {/* Show city markers if showAllCities is true and no specific city is searched */}
      {showAllCities && !searchedCity && (
        <CityMarkers onCitySelect={(cityName) => console.log(`City selected: ${cityName}`)} />
      )}

      {/* User location marker */}
      {userLocation && (
        <Marker position={[userLocation.latitude, userLocation.longitude]} icon={userIcon}>
          <Popup>You are here</Popup>
        </Marker>
      )}

      {/* Location markers */}
      {locations.map((location) => {
        const isSelected = selectedLocation?.id === location.id;
        const icon = isSelected ? selectedLocationIcon : locationIcon;
        
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
            }}
          >
            <Popup>
              <div>
                <h3>{location.name}</h3>
                <p>{location.address}, {location.city}</p>
                {distance !== null && <p>Distance: {distance.toFixed(2)} miles</p>}
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default OpenStreetMap;
