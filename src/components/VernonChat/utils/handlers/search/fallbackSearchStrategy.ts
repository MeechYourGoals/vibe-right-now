
import { SearchService } from '@/services/search/SearchService';
import { SwirlSearchService } from '@/services/SwirlSearchService';
import { HuggingChatService } from '@/services/HuggingChatService';
import { VertexAIService } from '@/services/VertexAIService';
import { cleanResponseText } from '../../responseFormatter';

/**
 * Provides fallback search options when primary strategies fail
 */
export const FallbackSearchStrategy = {
  /**
   * Attempts to use standard search service
   */
  async useStandardSearch(inputValue: string): Promise<string> {
    try {
      const responseText = await SearchService.search(inputValue);
      console.log('Got response from SearchService, length:', typeof responseText === 'string' ? responseText.length : 'object');
      
      if (responseText && typeof responseText === 'string' && responseText.length > 100) {
        const exploreLinkText = "\n\nYou can also [view all these results on our Explore page](/explore?q=" + 
          encodeURIComponent(inputValue) + ") for a better visual experience.";
        return cleanResponseText(responseText + exploreLinkText);
      }
      return '';
    } catch (searchError) {
      console.error('Error with SearchService, trying alternatives:', searchError);
      return '';
    }
  },
  
  /**
   * Attempts to use Swirl search service
   */
  async useSwirlSearch(inputValue: string): Promise<string> {
    try {
      const isSwirlAvailable = await SwirlSearchService.isAvailable();
      if (isSwirlAvailable) {
        console.log('Using Swirl search engine for query');
        const responseText = await SwirlSearchService.search(inputValue);
        if (responseText && typeof responseText === 'string' && responseText.length > 100) {
          return cleanResponseText(responseText);
        }
      }
      return '';
    } catch (swirlError) {
      console.error('Error with Swirl search:', swirlError);
      return '';
    }
  },
  
  /**
   * Attempts to use HuggingChat as a fallback
   */
  async useHuggingChatSearch(inputValue: string): Promise<string> {
    try {
      const responseText = await HuggingChatService.searchHuggingChat(inputValue);
      if (responseText && typeof responseText === 'string' && responseText.length > 100) {
        return cleanResponseText(responseText);
      }
      return '';
    } catch (huggingError) {
      console.error('Error with HuggingChat search:', huggingError);
      return '';
    }
  },
  
  /**
   * Last resort attempt using Vertex AI with enhanced prompt
   */
  async useVertexAILastAttempt(inputValue: string): Promise<string> {
    try {
      console.log('No good response yet, trying Vertex AI one more time with enhanced prompt');
      const lastChanceResponse = await VertexAIService.searchWithVertex(
        `Provide detailed information about "${inputValue}" including real venues, events, and activities. Include specific names, addresses, and practical details.`
      );
      
      if (lastChanceResponse && lastChanceResponse.length > 100) {
        return cleanResponseText(lastChanceResponse);
      }
      return '';
    } catch (error) {
      console.error('Last chance Vertex AI search failed:', error);
      return '';
    }
  }
};
