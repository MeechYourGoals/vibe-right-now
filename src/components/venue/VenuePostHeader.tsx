
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { MapPin, Calendar, ExternalLink } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Location } from '@/types';
import { Badge } from '@/components/ui/badge';

interface VenuePostHeaderProps {
  venue: Location;
  timestamp: string;
  isExternalContent?: boolean;
  sourcePlatform?: string;
}

const VenuePostHeader: React.FC<VenuePostHeaderProps> = ({ 
  venue, 
  timestamp,
  isExternalContent = false,
  sourcePlatform
}) => {
  const formattedTime = formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  
  // Create venue avatar fallback from the first letter of name
  const avatarFallback = venue.name.charAt(0).toUpperCase();
  
  // For image, use a placeholder based on venue type
  const getVenueAvatarUrl = () => {
    if (venue.logo) return venue.logo;
    
    const typeMap: Record<string, string> = {
      restaurant: 'restaurant',
      bar: 'bar',
      event: 'event',
      attraction: 'attraction',
      sports: 'stadium',
    };
    
    const venueType = typeMap[venue.type] || 'building';
    return `https://source.unsplash.com/64x64/?${venueType}`;
  };

  return (
    <div className="flex items-start gap-3">
      <Avatar className="h-9 w-9">
        <AvatarImage src={getVenueAvatarUrl()} alt={venue.name} />
        <AvatarFallback>{avatarFallback}</AvatarFallback>
      </Avatar>
      
      <div className="flex-1">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-medium text-sm flex items-center">
              {venue.name}
              {venue.verified && (
                <span className="ml-1 text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-badge-check"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"></path><path d="m9 12 2 2 4-4"></path></svg>
                </span>
              )}
            </h3>
            <div className="flex items-center text-xs text-muted-foreground gap-1">
              <MapPin className="h-3 w-3" />
              <span>{venue.address}, {venue.city}</span>
            </div>
          </div>
          
          <div className="text-xs text-muted-foreground flex items-center">
            <Calendar className="h-3 w-3 mr-1" />
            <span>{formattedTime}</span>
          </div>
        </div>
        
        {isExternalContent && (
          <div className="mt-1">
            <Badge variant="outline" className="text-xs bg-blue-500/10 text-blue-500 border-blue-300 flex items-center gap-1">
              <ExternalLink className="h-3 w-3" />
              {sourcePlatform ? `From ${sourcePlatform}` : 'External Content'}
            </Badge>
          </div>
        )}
      </div>
    </div>
  );
};

export default VenuePostHeader;
