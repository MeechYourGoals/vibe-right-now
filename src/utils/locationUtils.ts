import { Location } from "@/types";

// Helper function to get ride service URL
export const getRideServiceUrl = (place: Location) => {
  // Simulate a partnership with Uber
  const partnerService = "uber";
  
  // Create the deep link to the ride service app
  return `https://m.uber.com/ul/?action=setPickup&pickup=my_location&dropoff[formatted_address]=${encodeURIComponent(`${place.address}, ${place.city}, ${place.state}`)}`;
};

// Helper function to get official ticket or venue URL
export const getOfficialUrl = (place: Location) => {
  // For sports venues, we would typically have specific ticket platform partnerships
  if (place.type === "sports") {
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
export const getActionButtonText = (type: string) => {
  if (type === "restaurant") return "Reservations";
  if (type === "sports" || type === "event") return "Tickets";
  return "Website";
};

/**
 * Gets the vibes associated with a location based on recent posts and sentiment
 */
export const getLocationVibes = (locationId: string): string[] => {
  // For now, return some default vibes based on location type
  // In a real implementation, this would analyze posts and user sentiment
  const defaultVibes = [
    "Relaxed",
    "Energetic",
    "Creative",
    "Professional",
    "Romantic",
    "Family-friendly",
    "Trendy",
    "Exclusive",
    "Casual"
  ];
  
  // Return 2-4 random vibes
  const count = Math.floor(Math.random() * 3) + 2;
  const shuffled = [...defaultVibes].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
