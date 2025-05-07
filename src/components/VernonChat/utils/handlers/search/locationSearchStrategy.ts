
import { parseCityStateFromQuery } from '@/utils/geocodingService';
import { formatLocationResponse } from '@/components/VernonChat/utils/responseFormatter';
import { getLocationsByCity } from '@/mock/cityLocations';

export const LocationSearchStrategy = {
  /**
   * Determine if a query is specifically about locations
   */
  isLocationQuery(query: string): boolean {
    const locationKeywords = [
      'places', 'locations', 'venues', 'restaurants', 'bars', 'clubs',
      'in', 'near', 'around', 'downtown', 'uptown', 'nightlife',
      'attractions', 'visit', 'things to do', 'where to go'
    ];
    
    return locationKeywords.some(keyword => 
      query.toLowerCase().includes(keyword.toLowerCase())
    );
  },
  
  /**
   * Handle location-specific search queries
   */
  async handleLocationSearch(query: string): Promise<{ response: string }> {
    try {
      // Extract location information
      const { city, state } = parseCityStateFromQuery(query);
      
      if (!city) {
        return { 
          response: "I'm not sure which city you're asking about. Could you please specify a city in your search?" 
        };
      }
      
      console.log(`Location search for ${city}, ${state || ''}`);
      
      // Get locations for the city
      const locations = await getLocationsByCity(city);
      
      if (!locations || locations.length === 0) {
        return { 
          response: `I couldn't find any locations in ${city}. Try searching for a different city or a popular destination.` 
        };
      }
      
      // Group locations by category
      const categoryMap: Record<string, string[]> = {};
      
      // Process locations
      locations.forEach(location => {
        const category = location.type || 'other';
        
        if (!categoryMap[category]) {
          categoryMap[category] = [];
        }
        
        const locationText = `[${location.name}](/venue/${location.id}) - ${location.address}`;
        categoryMap[category].push(locationText);
      });
      
      // Format the response using the utility
      const formattedResponse = formatLocationResponse(city, categoryMap);
      
      return { response: formattedResponse };
    } catch (error) {
      console.error('Error in location search:', error);
      return { 
        response: "I had trouble searching for locations. Please try again with a more specific query."
      };
    }
  }
};
