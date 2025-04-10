
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { mockLocations } from "@/mock/data";
import { Location } from "@/types";
import { MapPin, Users } from "lucide-react";
import { getMediaForLocation } from "@/utils/map/locationMediaUtils";

interface RecommendedForYouProps {
  featuredLocations?: string[];
}

const RecommendedForYou: React.FC<RecommendedForYouProps> = ({ featuredLocations }) => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [followStates, setFollowStates] = useState<Record<string, boolean>>({});

  const getVisitorCount = (locationId: string) => {
    const seed = parseInt(locationId) || 10;
    return Math.floor((seed * 13) % 140) + 10;
  };

  useEffect(() => {
    const premiumLocations = mockLocations.filter(location => 
      location.type === "restaurant" || location.type === "event" || location.type === "sports"
    );
    
    if (featuredLocations && featuredLocations.length > 0) {
      const locationMap = new Map(mockLocations.map(loc => [loc.id, loc]));
      
      const filteredLocations = featuredLocations
        .map(id => locationMap.get(id))
        .filter((loc): loc is Location => loc !== undefined);
      
      setLocations(filteredLocations.length > 0 ? filteredLocations : premiumLocations.slice(0, 5));
    } else {
      setLocations(premiumLocations
        .sort(() => 0.5 - Math.random())
        .slice(0, 5));
    }

    const initialFollowStates: Record<string, boolean> = {};
    mockLocations.forEach(location => {
      initialFollowStates[location.id] = false;
    });
    setFollowStates(initialFollowStates);
  }, [featuredLocations]);

  const toggleFollow = (locationId: string, e: React.MouseEvent) => {
    e.preventDefault();
    setFollowStates(prev => ({
      ...prev,
      [locationId]: !prev[locationId]
    }));
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Recommended For You</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {locations.map((location) => (
            <div key={location.id} className="flex items-center justify-between">
              <Link 
                to={`/venue/${location.id}`} 
                className="flex items-center space-x-3"
              >
                <Avatar>
                  <AvatarImage src={getMediaForLocation(location).url} alt={location.name} />
                  <AvatarFallback>{location.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-sm">{location.name}</p>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3 mr-1" />
                    {location.city}, {location.state}
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground mt-0.5">
                    <Users className="h-3 w-3 mr-1" />
                    {getVisitorCount(location.id)} users this week
                  </div>
                </div>
              </Link>
              <Button
                variant="outline"
                size="sm"
                className={followStates[location.id] ? "bg-primary/10" : ""}
                onClick={(e) => toggleFollow(location.id, e)}
              >
                {followStates[location.id] ? "Following" : "Follow"}
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecommendedForYou;
