
import { useState } from 'react';
import { Message } from '../types';
import { createUserMessage, createAIMessage, createErrorMessage } from '../utils/messageFactory';
import { extractPaginationParams } from '../utils/pagination/extractPaginationParams';
import { handleVenueQuery } from '../utils/handlers/venueQueryHandler';
import { handleSearchQuery } from '../utils/handlers/searchQueryHandler';
import { handleBookingQuery } from '../utils/handlers/bookingQueryHandler';
import { cleanResponseText } from '../utils/responseFormatter';

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
      // Extract pagination parameters from the query
      const paginationParams = extractPaginationParams(inputValue);
      
      // Update pagination state
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
      
      // Handle booking requests first
      const isBookingHandled = await handleBookingQuery(inputValue, setMessages);
      if (isBookingHandled) {
        // Booking was handled, so we're done
        setIsTyping(false);
        setIsSearching(false);
        return;
      }
      
      // Process the message based on mode
      let responseText = '';
      
      if (isVenueMode) {
        // Handle venue-specific queries
        responseText = await handleVenueQuery(inputValue, isProPlan);
      } else {
        // Handle general search queries
        responseText = await handleSearchQuery(inputValue, updatedPaginationState);
      }
      
      // Create and add the AI message with the response
      const aiMessage = createAIMessage(responseText);
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
