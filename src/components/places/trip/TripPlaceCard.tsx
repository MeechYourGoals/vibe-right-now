
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, MapPin } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";
import { TripPlace } from "../TripPlace";

export const TripPlaceCard = ({ placeItem }: { placeItem: TripPlace }) => {
  // Create username from name for profile linking - strip spaces and lowercase
  const getUsername = (name: string) => name.toLowerCase().replace(/\s+/g, '_');
  
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="relative flex-shrink-0">
            <Avatar className="h-12 w-12">
              <AvatarImage 
                src={`https://source.unsplash.com/random/200x200/?${placeItem.place.type}`}
                alt={placeItem.place.name} 
              />
              <AvatarFallback>{placeItem.place.name[0]}</AvatarFallback>
            </Avatar>
            <div 
              className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full border-2 border-background"
              style={{ backgroundColor: placeItem.addedBy.colorCode }}
            />
          </div>
          
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <h3 className="font-medium">
                <Link to={`/venue/${placeItem.place.id}`} className="hover:underline">
                  {placeItem.place.name}
                </Link>
              </h3>
              <Badge variant="outline" className="ml-2 text-xs">
                {placeItem.place.type}
              </Badge>
            </div>
            
            <div className="flex items-center text-sm text-muted-foreground mt-1">
              <MapPin className="h-3 w-3 mr-1" />
              <span>{placeItem.place.city}, {placeItem.place.country}</span>
            </div>
            
            <div className="mt-3 text-sm">
              <div className="flex justify-between items-center mt-2">
                <div className="flex items-center text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span>Added {formatDistanceToNow(placeItem.addedAt, { addSuffix: true })}</span>
                </div>
                
                <Link 
                  to={`/user/${getUsername(placeItem.addedBy.name)}`} 
                  className="flex items-center text-xs text-muted-foreground hover:underline"
                >
                  <span>by {placeItem.addedBy.name}</span>
                  <Avatar className="h-4 w-4 ml-1">
                    <AvatarImage src={placeItem.addedBy.avatar} alt={placeItem.addedBy.name} />
                    <AvatarFallback>{placeItem.addedBy.name[0]}</AvatarFallback>
                  </Avatar>
                </Link>
              </div>
              
              {placeItem.notes && (
                <div className="mt-2 p-2 bg-muted rounded-md text-xs">
                  <p className="italic">{placeItem.notes}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
