
import React from 'react';
import { Venue } from "@/types";
import { Button } from "@/components/ui/button";
import { ShareIcon, Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface VenueHeaderProps {
  venue: Venue;
}

const VenueHeader: React.FC<VenueHeaderProps> = ({ venue }) => {
  const { name, rating, category, tags = [], verified } = venue;
  
  return (
    <div className="space-y-2">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center">
            {name}
            {verified && (
              <Badge variant="outline" className="ml-2 bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800">
                Verified
              </Badge>
            )}
          </h1>
          
          <div className="flex items-center mt-1 space-x-4">
            {rating && (
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-500 mr-1 fill-yellow-500" />
                <span>{rating.toFixed(1)}</span>
              </div>
            )}
            
            {category && (
              <Badge variant="secondary">{category}</Badge>
            )}
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <ShareIcon className="w-4 h-4 mr-1" />
            Share
          </Button>
          <Button size="sm">Check In</Button>
        </div>
      </div>
      
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {tags.map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      )}
      
      {venue.images && venue.images.length > 0 ? (
        <div className="grid grid-cols-3 gap-2 mt-4 h-64">
          <img 
            src={venue.images[0]} 
            alt={venue.name}
            className="col-span-2 h-full w-full object-cover rounded-l-md"
          />
          <div className="grid grid-rows-2 gap-2 h-full">
            {venue.images[1] && (
              <img 
                src={venue.images[1]} 
                alt={venue.name}
                className="h-full w-full object-cover rounded-tr-md"
              />
            )}
            {venue.images[2] && (
              <img 
                src={venue.images[2]} 
                alt={venue.name}
                className="h-full w-full object-cover rounded-br-md"
              />
            )}
          </div>
        </div>
      ) : (
        <div className="h-48 bg-muted rounded-md flex items-center justify-center">
          <p className="text-muted-foreground">No images available</p>
        </div>
      )}
    </div>
  );
};

export default VenueHeader;
