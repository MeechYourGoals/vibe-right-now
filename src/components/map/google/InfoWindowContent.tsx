
import React from 'react';
import { Location } from '@/types';
import { Star, Map, Phone, Globe, Clock, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatHoursForDisplay } from '@/utils/businessHoursUtils';

interface InfoWindowContentProps {
  location: Location;
  onClose?: () => void;
}

const InfoWindowContent: React.FC<InfoWindowContentProps> = ({ location }) => {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'lowercase' }) as keyof typeof location.hours;
  const todayHours = location.hours?.[today];
  
  return (
    <div className="p-1 max-w-[280px]">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-base font-semibold">{location.name}</h3>
        <div className="flex items-center text-amber-500">
          <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
          <span className="ml-1 text-sm font-medium">{location.rating}</span>
        </div>
      </div>
      
      {location.photos && location.photos.length > 0 && (
        <div className="mb-2 -mx-1 -mt-1">
          <img 
            src={location.photos[0].url} 
            alt={location.name} 
            className="w-full h-[120px] object-cover"
          />
        </div>
      )}
      
      <div className="text-sm space-y-1">
        <div className="flex items-start">
          <MapPin className="h-4 w-4 mr-1 mt-0.5 flex-shrink-0 text-gray-500" />
          <span className="flex-1">{location.address}, {location.city}, {location.state}</span>
        </div>
        
        {location.hours && todayHours && (
          <div className="flex items-start">
            <Clock className="h-4 w-4 mr-1 mt-0.5 flex-shrink-0 text-gray-500" />
            <div className="flex-1">
              <div>
                Today: {formatHoursForDisplay(todayHours)}
              </div>
              {location.openNow && (
                <span className="text-xs text-green-600 font-medium">Open Now</span>
              )}
              {location.temporarilyClosed && (
                <span className="text-xs text-red-600 font-medium">Temporarily Closed</span>
              )}
            </div>
          </div>
        )}
        
        {location.phone && (
          <div className="flex items-start">
            <Phone className="h-4 w-4 mr-1 mt-0.5 flex-shrink-0 text-gray-500" />
            <span className="flex-1">{location.phone}</span>
          </div>
        )}
        
        {location.website && (
          <div className="flex items-start">
            <Globe className="h-4 w-4 mr-1 mt-0.5 flex-shrink-0 text-gray-500" />
            <a href={location.website} target="_blank" rel="noopener noreferrer" className="flex-1 text-blue-600 hover:underline truncate">
              {location.website.replace(/https?:\/\/(www\.)?/, '')}
            </a>
          </div>
        )}
      </div>
      
      <div className="mt-3 flex gap-2">
        <Button size="sm" className="w-full" asChild>
          <a href={`/venue/${location.id}`}>
            View Details
          </a>
        </Button>
        <Button size="sm" variant="outline" className="w-full" asChild>
          <a href={`https://maps.google.com/?q=${location.lat},${location.lng}`} target="_blank" rel="noopener noreferrer">
            <Map className="h-3 w-3 mr-1" />
            Directions
          </a>
        </Button>
      </div>
    </div>
  );
};

export default InfoWindowContent;
