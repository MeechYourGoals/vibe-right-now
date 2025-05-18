
import { Button } from "@/components/ui/button";
import { Location } from "@/types";
import { Phone, Globe, Clock } from "lucide-react";
import { getOfficialUrl } from "@/utils/locationUtils";

interface VenueActionButtonsProps {
  venue: Location;
}

const VenueActionButtons = ({ venue }: VenueActionButtonsProps) => {
  // Helper function to get RSVP button text based on venue type
  const getRSVPButtonText = (venue: Location): string => {
    switch (venue.type) {
      case 'restaurant':
        return 'Make Reservation';
      case 'bar':
        return 'Book Table';
      case 'event':
        return 'Buy Tickets';
      case 'sports':
        return 'Get Tickets';
      case 'attraction':
        return 'Get Passes';
      default:
        return 'RSVP';
    }
  };
  
  return (
    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2">
      <Button variant="outline" className="flex justify-start">
        <Phone className="h-4 w-4 mr-2" /> Call Venue
      </Button>
      <Button variant="outline" className="flex justify-start">
        <Globe className="h-4 w-4 mr-2" /> Website
      </Button>
      <Button variant="outline" className="flex justify-start">
        <Clock className="h-4 w-4 mr-2" /> Want to Visit
      </Button>
      <a 
        href={getOfficialUrl(venue)} 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex-1"
      >
        <Button variant="outline" className="w-full flex justify-start">
          <Clock className="h-4 w-4 mr-2" /> {getRSVPButtonText(venue)}
        </Button>
      </a>
    </div>
  );
};

export default VenueActionButtons;
