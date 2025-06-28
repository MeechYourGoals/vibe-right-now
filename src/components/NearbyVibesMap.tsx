import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation as useRouterLocation } from "react-router-dom";
import { toast } from "sonner";
import { useSimplifiedNearbyLocations } from "@/hooks/useSimplifiedNearbyLocations";
import { geocodeAddress } from "@/utils/geocodingService";
import MapControls from "./map/MapControls";
import NearbyLocationsList from "./map/NearbyLocationsList";
import AddressSearchSection from "./map/AddressSearchSection";
import EnhancedGoogleMapComponent, { GoogleMapHandle } from "./map/google/EnhancedGoogleMapComponent";
import { useMapSync } from "@/hooks/useMapSync";
import { Location } from "@/types";
import { UserLocation, Coordinates } from "@/types/coordinates";

interface NearbyVibesMapProps {
  locations?: Location[];
  selectedLocation?: Location | null;
  onLocationSelect?: (location: Location) => void;
  className?: string;
}

const NearbyVibesMap: React.FC<NearbyVibesMapProps> = ({ 
  locations = [], 
  selectedLocation = null, 
  onLocationSelect = () => {},
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
  } = useSimplifiedNearbyLocations();
  
  const [isMapExpanded, setIsMapExpanded] = useState(false);
  const [mapStyle, setMapStyle] = useState<"default" | "terrain" | "satellite">("terrain");
  const [showDistances, setShowDistances] = useState(false);
  const [isAddressPopoverOpen, setIsAddressPopoverOpen] = useState(false);
  const [localLoading, setLocalLoading] = useState(false);
  const [currentUserLocation, setCurrentUserLocation] = useState<UserLocation | null>(
    userLocation ? { latitude: userLocation.lat, longitude: userLocation.lng } : null
  );

  const mapRef = useRef<GoogleMapHandle>(null);
  
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

  useEffect(() => {
    if (userLocation) {
      setCurrentUserLocation({ latitude: userLocation.lat, longitude: userLocation.lng });
    }
  }, [userLocation]);

  const handleViewMap = () => {
    navigate("/explore");
  };

  const toggleMapExpansion = () => {
    setIsMapExpanded(!isMapExpanded);
    onLocationSelect(null);
    
    setTimeout(() => {
      mapRef.current?.resize();
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
        setUserAddressLocation([coordinates.lng, coordinates.lat]);
        setShowDistances(true);
        setIsAddressPopoverOpen(false);
        
        toast.success("Address found! Showing distances on the map");
        
        if (isMapExpanded) {
          mapRef.current?.resize();
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
            <AddressSearchSection
              isOpen={isAddressPopoverOpen}
              setIsOpen={setIsAddressPopoverOpen}
              onAddressSearch={handleAddressSearch}
              onUseCurrentLocation={handleUseCurrentLocation}
              loading={effectiveLoading}
              hasUserLocation={!!currentUserLocation}
            />
          )}
        </div>
      </div>
      
      <div className={`rounded-lg overflow-hidden ${isMapExpanded ? "h-[calc(100vh-8rem)]" : "h-96"}`}>
        <EnhancedGoogleMapComponent
          ref={mapRef}
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
