
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

export const useMessageProcessor = () => {
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
      // Get response from HuggingChat
      const responseText = await HuggingChatService.searchHuggingChat(inputValue);
      
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
          
          const aiMessage = createAIMessage(combinedResponse);
          setMessages(prev => [...prev, aiMessage]);
        } else {
          // Fall back to just the search response
          const aiMessage = createAIMessage(responseText);
          setMessages(prev => [...prev, aiMessage]);
        }
      } else {
        // Standard response if no city was detected or query isn't about events
        const aiMessage = createAIMessage(responseText);
        setMessages(prev => [...prev, aiMessage]);
      }
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

// Import cityCoordinates locally since it's also used in the imported locationResponseGenerator
import { cityCoordinates } from '@/utils/locations';
