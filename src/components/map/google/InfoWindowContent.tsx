
import React from 'react';
import { Location } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Clock } from 'lucide-react';

interface InfoWindowContentProps {
  location: Location;
}

const InfoWindowContent: React.FC<InfoWindowContentProps> = ({ location }) => {
  return (
    <div className="p-4 max-w-sm">
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold text-lg">{location.name}</h3>
        {location.isVerified && (
          <Badge variant="secondary" className="ml-2">
            Verified
          </Badge>
        )}
      </div>
      
      <div className="flex items-center mb-2">
        <MapPin className="h-4 w-4 text-gray-500 mr-1" />
        <span className="text-sm text-gray-600">{location.address}</span>
      </div>
      
      {location.rating && (
        <div className="flex items-center mb-2">
          <Star className="h-4 w-4 text-yellow-500 mr-1" />
          <span className="text-sm">{location.rating}</span>
          {location.priceRange && (
            <span className="text-sm text-gray-500 ml-2">{location.priceRange}</span>
          )}
        </div>
      )}
      
      {location.isOpen !== undefined && (
        <div className="flex items-center mb-3">
          <Clock className="h-4 w-4 text-gray-500 mr-1" />
          <span className={`text-sm ${location.isOpen ? 'text-green-600' : 'text-red-600'}`}>
            {location.isOpen ? 'Open' : 'Closed'}
          </span>
        </div>
      )}
      
      {location.description && (
        <p className="text-sm text-gray-600 mb-3">{location.description}</p>
      )}
      
      <Button size="sm" className="w-full">
        View Details
      </Button>
    </div>
  );
};

export default InfoWindowContent;
