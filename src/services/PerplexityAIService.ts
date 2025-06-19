
import { supabase } from '@/integrations/supabase/client';

/**
 * Service for interacting with Perplexity AI API via Supabase Edge Functions
 * Provides intelligent responses with web search capabilities
 */
export class PerplexityAIService {
  /**
   * Generate a response using Perplexity AI with web search capabilities
   */
  static async generateResponse(
    prompt: string, 
    mode: 'default' | 'venue' = 'default', 
    context: any[] = []
  ): Promise<string> {
    try {
      console.log(`Generating Perplexity response with mode: ${mode}`);
      
      // Ensure context is in the correct format
      const formattedContext = context.map(msg => ({
        sender: msg.sender || (msg.role === 'user' || msg.direction === 'outgoing' ? 'user' : 'ai'),
        text: msg.text || msg.content || ''
      }));
      
      const { data, error } = await supabase.functions.invoke('perplexity-chat', {
        body: { 
          prompt,
          mode,
          context: formattedContext
        }
      });
      
      if (error) {
        console.error('Error calling Perplexity AI function:', error);
        throw new Error(`Perplexity AI service error: ${error.message}`);
      }
      
      if (!data || !data.text) {
        throw new Error('No response received from Perplexity AI');
      }
      
      return data.text;
    } catch (error) {
      console.error('Error generating response with Perplexity AI:', error);
      throw error;
    }
  }

  /**
   * Search using Perplexity AI
   */
  static async search(query: string): Promise<string> {
    try {
      console.log(`Searching with Perplexity AI: "${query.substring(0, 50)}..."`);
      
      const { data, error } = await supabase.functions.invoke('perplexity-search', {
        body: { query }
      });
      
      if (error) {
        console.error('Error calling Perplexity search:', error);
        throw new Error(`Perplexity search failed: ${error.message}`);
      }
      
      if (!data || !data.text) {
        throw new Error('No search results received from Perplexity');
      }
      
      return data.text;
    } catch (error) {
      console.error('Error in Perplexity search:', error);
      return "I couldn't find specific information about that. Could you try rephrasing your question?";
    }
  }
}
