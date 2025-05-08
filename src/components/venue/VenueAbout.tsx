
import React from "react";
import { Location } from "@/types";
import { Clock, MapPin, Phone, Globe } from "lucide-react";

interface VenueAboutProps {
  venue: Location;
}

const VenueAbout: React.FC<VenueAboutProps> = ({ venue }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <h2 className="text-xl font-semibold mb-4">About {venue.name}</h2>
      
      <div className="space-y-4">
        <p className="text-muted-foreground">
          {venue.description || `${venue.name} is a popular ${venue.type} located in ${venue.city}, ${venue.state}. Visit to experience the vibrant atmosphere and create unforgettable memories!`}
        </p>
        
        <div className="flex flex-col space-y-3 mt-4">
          <div className="flex items-start">
            <MapPin className="h-5 w-5 text-muted-foreground mr-2 shrink-0 mt-0.5" />
            <span>{venue.address}, {venue.city}, {venue.state}, {venue.zip}</span>
          </div>
          
          {venue.phoneNumber && (
            <div className="flex items-center">
              <Phone className="h-5 w-5 text-muted-foreground mr-2 shrink-0" />
              <span>{venue.phoneNumber}</span>
            </div>
          )}
          
          {venue.website && (
            <div className="flex items-center">
              <Globe className="h-5 w-5 text-muted-foreground mr-2 shrink-0" />
              <a 
                href={venue.website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {venue.website.replace(/(^\w+:|^)\/\//, '')}
              </a>
            </div>
          )}
          
          <div className="flex items-center">
            <Clock className="h-5 w-5 text-muted-foreground mr-2 shrink-0" />
            <span>Hours: Available soon</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VenueAbout;
