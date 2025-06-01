
import React from 'react';
import { Location } from '@/types';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Star } from 'lucide-react';

export interface InfoWindowContentProps {
  location: Location;
}

const InfoWindowContent: React.FC<InfoWindowContentProps> = ({ location }) => {
  const handleSelect = () => {
    console.log('Selected location:', location);
  };

  return (
    <div className="p-3 max-w-xs">
      <h3 className="font-semibold text-lg mb-2">{location.name}</h3>
      
      <div className="flex items-center text-sm text-gray-600 mb-2">
        <MapPin className="h-4 w-4 mr-1" />
        <span>{location.address}</span>
      </div>
      
      {location.hours && (
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <Clock className="h-4 w-4 mr-1" />
          <span>Open today</span>
        </div>
      )}
      
      <div className="flex items-center text-sm text-gray-600 mb-3">
        <Star className="h-4 w-4 mr-1 text-yellow-500" />
        <span>4.5 (123 reviews)</span>
      </div>
      
      {location.vibes && location.vibes.length > 0 && (
        <div className="mb-3">
          <div className="flex flex-wrap gap-1">
            {location.vibes.slice(0, 3).map((vibe, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full"
              >
                {vibe}
              </span>
            ))}
          </div>
        </div>
      )}
      
      <Button 
        onClick={handleSelect}
        className="w-full"
        size="sm"
      >
        View Details
      </Button>
    </div>
  );
};

export default InfoWindowContent;
