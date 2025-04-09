
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
      
      // Check if this is a booking request
      if (BookingAgent.isBookingRequest(inputValue)) {
        const bookingDetails = BookingAgent.extractBookingDetails(inputValue);
        
        if (bookingDetails) {
          // Send an initial response while processing
          const processingMessage = createAIMessage("I'm working on your booking request, please wait a moment...");
          setMessages(prev => [...prev, processingMessage]);
          
          // Attempt to book
          const bookingResult = await BookingAgent.bookVenue(bookingDetails);
          const confirmationText = BookingAgent.generateBookingConfirmation(bookingResult);
          
          // Update the processing message with the confirmation
          setMessages(prev => prev.map(msg => 
            msg.id === processingMessage.id ? {...msg, text: confirmationText} : msg
          ));
          
          setIsTyping(false);
          setIsSearching(false);
          return;
        }
      }
      
      if (isVenueMode) {
        // Process venue-specific queries
        responseText = await processVenueQuery(inputValue, isProPlan);
      } else {
        // Try to get response from search service
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
          let cityLocations = getLocationsByCity(cityInfo.name);
          
          // Check if query is about a specific category
          const detectedCategory = detectCategoryInQuery(inputValue);
          if (detectedCategory && cityLocations.length > 0) {
            // Filter locations by category if specified
            if (detectedCategory === "sports") {
              cityLocations = cityLocations.filter(loc => loc.type === "sports");
            } else if (detectedCategory === "nightlife") {
              cityLocations = cityLocations.filter(loc => loc.type === "bar");
            } else if (detectedCategory === "dining") {
              cityLocations = cityLocations.filter(loc => loc.type === "restaurant");
            } else if (detectedCategory === "concerts") {
              // Modified to avoid using the "concert" type and tags property
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
            // Update trending locations with these events
            updateTrendingLocations(cityInfo.name, getTrendingLocationsForCity(cityInfo.name));
            
            // Create a personable response
            let combinedResponse = responseText;
            
            // If the response already includes venue information, don't add duplicate data
            if (!responseText.includes("Nightlife:") && !responseText.includes("Dining:")) {
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
