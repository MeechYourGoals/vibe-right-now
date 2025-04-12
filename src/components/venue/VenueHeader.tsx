
import React from 'react';
import { Location } from "@/types";
import VenueActionButton from "./VenueActionButton";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Clock, Bookmark, Share, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VenueHeaderProps {
  venue: Location;
}

const VenueHeader: React.FC<VenueHeaderProps> = ({ venue }) => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
            {venue.name}
            {venue.verified && (
              <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">
                <Info className="h-3 w-3 mr-1" />
                Verified
              </Badge>
            )}
          </h1>
          <div className="flex items-center text-muted-foreground mt-1 text-sm">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{venue.address}, {venue.city}, {venue.state}</span>
          </div>
          
          {venue.rating && (
            <div className="flex items-center mt-2">
              <Star className="h-4 w-4 text-amber-500 mr-1" />
              <span className="font-medium">{venue.rating}</span>
              <span className="text-muted-foreground ml-1">({Math.floor(Math.random() * 500) + 100} reviews)</span>
            </div>
          )}
        </div>
        
        <div className="flex flex-wrap gap-2">
          <VenueActionButton venue={venue} />
          
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Share className="h-4 w-4" />
            <span>Share</span>
          </Button>
          
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>Hours</span>
          </Button>
        </div>
      </div>
      
      {venue.type && (
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">
            {venue.type.charAt(0).toUpperCase() + venue.type.slice(1)}
          </Badge>
          {venue.tags && venue.tags.map((tag, index) => (
            <Badge key={index} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

export default VenueHeader;
