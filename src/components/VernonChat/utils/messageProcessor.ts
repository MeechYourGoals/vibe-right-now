
import { Message } from '../types';
import { createUserMessage, createAIMessage, createErrorMessage } from './messageFactory';
import { extractPaginationParams } from './pagination';
import { handleVenueQuery } from './handlers/venueQueryHandler';
import { handleSearchQuery } from './handlers/searchQueryHandler';
import { handleBookingQuery } from './handlers/bookingQueryHandler';
import { VertexAIService } from '@/services/VertexAIService';
import { OpenAIService } from '@/services/OpenAIService';

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
    const isLocationQuery = /what|where|when|how|things to do|events|places|restaurants|bars|attractions|activities|visit|in|at|near|around/i.test(inputValue);
    const hasCityName = /miami|new york|los angeles|chicago|san francisco|boston|seattle|austin|denver|nashville|atlanta|portland|dallas|houston|phoenix|philadelphia|san diego|las vegas|orlando|washington|dc/i.test(inputValue);
    
    console.log('Processing query:', inputValue);
    console.log('Is location query:', isLocationQuery);
    console.log('Has city name:', hasCityName);
    
    // Process the message using selected AI service or our search handlers
    let responseText = '';
    
    // For location queries or any query with city names, prioritize search
    if (isLocationQuery || hasCityName) {
      console.log('Location/city query detected, using search pipeline with OpenAI');
      try {
        // Extract any categories from the query to help with search relevance
        const categories = extractCategoriesFromQuery(inputValue);
        
        // Use the search handler which now prioritizes OpenAI
        responseText = await handleSearchQuery(inputValue, updatedPaginationState);
        console.log('Search query handler returned response of length:', responseText.length);
      } catch (error) {
        console.error('Error in search pipeline:', error);
        // Fall back to direct OpenAI call
        try {
          // Convert contextMessages to format expected by OpenAI
          const openAIMessages = contextMessages.map(msg => ({
            role: msg.sender === 'user' ? 'user' : 'assistant',
            content: msg.text
          }));
          
          // Add the new user message
          openAIMessages.push({
            role: 'user',
            content: inputValue
          });
          
          responseText = await OpenAIService.sendChatRequest(openAIMessages, {
            model: 'gpt-4o-mini',
            context: isVenueMode ? 'venue' : 'user'
          });
        } catch (openAIError) {
          console.error('Error with OpenAI fallback:', openAIError);
          // Fall back to Vertex AI if OpenAI fails
          responseText = await VertexAIService.generateResponse(inputValue, 'default', contextMessages);
        }
      }
    } else if (isVenueMode) {
      // For venue mode, use OpenAI for business insights
      try {
        // Convert contextMessages to format expected by OpenAI
        const openAIMessages = contextMessages.map(msg => ({
          role: msg.sender === 'user' ? 'user' : 'assistant',
          content: msg.text
        }));
        
        // Add the new user message
        openAIMessages.push({
          role: 'user',
          content: inputValue
        });
        
        responseText = await OpenAIService.sendChatRequest(openAIMessages, {
          model: 'gpt-4o',
          context: 'venue'
        });
      } catch (error) {
        console.error('Error with OpenAI for venue mode:', error);
        // Fall back to Vertex AI
        responseText = await VertexAIService.generateResponse(inputValue, 'venue', contextMessages);
      }
    } else {
      // For conversational queries, use OpenAI directly
      try {
        // Convert contextMessages to format expected by OpenAI
        const openAIMessages = contextMessages.map(msg => ({
          role: msg.sender === 'user' ? 'user' : 'assistant',
          content: msg.text
        }));
        
        // Add the new user message
        openAIMessages.push({
          role: 'user',
          content: inputValue
        });
        
        responseText = await OpenAIService.sendChatRequest(openAIMessages, {
          model: 'gpt-4o-mini',
          context: 'user'
        });
      } catch (error) {
        console.error('Error with OpenAI for conversational mode:', error);
        // Fall back to Vertex AI
        responseText = await VertexAIService.generateResponse(inputValue, 'default', contextMessages);
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

/**
 * Extract basic categories from a query to help with search relevance
 */
function extractCategoriesFromQuery(query: string): string[] {
  const categories = [];
  
  // Check for food-related terms
  if (/restaurant|food|eat|dining|breakfast|lunch|dinner|brunch|cafe|bar|pub|coffee/i.test(query)) {
    categories.push('food');
  }
  
  // Check for entertainment-related terms
  if (/movie|theater|theatre|concert|show|performance|music|live|entertainment/i.test(query)) {
    categories.push('entertainment');
  }
  
  // Check for outdoor activities
  if (/park|hike|hiking|trail|beach|outdoor|nature|walk|walking/i.test(query)) {
    categories.push('outdoors');
  }
  
  // Check for nightlife
  if (/club|nightlife|party|dancing|dance|nightclub|bar/i.test(query)) {
    categories.push('nightlife');
  }
  
  // Check for family-friendly
  if (/family|kid|child|children|family-friendly/i.test(query)) {
    categories.push('family');
  }
  
  return categories;
}
