
import { mockLocations } from "@/mock/locations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from 'react';
import { Location } from "@/types";

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
  // In a real implementation, this would be calculated based on post activity
  const [trendingLocations, setTrendingLocations] = useState(mockLocations.slice(2, 5));
  
  useEffect(() => {
    // Listen for updates from VernonChat
    const handleUpdate = (data: { cityName: string, events: Location[] }) => {
      const { cityName, events } = data;
      
      // Replace trending locations with the new events
      if (events && events.length > 0) {
        setTrendingLocations(events);
        
        // Show toast notification
        // This would use the toast component in a real implementation
        console.log(`Updated trending locations for ${cityName}`);
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
          <span>Trending Now</span>
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
                  <span>{location.city}, {location.state}</span>
                  <Badge variant="outline" className="text-xs">
                    {location.type}
                  </Badge>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="h-8" asChild>
                <a href={`/location/${location.id}`}>
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
