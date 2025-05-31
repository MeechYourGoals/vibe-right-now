
import React from 'react';
import { Location } from '@/types';
import { Star, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface InfoWindowContentProps {
  location: Location;
  onClose?: () => void;
  onViewDetails?: (location: Location) => void;
}

const InfoWindowContent: React.FC<InfoWindowContentProps> = ({
  location,
  onClose,
  onViewDetails
}) => {
  const formatBusinessHours = (hours: any) => {
    if (typeof hours === 'string') {
      return hours;
    }
    if (typeof hours === 'object' && hours.open && hours.close) {
      return `${hours.open} - ${hours.close}`;
    }
    return 'Hours not available';
  };

  const getTodaysHours = () => {
    if (!location.hours) return 'Hours not available';
    
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const today = new Date().getDay();
    const dayName = days[today];
    const dayHours = location.hours[dayName as keyof typeof location.hours];
    
    if (!dayHours) return 'Closed today';
    
    return formatBusinessHours(dayHours);
  };

  return (
    <div className="p-4 max-w-sm">
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-lg text-gray-900">{location.name}</h3>
        {location.verified && (
          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
            Verified
          </span>
        )}
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <MapPin className="w-4 h-4 mr-2" />
          <span>{location.address}, {location.city}</span>
        </div>

        {location.rating && (
          <div className="flex items-center text-sm">
            <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{location.rating}</span>
            <span className="text-gray-500 ml-1">rating</span>
          </div>
        )}

        <div className="flex items-center text-sm text-gray-600">
          <Clock className="w-4 h-4 mr-2" />
          <span>{getTodaysHours()}</span>
        </div>
      </div>

      {location.vibes && location.vibes.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {location.vibes.slice(0, 3).map((vibe, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
              >
                {vibe}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-2">
        <Button
          size="sm"
          onClick={() => onViewDetails?.(location)}
          className="flex-1"
        >
          View Details
        </Button>
        {onClose && (
          <Button
            size="sm"
            variant="outline"
            onClick={onClose}
          >
            Close
          </Button>
        )}
      </div>
    </div>
  );
};

export default InfoWindowContent;
