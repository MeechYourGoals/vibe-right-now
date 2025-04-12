
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import type { Location } from '@/types';

interface VenueMapProps {
  location: Location;
  onMapExpand?: () => void; // Make this prop optional
}

const VenueMap: React.FC<VenueMapProps> = ({ location, onMapExpand }) => {
  const formattedAddress = location.address ? 
    `${location.address}, ${location.city}, ${location.state}` : 
    `${location.city}, ${location.state}`;
  
  // Format business hours if available
  const renderBusinessHours = () => {
    if (!location.hours) return <p>Hours not available</p>;
    
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    
    return (
      <div className="text-sm">
        {days.map(day => (
          <div key={day} className="flex justify-between py-1">
            <span className="capitalize">{day}:</span>
            <span>
              {formatHours(location.hours?.[day])}
            </span>
          </div>
        ))}
      </div>
    );
  };
  
  // Helper function to format hours
  const formatHours = (hours: { open: string; close: string; } | string | undefined) => {
    if (!hours) return "Closed";
    if (typeof hours === 'string') return hours;
    return `${hours.open} - ${hours.close}`;
  };

  const handleMapClick = () => {
    if (onMapExpand) {
      onMapExpand();
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">Location & Hours</h3>
          <p className="text-sm mb-3">{formattedAddress}</p>
          
          {/* Map placeholder - would be replaced with actual map component */}
          <div 
            className="bg-gray-200 h-48 w-full rounded-md mb-4 flex items-center justify-center cursor-pointer"
            onClick={handleMapClick}
          >
            <p className="text-gray-500">Map view at {location.lat}, {location.lng}</p>
          </div>
          
          <div className="mt-4">
            <h4 className="font-medium mb-2">Business Hours</h4>
            {renderBusinessHours()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VenueMap;
