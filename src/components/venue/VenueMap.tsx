
import React from "react";
import { Location } from "@/types";
import { Button } from "@/components/ui/button";
import { Expand } from "lucide-react";

interface VenueMapProps {
  venue: Location;
  onExpand: () => void;
}

const VenueMap: React.FC<VenueMapProps> = ({ venue, onExpand }) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold">Location</h2>
        <Button 
          variant="outline" 
          size="sm"
          onClick={onExpand}
          className="text-xs"
        >
          <Expand className="h-4 w-4 mr-1" />
          Expand
        </Button>
      </div>
      
      <div className="aspect-square w-full relative rounded-md overflow-hidden">
        <iframe
          title={`Map for ${venue.name}`}
          width="100%"
          height="100%"
          frameBorder="0"
          src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBQwBQcUxHAzfHjUZPd47Q3zOcQLfFAUA4&q=${encodeURIComponent(
            `${venue.name}, ${venue.address}, ${venue.city}, ${venue.state || ''}`
          )}`}
          allowFullScreen
        />
      </div>
      
      <p className="text-xs text-muted-foreground mt-2">
        {venue.address}, {venue.city}, {venue.state} {venue.zip}
      </p>
    </div>
  );
};

export default VenueMap;
