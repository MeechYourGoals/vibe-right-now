
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, TrendingUp, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Location } from "@/types";
import { mockLocations } from "@/mock/locations";
import { getNearbyLocations } from "@/mock/cityLocations";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { calculateDistance, getReferencePoint } from '@/components/map/common/DistanceCalculator';

// Event bus for updating trending locations from VernonChat
export const eventBus = {
  listeners: new Map<string, Function[]>(),
  
  on(event: string, callback: Function) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)?.push(callback);
  },
  
  emit(event: string, data: any) {
    if (this.listeners.has(event)) {
      this.listeners.get(event)?.forEach(callback => callback(data));
    }
  }
};

// Export function for VernonChat to update trending locations
export const updateTrendingLocations = (cityName: string, events: Location[]) => {
  eventBus.emit('trending-locations-update', { cityName, events });
};

const TrendingLocations = () => {
  // Default to some popular locations if no city is specified
  const [trendingLocations, setTrendingLocations] = useState<Location[]>([]);
  const [userLocation, setUserLocation] = useState<GeolocationCoordinates | null>(null);
  const [userAddressLocation, setUserAddressLocation] = useState<[number, number] | null>(null);
  const [loading, setLoading] = useState(true);
  const [geolocationAttempted, setGeolocationAttempted] = useState(false);
  
  // Use geolocation to determine user's location
  useEffect(() => {
    if (!geolocationAttempted && navigator.geolocation) {
      setGeolocationAttempted(true);
      
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation(position.coords);
          setLoading(false);
          
          // Get nearby locations within 10 miles
          const nearbyLocations = getNearbyLocations(
            position.coords.latitude,
            position.coords.longitude,
            10 // 10 mile radius
          );
          
          if (nearbyLocations.length > 0) {
            // Get a random subset for trending
            const randomTrending = [...nearbyLocations]
              .sort(() => 0.5 - Math.random())
              .slice(0, 3);
            setTrendingLocations(randomTrending);
          } else {
            // Fallback to default locations
            setTrendingLocations(mockLocations.slice(0, 3));
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          setLoading(false);
          // Fall back to default trending locations
          setTrendingLocations(mockLocations.slice(0, 3));
        },
        { enableHighAccuracy: true }
      );
    }
  }, [geolocationAttempted]);
  
  // Initialize with trending locations for fallback
  useEffect(() => {
    if (!geolocationAttempted) {
      setTrendingLocations(mockLocations.slice(0, 3));
      setLoading(false);
    }
  }, [geolocationAttempted]);
  
  useEffect(() => {
    // Listen for updates from VernonChat
    const handleUpdate = (data: { cityName: string, events: Location[] }) => {
      const { cityName, events } = data;
      
      // Replace trending locations with the new events
      if (events && events.length > 0) {
        setTrendingLocations(events);
        
        // Show toast notification
        toast.success(`Updated trending locations for ${cityName}`);
      } else {
        // If no events were provided, get trending locations for the city
        const cityTrending = getNearbyLocations(
          userLocation?.latitude || 34.0522, // Default LA coords if no location
          userLocation?.longitude || -118.2437,
          10
        );
        
        if (cityTrending.length > 0) {
          setTrendingLocations(cityTrending.slice(0, 3));
        }
      }
    };
    
    eventBus.on('trending-locations-update', handleUpdate);
    
    // Cleanup listener on unmount
    return () => {
      eventBus.listeners.delete('trending-locations-update');
    };
  }, [userLocation]);

  // Get the reference point for distance calculations
  const referencePoint = getReferencePoint(userAddressLocation, userLocation);
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center">
          <TrendingUp className="h-5 w-5 mr-2" />
          <span>Trending Nearby</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {loading ? (
            <div className="flex justify-center py-4">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            </div>
          ) : (
            trendingLocations.map((location) => (
              <Link 
                key={location.id} 
                to={`/venue/${location.id}`} 
                className="p-3 border rounded-lg flex justify-between items-center hover:bg-accent/10 transition-colors"
              >
                <div>
                  <div className="font-medium">{location.name}</div>
                  <div className="text-sm text-muted-foreground flex items-center gap-2">
                    <span>{location.city}, {location.state || location.country}</span>
                    <Badge variant="outline" className="text-xs">
                      {location.type}
                    </Badge>
                  </div>
                  {referencePoint && (
                    <div className="text-xs text-primary flex items-center mt-1">
                      <MapPin className="h-3 w-3 mr-1" />
                      {calculateDistance(
                        referencePoint.lat, 
                        referencePoint.lng, 
                        location.lat, 
                        location.lng
                      )}
                    </div>
                  )}
                </div>
                <Button variant="ghost" size="sm" className="h-8">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TrendingLocations;
