
import React from "react";
import { Button } from "@/components/ui/button";
import { X, Share, Heart, Map, MessageCircle, Star } from "lucide-react";
import { Location } from "@/types";
import LocationActions from "@/components/map/location-details/LocationActions";
import LocationHeader from "@/components/map/location-details/LocationHeader";
import RecentVibes from "@/components/map/location-details/RecentVibes";
import { getTodaysHours } from "@/utils/locations/businessHoursUtils";

interface LocationDetailsSidebarProps {
  location: Location;
  onClose: () => void;
  onViewVibes: (id: string) => void;
}

const LocationDetailsSidebar: React.FC<LocationDetailsSidebarProps> = ({
  location,
  onClose,
  onViewVibes
}) => {
  const handleShare = () => {
    const url = `${window.location.origin}/venue/${location.id}`;
    navigator.clipboard.writeText(url);
    // You could add a toast notification here
  };
  
  return (
    <div className="absolute top-0 right-0 bottom-0 bg-background w-full lg:w-1/3 md:w-1/2 p-4 shadow-lg overflow-auto z-10">
      <Button 
        variant="ghost" 
        size="icon"
        className="absolute right-2 top-2" 
        onClick={onClose}
      >
        <X className="h-4 w-4" />
      </Button>
      
      <LocationHeader location={location} />
      
      <div className="mt-4 flex items-center justify-between">
        <div>
          <p className="text-sm">
            <span className="font-medium">Today:</span> {getTodaysHours(location)}
          </p>
          <p className="text-sm text-muted-foreground">{location.address}</p>
        </div>
        <Button variant="outline" size="sm" className="flex gap-1" onClick={handleShare}>
          <Share className="h-4 w-4" />
          Share
        </Button>
      </div>
      
      <div className="mt-4 grid grid-cols-3 gap-2">
        <Button variant="outline" className="flex flex-col items-center justify-center h-20 p-1">
          <Heart className="h-5 w-5 mb-1" />
          <span className="text-xs text-center">Save</span>
        </Button>
        <Button variant="outline" className="flex flex-col items-center justify-center h-20 p-1">
          <Map className="h-5 w-5 mb-1" />
          <span className="text-xs text-center">Directions</span>
        </Button>
        <Button variant="outline" className="flex flex-col items-center justify-center h-20 p-1">
          <MessageCircle className="h-5 w-5 mb-1" />
          <span className="text-xs text-center">Review</span>
        </Button>
      </div>
      
      <div className="mt-4">
        <Button 
          className="w-full" 
          onClick={() => onViewVibes(location.id)}
        >
          View Venue Page
        </Button>
      </div>
      
      <div className="mt-6 space-y-6">
        <LocationActions location={location} />
        <RecentVibes locationId={location.id} />
      </div>
    </div>
  );
};

export default LocationDetailsSidebar;
