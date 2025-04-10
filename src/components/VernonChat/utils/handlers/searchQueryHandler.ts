
import { SwirlSearchService } from '@/services/SwirlSearchService';
import { SearchService } from '@/services/search/SearchService';
import { HuggingChatService } from '@/services/HuggingChatService';
import { 
  detectCityInQuery, 
  isLocationOrEventQuery,
  detectCategoryInQuery,
  generateLocationResponse
} from '../locationResponseGenerator';
import { cityCoordinates } from '@/utils/locations';
import { getLocationsByCity, getTrendingLocationsForCity } from '@/mock/cityLocations';
import { updateTrendingLocations } from '@/utils/trendingLocationsUpdater';
import { cleanResponseText } from '../responseFormatter';

/**
 * Handle general search queries and location-based queries
 */
export const handleSearchQuery = async (
  inputValue: string,
  paginationState: Record<string, number>
): Promise<string> => {
  let responseText = '';
  
  try {
    console.log('Processing search query:', inputValue);
    
    // First try to get results from SearchService which prioritizes vector search
    try {
      responseText = await SearchService.search(inputValue);
      console.log('Got response from SearchService');
    } catch (searchError) {
      console.error('Error with SearchService, trying alternatives:', searchError);
      
      // If SearchService fails, try Swirl
      const isSwirlAvailable = await SwirlSearchService.isAvailable();
      if (isSwirlAvailable) {
        console.log('Using Swirl search engine for query');
        try {
          responseText = await SwirlSearchService.search(inputValue);
        } catch (swirlError) {
          console.error('Error with Swirl search, falling back to HuggingChat:', swirlError);
          responseText = await HuggingChatService.searchHuggingChat(inputValue);
        }
      } else {
        // If Swirl is not available, use HuggingChat
        responseText = await HuggingChatService.searchHuggingChat(inputValue);
      }
    }
  } catch (error) {
    console.error('All search services failed, using local data:', error);
    // Fall back to local data if all else fails
  }
  
  // Check if we need to augment with local city data
  const detectedCity = detectCityInQuery(inputValue);
  
  if (detectedCity && isLocationOrEventQuery(inputValue)) {
    const cityInfo = cityCoordinates[detectedCity];
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
      
      let combinedResponse = responseText;
      
      if (!responseText.includes("Nightlife:") && !responseText.includes("Dining:")) {
        combinedResponse = `${responseText}\n\n${generateLocationResponse(cityInfo.name, cityLocations, paginationState)}`;
      }
      
      return cleanResponseText(combinedResponse);
    }
  }
  
  return cleanResponseText(responseText);
};
