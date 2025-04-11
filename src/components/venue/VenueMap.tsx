
import React from 'react';
import { Button } from "@/components/ui/button";
import { Maximize, MapPin } from "lucide-react";
import { Location } from "@/types";
import GoogleMapComponent from "@/components/map/google/GoogleMapComponent";
import { format } from "date-fns";

interface VenueMapProps {
  venue: Location;
  onExpand: () => void;
}

const VenueMap: React.FC<VenueMapProps> = ({ venue, onExpand }) => {
  const today = new Date();
  const dayOfWeek = format(today, 'EEEE').toLowerCase();
  const hoursToday = venue.hours ? venue.hours[dayOfWeek as keyof typeof venue.hours] : "Not available";
  
  return (
    <div className="mt-4 rounded-md overflow-hidden relative">
      <div className="flex justify-between items-center text-sm mb-2">
        <div className="flex items-center">
          <MapPin className="h-4 w-4 mr-1 text-primary" />
          <span className="font-medium">{venue.address}</span>
        </div>
        {venue.hours && (
          <div className="text-right">
            <span className="font-medium">Today:</span> {hoursToday}
          </div>
        )}
      </div>
      
      <div className="h-48 rounded-md overflow-hidden relative">
        <GoogleMapComponent
          userLocation={null}
          locations={[venue]}
          searchedCity={venue.city}
          mapStyle="default"
          selectedLocation={null}
          onLocationSelect={() => {}}
          userAddressLocation={null}
          showAllCities={false}
        />
        <div className="absolute bottom-2 right-2">
          <Button size="sm" variant="secondary" onClick={onExpand}>
            <Maximize className="h-4 w-4 mr-1" />
            Expand Map
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VenueMap;
