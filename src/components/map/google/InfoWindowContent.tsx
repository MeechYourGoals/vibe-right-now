
import React from 'react';
import { Button } from "@/components/ui/button";
import { Location } from "@/types";

interface InfoWindowContentProps {
  location: Location;
  onSelect: (location: Location) => void;
}

const InfoWindowContent: React.FC<InfoWindowContentProps> = ({ location, onSelect }) => {
  return (
    <div className="p-2 max-w-[200px]">
      <h3 className="font-bold text-sm">{location.name}</h3>
      <p className="text-xs text-gray-600">{location.type} in {location.city}</p>
      <Button 
        size="sm" 
        className="mt-2 text-xs py-0 h-7" 
        onClick={(e) => {
          e.stopPropagation();
          onSelect(location);
        }}
      >
        View Details
      </Button>
    </div>
  );
};

export default InfoWindowContent;
