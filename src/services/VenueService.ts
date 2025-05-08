
import { Location } from "@/types";
import { mockLocations } from "@/mock/data";
import { generateRandomBusinessHours } from "@/utils/locations/businessHoursUtils";

// Get a venue by ID
export const getVenueById = (venueId: string): Location | null => {
  return mockLocations.find(venue => venue.id === venueId) || null;
};

// Get venues by type
export const getVenuesByType = (type: string): Location[] => {
  return mockLocations.filter(venue => venue.type === type);
};

// Get venues by city
export const getVenuesByCity = (city: string): Location[] => {
  return mockLocations.filter(venue => venue.city.toLowerCase() === city.toLowerCase());
};

// Get trending venues
export const getTrendingVenues = (limit: number = 5): Location[] => {
  return mockLocations
    .sort(() => Math.random() - 0.5)
    .slice(0, limit);
};

// Get nearby venues based on coordinates
export const getNearbyVenues = (lat: number, lng: number, radius: number = 5): Location[] => {
  return mockLocations.filter(venue => {
    // Simple distance calculation using Pythagorean theorem (not accurate for long distances)
    const distance = Math.sqrt(
      Math.pow(venue.lat - lat, 2) + 
      Math.pow(venue.lng - lng, 2)
    ) * 69; // Rough conversion to miles
    
    return distance <= radius;
  });
};

// Export the function directly
export default getVenueById;
