import { LocationSearchStrategy } from './locationSearchStrategy';
import { GeminiService } from '@/services/GeminiService';
import { cleanResponseText } from '../../responseFormatter';

export const SearchCoordinator = {
  async processSearchQuery(
    inputValue: string,
    paginationState: Record<string, number>,
    categories: string[] = []
  ): Promise<string> {
    console.log('Processing search query:', inputValue, 'with categories:', categories);

    // Check if this is a location-related query
    if (LocationSearchStrategy.isLocationQuery(inputValue)) {
      console.log('Detected location query, using specialized location search');
      const result = await LocationSearchStrategy.handleLocationSearch(inputValue);
      return result.response;
    }

    // Otherwise use Gemini's web search capabilities
    return this.handleGeminiWebSearch(inputValue);
  },

  async handleGeminiWebSearch(inputValue: string): Promise<string> {
    try {
      // Use Gemini's web search function for real information
      console.log('Using Gemini web search for:', inputValue);
      const geminiResponse = await GeminiService.searchWeb(inputValue);
      
      if (geminiResponse && geminiResponse.length > 50) {
        console.log('Got Gemini response with web search, length:', geminiResponse.length);
        return cleanResponseText(geminiResponse);
      }
      
      // If Gemini web search fails, try regular Gemini response
      console.log('Web search didn\'t yield good results, trying standard Gemini response');
      const standardResponse = await GeminiService.generateResponse(inputValue, 'user');
      
      if (standardResponse && standardResponse.length > 50) {
        return cleanResponseText(standardResponse);
      }
      
      // Fall back to a generic response
      return "I'm sorry, I couldn't find specific information about that. Could you try rephrasing your question or asking about something else?";
    } catch (error) {
      console.error('Error in Gemini search:', error);
      return "I'm having trouble processing your request right now. Please try again in a moment.";
    }
  }
};
