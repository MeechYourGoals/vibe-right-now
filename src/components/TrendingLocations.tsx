
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { mockLocations } from "@/mock/data";
import { Location } from "@/types";
import { getMediaForLocationMock } from "@/utils/explore/mockGenerators";

const TrendingLocations: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    // Get user's location for nearby filtering
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          // Fallback to default location (San Francisco)
          setUserLocation({ lat: 37.7749, lng: -122.4194 });
        }
      );
    } else {
      // Fallback for browsers without geolocation
      setUserLocation({ lat: 37.7749, lng: -122.4194 });
    }
  }, []);

  useEffect(() => {
    if (userLocation) {
      // Filter locations within approximately 10 miles radius
      const nearbyLocations = mockLocations.filter(location => {
        if (!location.lat || !location.lng) return false;
        
        // Calculate distance (rough approximation)
        const distance = calculateDistance(
          userLocation.lat,
          userLocation.lng,
          location.lat,
          location.lng
        );
        
        return distance <= 10; // 10 miles radius
      });
      
      // Sort by trending factor and take top 5
      const sortedLocations = nearbyLocations
        .sort(() => 0.5 - Math.random()) // Shuffle
        .sort((a, b) => {
          // Prioritize locations with vibes
          const aVibeCount = a.vibes?.length || 0;
          const bVibeCount = b.vibes?.length || 0;
          return bVibeCount - aVibeCount;
        })
        .slice(0, 5);
      
      setLocations(sortedLocations);
    }
  }, [userLocation]);

  // Calculate distance between two coordinates in miles
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 3958.8; // Radius of the Earth in miles
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c; // Distance in miles
    return distance;
  };

  // Get random vibe tag for each location
  const getVibeTag = (location: Location) => {
    const defaultVibes = ["Trendy", "Popular", "Busy", "Chill", "Local Favorite"];
    
    if (location.vibes && location.vibes.length > 0) {
      return location.vibes[Math.floor(Math.random() * location.vibes.length)];
    }
    
    return defaultVibes[Math.floor(Math.random() * defaultVibes.length)];
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Trending Nearby</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {locations.length === 0 ? (
            <div className="flex justify-center py-4">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            </div>
          ) : (
            locations.map((location) => (
              <Link 
                key={location.id} 
                to={`/venue/${location.id}`}
                className="flex items-center space-x-3 hover:bg-accent rounded-md p-2 transition-colors"
              >
                <Avatar>
                  <AvatarImage 
                    src={getMediaForLocationMock(location)?.url || location.image} 
                    alt={location.name}
                  />
                  <AvatarFallback>{location.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-sm">{location.name}</p>
                    <Badge variant="outline" className="text-xs">
                      {getVibeTag(location)}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{location.city}, {location.state}</p>
                </div>
              </Link>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TrendingLocations;
