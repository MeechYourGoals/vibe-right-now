
import React from 'react';
import { Location } from '@/types';
import { mockLocations } from '@/mock/data';

interface NearbyVibesMapProps {
  height?: number;
  locations?: Location[];
}

const NearbyVibesMap: React.FC<NearbyVibesMapProps> = ({ 
  height = 300, 
  locations = [] 
}) => {
  return (
    <div 
      className="rounded-lg border overflow-hidden" 
      style={{ height: `${height}px` }}
    >
      <div className="bg-muted h-full flex items-center justify-center">
        <p className="text-muted-foreground text-sm">
          Map showing {locations.length} locations
        </p>
      </div>
    </div>
  );
};

export default NearbyVibesMap;
