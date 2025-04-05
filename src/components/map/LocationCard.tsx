
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { Location } from "@/types";

interface LocationCardProps {
  location: Location;
  onViewVibes: (locationId: string) => void;
}

const LocationCard = ({ location, onViewVibes }: LocationCardProps) => {
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
        "34": "https://www.vbusa.org/tickets", // Venice Beach Volleyball
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
    if (type === "restaurant") return "Reserve";
    if (type === "sports" || type === "event") return "Tickets";
    return "Website";
  };

  return (
    <Card className="hover:bg-muted/20 transition-colors">
      <CardContent className="p-3">
        <div className="font-medium text-sm truncate">{location.name}</div>
        <div className="text-xs text-muted-foreground flex items-center mt-1">
          <MapPin className="h-3 w-3 mr-1" />
          <span className="truncate">{location.city}</span>
        </div>
        <div className="mt-2 flex flex-col gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full h-7 text-xs"
            onClick={() => onViewVibes(location.id)}
          >
            View Vibes
          </Button>
          <div className="flex gap-1">
            <a 
              href={getRideServiceUrl(location)} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-1"
            >
              <Button variant="outline" size="sm" className="w-full h-7 text-xs">
                Order a Ride
              </Button>
            </a>
            <a 
              href={getOfficialUrl(location)} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-1"
            >
              <Button variant="outline" size="sm" className="w-full h-7 text-xs">
                {getActionButtonText(location.type)}
              </Button>
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LocationCard;
