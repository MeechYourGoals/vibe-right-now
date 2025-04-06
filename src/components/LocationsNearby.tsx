
import { useState } from "react";
import { mockLocations } from "@/mock/locations";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, ArrowRight, VerifiedIcon, Navigation } from "lucide-react";
import GoogleMap from "./map/GoogleMap";
import { Location } from "@/types";

const LocationsNearby = () => {
  const navigate = useNavigate();
  const [isMapExpanded, setIsMapExpanded] = useState(false);
  const [mapStyle, setMapStyle] = useState<"default" | "terrain" | "satellite">("default");
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  
  // In a real app, this would use geolocation to find actually nearby locations
  const nearbyLocations = mockLocations.slice(0, 3);
  
  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location);
    // Navigate to location page
    navigate(`/venue/${location.id}`);
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
            <GoogleMap
              userLocation={null}
              locations={nearbyLocations}
              searchedCity=""
              mapStyle={mapStyle}
              onLocationSelect={handleLocationSelect}
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
                    {location.verified && (
                      <VerifiedIcon className="h-3 w-3 ml-1 text-primary" />
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {location.city}, {location.state}
                  </div>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <a href={`/venue/${location.id}`}>
                    View Vibes
                  </a>
                </Button>
              </div>
            ))}
          </div>
          <Button 
            variant="link" 
            className="mt-4 p-0 h-auto text-primary flex items-center" 
            asChild
          >
            <a href="/explore">
              <span>Explore all locations</span>
              <ArrowRight className="h-4 w-4 ml-1" />
            </a>
          </Button>
        </CardContent>
      </Card>
    </>
  );
};

export default LocationsNearby;
