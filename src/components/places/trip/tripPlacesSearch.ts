
import { Location } from "@/types";
import { mockLocations } from "@/mock/data";

/**
 * Search for locations based on query string
 */
export const searchLocations = (query: string): Location[] => {
  if (!query.trim()) {
    return [];
  }
  
  // Simple search from mock locations
  const results = mockLocations.filter(
    location => location.name.toLowerCase().includes(query.toLowerCase()) ||
                location.city.toLowerCase().includes(query.toLowerCase())
  );
  
  return results.slice(0, 5); // Limit to 5 results
};
