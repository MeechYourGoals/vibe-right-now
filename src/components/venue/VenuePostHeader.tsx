
import React from 'react';
import { formatDistanceToNow } from "date-fns";
import { Location } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock, MapPin, VerifiedIcon } from "lucide-react";

interface VenuePostHeaderProps {
  venue: Location;
  timestamp: string;
}

const VenuePostHeader: React.FC<VenuePostHeaderProps> = ({ venue, timestamp }) => {
  const timeAgo = formatDistanceToNow(new Date(timestamp), { addSuffix: true });

  return (
    <div className="flex justify-between items-start">
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src={`https://source.unsplash.com/random/200x200/?${venue.type}`} alt={venue.name} />
          <AvatarFallback>{venue.name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <div className="font-medium flex items-center">
            {venue.name}
            <VerifiedIcon className="h-4 w-4 ml-1 text-primary" />
          </div>
          <div className="text-sm text-muted-foreground">Official</div>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <div className="flex items-center text-sm text-muted-foreground">
          <Clock className="h-3 w-3 mr-1" />
          <span>Posted {timeAgo}</span>
        </div>
        <div className="flex items-center text-sm mt-1">
          <MapPin className="h-3 w-3 mr-1" />
          <span className="font-medium">{venue.city}, {venue.state}</span>
        </div>
      </div>
    </div>
  );
};

export default VenuePostHeader;
