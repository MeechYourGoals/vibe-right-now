import { LocationSearchStrategy } from './locationSearchStrategy';
import { LocationService } from '@/services/LocationService';
import { cleanResponseText } from '../../responseFormatter';
import { GeminiService } from '@/services/GeminiService';

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

    // Otherwise use our general search
    return this.handleGeneralSearch(inputValue, categories);
  },

  async handleGeneralSearch(inputValue: string, categories: string[] = []): Promise<string> {
    try {
      // Attempt to get real information using Gemini API
      console.log('Using Gemini for general search:', inputValue);
      const prompt = `
        The user is asking: "${inputValue}"
        
        Please provide a helpful, informative response based on your knowledge. 
        If the query relates to locations, events, or activities, include specific details like 
        names, addresses, and times if you know them.
        ${categories.length > 0 ? `Consider these relevant categories: ${categories.join(', ')}` : ''}
      `;
      
      const geminiResponse = await GeminiService.generateResponse(prompt, 'user');
      
      if (geminiResponse && geminiResponse.length > 50) {
        console.log('Got Gemini response of length:', geminiResponse.length);
        return cleanResponseText(geminiResponse);
      }
      
      // Fall back to a generic response
      return "I'm sorry, I couldn't find specific information about that. Could you try rephrasing your question or asking about something else?";
    } catch (error) {
      console.error('Error in general search:', error);
      return "I'm having trouble processing your request right now. Please try again in a moment.";
    }
  }
};
