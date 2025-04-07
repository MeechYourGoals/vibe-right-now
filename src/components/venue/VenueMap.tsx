
import React from 'react';
import { Button } from "@/components/ui/button";
import { Maximize } from "lucide-react";
import { Location } from "@/types";
import OpenStreetMap from "@/components/map/OpenStreetMap";

interface VenueMapProps {
  venue: Location;
  onExpand: () => void;
}

const VenueMap: React.FC<VenueMapProps> = ({ venue, onExpand }) => {
  return (
    <div className="mt-4 h-48 rounded-md overflow-hidden relative">
      <OpenStreetMap
        userLocation={null}
        locations={[venue]}
        searchedCity={venue.city}
        mapStyle="default"
        selectedLocation={null}
        userAddressLocation={null}
        onLocationSelect={() => {}}
        showAllCities={false}
      />
      <div className="absolute bottom-2 right-2">
        <Button size="sm" variant="secondary" onClick={onExpand}>
          <Maximize className="h-4 w-4 mr-1" />
          Expand
        </Button>
      </div>
    </div>
  );
};

export default VenueMap;
