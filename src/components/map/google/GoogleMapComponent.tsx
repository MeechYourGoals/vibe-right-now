
import { useEffect, useRef, useState, useCallback, forwardRef, useImperativeHandle } from "react";
import { GoogleMap } from '@react-google-maps/api';
import { Location } from "@/types";
import { UserLocation } from "@/types/coordinates";
import GoogleMapMarkers from './GoogleMapMarkers';
import { getMapOptions } from './MapStyles';
import MapLoadingStates from './MapLoadingStates';
import useGoogleMap from './useGoogleMap';

const mapContainerStyle = {
  width: '100%',
  height: '100%'
};

interface GoogleMapComponentProps {
  userLocation: UserLocation | null;
  locations: Location[];
  searchedCity: string;
  mapStyle: "default" | "terrain" | "satellite";
  onLocationSelect: (location: Location) => void;
  showDistances?: boolean;
  userAddressLocation?: [number, number] | null;
  selectedLocation?: Location | null;
  showAllCities?: boolean;
}

export interface GoogleMapHandle {
  resize: () => void;
}

const GoogleMapComponent = forwardRef<GoogleMapHandle, GoogleMapComponentProps>(({ 
  userLocation,
  locations,
  searchedCity,
  mapStyle,
  onLocationSelect,
  showDistances = false,
  userAddressLocation = null,
  selectedLocation = null,
  showAllCities = true
}: GoogleMapComponentProps, ref) => {
  const {
    isLoaded,
    loadError,
    mapCenter,
    mapZoom,
    selectedMarker,
    setSelectedMarker,
    onLoad,
    onUnmount,
    handleMarkerClick,
    resizeMap
  } = useGoogleMap(
    userLocation,
    userAddressLocation,
    locations,
    searchedCity,
    selectedLocation
  );

  useImperativeHandle(ref, () => ({
    resize: resizeMap
  }), [resizeMap]);

  const handleLocationSelect = (location: Location) => {
    handleMarkerClick(location);
    onLocationSelect(location);
  };

  const loadingState = (
    <MapLoadingStates loadError={!!loadError} isLoaded={isLoaded} />
  );
  
  if (loadError || !isLoaded) {
    return loadingState;
  }

  return (
    <div className="h-full w-full">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={mapCenter}
        zoom={mapZoom}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={getMapOptions(mapStyle)}
      >
        <GoogleMapMarkers
          locations={locations}
          userLocation={userLocation}
          userAddressLocation={userAddressLocation}
          selectedMarker={selectedMarker}
          showDistances={showDistances}
          onMarkerClick={handleLocationSelect}
          onInfoWindowClose={() => setSelectedMarker(null)}
          showAllCities={showAllCities}
        />
      </GoogleMap>
    </div>
  );
});

export default GoogleMapComponent;
