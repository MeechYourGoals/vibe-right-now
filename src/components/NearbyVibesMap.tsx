
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { useNearbyLocations } from "@/hooks/useNearbyLocations";
import { usePlacesSearch } from "@/hooks/usePlacesSearch";
import { geocodeAddress } from "@/utils/geocodingService";
import MapControls from "./map/MapControls";
import MapContainer from "./map/MapContainer";
import NearbyLocationsList from "./map/NearbyLocationsList";
import AddressSearchPopover from "./map/AddressSearchPopover";
import { Location } from "@/types";

declare global {
  interface Window {
    resizeMap?: () => void;
  }
}

interface NearbyVibesMapProps {
  searchQuery?: string;
  searchResults?: Location[];
  onLocationSelect?: (location: Location) => void;
}

const NearbyVibesMap = ({ 
  searchQuery, 
  searchResults = [], 
  onLocationSelect 
}: NearbyVibesMapProps) => {
  const {
    userLocation,
    nearbyLocations,
    loading,
    searchedCity,
    setSearchedCity,
    userAddressLocation,
    setUserAddressLocation
  } = useNearbyLocations();
  
  const { searchPlaces, isLoading: placesLoading } = usePlacesSearch();
  
  const [isMapExpanded, setIsMapExpanded] = useState(false);
  const [mapStyle, setMapStyle] = useState<"default" | "terrain" | "satellite">("terrain");
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [showDistances, setShowDistances] = useState(false);
  const [isAddressPopoverOpen, setIsAddressPopoverOpen] = useState(false);
  const [localLoading, setLocalLoading] = useState(false);
  const [displayedLocations, setDisplayedLocations] = useState<Location[]>([]);
  
  const navigate = useNavigate();
  const location = useLocation();
  
  // Use search results if provided, otherwise use nearby locations
  useEffect(() => {
    if (searchResults && searchResults.length > 0) {
      setDisplayedLocations(searchResults);
    } else {
      setDisplayedLocations(nearbyLocations);
    }
  }, [searchResults, nearbyLocations]);

  // Handle search query changes
  useEffect(() => {
    if (searchQuery && searchQuery.trim()) {
      handlePlacesSearch(searchQuery);
    }
  }, [searchQuery]);
  
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get('q') || '';
    
    if (q) {
      const city = q.split(',')[0].trim();
      setSearchedCity(city);
      handlePlacesSearch(q);
    } else {
      setSearchedCity("");
    }
  }, [location, setSearchedCity]);

  const handlePlacesSearch = async (query: string) => {
    if (!query.trim()) return;
    
    setLocalLoading(true);
    try {
      const searchLocation = userLocation ? 
        { lat: userLocation.latitude, lng: userLocation.longitude } : 
        userAddressLocation ? 
        { lat: userAddressLocation[1], lng: userAddressLocation[0] } : 
        undefined;
        
      const results = await searchPlaces(query, searchLocation);
      if (results.length > 0) {
        setDisplayedLocations(results);
        toast.success(`Found ${results.length} places for "${query}"`);
      } else {
        toast.error(`No places found for "${query}"`);
      }
    } catch (error) {
      console.error('Search error:', error);
      toast.error('Failed to search places');
    } finally {
      setLocalLoading(false);
    }
  };

  const handleViewMap = () => {
    navigate("/explore");
  };

  const toggleMapExpansion = () => {
    setIsMapExpanded(!isMapExpanded);
    setSelectedLocation(null);
    
    setTimeout(() => {
      if (window.resizeMap) {
        window.resizeMap();
      }
    }, 10);
  };

  const handleLocationClick = (locationId: string) => {
    // Navigate directly to the venue page
    navigate(`/venue/${locationId}`);
  };

  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location);
    onLocationSelect?.(location);
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
        setUserAddressLocation(coordinates);
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
    if (!userLocation) {
      toast.error("Unable to access your location. Please allow location access or enter an address manually.");
      return;
    }
    
    setShowDistances(true);
    setUserAddressLocation(null);
    setIsAddressPopoverOpen(false);
    toast.success("Using your current location for distances");
  };
  
  // Determine the effective loading state (either from hook or local)
  const effectiveLoading = loading || localLoading || placesLoading;
  
  return (
    <div className={`space-y-4 ${isMapExpanded ? "fixed inset-0 z-50 bg-background p-4" : ""}`}>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">
          {searchQuery ? `Search Results for "${searchQuery}"` : "Nearby Vibes"}
        </h2>
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
              hasUserLocation={!!userLocation}
            />
          )}
        </div>
      </div>
      
      <MapContainer
        loading={effectiveLoading}
        isExpanded={isMapExpanded}
        userLocation={userLocation}
        locations={displayedLocations}
        searchedCity={searchedCity}
        mapStyle={mapStyle}
        selectedLocation={selectedLocation}
        showDistances={showDistances}
        userAddressLocation={userAddressLocation}
        onLocationSelect={handleLocationSelect}
        onCloseLocation={() => setSelectedLocation(null)}
        nearbyCount={displayedLocations.length}
        onToggleDistances={() => setShowDistances(false)}
        showAllCities={!searchQuery && !searchResults.length}
      />
      
      {!isMapExpanded && (
        <NearbyLocationsList
          locations={displayedLocations}
          isExpanded={isMapExpanded}
          onViewMap={handleViewMap}
          onViewLocation={handleLocationClick}
        />
      )}
    </div>
  );
};

export default NearbyVibesMap;
