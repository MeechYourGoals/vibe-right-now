
import React from "react";
import { Link } from "react-router-dom";
import { formatDistance } from "date-fns";
import { ExternalLink, VerifiedIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Location } from "@/types";

interface VenuePostHeaderProps {
  venue: Location;
  timestamp: string;
  isExternalContent?: boolean;
  sourcePlatform?: string;
  timeAgo?: string;
}

const VenuePostHeader: React.FC<VenuePostHeaderProps> = ({ 
  venue, 
  timestamp, 
  isExternalContent = false,
  sourcePlatform,
  timeAgo
}) => {
  const formattedDate = new Date(timestamp).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
  
  const formattedTime = new Date(timestamp).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit'
  });

  return (
    <div className="flex justify-between items-start gap-4">
      <div className="flex items-center gap-3">
        <Link to={`/venue/${venue.id}`}>
          <Avatar className="h-10 w-10 border">
            <AvatarImage 
              src={`https://source.unsplash.com/100x100/?${venue.type},venue,${venue.name}`} 
              alt={venue.name} 
            />
            <AvatarFallback>{venue.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </Link>
        
        <div>
          <div className="flex items-center gap-1.5">
            <Link to={`/venue/${venue.id}`} className="font-medium hover:underline">
              {venue.name}
            </Link>
            
            {venue.verified && (
              <VerifiedIcon className="h-4 w-4 text-blue-500" />
            )}
            
            {isExternalContent && (
              <Badge variant="secondary" className="text-xs flex items-center gap-1">
                <ExternalLink className="h-3 w-3" />
                {sourcePlatform || 'External'}
              </Badge>
            )}
          </div>
          
          <div className="flex items-center text-xs text-muted-foreground">
            <span>{formattedDate}</span>
            <span className="mx-1">•</span>
            <span>{formattedTime}</span>
            {timeAgo && (
              <>
                <span className="mx-1">•</span>
                <span>{timeAgo}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VenuePostHeader;
