
import React from 'react';
import { Marker, InfoWindow } from '@react-google-maps/api';
import { Location } from "@/types";
import { createLocationMarkerIcon, createUserMarkerIcon } from './MarkerIcons';
import { calculateDistance, getReferencePoint } from '../common/DistanceCalculator';
import InfoWindowContent from './InfoWindowContent';
import { cityCoordinates } from '@/utils/locations/cityDatabase';
import { useNavigate } from 'react-router-dom';

interface GoogleMapMarkersProps {
  locations: Location[];
  userLocation: GeolocationCoordinates | null;
  userAddressLocation: [number, number] | null;
  selectedMarker: Location | null;
  showDistances: boolean;
  onMarkerClick: (location: Location) => void;
  onInfoWindowClose: () => void;
  showAllCities?: boolean;
}

const GoogleMapMarkers: React.FC<GoogleMapMarkersProps> = ({
  locations,
  userLocation,
  userAddressLocation,
  selectedMarker,
  showDistances,
  onMarkerClick,
  onInfoWindowClose,
  showAllCities = true
}) => {
  const navigate = useNavigate();
  // Get reference point for distance calculation
  const referencePoint = getReferencePoint(userAddressLocation, userLocation);
  
  const handleCityClick = (cityName: string) => {
    // Navigate to explore page with city as query param
    navigate(`/explore?q=${encodeURIComponent(cityName)}`);
  };
  
  return (
    <>
      {/* City markers - only show if showAllCities is true */}
      {showAllCities && Object.values(cityCoordinates).map((city) => (
        <Marker
          key={`city-${city.name}`}
          position={{ lat: city.lat, lng: city.lng }}
          icon={{
            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="%23000000" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10" fill="%23F5D742" stroke="white" stroke-width="2"/>
                <circle cx="12" cy="12" r="5" fill="%23FFB319" stroke="white" stroke-width="1"/>
              </svg>
            `),
            scaledSize: new google.maps.Size(32, 32),
            anchor: new google.maps.Point(16, 16)
          }}
          onClick={() => handleCityClick(city.name)}
          title={`View vibes in ${city.name}`}
        />
      ))}

      {/* Location markers */}
      {locations.map((location) => {
        const distance = (showDistances && referencePoint) 
          ? calculateDistance(
              referencePoint.lat, 
              referencePoint.lng, 
              location.lat, 
              location.lng
            ) 
          : null;
            
        return (
          <Marker
            key={location.id}
            position={{ lat: location.lat, lng: location.lng }}
            onClick={() => onMarkerClick(location)}
            icon={{
              url: createLocationMarkerIcon(location.type),
              scaledSize: new google.maps.Size(30, 30),
              anchor: new google.maps.Point(15, 15)
            }}
            label={showDistances && distance ? {
              text: distance,
              color: 'white',
              fontSize: '10px',
              fontWeight: 'bold',
              className: 'bg-black'
            } : undefined}
            title={location.name}
          />
        );
      })}
      
      {/* User location marker */}
      {userLocation && (
        <Marker
          position={{ lat: userLocation.latitude, lng: userLocation.longitude }}
          icon={{
            url: createUserMarkerIcon(false),
            scaledSize: new google.maps.Size(30, 30),
            anchor: new google.maps.Point(15, 15)
          }}
          title="Your Location"
        />
      )}
      
      {/* User address location marker */}
      {userAddressLocation && (
        <Marker
          position={{ lat: userAddressLocation[1], lng: userAddressLocation[0] }}
          icon={{
            url: createUserMarkerIcon(true),
            scaledSize: new google.maps.Size(30, 30),
            anchor: new google.maps.Point(15, 15)
          }}
          title="Searched Address"
        />
      )}
      
      {/* Info window for selected marker */}
      {selectedMarker && (
        <InfoWindow
          position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
          onCloseClick={onInfoWindowClose}
        >
          <div>
            <InfoWindowContent location={selectedMarker} />
          </div>
        </InfoWindow>
      )}
    </>
  );
};

export default GoogleMapMarkers;
