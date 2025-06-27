
import { useEffect, useRef, useState, useCallback, forwardRef, useImperativeHandle } from "react";
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { Location } from "@/types";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Navigation, Pin, Compass } from "lucide-react";
import { toast } from "sonner";

// Google Maps API key loaded from Vite environment variables
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

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
  userAddressLocation = null
}: GoogleMapComponentProps, ref) => {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLE_MAPS_API_KEY
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<Location | null>(null);
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [mapZoom, setMapZoom] = useState(searchedCity ? 12 : 4);

  // Initialize map
  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  // Set map center based on user location
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
      // If no user location but we have locations and a city search,
      // center on the first location
      setMapCenter({
        lat: locations[0].lat,
        lng: locations[0].lng
      });
      setMapZoom(12);
    }
  }, [userLocation, userAddressLocation, locations, searchedCity]);

  // Update map style
  useEffect(() => {
    if (map) {
      const styles: google.maps.MapTypeStyle[] = [];
      
      if (mapStyle === "terrain") {
        map.setMapTypeId("terrain");
      } else if (mapStyle === "satellite") {
        map.setMapTypeId("satellite");
      } else {
        map.setMapTypeId("roadmap");
      }
    }
  }, [map, mapStyle]);

  // Calculate distance between two points in miles
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 3958.8; // Earth's radius in miles
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    
    return distance < 1 ? `${(distance * 10).toFixed(1)} mi` : `${distance.toFixed(1)} mi`;
  };
  
  // Method to resize map (exposed for parent component)
  const resizeMap = () => {
    if (map) {
      google.maps.event.trigger(map, "resize");
      
      // Re-center the map if user location is available
      if (userLocation) {
        map.setCenter({
          lat: userLocation.latitude,
          lng: userLocation.longitude
        });
      }
    }
  };

  useImperativeHandle(ref, () => ({
    resize: resizeMap
  }), [resizeMap]);

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
        options={{
          mapTypeId: mapStyle === 'satellite' 
            ? 'satellite' 
            : mapStyle === 'terrain' 
              ? 'terrain' 
              : 'roadmap',
          disableDefaultUI: false,
          zoomControl: true,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false
        }}
      >
        {/* Markers for locations */}
        {locations.map((location) => {
          // Reference point for distance calculation (either userAddressLocation or userLocation)
          const referencePoint = userAddressLocation 
            ? { lat: userAddressLocation[1], lng: userAddressLocation[0] }
            : userLocation 
              ? { lat: userLocation.latitude, lng: userLocation.longitude }
              : null;
              
          const distance = referencePoint 
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
              onClick={() => {
                setSelectedMarker(location);
                onLocationSelect(location);
                
                // Fly to location
                if (map) {
                  map.panTo({ lat: location.lat, lng: location.lng });
                  map.setZoom(15);
                }
              }}
              icon={{
                url: `data:image/svg+xml;charset=UTF-8,
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="%23000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10" fill="%23${location.type === 'restaurant' ? 'ff6b6b' : location.type === 'bar' ? '6b66ff' : location.type === 'sports' ? '66ff6b' : 'ffbb66'}" stroke="white" stroke-width="2"/>
                </svg>`,
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
              url: `data:image/svg+xml;charset=UTF-8,
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="%23000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10" fill="%23ff9900" stroke="white" stroke-width="2"/>
              </svg>`,
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
              url: `data:image/svg+xml;charset=UTF-8,
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="%23000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10" fill="%23F97316" stroke="white" stroke-width="2"/>
              </svg>`,
              scaledSize: new google.maps.Size(30, 30),
              anchor: new google.maps.Point(15, 15)
            }}
          />
        )}
        
        {/* InfoWindow for selected marker */}
        {selectedMarker && (
          <InfoWindow
            position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
            onCloseClick={() => setSelectedMarker(null)}
          >
            <div className="p-2 max-w-[200px]">
              <h3 className="font-bold text-sm">{selectedMarker.name}</h3>
              <p className="text-xs text-gray-600">{selectedMarker.type} in {selectedMarker.city}</p>
              <Button 
                size="sm" 
                className="mt-2 text-xs py-0 h-7" 
                onClick={(e) => {
                  e.stopPropagation();
                  onLocationSelect(selectedMarker);
                }}
              >
                View Details
              </Button>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
});

export default GoogleMapComponent;
