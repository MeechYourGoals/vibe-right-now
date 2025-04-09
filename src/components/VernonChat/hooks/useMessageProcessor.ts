import { useState } from 'react';
import { Message } from '../types';
import { HuggingChatService } from '@/services/HuggingChatService';
import { getLocationsByCity, getTrendingLocationsForCity } from '@/mock/cityLocations';
import { updateTrendingLocations } from '@/utils/trendingLocationsUpdater';
import { createUserMessage, createAIMessage, createErrorMessage } from '../utils/messageFactory';
import { 
  generateLocationResponse, 
  detectCityInQuery, 
  isLocationOrEventQuery,
  detectCategoryInQuery
} from '../utils/locationResponseGenerator';
import { PerplexityService } from '@/services/PerplexityService';
import { processVenueQuery } from '../utils/venueQueryProcessor';
import { cleanResponseText } from '../utils/responseFormatter';
import { cityCoordinates } from '@/utils/locations';
import { BookingAgent } from '../utils/bookingAgent';

const extractPaginationParams = (query: string): Record<string, number> => {
  const params: Record<string, number> = {};
  
  const categoryPageRegex = /(?:page\s*(\d+)\s*(?:of|for)\s*([a-z]+))|(?:([a-z]+)\s*page\s*(\d+))/i;
  const match = query.match(categoryPageRegex);
  
  if (match) {
    const page = parseInt(match[1] || match[4], 10);
    const category = (match[2] || match[3]).toLowerCase();
    
    if (!isNaN(page) && category) {
      params[category] = page;
    }
  }
  
  if (query.toLowerCase().includes("next page")) {
    params._nextPage = 2;
    
    const categories = ["sports", "events", "dining", "restaurants", "nightlife", "bars", "attractions", "concerts"];
    for (const category of categories) {
      if (query.toLowerCase().includes(category)) {
        params[category] = 2;
        break;
      }
    }
  }
  
  if (query.toLowerCase().includes("previous page") || query.toLowerCase().includes("prev page")) {
    params._prevPage = 1;
    
    const categories = ["sports", "events", "dining", "restaurants", "nightlife", "bars", "attractions", "concerts"];
    for (const category of categories) {
      if (query.toLowerCase().includes(category)) {
        params[category] = 1;
        break;
      }
    }
  }
  
  return params;
};

export const useMessageProcessor = (isProPlan: boolean = false, isVenueMode: boolean = false) => {
  const [isTyping, setIsTyping] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [currentPaginationState, setCurrentPaginationState] = useState<Record<string, number>>({});

  const processMessage = async (
    inputValue: string,
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>
  ) => {
    const userMessage = createUserMessage(inputValue);
    setMessages(prev => [...prev, userMessage]);
    
    setIsTyping(true);
    setIsSearching(true);
    
    try {
      let responseText = '';
      
      const paginationParams = extractPaginationParams(inputValue);
      
      let updatedPaginationState = { ...currentPaginationState };
      
      Object.keys(paginationParams).forEach(key => {
        if (key === '_nextPage') {
          Object.keys(updatedPaginationState).forEach(category => {
            updatedPaginationState[category] = (updatedPaginationState[category] || 1) + 1;
          });
        } else if (key === '_prevPage') {
          Object.keys(updatedPaginationState).forEach(category => {
            updatedPaginationState[category] = Math.max(1, (updatedPaginationState[category] || 1) - 1);
          });
        } else {
          updatedPaginationState[key] = paginationParams[key];
        }
      });
      
      setCurrentPaginationState(updatedPaginationState);
      
      if (BookingAgent.isBookingRequest(inputValue)) {
        const bookingDetails = BookingAgent.extractBookingDetails(inputValue);
        
        if (bookingDetails) {
          const processingMessage = createAIMessage("I'm working on your booking request, please wait a moment...");
          setMessages(prev => [...prev, processingMessage]);
          
          const bookingResult = await BookingAgent.bookVenue(bookingDetails);
          const confirmationText = BookingAgent.generateBookingConfirmation(bookingResult);
          
          setMessages(prev => prev.map(msg => 
            msg.id === processingMessage.id ? {...msg, text: confirmationText} : msg
          ));
          
          setIsTyping(false);
          setIsSearching(false);
          return;
        }
      } else if (isVenueMode) {
        responseText = await processVenueQuery(inputValue, isProPlan);
      } else {
        try {
          responseText = await PerplexityService.searchPerplexity(inputValue);
        } catch (error) {
          console.error('Error with search service, falling back to HuggingChat:', error);
          responseText = await HuggingChatService.searchHuggingChat(inputValue);
        }
        
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
              combinedResponse = `${responseText}\n\n${generateLocationResponse(cityInfo.name, cityLocations, updatedPaginationState)}`;
            }
            
            combinedResponse = cleanResponseText(combinedResponse);
            
            const aiMessage = createAIMessage(combinedResponse);
            setMessages(prev => [...prev, aiMessage]);
          } else {
            const aiMessage = createAIMessage(cleanResponseText(responseText));
            setMessages(prev => [...prev, aiMessage]);
          }
          
          setIsTyping(false);
          setIsSearching(false);
          return;
        }
      }
      
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
