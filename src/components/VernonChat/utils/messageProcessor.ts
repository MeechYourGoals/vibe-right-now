
import { Message } from '../types';
import { createUserMessage, createAIMessage, createErrorMessage } from './messageFactory';
import { extractPaginationParams } from './pagination';
import { handleVenueQuery } from './handlers/venueQueryHandler';
import { handleSearchQuery } from './handlers/searchQueryHandler';
import { handleBookingQuery } from './handlers/bookingQueryHandler';
import { VertexAIService } from '@/services/VertexAIService';
import { LocationSearchStrategy } from './handlers/search/locationSearchStrategy';

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
    
    // Enhanced detection for location/venue queries
    const isLocationQuery = LocationSearchStrategy.isLocationQuery(inputValue);
    
    console.log('Processing query:', inputValue);
    console.log('Is location query:', isLocationQuery);
    
    // Process the message using selected AI service or our search handlers
    let responseText = '';
    
    // For location queries, prioritize the location search pipeline
    if (isLocationQuery) {
      console.log('Location/venue query detected, using enhanced search pipeline');
      try {
        // Extract any categories from the query to help with search relevance
        const categories = extractCategoriesFromQuery(inputValue);
        console.log('Extracted categories from query:', categories);
        
        // Use the location search strategy directly for venue queries
        const locationSearchResult = await LocationSearchStrategy.handleLocationSearch(inputValue);
        
        if (locationSearchResult && locationSearchResult.response) {
          responseText = locationSearchResult.response;
          console.log('Location search strategy returned response of length:', responseText.length);
        } else {
          // Fall back to general search handler if location-specific search fails
          responseText = await handleSearchQuery(inputValue, updatedPaginationState);
          console.log('General search handler returned response of length:', responseText.length);
        }
      } catch (error) {
        console.error('Error in venue search pipeline:', error);
        // Fall back to direct AI call
        responseText = await VertexAIService.generateResponse(inputValue, 'default', contextMessages);
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
        'default',
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

/**
 * Extract basic categories from a query to help with search relevance
 */
function extractCategoriesFromQuery(query: string): string[] {
  const categories = [];
  const lowercaseQuery = query.toLowerCase();
  
  // Check for food-related terms
  if (/restaurant|food|eat|dining|breakfast|lunch|dinner|brunch|cafe|bar|pub|coffee|cuisine|culinary|meal|feast|dine/i.test(lowercaseQuery)) {
    categories.push('food');
  }
  
  // Check for entertainment-related terms
  if (/movie|theater|theatre|concert|show|performance|music|live|entertainment|festival|event|ticket|stage/i.test(lowercaseQuery)) {
    categories.push('entertainment');
  }
  
  // Check for outdoor activities
  if (/park|hike|hiking|trail|beach|outdoor|nature|walk|walking|garden|scenic|mountain|lake|forest|wilderness|camping/i.test(lowercaseQuery)) {
    categories.push('outdoors');
  }
  
  // Check for nightlife
  if (/club|nightlife|party|dancing|dance|nightclub|bar|pub|lounge|cocktail|brewery|dj|mixer|night out/i.test(lowercaseQuery)) {
    categories.push('nightlife');
  }
  
  // Check for family-friendly
  if (/family|kid|child|children|family-friendly|playground|arcade|zoo|aquarium|museum|educational/i.test(lowercaseQuery)) {
    categories.push('family');
  }
  
  // Check for shopping
  if (/shop|shopping|mall|boutique|store|market|retail|outlet|plaza|buy|purchase|souvenir/i.test(lowercaseQuery)) {
    categories.push('shopping');
  }
  
  // Check for sports
  if (/sport|game|match|stadium|arena|baseball|football|basketball|soccer|tennis|golf|fitness|gym|workout/i.test(lowercaseQuery)) {
    categories.push('sports');
  }
  
  // Check for arts and culture
  if (/art|museum|gallery|exhibition|cultural|historic|heritage|architecture|sculpture|painting|artifact/i.test(lowercaseQuery)) {
    categories.push('arts');
  }
  
  // Check for proximity
  if (/nearby|close|around|walking distance|near me|in the area|local|vicinity|closest/i.test(lowercaseQuery)) {
    categories.push('nearby');
  }
  
  // Check for timing
  if (/open now|tonight|today|this weekend|happening now|current|ongoing|immediate/i.test(lowercaseQuery)) {
    categories.push('current');
  }
  
  return categories;
}
