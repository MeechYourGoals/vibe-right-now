
import React from 'react';
import { Location } from "@/types";
import { Button } from "@/components/ui/button";
import { 
  Map, 
  Phone, 
  Globe, 
  Clock, 
  Star, 
  DollarSign, 
  X,
  Share2
} from "lucide-react";
import RecentVibes from './location-details/RecentVibes';
import { Badge } from "@/components/ui/badge";
import { formatLocationHours } from '@/utils/locations';
import { toast } from 'sonner';

interface LocationHeaderProps {
  location: Location;
  onClose: () => void;
}

const LocationHeader: React.FC<LocationHeaderProps> = ({ location, onClose }) => {
  return (
    <div className="bg-white p-4 sticky top-0 z-10 border-b">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">{location.name}</h2>
        <Button onClick={onClose} variant="ghost" size="icon">
          <X size={18} />
        </Button>
      </div>
      <p className="text-sm text-muted-foreground">
        {location.address}, {location.city}, {location.state}
      </p>
      <div className="flex gap-2 mt-2">
        {location.type && (
          <Badge>{location.type.charAt(0).toUpperCase() + location.type.slice(1)}</Badge>
        )}
        {location.verified && (
          <Badge variant="outline" className="bg-blue-50">Verified</Badge>
        )}
      </div>
    </div>
  );
};

interface LocationActionsProps {
  location: Location;
  onViewVibes: (id: string) => void;
}

const LocationActions: React.FC<LocationActionsProps> = ({ location, onViewVibes }) => {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: location.name,
        text: `Check out ${location.name} on Vibe Right Now!`,
        url: `${window.location.origin}/venue/${location.id}`
      })
      .then(() => toast.success("Shared successfully!"))
      .catch((error) => console.error("Error sharing:", error));
    } else {
      // Fallback for browsers that don't support navigator.share
      navigator.clipboard.writeText(`${window.location.origin}/venue/${location.id}`)
        .then(() => toast.success("Link copied to clipboard!"))
        .catch(() => toast.error("Couldn't copy link. Please try again."));
    }
  };

  return (
    <div className="mt-4 grid grid-cols-2 gap-2">
      <Button 
        onClick={() => onViewVibes(location.id)} 
        className="w-full"
      >
        View Venue
      </Button>
      <Button 
        variant="outline" 
        className="w-full"
        onClick={handleShare}
      >
        <Share2 className="mr-2 h-4 w-4" />
        Share
      </Button>
    </div>
  );
};

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
  return (
    <div className="absolute top-0 right-0 h-full w-full md:w-96 bg-background border-l overflow-y-auto">
      <LocationHeader location={location} onClose={onClose} />
      
      <div className="p-4">
        {location.photos && location.photos.length > 0 ? (
          <img 
            src={location.photos[0]} 
            alt={location.name} 
            className="w-full h-48 object-cover rounded-md mb-4"
          />
        ) : (
          <div className="w-full h-48 bg-muted flex items-center justify-center rounded-md mb-4">
            <p className="text-muted-foreground">No image available</p>
          </div>
        )}
        
        <div className="space-y-4">
          {location.description && (
            <div>
              <h3 className="font-semibold">About</h3>
              <p className="text-sm">{location.description}</p>
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-2">
            {location.businessHours && (
              <div className="flex items-center text-sm">
                <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>{formatLocationHours(location.businessHours)}</span>
              </div>
            )}
            
            {location.rating && (
              <div className="flex items-center text-sm">
                <Star className="mr-2 h-4 w-4 text-yellow-500" />
                <span>{location.rating.toFixed(1)}</span>
              </div>
            )}
            
            {location.priceLevel && (
              <div className="flex items-center text-sm">
                <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>{"$".repeat(location.priceLevel)}</span>
              </div>
            )}
            
            {location.phoneNumber && (
              <div className="flex items-center text-sm">
                <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>{location.phoneNumber}</span>
              </div>
            )}
          </div>
          
          {location.website && (
            <div className="flex items-center text-sm">
              <Globe className="mr-2 h-4 w-4 text-muted-foreground" />
              <a 
                href={location.website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Visit Website
              </a>
            </div>
          )}
          
          <div className="flex items-center text-sm">
            <Map className="mr-2 h-4 w-4 text-muted-foreground" />
            <a 
              href={`https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              View on Google Maps
            </a>
          </div>
          
          <LocationActions location={location} onViewVibes={onViewVibes} />
          
          <RecentVibes locationId={location.id} />
        </div>
      </div>
    </div>
  );
};

export default LocationDetailsSidebar;
