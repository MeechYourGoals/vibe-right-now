
import { useEffect, useRef, useState, useCallback } from "react";
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import { Location } from "@/types";
import { EnhancedPlace } from '@/hooks/useEnhancedGooglePlaces';
import { getMapOptions } from './MapStyles';
import MapLoadingStates from './MapLoadingStates';
import useGoogleMap from './useGoogleMap';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Star, Clock, Phone, Globe } from 'lucide-react';

const mapContainerStyle = {
  width: '100%',
  height: '100%'
};

interface EnhancedGoogleMapComponentProps {
  userLocation: GeolocationCoordinates | null;
  locations: Location[];
  realPlaces: EnhancedPlace[];
  searchedCity: string;
  mapStyle: "default" | "terrain" | "satellite";
  onLocationSelect: (location: Location) => void;
  onPlaceSelect: (place: EnhancedPlace) => void;
  showDistances?: boolean;
  userAddressLocation?: [number, number] | null;
  selectedLocation?: Location | null;
  selectedPlace?: EnhancedPlace | null;
  mapCenter?: { lat: number; lng: number };
  mapZoom?: number;
  onMapReady?: (map: google.maps.Map) => void;
}

const EnhancedGoogleMapComponent = ({ 
  userLocation, 
  locations, 
  realPlaces = [],
  searchedCity, 
  mapStyle,
  onLocationSelect,
  onPlaceSelect,
  showDistances = false,
  userAddressLocation = null,
  selectedLocation = null,
  selectedPlace = null,
  mapCenter,
  mapZoom,
  onMapReady
}: EnhancedGoogleMapComponentProps) => {
  const [selectedRealPlace, setSelectedRealPlace] = useState<EnhancedPlace | null>(selectedPlace);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const {
    isLoaded,
    loadError,
    mapCenter: defaultMapCenter,
    mapZoom: defaultMapZoom,
    selectedMarker,
    setSelectedMarker,
    onLoad: defaultOnLoad,
    onUnmount,
    handleMarkerClick
  } = useGoogleMap(
    userLocation, 
    userAddressLocation, 
    locations, 
    searchedCity, 
    selectedLocation
  );

  // Use provided center/zoom or fall back to defaults
  const effectiveCenter = mapCenter || defaultMapCenter;
  const effectiveZoom = mapZoom || defaultMapZoom;

  // Handle map load
  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
    defaultOnLoad(map);
    if (onMapReady) {
      onMapReady(map);
    }
  }, [defaultOnLoad, onMapReady]);

  // Update selected place when prop changes
  useEffect(() => {
    setSelectedRealPlace(selectedPlace);
  }, [selectedPlace]);

  // Center map on real places when they change
  useEffect(() => {
    if (map && realPlaces.length > 0) {
      if (realPlaces.length === 1) {
        const place = realPlaces[0];
        map.setCenter(place.geometry.location);
        map.setZoom(15);
      } else {
        // Fit all places in view
        const bounds = new google.maps.LatLngBounds();
        realPlaces.forEach(place => {
          bounds.extend(place.geometry.location);
        });
        map.fitBounds(bounds);
      }
    }
  }, [map, realPlaces]);

  const handleRealPlaceClick = (place: EnhancedPlace) => {
    setSelectedRealPlace(place);
    onPlaceSelect(place);
    
    if (map) {
      map.panTo(place.geometry.location);
      map.setZoom(15);
    }
  };

  const handleLocationClick = (location: Location) => {
    handleMarkerClick(location);
    onLocationSelect(location);
  };

  const openInGoogleMaps = (googleMapsUrl: string) => {
    window.open(googleMapsUrl, '_blank', 'noopener,noreferrer');
  };

  // Loading and error states
  if (loadError || !isLoaded) {
    return <MapLoadingStates loadError={!!loadError} isLoaded={isLoaded} />;
  }

  return (
    <div className="h-full w-full">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={effectiveCenter}
        zoom={effectiveZoom}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={getMapOptions(mapStyle)}
      >
        {/* User Location Marker */}
        {userLocation && (
          <Marker
            position={{
              lat: userLocation.latitude,
              lng: userLocation.longitude
            }}
            icon={{
              url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="8" fill="#3b82f6" stroke="#ffffff" stroke-width="2"/>
                  <circle cx="12" cy="12" r="3" fill="#ffffff"/>
                </svg>
              `),
              scaledSize: new google.maps.Size(24, 24),
              anchor: new google.maps.Point(12, 12)
            }}
            title="Your Location"
          />
        )}

        {/* User Address Location Marker */}
        {userAddressLocation && (
          <Marker
            position={{
              lat: userAddressLocation[1],
              lng: userAddressLocation[0]
            }}
            icon={{
              url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="8" fill="#10b981" stroke="#ffffff" stroke-width="2"/>
                  <circle cx="12" cy="12" r="3" fill="#ffffff"/>
                </svg>
              `),
              scaledSize: new google.maps.Size(24, 24),
              anchor: new google.maps.Point(12, 12)
            }}
            title="Search Location"
          />
        )}

        {/* Mock Location Markers */}
        {locations.map((location) => (
          <Marker
            key={location.id}
            position={{ lat: location.lat, lng: location.lng }}
            onClick={() => handleLocationClick(location)}
            icon={{
              url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="6" fill="#ef4444" stroke="#ffffff" stroke-width="2"/>
                </svg>
              `),
              scaledSize: new google.maps.Size(20, 20),
              anchor: new google.maps.Point(10, 10)
            }}
          />
        ))}

        {/* Real Places Markers */}
        {realPlaces.map((place, index) => (
          <Marker
            key={place.place_id || index}
            position={place.geometry.location}
            onClick={() => handleRealPlaceClick(place)}
            icon={{
              url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#8b5cf6" stroke="#ffffff" stroke-width="1"/>
                  <circle cx="12" cy="9" r="2.5" fill="#ffffff"/>
                </svg>
              `),
              scaledSize: new google.maps.Size(30, 30),
              anchor: new google.maps.Point(15, 30)
            }}
            title={place.name}
          />
        ))}

        {/* Mock Location Info Window */}
        {selectedMarker && (
          <InfoWindow
            position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
            onCloseClick={() => setSelectedMarker(null)}
          >
            <div className="p-2 max-w-xs">
              <h3 className="font-semibold text-sm">{selectedMarker.name}</h3>
              <p className="text-xs text-gray-600 mt-1">{selectedMarker.address}</p>
              <div className="flex items-center gap-1 mt-2">
                <Badge variant="secondary" className="text-xs">{selectedMarker.type}</Badge>
                {selectedMarker.rating && (
                  <Badge variant="outline" className="text-xs">
                    ⭐ {selectedMarker.rating}
                  </Badge>
                )}
              </div>
            </div>
          </InfoWindow>
        )}

        {/* Real Place Info Window */}
        {selectedRealPlace && (
          <InfoWindow
            position={selectedRealPlace.geometry.location}
            onCloseClick={() => setSelectedRealPlace(null)}
          >
            <div className="p-3 max-w-sm">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-base">{selectedRealPlace.name}</h3>
                {selectedRealPlace.google_maps_url && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openInGoogleMaps(selectedRealPlace.google_maps_url!)}
                    className="ml-2 p-1"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                )}
              </div>

              {selectedRealPlace.formatted_address && (
                <p className="text-sm text-gray-600 mb-2">{selectedRealPlace.formatted_address}</p>
              )}

              <div className="flex flex-wrap gap-1 mb-2">
                {selectedRealPlace.rating && (
                  <Badge variant="secondary" className="text-xs flex items-center gap-1">
                    <Star className="h-3 w-3" fill="currentColor" />
                    {selectedRealPlace.rating}
                  </Badge>
                )}
                {selectedRealPlace.business_status === 'OPERATIONAL' && (
                  <Badge variant="outline" className="text-xs text-green-600">
                    <Clock className="h-3 w-3 mr-1" />
                    Open
                  </Badge>
                )}
                {selectedRealPlace.price_level && (
                  <Badge variant="outline" className="text-xs">
                    {'$'.repeat(selectedRealPlace.price_level)}
                  </Badge>
                )}
              </div>

              {selectedRealPlace.types && (
                <div className="flex flex-wrap gap-1 mb-2">
                  {selectedRealPlace.types.slice(0, 3).map((type, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {type.replace(/_/g, ' ')}
                    </Badge>
                  ))}
                </div>
              )}

              <div className="flex gap-2 mt-3">
                {selectedRealPlace.formatted_phone_number && (
                  <Button variant="outline" size="sm" className="text-xs">
                    <Phone className="h-3 w-3 mr-1" />
                    Call
                  </Button>
                )}
                {selectedRealPlace.website && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs"
                    onClick={() => window.open(selectedRealPlace.website, '_blank')}
                  >
                    <Globe className="h-3 w-3 mr-1" />
                    Website
                  </Button>
                )}
                {selectedRealPlace.google_maps_url && (
                  <Button 
                    variant="default" 
                    size="sm" 
                    className="text-xs"
                    onClick={() => openInGoogleMaps(selectedRealPlace.google_maps_url!)}
                  >
                    View in Google Maps
                  </Button>
                )}
              </div>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
};

export default EnhancedGoogleMapComponent;
