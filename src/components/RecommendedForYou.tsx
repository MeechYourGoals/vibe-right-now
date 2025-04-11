
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { mockLocations } from "@/mock/data";
import { Location } from "@/types";
import { MapPin, Users, Crown } from "lucide-react";
import { getMediaForLocation } from "@/utils/map/locationMediaUtils";
import { Badge } from "@/components/ui/badge";

interface RecommendedForYouProps {
  featuredLocations?: string[];
}

const RecommendedForYou: React.FC<RecommendedForYouProps> = ({ featuredLocations }) => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [followStates, setFollowStates] = useState<Record<string, boolean>>({});

  // Mock user preferences for demonstration
  const userPreferences = ["Live Music", "Sports", "Outdoors", "Locally Owned"];

  const getVisitorCount = (locationId: string) => {
    const seed = parseInt(locationId) || 10;
    return Math.floor((seed * 13) % 140) + 10;
  };

  // Determine if a location is a premium venue (paid subscription)
  const isPremiumVenue = (locationId: string) => {
    // This is a mock implementation - in a real app, this would check subscription status
    return parseInt(locationId) % 3 === 0; // Every third venue is "premium"
  };

  // Get a reason for recommendation
  const getRecommendationReason = (location: Location) => {
    if (isPremiumVenue(location.id)) {
      return "Promoted";
    }
    
    // Check if any location tags match user preferences
    const matchingPreferences = userPreferences.filter(pref => 
      location.tags && location.tags.includes(pref)
    );
    
    if (matchingPreferences.length > 0) {
      return `Matches your ${matchingPreferences[0]} preference`;
    }
    
    return "Near you";
  };

  useEffect(() => {
    // Mix of featured, preference-matched, and premium venues
    let recommendedLocations: Location[] = [];
    
    // First, get any explicitly featured locations
    if (featuredLocations && featuredLocations.length > 0) {
      const locationMap = new Map(mockLocations.map(loc => [loc.id, loc]));
      const filteredLocations = featuredLocations
        .map(id => locationMap.get(id))
        .filter((loc): loc is Location => loc !== undefined);
      
      recommendedLocations = [...recommendedLocations, ...filteredLocations];
    }
    
    // Add locations matching user preferences
    const preferenceLocations = mockLocations.filter(location => {
      // Make sure location.tags exists before trying to use it
      return location.tags && location.tags.some(tag => userPreferences.includes(tag));
    }).slice(0, 3);
    
    // Add premium/promoted venues
    const premiumLocations = mockLocations.filter(location => 
      isPremiumVenue(location.id) && 
      !recommendedLocations.some(rec => rec.id === location.id) &&
      !preferenceLocations.some(pref => pref.id === location.id)
    ).slice(0, 2);
    
    // Combine and limit to 5 recommendations
    recommendedLocations = [
      ...recommendedLocations,
      ...preferenceLocations, 
      ...premiumLocations
    ].slice(0, 5);
    
    // If we still need more, add random locations
    if (recommendedLocations.length < 5) {
      const randomLocations = mockLocations
        .filter(loc => !recommendedLocations.some(rec => rec.id === loc.id))
        .sort(() => 0.5 - Math.random())
        .slice(0, 5 - recommendedLocations.length);
      
      recommendedLocations = [...recommendedLocations, ...randomLocations];
    }
    
    setLocations(recommendedLocations);

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
                  <AvatarImage src={getMediaForLocation(location)[0]?.url} alt={location.name} />
                  <AvatarFallback>{location.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="font-medium text-sm">{location.name}</p>
                    {isPremiumVenue(location.id) && (
                      <Badge variant="outline" className="h-4 px-1 py-0 bg-amber-100 text-amber-800 border-amber-300">
                        <Crown className="h-2.5 w-2.5 mr-0.5" />
                        <span className="text-xs">Pro</span>
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3 mr-1" />
                    {location.city}, {location.state}
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground mt-0.5">
                    <Users className="h-3 w-3 mr-1" />
                    {getVisitorCount(location.id)} users this week
                  </div>
                  <div className="text-xs text-primary mt-0.5">
                    {getRecommendationReason(location)}
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
