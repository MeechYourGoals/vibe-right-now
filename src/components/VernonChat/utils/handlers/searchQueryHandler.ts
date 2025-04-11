import { SwirlSearchService } from '@/services/SwirlSearchService';
import { SearchService } from '@/services/search/SearchService';
import { HuggingChatService } from '@/services/HuggingChatService';
import { VertexAIService } from '@/services/VertexAIService';
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
  let categories: string[] = [];
  
  try {
    console.log('Processing search query:', inputValue);
    
    // Check if this is a location or event-related query
    const isLocationQuery = isLocationOrEventQuery(inputValue);
    const hasLocationKeywords = /miami|new york|los angeles|chicago|san francisco|las vegas|seattle|boston|orlando|washington|dc|places|venue|restaurant|bar|club|event|things to do|visit|attraction/i.test(inputValue);
    
    // For location-based queries, try Vertex AI search first as it has the most up-to-date real-world information
    if (isLocationQuery || hasLocationKeywords) {
      try {
        console.log('Location query detected, trying Vertex AI search first');
        const vertexResponse = await VertexAIService.searchWithVertex(inputValue);
        
        if (vertexResponse && vertexResponse.length > 100 && !vertexResponse.includes("I don't have specific information")) {
          console.log('Got real-world information from Vertex AI');
          
          // Extract likely categories based on content
          if (vertexResponse.toLowerCase().includes('restaurant') || vertexResponse.toLowerCase().includes('dining')) {
            categories.push('dining');
          }
          if (vertexResponse.toLowerCase().includes('bar') || vertexResponse.toLowerCase().includes('club') || vertexResponse.toLowerCase().includes('nightlife')) {
            categories.push('nightlife');
          }
          if (vertexResponse.toLowerCase().includes('museum') || vertexResponse.toLowerCase().includes('park') || vertexResponse.toLowerCase().includes('attraction')) {
            categories.push('attractions');
          }
          if (vertexResponse.toLowerCase().includes('show') || vertexResponse.toLowerCase().includes('concert') || vertexResponse.toLowerCase().includes('event')) {
            categories.push('events');
          }
          
          // Set categories in sessionStorage for the Explore page to use
          if (categories.length > 0) {
            try {
              sessionStorage.setItem('lastSearchCategories', JSON.stringify(categories));
              sessionStorage.setItem('lastSearchQuery', inputValue);
              console.log('Set search categories in session storage:', categories);
            } catch (e) {
              console.error('Error setting categories in sessionStorage:', e);
            }
          }
          
          // Include a link to the Explore page for a better visual experience
          const exploreLinkText = "\n\nYou can also [view all these results on our Explore page](/explore?q=" + 
            encodeURIComponent(inputValue) + ") for a better visual experience.";
          
          return cleanResponseText(vertexResponse + exploreLinkText);
        }
      } catch (vertexError) {
        console.error('Vertex AI search failed, trying other methods:', vertexError);
      }
    }
    
    // Check if this is a comedy-related query
    const isComedyQuery = /comedy|comedian|stand[ -]?up|improv|funny|laugh|jokes/i.test(inputValue);
    
    // Check if this is a complex natural language query with multiple requirements
    const isComplexQuery = inputValue.length > 50 && 
      /(\w+\s+(and|or|with|near|before|after)\s+\w+)|(\w+\s+for\s+\w+)/i.test(inputValue);
    
    // For comedy-specific queries, use specialized search
    if (isComedyQuery) {
      console.log('Comedy-related query detected, using comedy-specific search');
      try {
        const comedyResponse = await SearchService.comedySearch(inputValue);
        if (comedyResponse && comedyResponse.length > 100) {
          const comedyExploreLinkText = "\n\nYou can also [view all comedy shows on our Explore page](/explore?q=" + 
            encodeURIComponent(inputValue) + "&tab=comedy) for a better visual experience.";
          
          // Set comedy category in sessionStorage
          try {
            sessionStorage.setItem('lastSearchCategories', JSON.stringify(['comedy']));
            sessionStorage.setItem('lastSearchQuery', inputValue);
          } catch (e) {
            console.error('Error setting categories in sessionStorage:', e);
          }
          
          return cleanResponseText(comedyResponse + comedyExploreLinkText);
        }
      } catch (comedyError) {
        console.error('Comedy search failed:', comedyError);
      }
    }
    
    // For complex natural language queries or location-related queries, try vector search if Vertex failed
    if (isComplexQuery || isLocationQuery || hasLocationKeywords) {
      try {
        // First attempt with vector search for most up-to-date information
        const vectorSearchResult = await SearchService.vectorSearch(inputValue);
        
        if (typeof vectorSearchResult === 'object' && vectorSearchResult !== null) {
          responseText = vectorSearchResult.results || '';
          categories = vectorSearchResult.categories || [];
          
          // Set categories in sessionStorage for the Explore page to use
          if (categories && categories.length > 0) {
            try {
              sessionStorage.setItem('lastSearchCategories', JSON.stringify(categories));
              sessionStorage.setItem('lastSearchQuery', inputValue);
              console.log('Set search categories in session storage:', categories);
            } catch (e) {
              console.error('Error setting categories in sessionStorage:', e);
            }
          }
        } else if (typeof vectorSearchResult === 'string') {
          responseText = vectorSearchResult;
        }
        
        console.log('Vector search successful, response length:', typeof responseText === 'string' ? responseText.length : 'object');
        console.log('Categories extracted:', categories);
        
        if (responseText && (typeof responseText === 'string' && responseText.length > 100)) {
          // Include a link to the Explore page for a better visual experience
          const exploreLinkText = "\n\nYou can also [view all these results on our Explore page](/explore?q=" + 
            encodeURIComponent(inputValue) + ") for a better visual experience.";
          return cleanResponseText(responseText + exploreLinkText);
        } else {
          console.log('Vector search returned insufficient response, trying other methods');
        }
      } catch (vectorError) {
        console.error('Vector search failed:', vectorError);
      }
    }
    
    // Fall back to regular search service if Vertex and vector search failed
    if (!responseText || (typeof responseText === 'string' && responseText.length < 100)) {
      try {
        responseText = await SearchService.search(inputValue);
        console.log('Got response from SearchService, length:', typeof responseText === 'string' ? responseText.length : 'object');
        
        if (responseText && typeof responseText === 'string' && responseText.length > 100) {
          const exploreLinkText = "\n\nYou can also [view all these results on our Explore page](/explore?q=" + 
            encodeURIComponent(inputValue) + ") for a better visual experience.";
          return cleanResponseText(responseText + exploreLinkText);
        }
      } catch (searchError) {
        console.error('Error with SearchService, trying alternatives:', searchError);
        
        // If SearchService fails, try Swirl
        const isSwirlAvailable = await SwirlSearchService.isAvailable();
        if (isSwirlAvailable) {
          console.log('Using Swirl search engine for query');
          try {
            responseText = await SwirlSearchService.search(inputValue);
            if (responseText && typeof responseText === 'string' && responseText.length > 100) {
              return cleanResponseText(responseText);
            }
          } catch (swirlError) {
            console.error('Error with Swirl search, falling back to HuggingChat:', swirlError);
            responseText = await HuggingChatService.searchHuggingChat(inputValue);
            if (responseText && typeof responseText === 'string' && responseText.length > 100) {
              return cleanResponseText(responseText);
            }
          }
        } else {
          // If Swirl is not available, use HuggingChat
          responseText = await HuggingChatService.searchHuggingChat(inputValue);
          if (responseText && typeof responseText === 'string' && responseText.length > 100) {
            return cleanResponseText(responseText);
          }
        }
      }
    }
    
    // If we still don't have a good response, try one last time with Vertex AI
    if (!responseText || (typeof responseText === 'string' && responseText.length < 100) || (typeof responseText === 'string' && responseText.includes("I don't have specific information"))) {
      try {
        console.log('No good response yet, trying Vertex AI one more time with enhanced prompt');
        const lastChanceResponse = await VertexAIService.searchWithVertex(
          `Provide detailed information about "${inputValue}" including real venues, events, and activities. Include specific names, addresses, and practical details.`
        );
        
        if (lastChanceResponse && lastChanceResponse.length > 100) {
          responseText = lastChanceResponse;
          return cleanResponseText(responseText);
        }
      } catch (error) {
        console.error('Last chance Vertex AI search failed:', error);
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
        
        let combinedResponse = typeof responseText === 'string' ? responseText : '';
        
        if (!combinedResponse.includes("Nightlife:") && !combinedResponse.includes("Dining:")) {
          combinedResponse = `${combinedResponse}\n\n${generateLocationResponse(cityInfo.name, cityLocations, paginationState)}`;
        }
        
        return cleanResponseText(combinedResponse);
      }
    }
  }
  
  // If we have any result, return it
  if (responseText && (typeof responseText === 'string' && responseText.length > 0)) {
    // Add a link to the Explore page
    const exploreLinkText = "\n\nYou can also [view all these results on our Explore page](/explore?q=" + 
      encodeURIComponent(inputValue) + ") for a better visual experience.";
    return cleanResponseText((typeof responseText === 'string' ? responseText : JSON.stringify(responseText)) + exploreLinkText);
  }
  
  // Ultimate fallback if all else fails
  return "I'm sorry, I couldn't find specific information about that location or request. Could you try asking in a different way or about a different location?\n\nYou can also try using our [Explore page](/explore) directly to browse venues and events.";
};
