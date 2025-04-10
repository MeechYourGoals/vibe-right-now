
import { Message } from '../types';
import { createUserMessage, createAIMessage, createErrorMessage } from './messageFactory';
import { extractPaginationParams } from './pagination';
import { handleVenueQuery } from './handlers/venueQueryHandler';
import { handleSearchQuery } from './handlers/searchQueryHandler';
import { handleBookingQuery } from './handlers/bookingQueryHandler';
import { GeminiService } from '@/services/GeminiService';

export interface MessageProcessorProps {
  isVenueMode: boolean;
  isProPlan: boolean;
  updatePaginationState: (params: Record<string, number>) => Record<string, number>;
  setIsTyping: (isTyping: boolean) => void;
  setIsSearching: (isSearching: boolean) => void;
}

export const processMessageInput = async (
  inputValue: string,
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
  { 
    isVenueMode, 
    isProPlan, 
    updatePaginationState,
    setIsTyping,
    setIsSearching 
  }: MessageProcessorProps
) => {
  const userMessage = createUserMessage(inputValue);
  setMessages(prev => [...prev, userMessage]);
  
  setIsTyping(true);
  setIsSearching(true);
  
  try {
    // Get current messages for context
    let messageHistory: Message[] = [];
    setMessages(prevMessages => {
      messageHistory = [...prevMessages];
      return prevMessages;
    });
    
    // Use context from previous messages, but limit to last 10 for efficiency
    const contextMessages = messageHistory.slice(-10);
    
    // Extract pagination parameters from the query
    const paginationParams = extractPaginationParams(inputValue);
    
    // Update pagination state
    const updatedPaginationState = updatePaginationState(paginationParams);
    
    // Handle booking requests first
    const isBookingHandled = await handleBookingQuery(inputValue, setMessages);
    if (isBookingHandled) {
      // Booking was handled, so we're done
      setIsTyping(false);
      setIsSearching(false);
      return;
    }
    
    // Detect if this is likely a location/venue search query
    const isLocationQuery = /what|where|when|things to do|events|places|restaurants|bars|attractions|activities|visit|in|at|near|around/i.test(inputValue);
    const hasCityName = /miami|new york|los angeles|chicago|san francisco|boston|seattle|austin|denver|nashville|atlanta|portland|dallas|houston|phoenix|philadelphia|san diego|las vegas/i.test(inputValue);
    
    // Process the message using Gemini or our search handlers
    let responseText = '';
    try {
      if (isVenueMode) {
        // For venue mode, always use Gemini for business insights
        responseText = await GeminiService.generateResponse(
          inputValue, 
          'venue',
          contextMessages
        );
      } else if (isLocationQuery || hasCityName) {
        // For location queries, prioritize our enhanced search pipeline
        console.log('Location query detected, using search pipeline');
        responseText = await handleSearchQuery(inputValue, updatedPaginationState);
        
        // If search result still seems generic, try again with Gemini directly
        if (responseText.length < 200 || responseText.includes("I don't have specific information")) {
          console.log('Search result insufficient, trying Gemini directly');
          const geminiEnhancement = await GeminiService.generateResponse(
            `The user is looking for information about: "${inputValue}". 
             Please provide specific, detailed information about real venues, events, or activities.
             Include names, addresses, and other practical details when possible.`, 
            'user'
          );
          
          if (geminiEnhancement && geminiEnhancement.length > 200) {
            responseText = geminiEnhancement;
          }
        }
      } else {
        // For conversational queries, use Gemini directly
        responseText = await GeminiService.generateResponse(
          inputValue, 
          'user',
          contextMessages
        );
      }
    } catch (error) {
      console.error('Error getting primary response, falling back to handlers:', error);
      
      // Fall back to our existing handlers if Gemini fails
      if (isVenueMode) {
        // Handle venue-specific queries
        responseText = await handleVenueQuery(inputValue, isProPlan);
      } else {
        // Handle general search queries
        responseText = await handleSearchQuery(inputValue, updatedPaginationState);
      }
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
