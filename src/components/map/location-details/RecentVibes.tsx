
import { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatTimeAgo } from "@/utils/timeUtils";
import { Sparkles } from "lucide-react";
import { VenueService } from '@/services/VenueService';
import type { Location } from '@/types';

export interface RecentVibesProps {
  locationId: string;
}

export default function RecentVibes({ locationId }: RecentVibesProps) {
  const [location, setLocation] = useState<Location | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        setIsLoading(true);
        const locationData = await VenueService.getVenueById(locationId);
        setLocation(locationData);
      } catch (error) {
        console.error("Error fetching location:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchLocation();
  }, [locationId]);

  // If location is still loading
  if (isLoading) {
    return (
      <Card className="mt-4 shadow-sm">
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold">Recent Vibes</h3>
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <p className="text-sm text-muted-foreground">Loading recent vibes...</p>
        </CardContent>
      </Card>
    );
  }
  
  // If no location data found
  if (!location) {
    return (
      <Card className="mt-4 shadow-sm">
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold">Recent Vibes</h3>
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <p className="text-sm text-muted-foreground">No recent vibes available.</p>
        </CardContent>
      </Card>
    );
  }

  // Simulate recent vibes for the prototype
  const vibes = location.vibes || ["Energetic", "Crowded", "Popular"];
  
  return (
    <Card className="mt-4 shadow-sm">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">Recent Vibes</h3>
          <Sparkles className="h-5 w-5 text-primary" />
        </div>
        
        <div className="space-y-4">
          {/* Current vibes */}
          <div>
            <p className="text-sm font-medium">Current Vibes</p>
            <div className="flex flex-wrap gap-2 mt-1">
              {vibes.map((vibe, index) => (
                <Badge key={index} variant="secondary">{vibe}</Badge>
              ))}
            </div>
          </div>
          
          {/* Recent updates */}
          <div>
            <p className="text-sm font-medium">Recent Updates</p>
            <div className="space-y-2 mt-2">
              <div className="flex items-center justify-between">
                <p className="text-sm">Crowd level increased</p>
                <span className="text-xs text-muted-foreground">{formatTimeAgo(new Date(Date.now() - 1800000))}</span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm">Music level increased</p>
                <span className="text-xs text-muted-foreground">{formatTimeAgo(new Date(Date.now() - 3600000))}</span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm">New photos added</p>
                <span className="text-xs text-muted-foreground">{formatTimeAgo(new Date(Date.now() - 7200000))}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
