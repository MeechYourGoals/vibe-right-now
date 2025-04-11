
import React from 'react';
import { Marker, InfoWindow } from '@react-google-maps/api';
import { Location } from "@/types";
import { createLocationMarkerIcon, createUserMarkerIcon } from './MarkerIcons';
import { calculateDistance, getReferencePoint } from '../common/DistanceCalculator';
import InfoWindowContent from './InfoWindowContent';

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
  // Get reference point for distance calculation
  const referencePoint = getReferencePoint(userAddressLocation, userLocation);
  
  return (
    <>
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
        />
      )}
      
      {/* InfoWindow for selected marker */}
      {selectedMarker && (
        <InfoWindow
          position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
          onCloseClick={onInfoWindowClose}
        >
          <InfoWindowContent 
            location={selectedMarker} 
            onSelect={onMarkerClick} 
          />
        </InfoWindow>
      )}
    </>
  );
};

export default GoogleMapMarkers;
