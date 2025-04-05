
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Navigation, Compass } from "lucide-react";
import { mockLocations } from "@/mock/locations";
import { Location } from "@/types";
import { useNavigate } from "react-router-dom";

const NearbyVibesMap = () => {
  const [userLocation, setUserLocation] = useState<GeolocationCoordinates | null>(null);
  const [nearbyLocations, setNearbyLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation(position.coords);
          setLoading(false);
          
          // Filter locations within 10 miles of user
          // In a real app, this would be a backend query
          const nearbyVenues = mockLocations.filter((location) => {
            // Simple distance calculation for demo purposes
            const distance = Math.sqrt(
              Math.pow(location.lat - position.coords.latitude, 2) +
              Math.pow(location.lng - position.coords.longitude, 2)
            );
            // Convert to roughly miles (this is very approximate)
            const milesAway = distance * 69;
            return milesAway <= 10;
          });
          
          setNearbyLocations(nearbyVenues);
        },
        (error) => {
          console.error("Error getting location:", error);
          setLoading(false);
          // Use all locations as fallback
          setNearbyLocations(mockLocations);
        }
      );
    } else {
      setLoading(false);
      setNearbyLocations(mockLocations);
    }
  }, []);

  const handleViewMap = () => {
    navigate("/explore");
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Nearby Vibes</h2>
        <Button variant="ghost" size="sm" className="gap-1" onClick={handleViewMap}>
          <Navigation className="h-4 w-4" />
          View Map
        </Button>
      </div>
      
      {loading ? (
        <div className="h-60 bg-muted/20 rounded-lg flex items-center justify-center">
          <div className="animate-spin">
            <Compass className="h-8 w-8 text-muted-foreground" />
          </div>
        </div>
      ) : (
        <div 
          className="relative h-60 bg-muted/20 rounded-lg overflow-hidden cursor-pointer hover:bg-muted/30 transition-colors"
          onClick={handleViewMap}
        >
          {/* Placeholder for actual map integration */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10">
            {/* Placeholder map dots */}
            {nearbyLocations.map((location, index) => (
              <div 
                key={location.id}
                className="absolute animate-pulse h-3 w-3 rounded-full bg-primary"
                style={{ 
                  left: `${30 + Math.random() * 40}%`, 
                  top: `${20 + Math.random() * 60}%`,
                  animationDelay: `${index * 0.2}s`
                }}
              >
                <div className="absolute -inset-1 rounded-full bg-primary/30 animate-ping"></div>
              </div>
            ))}
            
            {/* User location */}
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="h-5 w-5 rounded-full bg-accent animate-pulse">
                <div className="absolute -inset-1 rounded-full bg-accent/30 animate-ping"></div>
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 p-3 glass-effect">
            <p className="text-sm">
              {nearbyLocations.length} Vibes within 10 miles of you
            </p>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-2 gap-3">
        {nearbyLocations.slice(0, 4).map((location) => (
          <Card key={location.id} className="hover:bg-muted/20 transition-colors">
            <CardContent className="p-3">
              <div className="font-medium text-sm truncate">{location.name}</div>
              <div className="text-xs text-muted-foreground flex items-center mt-1">
                <MapPin className="h-3 w-3 mr-1" />
                <span className="truncate">{location.city}</span>
              </div>
              <div className="mt-2">
                <Button variant="outline" size="sm" className="w-full h-7 text-xs">View Vibes</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {nearbyLocations.length > 4 && (
        <Button variant="ghost" size="sm" className="w-full" onClick={handleViewMap}>
          See All {nearbyLocations.length} Nearby Locations
        </Button>
      )}
    </div>
  );
};

export default NearbyVibesMap;
