
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Clock, ExternalLink } from "lucide-react";
import { TripPlace } from "../TripPlace";
import { getRideServiceUrl, getOfficialUrl } from "@/utils/locationUtils";

interface TripPlaceCardProps {
  placeItem: TripPlace;
}

export const TripPlaceCard: React.FC<TripPlaceCardProps> = ({ placeItem }) => {
  const colorCode = placeItem.addedBy.colorCode;
  
  return (
    <Card 
      key={placeItem.id} 
      className="transition-all duration-300 hover:shadow-md slide-up-animation"
      style={{ borderLeft: `4px solid ${colorCode}` }}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-base">{placeItem.place.name}</CardTitle>
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="h-3 w-3 mr-1" />
          <span>{placeItem.place.city}</span>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="flex items-center mb-2">
          <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
          <span className="text-sm">Open hours: 9AM-10PM</span>
        </div>
        
        {placeItem.notes && (
          <p className="text-sm text-muted-foreground mt-2 italic">"{placeItem.notes}"</p>
        )}
        
        <div className="flex items-center mt-3">
          <p className="text-xs">Added by</p>
          <Avatar className="h-5 w-5 ml-2 mr-1">
            <AvatarImage src={placeItem.addedBy.avatar} alt={placeItem.addedBy.name} />
            <AvatarFallback>{placeItem.addedBy.name[0]}</AvatarFallback>
          </Avatar>
          <span 
            className="text-xs font-medium" 
            style={{ color: colorCode }}
          >
            {placeItem.addedBy.name}
          </span>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2 pt-0">
        <a 
          href={getRideServiceUrl(placeItem.place)} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex-1"
        >
          <Button variant="outline" size="sm" className="w-full">Order Ride</Button>
        </a>
        <a 
          href={getOfficialUrl(placeItem.place)} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex-1"
        >
          <Button variant="outline" size="sm" className="w-full flex items-center justify-center">
            <span className="mr-1">Website</span>
            <ExternalLink className="h-3 w-3" />
          </Button>
        </a>
      </CardFooter>
    </Card>
  );
};
