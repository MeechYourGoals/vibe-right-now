
import React from "react";
import { Button } from "@/components/ui/button";
import LocationCard from "./LocationCard";
import { Location } from "@/types";

interface NearbyLocationsListProps {
  locations: Location[];
  isExpanded: boolean;
  onViewMap: () => void;
  onViewLocation: (id: string) => void;
}

const NearbyLocationsList = ({
  locations,
  isExpanded,
  onViewMap,
  onViewLocation
}: NearbyLocationsListProps) => {
  if (isExpanded) {
    return null;
  }
  
  return (
    <>
      <div className="grid grid-cols-2 gap-3">
        {locations.slice(0, 4).map((location) => (
          <LocationCard
            key={location.id}
            location={location}
            onViewVibes={onViewLocation}
          />
        ))}
      </div>
      
      {locations.length > 4 && (
        <Button variant="ghost" size="sm" className="w-full" onClick={onViewMap}>
          See All {locations.length} Nearby Locations
        </Button>
      )}
    </>
  );
};

export default NearbyLocationsList;
