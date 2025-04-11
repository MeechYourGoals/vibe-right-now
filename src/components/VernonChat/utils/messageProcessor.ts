
import { Message } from '../types';
import { createUserMessage, createAIMessage, createErrorMessage } from './messageFactory';
import { extractPaginationParams } from './pagination';
import { handleVenueQuery } from './handlers/venueQueryHandler';
import { handleSearchQuery } from './handlers/searchQueryHandler';
import { handleBookingQuery } from './handlers/bookingQueryHandler';
import { VertexAIService } from '@/services/VertexAIService';

export interface MessageProcessorProps {
  isVenueMode: boolean;
  isProPlan: boolean;
  updatePaginationState: (params: Record<string, number>) => Record<string, number>;
  setIsTyping: (isTyping: boolean) => void;
  setIsSearching: (isSearching: boolean) => void;
}

// Always use Vertex AI by default
const useVertexAI = true;

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
    const hasCityName = /miami|new york|los angeles|chicago|san francisco|boston|seattle|austin|denver|nashville|atlanta|portland|dallas|houston|phoenix|philadelphia|san diego|las vegas|orlando|washington|dc/i.test(inputValue);
    
    console.log('Processing query:', inputValue);
    console.log('Is location query:', isLocationQuery);
    console.log('Has city name:', hasCityName);
    
    // Process the message using selected AI service or our search handlers
    let responseText = '';
    
    // For location queries or any query with city names, prioritize search
    if (isLocationQuery || hasCityName) {
      console.log('Location/city query detected, using search pipeline');
      try {
        // First try the search handler which now prioritizes Vertex AI
        responseText = await handleSearchQuery(inputValue, updatedPaginationState);
        console.log('Search query handler returned response of length:', responseText.length);
        
        // If we didn't get a good response, try direct Vertex AI call
        if (!responseText || responseText.length < 100 || responseText.includes("I don't have specific information")) {
          console.log('Search result insufficient, trying Vertex AI directly with search mode');
          
          responseText = await VertexAIService.searchWithVertex(
            `The user is asking about: "${inputValue}". 
             Provide detailed information about real venues, events, or activities in this location.
             Include names of specific places, addresses, and hours when possible.
             Group information by categories (dining, nightlife, attractions, events, etc.)`
          );
        }
      } catch (error) {
        console.error('Error in search pipeline:', error);
        // Fall back to direct AI call using Vertex AI
        responseText = await VertexAIService.generateResponse(inputValue, 'user', contextMessages);
      }
    } else if (isVenueMode) {
      // For venue mode, always use Vertex AI for business insights
      responseText = await VertexAIService.generateResponse(
        inputValue, 
        'venue',
        contextMessages
      );
    } else {
      // For conversational queries, use Vertex AI directly
      responseText = await VertexAIService.generateResponse(
        inputValue, 
        'user',
        contextMessages
      );
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
