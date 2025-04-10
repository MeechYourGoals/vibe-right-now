import { useEffect, useRef, useState, useCallback } from "react";
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { Location } from "@/types";
import { Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import GoogleMapMarkers from './GoogleMapMarkers';
import { getMapOptions } from './MapStyles';

// Google Maps API key
const GOOGLE_MAPS_API_KEY = "AIzaSyAWm0vayRrQJHpMc6XcShcge52hGTt9BV4";

const mapContainerStyle = {
  width: '100%',
  height: '100%'
};

const defaultCenter = {
  lat: 39.8283,
  lng: -98.5795
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
}

const GoogleMapComponent = ({ 
  userLocation, 
  locations, 
  searchedCity, 
  mapStyle,
  onLocationSelect,
  showDistances = false,
  userAddressLocation = null,
  selectedLocation = null
}: GoogleMapComponentProps) => {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLE_MAPS_API_KEY
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<Location | null>(selectedLocation);
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [mapZoom, setMapZoom] = useState(searchedCity ? 12 : 4);

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  useEffect(() => {
    if (userLocation) {
      setMapCenter({ 
        lat: userLocation.latitude, 
        lng: userLocation.longitude 
      });
    } else if (userAddressLocation) {
      setMapCenter({
        lat: userAddressLocation[1],
        lng: userAddressLocation[0]
      });
    } else if (locations.length > 0 && searchedCity) {
      setMapCenter({
        lat: locations[0].lat,
        lng: locations[0].lng
      });
      setMapZoom(12);
    }
  }, [userLocation, userAddressLocation, locations, searchedCity]);

  useEffect(() => {
    setSelectedMarker(selectedLocation);
  }, [selectedLocation]);

  const resizeMap = () => {
    if (map) {
      google.maps.event.trigger(map, "resize");
      
      if (userLocation) {
        map.setCenter({
          lat: userLocation.latitude,
          lng: userLocation.longitude
        });
      }
    }
  };

  useEffect(() => {
    if (window) {
      window.resizeMap = resizeMap;
    }
    
    return () => {
      if (window) {
        delete window.resizeMap;
      }
    };
  }, [map]);

  const handleMarkerClick = (location: Location) => {
    setSelectedMarker(location);
    onLocationSelect(location);
    
    if (map) {
      map.panTo({ lat: location.lat, lng: location.lng });
      map.setZoom(15);
    }
  };

  if (loadError) {
    toast.error("Error loading maps");
    return (
      <div className="h-full w-full flex items-center justify-center bg-muted/20">
        <div className="text-center">
          <p>Error loading Google Maps</p>
          <Button 
            variant="outline" 
            onClick={() => window.location.reload()}
            className="mt-2"
          >
            Reload
          </Button>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-muted/20">
        <div className="animate-spin">
          <Compass className="h-8 w-8 text-muted-foreground" />
        </div>
      </div>
    );
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
          onMarkerClick={handleMarkerClick}
          onInfoWindowClose={() => setSelectedMarker(null)}
        />
      </GoogleMap>
    </div>
  );
};

export default GoogleMapComponent;
