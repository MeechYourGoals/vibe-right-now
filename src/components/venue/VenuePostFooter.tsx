
import React from 'react';
import { Button } from "@/components/ui/button";
import { Share2, ExternalLink } from "lucide-react";
import VenueActionButton from "./VenueActionButton";
import { Location } from "@/types";
import { 
  shareVenue, 
  getRideServiceUrl, 
  getExternalLinkUrl, 
  getActionButtonText,
  shouldShowExternalActionButton
} from "@/utils/venue/venuePostUtils";

interface VenuePostFooterProps {
  venue: Location;
  officialTicketUrl: string;
}

const VenuePostFooter: React.FC<VenuePostFooterProps> = ({ venue, officialTicketUrl }) => {
  const rideUrl = getRideServiceUrl(venue);
  const showExternalButton = shouldShowExternalActionButton(venue, officialTicketUrl);

  return (
    <>
      <div className="flex justify-between w-full">
        <Button 
          variant="ghost" 
          size="sm" 
          className="flex items-center gap-1"
          onClick={() => shareVenue(venue)}
        >
          <Share2 className="h-4 w-4" />
          <span>Share</span>
        </Button>
        
        <Button 
          variant="default" 
          size="sm" 
          onClick={() => window.location.href = `/venue/${venue.id}`}
        >
          View Event
        </Button>
      </div>
      
      <div className="flex gap-2 w-full">
        <VenueActionButton 
          venue={venue} 
          variant="outline" 
          className="flex-1"
        />
        
        <a 
          href={rideUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex-1"
        >
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full"
          >
            Order a Ride
          </Button>
        </a>
        
        {showExternalButton && (
          <a 
            href={getExternalLinkUrl(venue, officialTicketUrl)} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex-1"
          >
            <Button 
              variant="outline" 
              size="sm" 
              className="bg-amber-500/20 text-amber-500 border-amber-500/50 hover:bg-amber-500/30 w-full"
            >
              <ExternalLink className="h-4 w-4 mr-1" />
              {getActionButtonText(venue.type)}
            </Button>
          </a>
        )}
      </div>
    </>
  );
};

export default VenuePostFooter;
