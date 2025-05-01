
import React from 'react';
import { Location } from '@/types';
import { MapPin, Navigation } from 'lucide-react';

interface NearbyVibesMapProps {
  height?: number;
  locations?: Location[];
  isRealData?: boolean;
}

const NearbyVibesMap: React.FC<NearbyVibesMapProps> = ({ 
  height = 300, 
  locations = [],
  isRealData = false
}) => {
  // Calculate how many real locations we have if isRealData is true
  const realLocationsCount = isRealData ? locations.filter(loc => loc.verified).length : 0;
  
  return (
    <div 
      className={`rounded-lg border overflow-hidden ${isRealData ? 'border-green-500 border-2' : ''}`} 
      style={{ height: `${height}px` }}
    >
      <div className="bg-muted h-full flex flex-col items-center justify-center">
        <MapPin className="h-8 w-8 text-muted-foreground mb-2" />
        {locations && locations.length > 0 ? (
          <p className="text-muted-foreground text-sm">
            Map showing {locations.length} location{locations.length !== 1 ? 's' : ''}
            {isRealData && (
              <span className="text-green-600 font-semibold ml-1">
                ({realLocationsCount} real)
              </span>
            )}
          </p>
        ) : (
          <p className="text-muted-foreground text-sm">
            No locations available for this area
          </p>
        )}
      </div>
    </div>
  );
};

export default NearbyVibesMap;
