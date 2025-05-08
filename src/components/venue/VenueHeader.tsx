
import React from "react";
import { Location } from "@/types";

interface VenueHeaderProps {
  venue: Location;
  isOwner?: boolean;
}

const VenueHeader: React.FC<VenueHeaderProps> = ({ venue, isOwner = false }) => {
  const coverStyle = {
    backgroundImage: `url(https://source.unsplash.com/random/1200x400/?${venue.type},venue)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  };

  return (
    <div className="relative">
      <div 
        className="h-48 md:h-64 w-full rounded-lg overflow-hidden relative" 
        style={coverStyle}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>
      
      <div className="relative z-10 px-4 py-4 md:py-0 md:-mt-16">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex flex-col md:flex-row justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">{venue.name}</h1>
              <p className="text-muted-foreground">
                {venue.address}, {venue.city}, {venue.state}
              </p>
              
              <div className="flex flex-wrap gap-2 mt-3">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {venue.type.charAt(0).toUpperCase() + venue.type.slice(1)}
                </span>
                
                {venue.verified && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Verified
                  </span>
                )}
              </div>
            </div>
            
            <div className="mt-4 md:mt-0 flex flex-col md:items-end">
              {isOwner && (
                <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
                  Manage Venue
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VenueHeader;
