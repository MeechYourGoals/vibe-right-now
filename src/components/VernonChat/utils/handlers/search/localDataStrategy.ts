
import { cityCoordinates } from '@/utils/locations';
import { getLocationsByCity, getTrendingLocationsForCity } from '@/mock/cityLocations';
import { updateTrendingLocations } from '@/utils/trendingLocationsUpdater';
import { generateLocationResponse } from '../../locationResponseGenerator';
import { cleanResponseText } from '../../responseFormatter';
import { detectCityInQuery, detectCategoryInQuery, isLocationOrEventQuery } from '../../locationResponseGenerator';

/**
 * Provides local data fallback for search queries
 */
export const LocalDataStrategy = {
  /**
   * Augments search results with local city data when external services fail
   */
  augmentWithLocalData(
    inputValue: string, 
    existingResponse: string, 
    paginationState: Record<string, number>
  ): string {
    // Check if we need to augment with local city data
    const detectedCity = detectCityInQuery(inputValue);
    
    if (detectedCity && isLocationOrEventQuery(inputValue)) {
      const cityInfo = cityCoordinates[detectedCity];
      if (cityInfo) {
        let cityLocations = getLocationsByCity(cityInfo.name);
        
        const detectedCategory = detectCategoryInQuery(inputValue);
        if (detectedCategory && cityLocations.length > 0) {
          if (detectedCategory === "sports") {
            cityLocations = cityLocations.filter(loc => loc.type === "sports");
          } else if (detectedCategory === "nightlife") {
            cityLocations = cityLocations.filter(loc => loc.type === "bar");
          } else if (detectedCategory === "dining") {
            cityLocations = cityLocations.filter(loc => loc.type === "restaurant");
          } else if (detectedCategory === "concerts") {
            cityLocations = cityLocations.filter(loc => 
              loc.name.toLowerCase().includes("concert") || 
              loc.name.toLowerCase().includes("music") ||
              (loc.type === "event" && loc.name.toLowerCase().includes("festival"))
            );
          } else if (detectedCategory === "events") {
            cityLocations = cityLocations.filter(loc => loc.type === "event");
          } else if (detectedCategory === "attractions") {
            cityLocations = cityLocations.filter(loc => loc.type === "attraction");
          }
        }
        
        if (cityLocations.length > 0) {
          updateTrendingLocations(cityInfo.name, getTrendingLocationsForCity(cityInfo.name));
          
          let combinedResponse = typeof existingResponse === 'string' ? existingResponse : '';
          
          if (!combinedResponse.includes("Nightlife:") && !combinedResponse.includes("Dining:")) {
            combinedResponse = `${combinedResponse}\n\n${generateLocationResponse(cityInfo.name, cityLocations, paginationState)}`;
          }
          
          return cleanResponseText(combinedResponse);
        }
      }
    }
    
    return existingResponse;
  },
  
  /**
   * Creates a fallback message when all other strategies fail
   */
  getUltimateFallback(inputValue: string): string {
    return "I'm sorry, I couldn't find specific information about that location or request. Could you try asking in a different way or about a different location?\n\nYou can also try using our [Explore page](/explore) directly to browse venues and events.";
  }
};
