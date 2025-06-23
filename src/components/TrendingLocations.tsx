
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Location } from "@/types";
import { mockLocations } from "@/mock/locations";
import { getTrendingLocationsForCity } from "@/mock/cityLocations";
import { toast } from "sonner";

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

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
  const [trendingLocations, setTrendingLocations] = useState(mockLocations.slice(0, 3));
  const [currentCity, setCurrentCity] = useState("Los Angeles");
  const [geolocationAttempted, setGeolocationAttempted] = useState(false);
  
  // Use Google Maps to determine user's location
  useEffect(() => {
    if (!geolocationAttempted && navigator.geolocation) {
      setGeolocationAttempted(true);
      
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            // Use Google's Geocoding API to get the city name from coordinates
            const response = await fetch(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=${GOOGLE_MAPS_API_KEY}`
            );
            
            if (response.ok) {
              const data = await response.json();
              
              if (data.results && data.results.length > 0) {
                // Try to find the city component
                const addressComponents = data.results[0].address_components;
                const cityComponent = addressComponents.find(
                  (component: any) => 
                    component.types.includes('locality') || 
                    component.types.includes('administrative_area_level_1')
                );
                
                if (cityComponent) {
                  const detectedCity = cityComponent.long_name;
                  setCurrentCity(detectedCity);
                  
                  // Get trending locations for the detected city
                  const cityTrending = getTrendingLocationsForCity(detectedCity);
                  if (cityTrending.length > 0) {
                    setTrendingLocations(cityTrending);
                  }
                }
              }
            }
          } catch (error) {
            console.error("Error getting city from coordinates:", error);
            // Fall back to default trending locations
            const defaultTrending = getTrendingLocationsForCity("Los Angeles");
            if (defaultTrending.length > 0) {
              setTrendingLocations(defaultTrending);
            }
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          // Fall back to default trending locations
          const defaultTrending = getTrendingLocationsForCity("Los Angeles");
          if (defaultTrending.length > 0) {
            setTrendingLocations(defaultTrending);
          }
        }
      );
    }
  }, [geolocationAttempted]);
  
  // Initialize with trending locations for a default city if geolocation fails
  useEffect(() => {
    if (!geolocationAttempted) {
      const defaultTrending = getTrendingLocationsForCity("Los Angeles");
      if (defaultTrending.length > 0) {
        setTrendingLocations(defaultTrending);
      }
    }
  }, [geolocationAttempted]);
  
  useEffect(() => {
    // Listen for updates from VernonChat
    const handleUpdate = (data: { cityName: string, events: Location[] }) => {
      const { cityName, events } = data;
      
      setCurrentCity(cityName);
      
      // Replace trending locations with the new events
      if (events && events.length > 0) {
        setTrendingLocations(events);
        
        // Show toast notification
        toast.success(`Updated trending locations for ${cityName}`);
      } else {
        // If no events were provided, get trending locations for the city
        const cityTrending = getTrendingLocationsForCity(cityName);
        if (cityTrending.length > 0) {
          setTrendingLocations(cityTrending);
        }
      }
    };
    
    eventBus.on('trending-locations-update', handleUpdate);
    
    // Cleanup listener on unmount
    return () => {
      eventBus.listeners.delete('trending-locations-update');
    };
  }, []);
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center">
          <TrendingUp className="h-5 w-5 mr-2" />
          <span>Trending in {currentCity}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {trendingLocations.map((location) => (
            <div 
              key={location.id} 
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
              </div>
              <Button variant="ghost" size="sm" className="h-8" asChild>
                <a href={`/venue/${location.id}`}>
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TrendingLocations;
