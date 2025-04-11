
import { Location } from "@/types";
import { mockLocations, searchLocations } from "@/mock/locations";

/**
 * Search for locations based on query string
 */
export const searchLocations as (query: string) => Location[] = (query: string): Location[] => {
  if (!query.trim()) {
    return [];
  }
  
  return searchLocations(query).slice(0, 5); // Limit to 5 results
};
