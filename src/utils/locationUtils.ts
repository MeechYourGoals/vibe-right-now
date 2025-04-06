
import { Location } from "@/types";
import { mockPosts } from "@/mock/data";

// Helper function to get ride service URL
export const getRideServiceUrl = (place: Location): string => {
  // Simulate a partnership with Uber
  const partnerService = "uber";
  
  // Create the deep link to the ride service app
  return `https://m.uber.com/ul/?action=setPickup&pickup=my_location&dropoff[formatted_address]=${encodeURIComponent(`${place.address}, ${place.city}, ${place.state}`)}`;
};

// Helper function to get official ticket or venue URL
export const getOfficialUrl = (place: Location): string => {
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
    
    // For dynamically generated city locations (format: city-type-index)
    if (place.id.includes('sports')) {
      const city = place.id.split('-')[0];
      if (place.id.includes('basketball')) {
        return `https://tickets.nba.com/${city}`;
      } else if (place.id.includes('football')) {
        return `https://tickets.nfl.com/${city}`;
      } else if (place.id.includes('baseball')) {
        return `https://tickets.mlb.com/${city}`;
      }
      return `https://seatgeek.com/${city}-tickets`;
    }
    
    return ticketUrls[place.id] || "";
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

// Get media for the location
export const getMediaForLocation = (location: Location) => {
  // Return appropriate media based on location type and name
  const imageMap: Record<string, string> = {
    // Sports venues
    "30": "https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=1000&auto=format&fit=crop",  // Lakers
    "31": "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?q=80&w=1000&auto=format&fit=crop",  // Rams
    "32": "https://images.unsplash.com/photo-1566577134624-d9b13555e288?q=80&w=1000&auto=format&fit=crop",  // Dodgers
    "33": "https://images.unsplash.com/photo-1459865264687-595d652de67e?q=80&w=1000&auto=format&fit=crop",  // LA Galaxy
    "34": "https://images.unsplash.com/photo-1530915872-13619796d013?q=80&w=1000&auto=format&fit=crop",    // Volleyball
    "35": "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?q=80&w=1000&auto=format&fit=crop",  // Golf
  };

  // Default media based on type if no specific image is available
  const typeDefaultMedia: Record<string, string> = {
    "restaurant": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000&auto=format&fit=crop",
    "bar": "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?q=80&w=1000&auto=format&fit=crop",
    "event": "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1000&auto=format&fit=crop",
    "attraction": "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?q=80&w=1000&auto=format&fit=crop",
    "sports": "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1000&auto=format&fit=crop",
    "other": "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1000&auto=format&fit=crop",
  };

  return {
    type: "image" as const,
    url: imageMap[location.id] || typeDefaultMedia[location.type] || `https://source.unsplash.com/random/800x600/?${location.type},${location.city}`
  };
};

// Find vibes for a specific location
export const getLocationVibes = (locationId: string) => {
  return mockPosts.filter(post => post.location.id === locationId).slice(0, 2);
};

// Get appropriate button text based on venue type
export const getActionButtonText = (type: string): string => {
  if (type === "restaurant") return "Reservations";
  if (type === "sports" || type === "event") return "Tickets";
  return "Website";
};

// Filter locations based on user position (within miles)
export const filterLocationsByDistance = (
  locations: Location[], 
  userLat: number, 
  userLng: number, 
  maxDistanceMiles: number = 10
): Location[] => {
  return locations.filter((loc) => {
    // Simple distance calculation for demo purposes
    const distance = Math.sqrt(
      Math.pow(loc.lat - userLat, 2) +
      Math.pow(loc.lng - userLng, 2)
    );
    // Convert to roughly miles (this is very approximate)
    const milesAway = distance * 69;
    return milesAway <= maxDistanceMiles;
  });
};
