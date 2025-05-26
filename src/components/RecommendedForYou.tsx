
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, Star } from "lucide-react";
import { mockLocations } from "@/mock/locations";
import { Location } from "@/types";
import { PREFERENCE_TAGS } from "@/pages/settings/constants";

interface RecommendedForYouProps {
  featuredLocations: string[];
}

const RecommendedForYou = ({ featuredLocations }: RecommendedForYouProps) => {
  const navigate = useNavigate();
  const [userPreferences, setUserPreferences] = useState<string[]>([]);
  const [recommendedLocations, setRecommendedLocations] = useState<Location[]>([]);

  useEffect(() => {
    // Try to get user preferences from local storage
    try {
      const storedPreferences = localStorage.getItem('userPreferences');
      if (storedPreferences) {
        setUserPreferences(JSON.parse(storedPreferences));
      } else {
        // Default preferences if none are stored
        setUserPreferences(["Trendy", "NightOwl", "Cozy"]);
      }
    } catch (error) {
      console.error("Error loading user preferences:", error);
      // Fallback to default preferences
      setUserPreferences(["Trendy", "NightOwl", "Cozy"]);
    }
  }, []);

  useEffect(() => {
    if (userPreferences && userPreferences.length > 0) {
      // Filter locations to match user preferences
      const matchingLocations = mockLocations.filter(location => {
        // Check if location has at least one matching tag
        return location.vibeTags && location.vibeTags.some(tag => 
          userPreferences.includes(tag)
        );
      });

      if (matchingLocations.length > 0) {
        setRecommendedLocations(matchingLocations.slice(0, 3));
      } else {
        // Fallback to featured locations if no matches
        const featured = mockLocations.filter(location => 
          featuredLocations.includes(location.id)
        );
        setRecommendedLocations(featured.slice(0, 3));
      }
    } else {
      // Use featured locations if no preferences
      const featured = mockLocations.filter(location => 
        featuredLocations.includes(location.id)
      );
      setRecommendedLocations(featured.slice(0, 3));
    }
  }, [userPreferences, featuredLocations]);

  const handleLocationClick = (locationId: string) => {
    navigate(`/venue/${locationId}`);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">Recommended For You</CardTitle>
        <CardDescription>
          Based on your preferences
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {recommendedLocations.map(location => (
          <div 
            key={location.id}
            className="flex items-start gap-3 cursor-pointer hover:bg-muted p-2 rounded-md transition"
            onClick={() => handleLocationClick(location.id)}
          >
            <div 
              className="w-14 h-14 rounded-md bg-cover bg-center" 
              style={{ 
                backgroundImage: location.images && location.images.length > 0 
                  ? `url(${location.images[0]})` 
                  : 'url(/placeholder.svg)' 
              }}
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1">
                <h3 className="font-medium text-sm truncate">{location.name}</h3>
                {location.verified && <Star className="h-3 w-3 text-amber-500 fill-amber-500" />}
              </div>
              <p className="text-xs text-muted-foreground">{location.city}, {location.state}</p>
              <div className="flex gap-1 mt-1 flex-wrap">
                {location.vibeTags?.slice(0, 2).map((tag, idx) => (
                  <span key={idx} className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter className="pt-1">
        <Button 
          variant="ghost" 
          size="sm" 
          className="w-full justify-between text-xs"
          onClick={() => navigate('/explore')}
        >
          See more recommendations
          <ChevronRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RecommendedForYou;
