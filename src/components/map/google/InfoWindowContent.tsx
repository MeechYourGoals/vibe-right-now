
import React from 'react';
import { Button } from '@/components/ui/button';
import { MapPin, Star, Phone, Clock } from 'lucide-react';
import { Location } from '@/types';

interface InfoWindowContentProps {
  location: Location;
  onSelect: (location: Location) => void;
}

const InfoWindowContent: React.FC<InfoWindowContentProps> = ({ location, onSelect }) => {
  return (
    <div className="p-2 max-w-[250px]">
      <div className="space-y-2">
        <div>
          <h3 className="font-semibold text-sm leading-tight">{location.name}</h3>
          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
            <MapPin className="h-3 w-3" />
            <span className="truncate">{location.address}</span>
          </div>
        </div>
        
        {location.rating && location.rating > 0 && (
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-medium">{location.rating.toFixed(1)}</span>
          </div>
        )}
        
        <div className="flex gap-2 pt-2">
          <Button
            size="sm"
            className="flex-1 h-7 text-xs"
            onClick={(e) => {
              e.stopPropagation();
              window.open(`/venue/${location.id}`, '_blank');
            }}
          >
            View Details
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="h-7 text-xs px-2"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(location);
            }}
          >
            Select
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InfoWindowContent;
