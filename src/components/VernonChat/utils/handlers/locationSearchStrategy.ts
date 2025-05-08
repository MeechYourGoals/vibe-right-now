
import { Location } from "@/types";
import { generateMockLocationsForCity } from "@/utils/explore/exploreHelpers";
import { formatSearchResponse } from "@/utils/responseFormatter";

export const searchLocations = async (
  query: string, 
  category: string = "", 
  maxResults: number = 10
): Promise<any> => {
  // Generate mock locations for the city in the query
  const mockLocations = generateMockLocationsForCity(query, "");
  
  // Filter by category if specified
  const filteredLocations = category 
    ? mockLocations.filter(loc => loc.type === category.toLowerCase())
    : mockLocations;
  
  // Limit results
  const limitedResults = filteredLocations.slice(0, maxResults);
  
  // Format the response
  return formatSearchResponse(limitedResults, query, category);
};

export default searchLocations;
