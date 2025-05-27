
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, ArrowRight, Navigation } from "lucide-react";
import OpenStreetMap from "./map/OpenStreetMap";
import { Location } from "@/types";
import { getNearbyLocations } from "@/mock/cityLocations";
import VerifiedBadge from "@/components/icons/VerifiedIcon";

const LocationsNearby = () => {
  const navigate = useNavigate();
  const [isMapExpanded, setIsMapExpanded] = useState(false);
  const [mapStyle, setMapStyle] = useState<"default" | "terrain" | "satellite">("default");
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [userLocation, setUserLocation] = useState<GeolocationCoordinates | null>(null);
  const [nearbyLocations, setNearbyLocations] = useState<Location[]>([]);
  
  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation(position.coords);
          
          // Get nearby locations based on user coordinates
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;
          const locations = getNearbyLocations(userLat, userLng);
          setNearbyLocations(locations.slice(0, 3)); // Limit to 3 for this component
        },
        (error) => {
          console.error("Error getting location:", error);
          // Use a default set of locations if geolocation fails
          const defaultLocations = getNearbyLocations(34.0522, -118.2437); // Los Angeles
          setNearbyLocations(defaultLocations.slice(0, 3));
        }
      );
    } else {
      // Use a default set of locations if geolocation is not available
      const defaultLocations = getNearbyLocations(34.0522, -118.2437); // Los Angeles
      setNearbyLocations(defaultLocations.slice(0, 3));
    }
  }, []);
  
  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location);
    // Navigate to venue page
    navigate(`/venue/${location.id}`);
  };
  
  const handleCitySelect = (cityName: string) => {
    navigate(`/explore?q=${encodeURIComponent(cityName)}`);
  };
  
  const toggleMapExpansion = () => {
    setIsMapExpanded(!isMapExpanded);
    
    // Trigger map resize after state update
    setTimeout(() => {
      if (window.resizeMap) {
        window.resizeMap();
      }
    }, 10);
  };
  
  return (
    <>
      {isMapExpanded && (
        <div className="fixed inset-0 z-50 bg-background p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Vibes Nearby</h2>
            <Button variant="ghost" size="sm" className="gap-1" onClick={toggleMapExpansion}>
              <ArrowRight className="h-4 w-4" />
              Close Map
            </Button>
          </div>
          <div className="h-[85vh] rounded-lg overflow-hidden">
            <OpenStreetMap
              userLocation={userLocation}
              locations={nearbyLocations}
              searchedCity=""
              mapStyle={mapStyle}
              onLocationSelect={handleLocationSelect}
              selectedLocation={selectedLocation}
              userAddressLocation={null}
              showAllCities={true}
            />
          </div>
        </div>
      )}
    
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl flex items-center justify-between">
            <div className="flex items-center">
              <MapPin className="h-5 w-5 mr-2" />
              <span>Vibes Nearby</span>
            </div>
            <Button variant="ghost" size="sm" className="gap-1" onClick={toggleMapExpansion}>
              <Navigation className="h-4 w-4" />
              View Map
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {nearbyLocations.map((location) => (
              <div key={location.id} className="flex justify-between items-center">
                <div>
                  <div className="font-medium flex items-center">
                    {location.name}
                    {(location.verified || location.isVerified) && (
                      <VerifiedBadge />
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {location.city}, {location.state || location.country}
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => navigate(`/venue/${location.id}`)}
                >
                  View Vibes
                </Button>
              </div>
            ))}
          </div>
          <Button 
            variant="link" 
            className="mt-4 p-0 h-auto text-primary flex items-center" 
            onClick={() => navigate('/explore')}
          >
            <span>Explore all locations</span>
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </CardContent>
      </Card>
    </>
  );
};

export default LocationsNearby;
