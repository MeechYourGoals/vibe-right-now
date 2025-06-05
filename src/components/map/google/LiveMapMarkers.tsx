
import React from 'react';
import { Marker, InfoWindow } from '@react-google-maps/api';
import { Location } from '@/types';
import { Button } from '@/components/ui/button';
import { ExternalLink, Star, MapPin } from 'lucide-react';

interface LiveMapMarkersProps {
  locations: Location[];
  selectedLocation: Location | null;
  onMarkerClick: (location: Location) => void;
  onInfoWindowClose: () => void;
  showDistances?: boolean;
  userLocation?: { lat: number; lng: number };
}

const LiveMapMarkers: React.FC<LiveMapMarkersProps> = ({
  locations,
  selectedLocation,
  onMarkerClick,
  onInfoWindowClose,
  showDistances = false,
  userLocation
}) => {
  const getMarkerIcon = (location: Location) => {
    const colors = {
      restaurant: '#ff6b6b',
      bar: '#6b66ff',
      sports: '#66ff6b',
      attraction: '#ffbb66',
      event: '#ff66bb',
      other: '#66bbff'
    };

    const color = colors[location.type] || colors.other;
    
    return {
      url: `data:image/svg+xml;charset=UTF-8,
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10" fill="${color}" stroke="white" stroke-width="2"/>
          <circle cx="12" cy="12" r="3" fill="white"/>
        </svg>`,
      scaledSize: new google.maps.Size(32, 32),
      anchor: new google.maps.Point(16, 16)
    };
  };

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 3959; // Earth's radius in miles
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    
    return distance < 1 ? `${(distance * 5280).toFixed(0)} ft` : `${distance.toFixed(1)} mi`;
  };

  const openInGoogleMaps = (location: Location) => {
    const url = location.googleMapsUrl || 
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.name)}&query_place_id=${location.placeId}`;
    window.open(url, '_blank');
  };

  return (
    <>
      {locations.map((location) => {
        const distance = userLocation && showDistances 
          ? calculateDistance(userLocation.lat, userLocation.lng, location.lat, location.lng)
          : null;

        return (
          <Marker
            key={location.id}
            position={{ lat: location.lat, lng: location.lng }}
            icon={getMarkerIcon(location)}
            onClick={() => onMarkerClick(location)}
            label={showDistances && distance ? {
              text: distance,
              color: 'white',
              fontSize: '12px',
              fontWeight: 'bold',
              className: 'map-distance-label'
            } : undefined}
          />
        );
      })}

      {selectedLocation && (
        <InfoWindow
          position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }}
          onCloseClick={onInfoWindowClose}
        >
          <div className="p-3 max-w-xs">
            <div className="flex items-start gap-3">
              {selectedLocation.photos && selectedLocation.photos.length > 0 && (
                <img 
                  src={selectedLocation.photos[0]} 
                  alt={selectedLocation.name}
                  className="w-16 h-16 object-cover rounded-md flex-shrink-0"
                />
              )}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm mb-1 truncate">
                  {selectedLocation.name}
                </h3>
                
                {selectedLocation.rating && (
                  <div className="flex items-center gap-1 mb-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs text-gray-600">
                      {selectedLocation.rating}/5
                    </span>
                  </div>
                )}
                
                <p className="text-xs text-gray-600 mb-2 truncate">
                  {selectedLocation.address}
                </p>
                
                <div className="flex gap-1">
                  <Button 
                    size="sm" 
                    className="text-xs h-6 px-2"
                    onClick={() => openInGoogleMaps(selectedLocation)}
                  >
                    <ExternalLink className="h-3 w-3 mr-1" />
                    View
                  </Button>
                  
                  {selectedLocation.website && (
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="text-xs h-6 px-2"
                      onClick={() => window.open(selectedLocation.website, '_blank')}
                    >
                      Website
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </InfoWindow>
      )}
    </>
  );
};

export default LiveMapMarkers;
