
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Compass, X, Layers, MapIcon, Navigation } from "lucide-react";
import { mockLocations } from "@/mock/locations";
import { Location } from "@/types";
import { useNavigate, useLocation } from "react-router-dom";
import MapboxMap from "./map/MapboxMap";
import LocationDetailsSidebar from "./map/LocationDetailsSidebar";
import LocationCard from "./map/LocationCard";
import { filterLocationsByDistance } from "@/utils/locationUtils";

const NearbyVibesMap = () => {
  const [userLocation, setUserLocation] = useState<GeolocationCoordinates | null>(null);
  const [nearbyLocations, setNearbyLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMapExpanded, setIsMapExpanded] = useState(false);
  const [mapStyle, setMapStyle] = useState<"default" | "terrain" | "satellite">("terrain");
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [searchedCity, setSearchedCity] = useState("");
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
            <Button variant="ghost" size="sm" className="gap-1" onClick={handleViewMap}>
              <Navigation className="h-4 w-4" />
              View Map
            </Button>
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
