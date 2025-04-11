
import { Location } from "@/types";
import { mockLocations, searchLocations as mockSearchLocations } from "@/mock/locations";

/**
 * Search for locations based on query string
 */
export const searchLocations = (query: string): Location[] => {
  if (!query.trim()) {
    return [];
  }
  
  return mockSearchLocations(query).slice(0, 5); // Limit to 5 results
};
