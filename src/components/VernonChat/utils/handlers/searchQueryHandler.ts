
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
    
    // Check if this is a location or event-related query
    const isLocationQuery = isLocationOrEventQuery(inputValue);
    const hasLocationKeywords = /miami|new york|los angeles|chicago|san francisco|las vegas|seattle|boston|orlando|washington|dc|places|venue|restaurant|bar|club|event|things to do|visit|attraction/i.test(inputValue);
    
    // For location-related queries, prioritize vector search
    if (isLocationQuery || hasLocationKeywords) {
      console.log('Location-related query detected, prioritizing vector search');
      try {
        // First attempt with vector search for most up-to-date information
        responseText = await SearchService.vectorSearch(inputValue);
        console.log('Vector search successful, response length:', responseText?.length);
        
        if (responseText && responseText.length > 100) {
          return cleanResponseText(responseText);
        } else {
          console.log('Vector search returned insufficient response, trying other methods');
        }
      } catch (vectorError) {
        console.error('Vector search failed:', vectorError);
      }
    }
    
    // Fall back to regular search service if vector search failed or wasn't applicable
    if (!responseText || responseText.length < 100) {
      try {
        responseText = await SearchService.search(inputValue);
        console.log('Got response from SearchService, length:', responseText?.length);
        
        if (responseText && responseText.length > 100) {
          return cleanResponseText(responseText);
        }
      } catch (searchError) {
        console.error('Error with SearchService, trying alternatives:', searchError);
        
        // If SearchService fails, try Swirl
        const isSwirlAvailable = await SwirlSearchService.isAvailable();
        if (isSwirlAvailable) {
          console.log('Using Swirl search engine for query');
          try {
            responseText = await SwirlSearchService.search(inputValue);
            if (responseText && responseText.length > 100) {
              return cleanResponseText(responseText);
            }
          } catch (swirlError) {
            console.error('Error with Swirl search, falling back to HuggingChat:', swirlError);
            responseText = await HuggingChatService.searchHuggingChat(inputValue);
            if (responseText && responseText.length > 100) {
              return cleanResponseText(responseText);
            }
          }
        } else {
          // If Swirl is not available, use HuggingChat
          responseText = await HuggingChatService.searchHuggingChat(inputValue);
          if (responseText && responseText.length > 100) {
            return cleanResponseText(responseText);
          }
        }
      }
    }
    
    // If we still don't have a good response, try one last time with vector search
    if (!responseText || responseText.length < 100 || responseText.includes("I don't have specific information")) {
      try {
        console.log('No good response yet, trying vector search one more time with enhanced prompt');
        const lastChanceResponse = await SearchService.vectorSearch(
          `Provide detailed information about "${inputValue}" including real venues, events, and activities. Include specific names, addresses, and practical details.`
        );
        if (lastChanceResponse && lastChanceResponse.length > 100) {
          responseText = lastChanceResponse;
          return cleanResponseText(responseText);
        }
      } catch (error) {
        console.error('Last chance vector search failed:', error);
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
        
        let combinedResponse = responseText;
        
        if (!responseText.includes("Nightlife:") && !responseText.includes("Dining:")) {
          combinedResponse = `${responseText}\n\n${generateLocationResponse(cityInfo.name, cityLocations, paginationState)}`;
        }
        
        return cleanResponseText(combinedResponse);
      }
    }
  }
  
  // If we have any result, return it
  if (responseText && responseText.length > 0) {
    return cleanResponseText(responseText);
  }
  
  // Ultimate fallback if all else fails
  return "I'm sorry, I couldn't find specific information about that location or request. Could you try asking in a different way or about a different location?";
};
