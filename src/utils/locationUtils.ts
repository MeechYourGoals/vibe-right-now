
import { Location } from "@/types";
import { isEligibleForPriceComparison } from "@/utils/venue/travelIntegrationUtils";

// Helper function to get ride service URL
export const getRideServiceUrl = (place: Location) => {
  // Create the deep link to the ride service app
  return `https://m.uber.com/ul/?action=setPickup&pickup=my_location&dropoff[formatted_address]=${encodeURIComponent(`${place.address}, ${place.city}, ${place.state}`)}`;
};

// Helper function to get official ticket or venue URL
export const getOfficialUrl = (place: Location) => {
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
export const getActionButtonText = (type: string) => {
  if (type === "restaurant") return "Reservations";
  if (type === "sports" || type === "event") return "Tickets";
  return "Website";
};
