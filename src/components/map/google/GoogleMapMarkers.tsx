
import React from 'react';
import { Marker, InfoWindow } from '@react-google-maps/api';
import { Location } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin } from 'lucide-react';
import { calculateDistance } from '../common/DistanceCalculator';

interface GoogleMapMarkersProps {
  locations: Location[];
  realPlaces?: google.maps.places.PlaceResult[];
  userLocation: GeolocationCoordinates | null;
  userAddressLocation?: [number, number] | null;
  selectedMarker: Location | null;
  selectedPlace?: google.maps.places.PlaceResult | null;
  showDistances: boolean;
  onMarkerClick: (location: Location) => void;
  onPlaceClick?: (place: google.maps.places.PlaceResult) => void;
  onInfoWindowClose: () => void;
  showAllCities: boolean;
}

const GoogleMapMarkers: React.FC<GoogleMapMarkersProps> = ({
  locations,
  realPlaces = [],
  userLocation,
  userAddressLocation,
  selectedMarker,
  selectedPlace,
  showDistances,
  onMarkerClick,
  onPlaceClick,
  onInfoWindowClose,
  showAllCities
}) => {
  const getMarkerIcon = (type: string, isReal: boolean = false) => {
    const colors = {
      restaurant: isReal ? '#ff4444' : '#ff6b6b',
      bar: isReal ? '#4444ff' : '#6b66ff',
      sports: isReal ? '#44ff44' : '#66ff6b',
      attraction: isReal ? '#ff8844' : '#ffbb66',
      default: isReal ? '#8844ff' : '#bb66ff'
    };

    const color = colors[type as keyof typeof colors] || colors.default;
    
    return {
      url: `data:image/svg+xml;charset=UTF-8,
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="%23ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10" fill="${color.replace('#', '%23')}" stroke="white" stroke-width="2"/>
        ${isReal ? '<circle cx="12" cy="12" r="6" fill="white"/>' : ''}
      </svg>`,
      scaledSize: new google.maps.Size(isReal ? 36 : 30, isReal ? 36 : 30),
      anchor: new google.maps.Point(isReal ? 18 : 15, isReal ? 18 : 15)
    };
  };

  const getDistanceLabel = (lat: number, lng: number) => {
    if (!showDistances) return undefined;
    
    const referencePoint = userAddressLocation 
      ? { lat: userAddressLocation[1], lng: userAddressLocation[0] }
      : userLocation 
        ? { lat: userLocation.latitude, lng: userLocation.longitude }
        : null;
        
    if (!referencePoint) return undefined;
    
    const distance = calculateDistance(
      referencePoint.lat, 
      referencePoint.lng, 
      lat, 
      lng
    );
    
    return {
      text: distance,
      color: 'white',
      fontSize: '10px',
      fontWeight: 'bold'
    };
  };

  return (
    <>
      {/* Mock location markers */}
      {locations.map((location) => (
        <Marker
          key={`mock-${location.id}`}
          position={{ lat: location.lat, lng: location.lng }}
          onClick={() => onMarkerClick(location)}
          icon={getMarkerIcon(location.type)}
          label={getDistanceLabel(location.lat, location.lng)}
        />
      ))}

      {/* Real Google Places markers */}
      {realPlaces.map((place, index) => {
        if (!place.geometry?.location) return null;
        
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        const type = place.types?.[0] || 'default';
        
        return (
          <Marker
            key={`real-${place.place_id || index}`}
            position={{ lat, lng }}
            onClick={() => onPlaceClick?.(place)}
            icon={getMarkerIcon(type, true)}
            label={getDistanceLabel(lat, lng)}
          />
        );
      })}
      
      {/* User location marker */}
      {userLocation && (
        <Marker
          position={{ lat: userLocation.latitude, lng: userLocation.longitude }}
          icon={{
            url: `data:image/svg+xml;charset=UTF-8,
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="%23ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10" fill="%23ff9900" stroke="white" stroke-width="3"/>
              <circle cx="12" cy="12" r="4" fill="white"/>
            </svg>`,
            scaledSize: new google.maps.Size(32, 32),
            anchor: new google.maps.Point(16, 16)
          }}
        />
      )}
      
      {/* User address location marker */}
      {userAddressLocation && (
        <Marker
          position={{ lat: userAddressLocation[1], lng: userAddressLocation[0] }}
          icon={{
            url: `data:image/svg+xml;charset=UTF-8,
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="%23ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10" fill="%23F97316" stroke="white" stroke-width="3"/>
              <circle cx="12" cy="12" r="4" fill="white"/>
            </svg>`,
            scaledSize: new google.maps.Size(32, 32),
            anchor: new google.maps.Point(16, 16)
          }}
        />
      )}
      
      {/* InfoWindow for selected mock location */}
      {selectedMarker && (
        <InfoWindow
          position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
          onCloseClick={onInfoWindowClose}
        >
          <div className="p-2 max-w-[250px]">
            <h3 className="font-bold text-sm mb-1">{selectedMarker.name}</h3>
            <div className="flex items-center gap-1 mb-2">
              <MapPin className="h-3 w-3 text-gray-500" />
              <p className="text-xs text-gray-600">{selectedMarker.address}</p>
            </div>
            <Badge variant="outline" className="mb-2">
              {selectedMarker.type.replace('_', ' ')}
            </Badge>
            <Button 
              size="sm" 
              className="w-full text-xs py-1 h-7" 
              onClick={(e) => {
                e.stopPropagation();
                onMarkerClick(selectedMarker);
              }}
            >
              View Details
            </Button>
          </div>
        </InfoWindow>
      )}

      {/* InfoWindow for selected real place */}
      {selectedPlace && selectedPlace.geometry?.location && (
        <InfoWindow
          position={{
            lat: selectedPlace.geometry.location.lat(),
            lng: selectedPlace.geometry.location.lng()
          }}
          onCloseClick={() => onPlaceClick?.(selectedPlace)}
        >
          <div className="p-2 max-w-[250px]">
            <h3 className="font-bold text-sm mb-1">{selectedPlace.name}</h3>
            {selectedPlace.formatted_address && (
              <div className="flex items-center gap-1 mb-2">
                <MapPin className="h-3 w-3 text-gray-500" />
                <p className="text-xs text-gray-600">{selectedPlace.formatted_address}</p>
              </div>
            )}
            {selectedPlace.rating && (
              <div className="flex items-center gap-1 mb-2">
                <Star className="h-3 w-3 text-yellow-500 fill-current" />
                <span className="text-xs">{selectedPlace.rating}</span>
                {selectedPlace.user_ratings_total && (
                  <span className="text-xs text-gray-500">
                    ({selectedPlace.user_ratings_total} reviews)
                  </span>
                )}
              </div>
            )}
            {selectedPlace.types && (
              <div className="flex flex-wrap gap-1 mb-2">
                {selectedPlace.types.slice(0, 2).map((type, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {type.replace(/_/g, ' ')}
                  </Badge>
                ))}
              </div>
            )}
            <Button 
              size="sm" 
              className="w-full text-xs py-1 h-7" 
              onClick={(e) => {
                e.stopPropagation();
                if (selectedPlace.place_id) {
                  window.open(`https://www.google.com/maps/place/?q=place_id:${selectedPlace.place_id}`, '_blank');
                }
              }}
            >
              View on Google Maps
            </Button>
          </div>
        </InfoWindow>
      )}
    </>
  );
};

export default GoogleMapMarkers;
