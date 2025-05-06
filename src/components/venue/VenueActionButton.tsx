
import React from 'react';
import { Button, ButtonProps } from "@/components/ui/button";
import { Location } from "@/types";

interface VenueActionButtonProps extends ButtonProps {
  venue: Location;
}

const VenueActionButton: React.FC<VenueActionButtonProps> = ({ venue, ...props }) => {
  // Get appropriate text and action based on venue type
  const getActionDetails = () => {
    if (venue.type === "restaurant") {
      return {
        text: "Make Reservation",
        action: () => window.open(`https://www.opentable.com/s?term=${encodeURIComponent(venue.name)}`, '_blank')
      };
    }
    
    if (venue.type === "bar") {
      return {
        text: "View Menu",
        action: () => window.open(`https://${venue.name.toLowerCase().replace(/\s+/g, '')}.com/menu`, '_blank')
      };
    }
    
    if (venue.type === "sports" || venue.type === "event") {
      return {
        text: "Buy Tickets",
        action: () => window.open(`https://www.ticketmaster.com/search?q=${encodeURIComponent(venue.name)}`, '_blank')
      };
    }
    
    if (venue.type === "attraction") {
      return {
        text: "Plan Visit",
        action: () => window.open(`https://${venue.name.toLowerCase().replace(/\s+/g, '')}.com/visit`, '_blank')
      };
    }
    
    // Default action
    return {
      text: "Visit Website",
      action: () => window.open(`https://${venue.name.toLowerCase().replace(/\s+/g, '')}.com`, '_blank')
    };
  };
  
  const { text, action } = getActionDetails();
  
  return (
    <Button onClick={action} {...props}>
      {text}
    </Button>
  );
};

export default VenueActionButton;
