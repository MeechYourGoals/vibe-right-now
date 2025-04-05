
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Compass, 
  X, 
  Layers, 
  MapIcon, 
  Navigation, 
  LocateFixed, 
  Pin, 
  MapPin 
} from "lucide-react";
import { mockLocations } from "@/mock/locations";
import { Location } from "@/types";
import { useNavigate, useLocation } from "react-router-dom";
import MapboxMap from "./map/MapboxMap";
import LocationDetailsSidebar from "./map/LocationDetailsSidebar";
import LocationCard from "./map/LocationCard";
import { filterLocationsByDistance } from "@/utils/locationUtils";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const NearbyVibesMap = () => {
  const [userLocation, setUserLocation] = useState<GeolocationCoordinates | null>(null);
  const [nearbyLocations, setNearbyLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMapExpanded, setIsMapExpanded] = useState(false);
  const [mapStyle, setMapStyle] = useState<"default" | "terrain" | "satellite">("terrain");
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [searchedCity, setSearchedCity] = useState("");
  const [addressInput, setAddressInput] = useState("");
  const [showDistances, setShowDistances] = useState(false);
  const [userAddressLocation, setUserAddressLocation] = useState<[number, number] | null>(null);
  const [isAddressPopoverOpen, setIsAddressPopoverOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Extract city from URL search params, if available
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get('q') || '';
    
    // Try to extract city from search query (assuming format like "City, State")
    if (q) {
      const city = q.split(',')[0].trim();
      setSearchedCity(city);
    } else {
      setSearchedCity("");
    }
  }, [location]);
  
  // Get user location and nearby venues
  useEffect(() => {
    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation(position.coords);
          
          // Filter locations within 10 miles of user
          const nearbyVenues = filterLocationsByDistance(
            mockLocations,
            position.coords.latitude,
            position.coords.longitude,
            10
          );
          
          setNearbyLocations(nearbyVenues);
          setLoading(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          // Use all locations as fallback
          setNearbyLocations(mockLocations);
          setLoading(false);
        }
      );
    } else {
      // Use all locations as fallback
      setNearbyLocations(mockLocations);
      setLoading(false);
    }
  }, []);

  const handleViewMap = () => {
    navigate("/explore");
  };

  const toggleMapExpansion = () => {
    setIsMapExpanded(!isMapExpanded);
    setSelectedLocation(null);
    
    // Trigger map resize after state update
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
    setSelectedLocation(location);
  };

  const changeMapStyle = (style: "default" | "terrain" | "satellite") => {
    setMapStyle(style);
  };
  
  const geocodeAddress = async (address: string) => {
    if (!address.trim()) {
      toast.error("Please enter an address");
      return;
    }
    
    try {
      setLoading(true);
      
      // Use Mapbox Geocoding API to convert address to coordinates
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${mapboxgl.accessToken}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to geocode address');
      }
      
      const data = await response.json();
      
      if (data.features && data.features.length > 0) {
        const [lng, lat] = data.features[0].center;
        setUserAddressLocation([lng, lat]);
        setShowDistances(true);
        setIsAddressPopoverOpen(false);
        
        toast.success("Address found! Showing distances on the map");
        
        // If map is expanded, zoom to the new location
        if (isMapExpanded && window.resizeMap) {
          window.resizeMap();
        }
      } else {
        toast.error("Address not found. Please try again with a more specific address.");
      }
    } catch (error) {
      console.error("Geocoding error:", error);
      toast.error("Error finding address. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    geocodeAddress(addressInput);
  };
  
  return (
    <div className={`space-y-4 ${isMapExpanded ? "fixed inset-0 z-50 bg-background p-4" : ""}`}>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Nearby Vibes</h2>
        <div className="flex gap-2">
          {isMapExpanded ? (
            <>
              <div className="flex items-center bg-muted/30 rounded-md p-1">
                <Button 
                  variant={mapStyle === "default" ? "secondary" : "ghost"} 
                  size="sm" 
                  className="gap-1" 
                  onClick={() => changeMapStyle("default")}
                >
                  <MapIcon className="h-4 w-4" />
                </Button>
                <Button 
                  variant={mapStyle === "terrain" ? "secondary" : "ghost"} 
                  size="sm" 
                  className="gap-1" 
                  onClick={() => changeMapStyle("terrain")}
                >
                  <Layers className="h-4 w-4" />
                </Button>
                <Button 
                  variant={mapStyle === "satellite" ? "secondary" : "ghost"} 
                  size="sm" 
                  className="gap-1" 
                  onClick={() => changeMapStyle("satellite")}
                >
                  <Navigation className="h-4 w-4" />
                </Button>
              </div>
              <Button variant="ghost" size="sm" className="gap-1" onClick={toggleMapExpansion}>
                <X className="h-4 w-4" />
                Close Map
              </Button>
            </>
          ) : (
            <Button variant="ghost" size="sm" className="gap-1" onClick={toggleMapExpansion}>
              <Navigation className="h-4 w-4" />
              Expand Map
            </Button>
          )}
          {!isMapExpanded && (
            <Popover open={isAddressPopoverOpen} onOpenChange={setIsAddressPopoverOpen}>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1">
                  <MapPin className="h-4 w-4" />
                  View Distance
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <form onSubmit={handleAddressSubmit} className="space-y-3">
                  <h4 className="font-medium">Enter your address</h4>
                  <p className="text-xs text-muted-foreground">
                    Enter your address to see how far each location is from you
                  </p>
                  <div className="flex gap-2">
                    <Input 
                      value={addressInput}
                      onChange={(e) => setAddressInput(e.target.value)}
                      placeholder="123 Main St, City, State"
                      className="flex-1"
                    />
                    <Button type="submit" disabled={loading}>
                      {loading ? "Loading..." : "Go"}
                    </Button>
                  </div>
                  {userLocation && (
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={() => {
                        setShowDistances(true);
                        setUserAddressLocation(null);
                        setIsAddressPopoverOpen(false);
                        toast.success("Using your current location for distances");
                      }}
                    >
                      <LocateFixed className="h-4 w-4 mr-2" />
                      Use my current location
                    </Button>
                  )}
                </form>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
      
      {loading ? (
        <div className={`bg-muted/20 rounded-lg flex items-center justify-center ${isMapExpanded ? "h-[85vh]" : "h-60"}`}>
          <div className="animate-spin">
            <Compass className="h-8 w-8 text-muted-foreground" />
          </div>
        </div>
      ) : (
        <div className={`relative ${isMapExpanded ? "h-[85vh]" : "h-60"} rounded-lg overflow-hidden transition-all`}>
          <MapboxMap 
            userLocation={userLocation}
            locations={nearbyLocations}
            searchedCity={searchedCity}
            mapStyle={mapStyle}
            onLocationSelect={handleLocationSelect}
            showDistances={showDistances}
            userAddressLocation={userAddressLocation}
          />
          
          {/* Selected location detail sidebar */}
          {isMapExpanded && selectedLocation && (
            <LocationDetailsSidebar
              location={selectedLocation}
              onClose={() => setSelectedLocation(null)}
              onViewVibes={handleLocationClick}
            />
          )}
          
          <div className="absolute bottom-0 left-0 right-0 p-3 glass-effect bg-background/70 backdrop-blur-sm">
            <p className="text-sm">
              {nearbyLocations.length} Vibes within 10 miles of you
              {showDistances && (
                <Button 
                  variant="link" 
                  size="sm" 
                  className="p-0 h-auto ml-2" 
                  onClick={() => setShowDistances(false)}
                >
                  Hide distances
                </Button>
              )}
            </p>
          </div>
        </div>
      )}
      
      {!isMapExpanded && (
        <div className="grid grid-cols-2 gap-3">
          {nearbyLocations.slice(0, 4).map((location) => (
            <LocationCard
              key={location.id}
              location={location}
              onViewVibes={handleLocationClick}
            />
          ))}
        </div>
      )}
      
      {!isMapExpanded && nearbyLocations.length > 4 && (
        <Button variant="ghost" size="sm" className="w-full" onClick={handleViewMap}>
          See All {nearbyLocations.length} Nearby Locations
        </Button>
      )}
    </div>
  );
};

// Add window.resizeMap for TypeScript
declare global {
  interface Window {
    resizeMap?: () => void;
  }
}

export default NearbyVibesMap;
