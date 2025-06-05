
import { useCallback } from "react";
import { GoogleMap } from '@react-google-maps/api';
import { Location } from "@/types";
import LiveMapMarkers from './LiveMapMarkers';
import { getMapOptions } from './MapStyles';
import MapLoadingStates from './MapLoadingStates';
import useGoogleMap from './useGoogleMap';

const mapContainerStyle = {
  width: '100%',
  height: '100%'
};

interface GoogleMapComponentProps {
  userLocation: GeolocationCoordinates | null;
  locations: Location[];
  searchedCity: string;
  mapStyle: "default" | "terrain" | "satellite";
  onLocationSelect: (location: Location) => void;
  showDistances?: boolean;
  userAddressLocation?: [number, number] | null;
  selectedLocation?: Location | null;
  showAllCities?: boolean;
}

const GoogleMapComponent = ({ 
  userLocation, 
  locations, 
  searchedCity, 
  mapStyle,
  onLocationSelect,
  showDistances = false,
  userAddressLocation = null,
  selectedLocation = null,
  showAllCities = true
}: GoogleMapComponentProps) => {
  const {
    isLoaded,
    loadError,
    mapCenter,
    mapZoom,
    selectedMarker,
    setSelectedMarker,
    onLoad,
    onUnmount,
    handleMarkerClick
  } = useGoogleMap(
    userLocation, 
    userAddressLocation, 
    locations, 
    searchedCity, 
    selectedLocation
  );

  // Convert user location for distance calculations
  const userLocationForDistance = userLocation 
    ? { lat: userLocation.latitude, lng: userLocation.longitude }
    : userAddressLocation 
      ? { lat: userAddressLocation[1], lng: userAddressLocation[0] }
      : undefined;

  // Main handler for marker clicks
  const handleLocationSelect = useCallback((location: Location) => {
    handleMarkerClick(location);
    onLocationSelect(location);
  }, [handleMarkerClick, onLocationSelect]);

  // Loading and error states
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
        <LiveMapMarkers
          locations={locations}
          selectedLocation={selectedMarker}
          onMarkerClick={handleLocationSelect}
          onInfoWindowClose={() => setSelectedMarker(null)}
          showDistances={showDistances}
          userLocation={userLocationForDistance}
        />

        {/* User location marker */}
        {userLocation && (
          <div style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: '20px',
            height: '20px',
            backgroundColor: '#4285F4',
            borderRadius: '50%',
            border: '3px solid white',
            boxShadow: '0 2px 6px rgba(0,0,0,0.3)'
          }} />
        )}
      </GoogleMap>
    </div>
  );
};

export default GoogleMapComponent;
