
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";
import { Location } from "@/types";

interface PlaceCardProps {
  place: Location;
}

export const PlaceCard = ({ place }: PlaceCardProps) => {
  const navigate = useNavigate();
  
  return (
    <Card 
      className="hover:bg-accent/10 transition-colors cursor-pointer"
      onClick={() => navigate(`/venue/${place.id}`)}
    >
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src={`https://source.unsplash.com/random/200x200/?${place.type}`} alt={place.name} />
            <AvatarFallback>{place.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h4 className="font-medium">{place.name}</h4>
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="h-3 w-3 mr-1" />
              <span>{place.city}, {place.state || place.country || "USA"}</span>
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

export default PlaceCard;
