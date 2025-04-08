
import { Location } from "@/types";
import { toast } from "sonner";

// Helper function to get official ticket URLs for sports venues
export const getOfficialTicketUrl = (venueId: string) => {
  // Map venue IDs to official ticket URLs
  const ticketUrls: Record<string, string> = {
    "30": "https://www.axs.com/events/crypto-com-arena", // Lakers
    "31": "https://www.therams.com/tickets/", // Rams
    "32": "https://www.mlb.com/dodgers/tickets", // Dodgers
    "33": "https://www.lagalaxy.com/tickets/", // LA Galaxy
    "34": "https://www.vbusa.org/tickets", // Venice Beach Volleyball
    "35": "https://wmphoenixopen.com/tickets/", // WM Phoenix Open
  };
  
  // For dynamically generated city locations (format: city-type-index)
  if (venueId.includes('sports')) {
    const city = venueId.split('-')[0];
    if (venueId.includes('basketball')) {
      return `https://tickets.nba.com/${city}`;
    } else if (venueId.includes('football')) {
      return `https://tickets.nfl.com/${city}`;
    } else if (venueId.includes('baseball')) {
      return `https://tickets.mlb.com/${city}`;
    }
    return `https://seatgeek.com/${city}-tickets`;
  }
  
  return ticketUrls[venueId] || "";
};

// Helper function to get ride service URL
export const getRideServiceUrl = (place: Location) => {
  return `https://m.uber.com/ul/?action=setPickup&pickup=my_location&dropoff[formatted_address]=${encodeURIComponent(`${place.address}, ${place.city}, ${place.state}`)}`;
};

// Helper function to share a venue
export const shareVenue = (venue: Location) => {
  if (navigator.share) {
    navigator.share({
      title: `Check out ${venue.name} on Vibe Right Now!`,
      text: `I found ${venue.name} in ${venue.city} on Vibe Right Now and thought you might be interested!`,
      url: `${window.location.origin}/venue/${venue.id}`
    })
    .then(() => toast.success("Shared successfully!"))
    .catch((error) => {
      console.error('Error sharing:', error);
      toast.error("Couldn't share. Try copying the link instead.");
    });
  } else {
    // Fallback for browsers that don't support navigator.share
    const url = `${window.location.origin}/venue/${venue.id}`;
    navigator.clipboard.writeText(url)
      .then(() => toast.success("Link copied to clipboard!"))
      .catch(() => toast.error("Couldn't copy link. Please try again."));
  }
};

// Helper function to determine the button text based on venue type
export const getActionButtonText = (venueType: string): string => {
  if (venueType === "restaurant") {
    return "Reserve a Spot";
  } else if (venueType === "sports") {
    return "Buy Tickets";
  } else {
    return "Visit Website";
  }
};

// Helper function to determine the external link URL based on venue type
export const getExternalLinkUrl = (venue: Location, officialTicketUrl: string): string => {
  if (venue.type === "restaurant") {
    return `https://www.opentable.com/s?term=${encodeURIComponent(venue.name)}`;
  } else if (venue.type === "sports") {
    return officialTicketUrl;
  } else {
    return `https://${venue.name.toLowerCase().replace(/\s+/g, '')}.com`;
  }
};

// Helper function to determine if the external action button should be shown
export const shouldShowExternalActionButton = (venue: Location, officialTicketUrl: string): boolean => {
  if (venue.type === "sports") {
    return !!officialTicketUrl;
  }
  return true;
};
