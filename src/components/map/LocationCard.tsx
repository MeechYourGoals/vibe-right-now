import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Share2, Clock } from "lucide-react";
import { Location } from "@/types";
import { getRideServiceUrl, getOfficialUrl, getActionButtonText } from "@/utils/locationUtils";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { generateBusinessHours, getTodaysHours } from "@/utils/businessHoursUtils";
import VenueActionButton from "@/components/venue/VenueActionButton";

interface LocationCardProps {
  location: Location;
  onViewVibes: (locationId: string) => void;
}

// Helper function to share a venue
const shareVenue = (location: Location) => {
  if (navigator.share) {
    navigator.share({
      title: `Check out ${location.name} on Vibe Right Now!`,
      text: `I found ${location.name} in ${location.city} on Vibe Right Now and thought you might be interested!`,
      url: `${window.location.origin}/venue/${location.id}`
    })
    .then(() => toast.success("Shared successfully!"))
    .catch((error) => {
      console.error('Error sharing:', error);
      toast.error("Couldn't share. Try copying the link instead.");
    });
  } else {
    // Fallback for browsers that don't support navigator.share
    const url = `${window.location.origin}/venue/${location.id}`;
    navigator.clipboard.writeText(url)
      .then(() => toast.success("Link copied to clipboard!"))
      .catch(() => toast.error("Couldn't copy link. Please try again."));
  }
};

const LocationCard = ({ location, onViewVibes }: LocationCardProps) => {
  const navigate = useNavigate();

  // Ensure location has hours
  if (!location.hours) {
    location.hours = generateBusinessHours(location);
  }
  
  const todaysHours = getTodaysHours(location);

  const handleViewVibes = () => {
    navigate(`/venue/${location.id}`);
  };

  return (
    <Card className="hover:bg-muted/20 transition-colors">
      <CardContent className="p-3">
        <div className="flex justify-between items-start">
          <div className="font-medium text-sm truncate">{location.name}</div>
          <Button 
            size="icon" 
            variant="ghost" 
            className="h-6 w-6 p-0 ml-1" 
            onClick={() => shareVenue(location)}
          >
            <Share2 className="h-3.5 w-3.5" />
          </Button>
        </div>
        <div className="text-xs text-muted-foreground flex items-center mt-1">
          <MapPin className="h-3 w-3 mr-1" />
          <span className="truncate">{location.city}</span>
        </div>
        <div className="text-xs text-muted-foreground flex items-center mt-1">
          <Clock className="h-3 w-3 mr-1" />
          <span className="truncate">{todaysHours}</span>
        </div>
        <div className="mt-2 flex flex-col gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full h-7 text-xs"
            onClick={handleViewVibes}
          >
            View Vibes
          </Button>
          
          <VenueActionButton 
            venue={location} 
            size="sm"
            className="w-full h-7 text-xs"
          />
          
          <a 
            href={getRideServiceUrl(location)} 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full"
          >
            <Button variant="outline" size="sm" className="w-full h-7 text-xs">
              Order a Ride
            </Button>
          </a>
          <a 
            href={getOfficialUrl(location)} 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full"
          >
            <Button variant="outline" size="sm" className="w-full h-7 text-xs">
              {getActionButtonText(location.type)}
            </Button>
          </a>
        </div>
      </CardContent>
    </Card>
  );
};

export default LocationCard;
