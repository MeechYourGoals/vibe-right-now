
import { formatLocationResponse } from '../responseFormatter';
import { LocationService } from '@/services/LocationService';
import { parseCityStateFromQuery } from '@/utils/geocodingService';
import { getLocationsByCity } from '@/mock/cityLocations';

/**
 * Handle a search query about locations, venues, or events
 */
export const handleSearchQuery = async (query: string, paginationState: any = {}): Promise<string> => {
  try {
    // Parse location information from the query
    const { city, state } = parseCityStateFromQuery(query);
    
    // Default to a popular city if we couldn't detect one
    const searchCity = city || "San Francisco";
    
    console.log(`Handling search query for ${searchCity}, ${state || ''}`);
    
    // Get locations for the detected city
    let locations;
    try {
      // First try the LocationService which might connect to a real API
      locations = await LocationService.getLocationsByCity(searchCity);
    } catch (e) {
      console.log("Error using LocationService, falling back to mock data");
      // Fall back to mock data if the service fails
      locations = getLocationsByCity(searchCity);
    }
    
    // Group locations by type for the response formatter
    const categoryResults: Record<string, string[]> = {};
    
    // Map location types to category names
    const typeToCategory: Record<string, string> = {
      "bar": "nightlife",
      "restaurant": "dining",
      "attraction": "attractions",
      "event": "events",
      "sports": "sports"
    };
    
    // Group locations by category
    if (Array.isArray(locations)) {
      locations.forEach(location => {
        const category = typeToCategory[location.type] || "other";
        
        if (!categoryResults[category]) {
          categoryResults[category] = [];
        }
        
        // Create link for the location
        const locationLink = `[${location.name}](/venue/${location.id})`;
        categoryResults[category].push(locationLink);
      });
    }
    
    // Format the response
    return formatLocationResponse(searchCity, categoryResults, paginationState);
  } catch (error) {
    console.error('Error processing search query:', error);
    return "I'm having trouble finding that information right now. Could you try asking in a different way?";
  }
};
