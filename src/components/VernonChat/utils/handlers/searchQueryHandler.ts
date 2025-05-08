
import { searchLocations } from './locationSearchStrategy';
import { formatSearchResponse } from '../../../../utils/responseFormatter';

/**
 * Handle search queries
 */
export async function handleSearchQuery(
  query: string,
  options: {
    category?: string;
    location?: string;
    maxResults?: number;
  } = {}
) {
  try {
    const { category = "", location = "", maxResults = 10 } = options;
    
    // Determine search query based on input parameters
    const searchQuery = location || query;
    
    // If we don't have a proper search query, return empty results
    if (!searchQuery.trim()) {
      return formatSearchResponse([]);
    }
    
    // Use location search strategy by default
    const results = await searchLocations(searchQuery, category, maxResults);
    
    return results;
  } catch (error) {
    console.error('Error in handleSearchQuery:', error);
    return {
      results: [],
      message: "Sorry, I couldn't find any results for that search."
    };
  }
}
