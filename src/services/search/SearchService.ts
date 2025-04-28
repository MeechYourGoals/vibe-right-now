import { SimpleSearchService } from './SimpleSearchService';
import { ComedySearchService } from './comedy/ComedySearchService';
import { IntegratedSearchProvider } from './providers/IntegratedSearchProvider';
import { FallbackResponseGenerator } from './providers';
import { SearchServiceCore } from './core/SearchServiceCore';
import { OpenAIService } from '@/services/OpenAIService';
import { OpenRouterService } from '@/services/OpenRouterService';
import { Location } from '@/components/VernonNext/types';

export const SearchService = {
  async search(query: string, categories?: string[]): Promise<string> {
    try {
      console.log('Searching for:', query);
      
      // Try using OpenRouter for real-time results
      try {
        const openRouterResponse = await OpenRouterService.browse(query, {
          model: "anthropic/claude-3-opus",
          temperature: 0.7,
          systemPrompt: `You are a local discovery expert. Search for accurate, up-to-date information about venues, events, and attractions in response to: "${query}". Include specific details about real places, events, operating hours, and pricing when available. Format the response in a clear, structured way.`
        });

        if (openRouterResponse) {
          console.log('Successfully retrieved results from OpenRouter');
          return openRouterResponse;
        }
      } catch (openRouterError) {
        console.error('Error with OpenRouter search:', openRouterError);
      }

      // Fall back to existing search methods if OpenRouter fails
      const openaiResult = await this.searchWithOpenAI(query, categories);
      if (openaiResult) return openaiResult;
      
      // Fall back to vector search if OpenAI fails
      const vectorResult = await IntegratedSearchProvider.attemptVectorSearch(query, categories);
      if (vectorResult) return vectorResult;
      
      // Try using AI directly for a conversational response with current information
      const aiResult = await IntegratedSearchProvider.attemptDirectAISearch(query, categories);
      if (aiResult) return aiResult;
      
      // Try using Swirl (local search engine)
      const swirlResult = await IntegratedSearchProvider.attemptSwirlSearch(query);
      if (swirlResult) return swirlResult;
      
      // Try other providers as fallbacks
      const providersResult = await IntegratedSearchProvider.attemptAllProviders(query);
      if (providersResult) return providersResult;
      
      return FallbackResponseGenerator.useFallbackLocalService(query);
    } catch (error) {
      console.error('Error in search services:', error);
      return FallbackResponseGenerator.useFallbackLocalService(query);
    }
  },

  async searchWithOpenAI(query: string, categories?: string[]): Promise<string | null> {
    try {
      console.log('Searching with OpenAI:', query);
      
      let enhancedPrompt = `Please provide real information about "${query}".`;
      
      if (categories && categories.length > 0) {
        enhancedPrompt += ` Focusing on these categories: ${categories.join(', ')}.`;
      }
      
      enhancedPrompt += `
      Include:
      - Names of specific places or events
      - Actual addresses and locations if known
      - Opening hours and pricing when available
      - Any other helpful details
      
      Format your response in a clear, readable way.`;
      
      // Create system message to guide OpenAI response
      const systemMessage = {
        role: 'system',
        content: 'You are a helpful assistant that provides accurate information about places, events, and things to do. Your responses should be formatted clearly and include specific details that would be useful for someone planning to visit or attend.'
      };
      
      // Use OpenAI chat completion
      const response = await OpenAIService.sendChatRequest([
        systemMessage,
        { role: 'user', content: enhancedPrompt }
      ], {
        model: 'gpt-4o-mini', // Using the mini model for cost efficiency
        context: 'user'
      });
      
      return response;
    } catch (error) {
      console.error('Error searching with OpenAI:', error);
      return null;
    }
  },
  
  async comedySearch(query: string): Promise<string> {
    return ComedySearchService.comedySearch(query);
  },
  
  async vectorSearch(query: string, categories?: string[]): Promise<{results: string, categories: string[]} | string | null> {
    return SearchServiceCore.vectorSearch(query, categories);
  }
};
