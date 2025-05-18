
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";
import { Location } from "@/types";
import { getMediaForLocation } from "@/utils/map/locationMediaUtils";

interface PlaceCardProps {
  place: Location;
}

export const PlaceCard = ({ place }: PlaceCardProps) => {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 2;
  
  // Get image URL from the utility function
  const placeMedia = getMediaForLocation(place);
  
  // Generate initials for fallback
  const getInitials = (name: string) => {
    return name.split(' ').map(part => part[0]).join('').slice(0, 2).toUpperCase();
  };

  // Fallback image based on venue type
  const getFallbackImage = () => {
    const typeMap: Record<string, string> = {
      "restaurant": "https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=600",
      "bar": "https://images.pexels.com/photos/34631/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600",
      "event": "https://images.pexels.com/photos/2263436/pexels-photo-2263436.jpeg?auto=compress&cs=tinysrgb&w=600",
      "attraction": "https://images.pexels.com/photos/290386/pexels-photo-290386.jpeg?auto=compress&cs=tinysrgb&w=600",
      "sports": "https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?auto=compress&cs=tinysrgb&w=600",
    };
    
    return typeMap[place.type as string] || "https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg?auto=compress&cs=tinysrgb&w=600";
  };
  
  const handleImageError = () => {
    if (retryCount < maxRetries) {
      setRetryCount(retryCount + 1);
    } else {
      setImageError(true);
    }
  };
  
  // Get the image source to use
  const getImageSource = () => {
    if (imageError) {
      return getFallbackImage();
    } else if (retryCount === 1) {
      return getFallbackImage();
    } else {
      return placeMedia.url;
    }
  };
  
  return (
    <Card 
      className="hover:bg-accent/10 transition-colors cursor-pointer"
      onClick={() => navigate(`/venue/${place.id}`)}
    >
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12">
            <AvatarImage 
              src={getImageSource()} 
              alt={place.name} 
              onError={handleImageError}
            />
            <AvatarFallback>{getInitials(place.name)}</AvatarFallback>
          </Avatar>
          <div>
            <h4 className="font-medium">{place.name}</h4>
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="h-3 w-3 mr-1" />
              <span>{place.city}, {place.state || place.country}</span>
            </div>
            <Badge variant="outline" className="mt-1 text-xs bg-muted">
              {place.type}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
