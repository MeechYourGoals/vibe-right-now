
import { supabase } from '@/integrations/supabase/client';
import { Message } from '@/components/VernonChat/types';
import { VertexAIHub } from '@/services/VertexAI';
import { getPrimaryProvider, getFallbackProviders } from '@/services/MultiProviderSystem';

/**
 * Service to interact with Google's Vertex AI API via Supabase Edge Functions
 * Enhanced with MCP (Multiple Chat Providers) support
 */
export const VertexAIService = {
  /**
   * Generate a text response using primary AI provider
   * @param prompt The user's prompt
   * @param mode The chat mode ('venue' or default user)
   * @param history Previous chat messages for context
   * @returns The generated text response
   */
  async generateResponse(prompt: string, mode: 'venue' | 'default' = 'default', history: Message[] = []): Promise<string> {
    try {
      console.log(`MCP: Generating response for: "${prompt.substring(0, 50)}..."`);
      
      // Get primary chat provider based on MCP priorities
      const primaryProvider = getPrimaryProvider('chat');
      console.log('MCP: Using primary provider:', primaryProvider?.name);
      
      // Convert Message[] to format expected by providers
      const formattedHistory = history.map(msg => ({
        sender: msg.sender,
        text: msg.text
      }));
      
      // First try the primary provider
      if (primaryProvider) {
        let result = null;
        
        switch (primaryProvider.id) {
          case 'vertex-ai':
            result = await VertexAIHub.generateText(prompt, formattedHistory, {
              temperature: mode === 'venue' ? 0.5 : 0.7,
              mode: mode
            });
            break;
          case 'gemini':
            // Use Gemini directly through the Supabase edge function
            try {
              const { data, error } = await supabase.functions.invoke('vertex-ai', {
                body: { 
                  prompt, 
                  history: formattedHistory,
                  mode,
                  useGemini: true
                }
              });
              
              if (!error && data?.text) {
                result = data.text;
              }
            } catch (error) {
              console.error('Error using Gemini:', error);
            }
            break;
          case 'perplexity':
            try {
              const { data, error } = await supabase.functions.invoke('perplexity-search', {
                body: { 
                  prompt, 
                  history: formattedHistory,
                  mode
                }
              });
              
              if (!error && data?.text) {
                result = data.text;
              }
            } catch (error) {
              console.error('Error using Perplexity:', error);
            }
            break;
          default:
            break;
        }
        
        if (result) {
          console.log(`MCP: Primary provider ${primaryProvider.name} returned result`);
          return result;
        }
      }
      
      // If primary provider fails, try fallbacks in priority order
      const fallbackProviders = getFallbackProviders('chat');
      console.log('MCP: Using fallback providers:', fallbackProviders.map(p => p.name).join(', '));
      
      for (const provider of fallbackProviders) {
        let result = null;
        
        switch (provider.id) {
          case 'vertex-ai':
            result = await VertexAIHub.generateText(prompt, formattedHistory, {
              temperature: mode === 'venue' ? 0.5 : 0.7,
              mode: mode
            });
            break;
          case 'gemini':
            try {
              const { data, error } = await supabase.functions.invoke('vertex-ai', {
                body: { 
                  prompt, 
                  history: formattedHistory,
                  mode,
                  useGemini: true
                }
              });
              
              if (!error && data?.text) {
                result = data.text;
              }
            } catch (error) {
              console.error('Error using Gemini fallback:', error);
            }
            break;
          default:
            break;
        }
        
        if (result) {
          console.log(`MCP: Fallback provider ${provider.name} returned result`);
          return result;
        }
      }
      
      // Ultimate fallback message if all providers fail
      return "I'm having trouble connecting to my AI services right now. Please try again later.";
    } catch (error) {
      console.error('MCP: Error in VertexAIService.generateResponse:', error);
      return "I'm having trouble connecting to my AI services right now. Please try again later.";
    }
  },
  
  /**
   * Search for real-world information using available search providers
   * @param query The search query
   * @param categories Optional categories to help categorize the search
   * @returns The search results from the best available provider
   */
  async searchWithVertex(query: string, categories?: string[]): Promise<string> {
    try {
      console.log(`MCP: Searching with AI providers: "${query.substring(0, 50)}..."`);
      
      // First try our enhanced search service which already uses MCP
      const searchResult = await SearchService.search(query, categories);
      if (searchResult && searchResult.length > 0) {
        return searchResult;
      }
      
      // Fallback to direct AI hub
      return await VertexAIHub.searchWithAI(query, categories);
    } catch (error) {
      console.error('MCP: Error in VertexAIService.searchWithVertex:', error);
      return "I couldn't find specific information about that. Could you try rephrasing your question?";
    }
  }
};

// Type for the service import - helps with proper module organization
import { SearchService } from './search/SearchService';
