
import { useState } from 'react';
import { Message } from '../types';
import { HuggingChatService } from '@/services/HuggingChatService';
import { getLocationsByCity, getTrendingLocationsForCity } from '@/mock/cityLocations';
import { updateTrendingLocations } from '@/utils/trendingLocationsUpdater';
import { createUserMessage, createAIMessage, createErrorMessage } from '../utils/messageFactory';
import { 
  generateLocationResponse, 
  detectCityInQuery, 
  isLocationOrEventQuery 
} from '../utils/locationResponseGenerator';
import { PerplexityService } from '@/services/PerplexityService';
import { processVenueQuery } from '../utils/venueQueryProcessor';
import { cleanResponseText } from '../utils/responseFormatter';
import { useFallbackLocalService } from '../utils/searchServiceFallback';
import { cityCoordinates } from '@/utils/locations';

export const useMessageProcessor = (isProPlan: boolean = false, isVenueMode: boolean = false) => {
  const [isTyping, setIsTyping] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const processMessage = async (
    inputValue: string,
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>
  ) => {
    // Add user message
    const userMessage = createUserMessage(inputValue);
    setMessages(prev => [...prev, userMessage]);
    
    setIsTyping(true);
    setIsSearching(true);
    
    try {
      let responseText = '';
      
      if (isVenueMode) {
        // Process venue-specific queries
        responseText = await processVenueQuery(inputValue, isProPlan);
      } else {
        // Try to get response from our search service
        try {
          responseText = await PerplexityService.searchPerplexity(inputValue);
        } catch (error) {
          console.error('Error with search service, falling back to HuggingChat:', error);
          // Get response from HuggingChat as fallback
          responseText = await HuggingChatService.searchHuggingChat(inputValue);
        }
        
        // Parse city if the query was about events or places in a specific city
        const detectedCity = detectCityInQuery(inputValue);
        
        // If city was detected and the query seems to be about locations or events
        if (detectedCity && isLocationOrEventQuery(inputValue)) {
          // Get locations for the detected city
          const cityInfo = cityCoordinates[detectedCity];
          const cityLocations = getLocationsByCity(cityInfo.name);
          
          if (cityLocations.length > 0) {
            // Update trending locations with these events
            updateTrendingLocations(cityInfo.name, getTrendingLocationsForCity(cityInfo.name));
            
            // Create a personable response
            let combinedResponse = responseText;
            
            // If the response already includes venue information, don't add duplicate data
            if (!responseText.includes("**Nightlife**") && !responseText.includes("**Restaurants**")) {
              combinedResponse = `${responseText}\n\n${generateLocationResponse(cityInfo.name, cityLocations)}`;
            }
            
            // Clean the response to remove formatting markers
            combinedResponse = cleanResponseText(combinedResponse);
            
            const aiMessage = createAIMessage(combinedResponse);
            setMessages(prev => [...prev, aiMessage]);
          } else {
            // Fall back to just the search response
            const aiMessage = createAIMessage(cleanResponseText(responseText));
            setMessages(prev => [...prev, aiMessage]);
          }
          
          // End processing here since we've already set messages
          setIsTyping(false);
          setIsSearching(false);
          return;
        }
      }
      
      // Standard response if not a city/venue query or is a venue mode query
      const aiMessage = createAIMessage(cleanResponseText(responseText));
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorMessage = createErrorMessage();
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
      setIsSearching(false);
    }
  };

  return {
    isTyping,
    isSearching,
    processMessage
  };
};
