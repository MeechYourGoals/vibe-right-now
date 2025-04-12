
import { supabase } from '@/integrations/supabase/client';
import { Message } from '@/components/VernonChat/types';
import { VertexAIHub } from '@/services/VertexAI';
import { getPrimaryProvider, getFallbackProviders, isProviderAvailable } from '@/services/MultiProviderSystem';
import { toast } from 'sonner';

/**
 * Service to interact with Google's Vertex AI API via Supabase Edge Functions
 * Enhanced with MCP (Model Context Protocol) support
 */
export const VertexAIService = {
  /**
   * Generate a text response using Model Context Protocol format
   * @param prompt The user's prompt
   * @param mode The chat mode ('venue' or default user)
   * @param history Previous chat messages for context
   * @returns The generated text response
   */
  async generateResponse(prompt: string, mode: 'venue' | 'default' = 'default', history: Message[] = []): Promise<string> {
    try {
      console.log(`MCP: Generating response for: "${prompt.substring(0, 50)}..."`);
      
      // Record API key availability in localStorage for provider management
      const apiKeyCheck = await this.checkApiKeyAvailability();
      
      // Get primary chat provider based on priorities
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
            // Use MCP request format
            const mcpPrompt = `<request type="${mode === 'venue' ? 'venue_analysis' : 'general'}">${prompt}</request>`;
            
            result = await VertexAIHub.generateText(mcpPrompt, formattedHistory, {
              temperature: mode === 'venue' ? 0.5 : 0.7,
              mode: mode
            });
            break;
          case 'gemini':
            // Use Gemini directly through the Supabase edge function with MCP format
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
          // Extract content from MCP response format if present
          if (result.includes('<response>') && result.includes('</response>')) {
            const responseContent = result.match(/<response>(.*?)<\/response>/s);
            if (responseContent && responseContent[1]) {
              result = responseContent[1].trim();
            }
          }
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
            // Use MCP request format for fallback
            const mcpPrompt = `<request type="${mode === 'venue' ? 'venue_analysis' : 'general'}">${prompt}</request>`;
            
            result = await VertexAIHub.generateText(mcpPrompt, formattedHistory, {
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
          // Extract content from MCP response format if present
          if (result.includes('<response>') && result.includes('</response>')) {
            const responseContent = result.match(/<response>(.*?)<\/response>/s);
            if (responseContent && responseContent[1]) {
              result = responseContent[1].trim();
            }
          }
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
   * Search for real-world information using MCP format
   * @param query The search query
   * @param categories Optional categories to help categorize the search
   * @returns The search results from the best available provider
   */
  async searchWithVertex(query: string, categories?: string[]): Promise<string> {
    try {
      console.log(`MCP: Searching with AI providers: "${query.substring(0, 50)}..."`);
      
      // Format query with MCP
      let mcpQuery = query;
      if (categories && categories.length > 0) {
        const categoryContext = categories.join(', ');
        mcpQuery = `<request type="search" categories="${categoryContext}">${query}</request>`;
      } else {
        mcpQuery = `<request type="search">${query}</request>`;
      }
      
      // First try our enhanced search service which already uses MCP
      const searchResult = await VertexAIHub.searchWithAI(mcpQuery, categories);
      if (searchResult && searchResult.length > 0) {
        // Extract content from MCP response format if present
        if (searchResult.includes('<response>') && searchResult.includes('</response>')) {
          const responseContent = searchResult.match(/<response>(.*?)<\/response>/s);
          if (responseContent && responseContent[1]) {
            return responseContent[1].trim();
          }
        }
        return searchResult;
      }
      
      // Ultimate fallback if all providers fail
      return "I couldn't find specific information about that. Could you try rephrasing your question?";
    } catch (error) {
      console.error('MCP: Error in VertexAIService.searchWithVertex:', error);
      return "I couldn't find specific information about that. Could you try rephrasing your question?";
    }
  },
  
  /**
   * Check if the necessary API keys are available and update localStorage
   * This helps know which providers can be used
   */
  async checkApiKeyAvailability(): Promise<boolean> {
    try {
      // Try a simple request to check if the API key works
      const testResult = await supabase.functions.invoke('vertex-ai', {
        body: { prompt: 'test', mode: 'check-api-key' }
      });
      
      const hasValidKey = !testResult.error;
      localStorage.setItem('hasVertexAIKey', hasValidKey ? 'true' : 'false');
      
      if (hasValidKey) {
        console.log('MCP: Valid Vertex AI API key detected');
      } else {
        console.warn('MCP: Vertex AI API key is not valid or not set');
        toast.error('Vertex AI API key is missing or invalid. Some features may not work properly.');
      }
      
      return hasValidKey;
    } catch (error) {
      console.error('MCP: Error checking API key availability:', error);
      localStorage.setItem('hasVertexAIKey', 'false');
      return false;
    }
  }
};

// Type declaration for import in other files
import { SearchService } from './search/SearchService';
