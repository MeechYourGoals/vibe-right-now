
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
  
  // Ensure venue has hours, even if mock
  const mockHours = {
    monday: { open: "9:00 AM", close: "9:00 PM" },
    tuesday: { open: "9:00 AM", close: "9:00 PM" },
    wednesday: { open: "9:00 AM", close: "9:00 PM" },
    thursday: { open: "9:00 AM", close: "9:00 PM" },
    friday: { open: "9:00 AM", close: "10:00 PM" },
    saturday: { open: "10:00 AM", close: "10:00 PM" },
    sunday: { open: "10:00 AM", close: "8:00 PM" }
  };
  
  const hours = venue.hours || mockHours;
  const todayHours = hours[dayOfWeek as keyof typeof hours];
  const hoursDisplay = typeof todayHours === 'string' 
    ? todayHours 
    : `${todayHours.open} - ${todayHours.close}`;
  
  return (
    <div className="mt-4 rounded-md overflow-hidden relative">
      <div className="flex justify-between items-center text-sm mb-2">
        <div className="flex items-center">
          <MapPin className="h-4 w-4 mr-1 text-primary" />
          <span className="font-medium">{venue.address}</span>
        </div>
        <div className="text-right">
          <span className="font-medium">Today:</span> {hoursDisplay}
        </div>
      </div>
      
      <div className="h-48 rounded-md overflow-hidden relative">
        <GoogleMapComponent
          userLocation={null}
          locations={[venue]}
          searchedCity={venue.city}
          mapStyle="default"
          selectedLocation={venue}
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
