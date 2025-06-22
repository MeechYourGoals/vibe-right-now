
import { useState, useEffect } from "react";
import { useNavigate, useLocation as useRouterLocation } from "react-router-dom";
import { toast } from "sonner";
import { useNearbyLocations } from "@/hooks/useNearbyLocations";
import { geocodeAddress } from "@/utils/geocodingService";
import MapControls from "./map/MapControls";
import NearbyLocationsList from "./map/NearbyLocationsList";
import AddressSearchPopover from "./map/AddressSearchPopover";
import EnhancedGoogleMapComponent from "./map/google/EnhancedGoogleMapComponent";
import { useMapSync } from "@/hooks/useMapSync";
import { Location } from "@/types";

declare global {
  interface Window {
    resizeMap?: () => void;
  }
}

interface Coordinates {
  lat: number;
  lng: number;
}

interface NearbyVibesMapProps {
  locations: Location[];
  selectedLocation: Location | null;
  onLocationSelect: (location: Location) => void;
  className?: string;
}

const NearbyVibesMap: React.FC<NearbyVibesMapProps> = ({ 
  locations, 
  selectedLocation, 
  onLocationSelect,
  className 
}) => {
  const {
    userLocation,
    nearbyLocations,
    loading,
    searchedCity,
    setSearchedCity,
    userAddressLocation,
    setUserAddressLocation
  } = useNearbyLocations();
  
  const [isMapExpanded, setIsMapExpanded] = useState(false);
  const [mapStyle, setMapStyle] = useState<"default" | "terrain" | "satellite">("terrain");
  const [showDistances, setShowDistances] = useState(false);
  const [isAddressPopoverOpen, setIsAddressPopoverOpen] = useState(false);
  const [localLoading, setLocalLoading] = useState(false);
  const [currentUserLocation, setCurrentUserLocation] = useState<[number, number] | null>(
    userLocation ? [userLocation.lat, userLocation.lng] : null
  );
  
  const { mapState, setMapRef, updateMapCenter, updateRealPlaces, zoomToPlace } = useMapSync();
  
  const navigate = useNavigate();
  const location = useRouterLocation();
  
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get('q') || '';
    
    if (q) {
      const city = q.split(',')[0].trim();
      setSearchedCity(city);
    } else {
      setSearchedCity("");
    }
  }, [location, setSearchedCity]);

  const handleViewMap = () => {
    navigate("/explore");
  };

  const toggleMapExpansion = () => {
    setIsMapExpanded(!isMapExpanded);
    onLocationSelect(null);
    
    setTimeout(() => {
      if (window.resizeMap) {
        window.resizeMap();
      }
    }, 10);
  };

  const handleLocationClick = (locationId: string) => {
    navigate(`/venue/${locationId}`);
  };

  const handleLocationSelect = (location: Location) => {
    onLocationSelect(location);
  };

  const handlePlaceSelect = (place: Location) => {
    updateMapCenter(place);
    updateRealPlaces([place]);
    zoomToPlace(place);
    
    if (place.id) {
      toast.success(`Selected ${place.name}`);
    }
  };
  
  const handleAddressSearch = async (address: string) => {
    if (!address.trim()) {
      toast.error("Please enter an address");
      return;
    }
    
    try {
      setLocalLoading(true);
      
      const coordinates = await geocodeAddress(address);
      
      if (coordinates) {
        setUserAddressLocation({ lat: coordinates.lat, lng: coordinates.lng });
        setShowDistances(true);
        setIsAddressPopoverOpen(false);
        
        toast.success("Address found! Showing distances on the map");
        
        if (isMapExpanded && window.resizeMap) {
          window.resizeMap();
        }
      }
    } finally {
      setLocalLoading(false);
    }
  };
  
  const handleUseCurrentLocation = () => {
    if (!currentUserLocation) {
      toast.error("Unable to access your location. Please allow location access or enter an address manually.");
      return;
    }
    
    setShowDistances(true);
    setUserAddressLocation(null);
    setIsAddressPopoverOpen(false);
    toast.success("Using your current location for distances");
  };

  const handleLocationFound = (e: any) => {
    const coords = e.latlng;
    setCurrentUserLocation([coords.lat, coords.lng]);
    console.log('User location found:', coords.lat, coords.lng);
  };

  const handleLocationError = (e: any) => {
    console.error('Location error:', e.message);
    setCurrentUserLocation([40.7128, -74.0060]); // New York City as fallback
  };

  const handleLocationUpdate = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords: [number, number] = [
            position.coords.latitude,
            position.coords.longitude
          ];
          setCurrentUserLocation(coords);
        },
        (error) => {
          console.error('Geolocation error:', error);
          setCurrentUserLocation([40.7128, -74.0060]); // Fallback to NYC
        }
      );
    }
  };

  const effectiveLoading = loading || localLoading;
  
  return (
    <div className={`space-y-4 ${isMapExpanded ? "fixed inset-0 z-50 bg-background p-4" : ""}`}>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Nearby Vibes</h2>
        <div className="flex gap-2">
          <MapControls 
            isExpanded={isMapExpanded}
            mapStyle={mapStyle}
            onStyleChange={setMapStyle}
            onToggleExpand={toggleMapExpansion}
          />
          
          {!isMapExpanded && (
            <AddressSearchPopover
              isOpen={isAddressPopoverOpen}
              setIsOpen={setIsAddressPopoverOpen}
              onSearch={handleAddressSearch}
              onUseCurrentLocation={handleUseCurrentLocation}
              loading={effectiveLoading}
              hasUserLocation={!!currentUserLocation}
            />
          )}
        </div>
      </div>
      
      <div className={`rounded-lg overflow-hidden ${isMapExpanded ? "h-[calc(100vh-8rem)]" : "h-96"}`}>
        <EnhancedGoogleMapComponent
          userLocation={currentUserLocation}
          locations={nearbyLocations}
          realPlaces={mapState.realPlaces}
          searchedCity={searchedCity}
          mapStyle={mapStyle}
          selectedLocation={selectedLocation}
          selectedPlace={mapState.selectedPlace}
          mapCenter={mapState.center}
          mapZoom={mapState.zoom}
          showDistances={showDistances}
          userAddressLocation={userAddressLocation}
          onLocationSelect={handleLocationSelect}
          onPlaceSelect={handlePlaceSelect}
          onMapReady={setMapRef}
        />
      </div>
      
      {!isMapExpanded && (
        <NearbyLocationsList
          locations={nearbyLocations}
          isExpanded={isMapExpanded}
          onViewMap={handleViewMap}
          onViewLocation={handleLocationClick}
        />
      )}
    </div>
  );
};

export default NearbyVibesMap;
