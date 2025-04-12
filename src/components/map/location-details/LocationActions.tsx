import { Button } from "@/components/ui/button";
import { Location } from "@/types";
import { useNavigate } from "react-router-dom";
import { Share2, Clock } from "lucide-react";
import { toast } from "sonner";
import { generateBusinessHours, getTodaysHours } from "@/utils/businessHoursUtils";

interface LocationActionsProps {
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

const LocationActions = ({ location, onViewVibes }: LocationActionsProps) => {
  const navigate = useNavigate();
  
  // Ensure location has hours
  if (!location.hours) {
    location.hours = generateBusinessHours(location);
  }
  
  const todaysHours = getTodaysHours(location);
  
  // Helper function to get ride service URL
  const getRideServiceUrl = (place: Location) => {
    // Simulate a partnership with Uber
    const partnerService = "uber";
    
    // Create the deep link to the ride service app
    return `https://m.uber.com/ul/?action=setPickup&pickup=my_location&dropoff[formatted_address]=${encodeURIComponent(`${place.address}, ${place.city}, ${place.state}`)}`;
  };

  // Helper function to get official ticket or venue URL
  const getOfficialUrl = (place: Location) => {
    // For sports venues, we would typically have specific ticket platform partnerships
    if (place.type === "sports") {
      // Use the same logic as in VenuePost to get ticket URLs
      const ticketUrls: Record<string, string> = {
        "30": "https://www.axs.com/events/crypto-com-arena", // Lakers
        "31": "https://www.therams.com/tickets/", // Rams
        "32": "https://www.mlb.com/dodgers/tickets", // Dodgers
        "33": "https://www.lagalaxy.com/tickets/", // LA Galaxy
        "34": "https://www.vbusa.org/tickets/", // Venice Beach Volleyball
        "35": "https://wmphoenixopen.com/tickets/", // WM Phoenix Open
      };
      
      return ticketUrls[place.id] || `https://seatgeek.com/${place.city.toLowerCase()}-tickets`;
    }
    
    // For events, we'd link to event ticket platforms
    if (place.type === "event") {
      return `https://www.ticketmaster.com/search?q=${encodeURIComponent(place.name)}`;
    }
    
    // For restaurants, we would link to reservation platforms
    if (place.type === "restaurant") {
      return `https://www.opentable.com/s?term=${encodeURIComponent(place.name)}&queryId=${place.id}`;
    }
    
    // For bars and attractions, default to their presumed website
    return `https://${place.name.toLowerCase().replace(/\s+/g, '')}.com`;
  };

  // Get appropriate button text based on venue type
  const getActionButtonText = (type: string) => {
    if (type === "restaurant") return "Reservations";
    if (type === "sports" || type === "event") return "Tickets";
    return "Website";
  };

  const handleViewVibes = () => {
    // Navigate directly to the venue's page
    navigate(`/venue/${location.id}`);
  };

  return (
    <div className="space-y-2 mb-4">
      <div className="flex items-center text-sm mb-2">
        <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
        <span className="text-muted-foreground">Today:</span>
        <span className="ml-1 font-medium">{todaysHours}</span>
      </div>
      
      <div className="flex gap-2">
        <Button className="flex-1" onClick={handleViewVibes}>
          View All Vibes
        </Button>
        <Button 
          variant="outline" 
          className="px-2" 
          onClick={() => shareVenue(location)}
          title="Share this venue"
        >
          <Share2 className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex gap-2">
        <a 
          href={getRideServiceUrl(location)} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex-1"
        >
          <Button variant="outline" className="w-full">
            Order a Ride
          </Button>
        </a>
        <a 
          href={getOfficialUrl(location)} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex-1"
        >
          <Button variant="outline" className="w-full">
            {getActionButtonText(location.type)}
          </Button>
        </a>
      </div>
    </div>
  );
};

export default LocationActions;
