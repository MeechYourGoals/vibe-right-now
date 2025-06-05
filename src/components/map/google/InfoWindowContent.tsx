
import React from 'react';
import { Location } from '@/types';
import { MapPin, Clock, Star, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatBusinessHours } from '@/utils/businessHoursUtils';

interface InfoWindowContentProps {
  location: Location;
  onLocationClick: (location: Location) => void;
}

const InfoWindowContent: React.FC<InfoWindowContentProps> = ({ 
  location, 
  onLocationClick 
}) => {
  const handleViewDetails = () => {
    onLocationClick(location);
  };

  const formatHours = (hours: any): string => {
    if (!hours) return 'Hours not available';
    
    if (typeof hours === 'string') {
      return hours;
    }
    
    if (typeof hours === 'object' && hours.open && hours.close) {
      return `${hours.open} - ${hours.close}`;
    }
    
    return 'Hours not available';
  };

  return (
    <div className="min-w-[250px] max-w-[300px] p-3">
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1 pr-2">
          <h3 className="font-semibold text-sm leading-tight mb-1">
            {location.name}
          </h3>
          <div className="flex items-center text-xs text-muted-foreground mb-2">
            <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
            <span className="truncate">{location.address}</span>
          </div>
        </div>
        
        {location.verified && (
          <Badge variant="secondary" className="text-xs">
            Verified
          </Badge>
        )}
      </div>

      <div className="space-y-2 mb-3">
        {location.rating && (
          <div className="flex items-center text-xs">
            <Star className="h-3 w-3 mr-1 text-yellow-500 fill-yellow-500" />
            <span>{location.rating}/5</span>
          </div>
        )}
        
        {location.hours && (
          <div className="flex items-center text-xs text-muted-foreground">
            <Clock className="h-3 w-3 mr-1 flex-shrink-0" />
            <span>{formatHours(location.hours)}</span>
          </div>
        )}
        
        {location.type && (
          <Badge variant="outline" className="text-xs">
            {location.type}
          </Badge>
        )}
      </div>

      <div className="flex gap-2">
        <Button 
          size="sm" 
          className="flex-1 text-xs h-8"
          onClick={handleViewDetails}
        >
          View Details
        </Button>
        
        {location.id.startsWith('ChIJ') && (
          <Button 
            variant="outline" 
            size="sm" 
            className="text-xs h-8"
            onClick={() => {
              const url = `https://www.google.com/maps/place/?q=place_id:${location.id}`;
              window.open(url, '_blank', 'noopener,noreferrer');
            }}
          >
            <ExternalLink className="h-3 w-3" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default InfoWindowContent;
