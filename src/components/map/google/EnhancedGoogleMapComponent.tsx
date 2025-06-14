
import React, { useCallback, useEffect } from 'react';
import { GoogleMap } from '@react-google-maps/api';
import GoogleMapMarkers from './GoogleMapMarkers';
import { getMapOptions } from './MapStyles';
import MapLoadingStates from './MapLoadingStates';
import useGoogleMap from './useGoogleMap';
import { Location } from '@/types';

const mapContainerStyle = {
  width: '100%',
  height: '100%'
};

interface EnhancedGoogleMapComponentProps {
  userLocation: GeolocationCoordinates | null;
  locations: Location[];
  realPlaces: google.maps.places.PlaceResult[];
  searchedCity: string;
  mapStyle: "default" | "terrain" | "satellite";
  onLocationSelect: (location: Location) => void;
  onPlaceSelect: (place: google.maps.places.PlaceResult) => void;
  showDistances?: boolean;
  userAddressLocation?: [number, number] | null;
  selectedLocation?: Location | null;
  selectedPlace?: google.maps.places.PlaceResult | null;
  mapCenter?: { lat: number; lng: number };
  mapZoom?: number;
  onMapReady?: (map: google.maps.Map) => void;
}

const EnhancedGoogleMapComponent: React.FC<EnhancedGoogleMapComponentProps> = ({
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
}) => {
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

  const onLoad = useCallback((map: google.maps.Map) => {
    defaultOnLoad(map);
    onMapReady?.(map);
  }, [defaultOnLoad, onMapReady]);

  const handleLocationSelect = useCallback((location: Location) => {
    handleMarkerClick(location);
    onLocationSelect(location);
  }, [handleMarkerClick, onLocationSelect]);

  const handlePlaceClick = useCallback((place: google.maps.places.PlaceResult) => {
    onPlaceSelect(place);
  }, [onPlaceSelect]);

  // Loading and error states
  if (loadError || !isLoaded) {
    return <MapLoadingStates loadError={!!loadError} isLoaded={isLoaded} />;
  }

  const effectiveCenter = mapCenter || defaultMapCenter;
  const effectiveZoom = mapZoom || defaultMapZoom;

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
        <GoogleMapMarkers
          locations={locations}
          realPlaces={realPlaces}
          userLocation={userLocation}
          userAddressLocation={userAddressLocation}
          selectedMarker={selectedMarker}
          selectedPlace={selectedPlace}
          showDistances={showDistances}
          onMarkerClick={handleLocationSelect}
          onPlaceClick={handlePlaceClick}
          onInfoWindowClose={() => setSelectedMarker(null)}
          showAllCities={true}
        />
      </GoogleMap>
    </div>
  );
};

export default EnhancedGoogleMapComponent;
