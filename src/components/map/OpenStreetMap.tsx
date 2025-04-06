
import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Location } from '@/types';

// Fix the default marker icon issue in Leaflet
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

// Delete default markers
delete L.Icon.Default.prototype._getIconUrl;

// Setup default icon
L.Icon.Default.mergeOptions({
  iconRetinaUrl: iconRetinaUrl,
  iconUrl: iconUrl,
  shadowUrl: shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});

interface MapCenterChangerProps {
  center: [number, number];
}

// Component to update map center when props change
const MapCenterChanger = ({ center }: MapCenterChangerProps) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
};

interface OpenStreetMapProps {
  userLocation: GeolocationCoordinates | null;
  locations: Location[];
  searchedCity: string;
  mapStyle?: string;
  selectedLocation?: Location | null;
  showDistances?: boolean;
  userAddressLocation?: [number, number] | null;
  onLocationSelect?: (location: Location) => void;
}

const OpenStreetMap: React.FC<OpenStreetMapProps> = ({
  userLocation,
  locations,
  searchedCity,
  mapStyle = 'default',
  selectedLocation = null,
  showDistances = false,
  userAddressLocation = null,
  onLocationSelect = () => {}
}) => {
  // Set up default center based on user location or first location or default to LA
  const defaultCenter: [number, number] = userLocation
    ? [userLocation.latitude, userLocation.longitude]
    : locations.length > 0
      ? [locations[0].lat, locations[0].lng]
      : [34.0522, -118.2437]; // Los Angeles default
      
  const effectiveCenter = userAddressLocation || defaultCenter;
  
  // Resize handler
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.resizeMap = () => {
        setTimeout(() => {
          window.dispatchEvent(new Event('resize'));
        }, 100);
      };
    }
    
    return () => {
      if (typeof window !== 'undefined') {
        window.resizeMap = undefined;
      }
    };
  }, []);

  // Setup icons
  const blueIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  const redIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  const goldIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  const greenIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  return (
    <MapContainer 
      style={{ height: '100%', width: '100%' }}
      // For react-leaflet v3+, the center and zoom are initial values only
      // Changes to these values after mounting do not affect the map
      // That's why we use the MapCenterChanger component
      defaultCenter={effectiveCenter}
      defaultZoom={locations.length > 1 ? 10 : 13} 
    >
      <TileLayer
        // These are the correct props for TileLayer in react-leaflet v3+
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      <MapCenterChanger center={effectiveCenter} />
      
      {/* User Location Marker */}
      {(userLocation || userAddressLocation) && (
        <Marker 
          // The position prop is correctly typed for Marker
          position={
            userAddressLocation 
              ? userAddressLocation 
              : [userLocation!.latitude, userLocation!.longitude]
          }
          // Using the icon prop on Marker component
          icon={blueIcon}
        >
          <Popup>
            {userAddressLocation ? 'Your Address Location' : 'Your Current Location'}
          </Popup>
        </Marker>
      )}
      
      {/* Location Markers */}
      {locations.map((location) => (
        <Marker
          key={location.id}
          position={[location.lat, location.lng]}
          eventHandlers={{
            click: () => onLocationSelect(location)
          }}
          icon={
            location.id === selectedLocation?.id
            ? redIcon
            : location.verified 
              ? goldIcon
              : greenIcon
          }
        >
          <Popup>
            <div className="font-semibold">{location.name}</div>
            <div>{location.address}</div>
            <div>{location.city}, {location.state}</div>
            <button 
              className="mt-2 px-2 py-1 bg-primary text-white text-xs rounded"
              onClick={() => onLocationSelect(location)}
            >
              View Details
            </button>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default OpenStreetMap;
