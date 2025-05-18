
import React, { useState } from "react";
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
  
  // Get image URL from the utility function
  const placeMedia = getMediaForLocation(place);
  
  // Generate initials for fallback
  const getInitials = (name: string) => {
    return name.split(' ').map(part => part[0]).join('').slice(0, 2).toUpperCase();
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
              src={placeMedia.url} 
              alt={place.name} 
              onError={() => setImageError(true)}
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
