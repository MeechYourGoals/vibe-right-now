
import { supabase } from '@/integrations/supabase/client';

/**
 * OpenAI search provider implementation
 */
export const OpenAISearchProvider = {
  /**
   * Search using OpenAI's API via our Supabase edge function
   * @param query The search query
   * @returns The search results as text or null if search fails
   */
  async search(query: string): Promise<string | null> {
    try {
      console.log('Searching with OpenAI:', query);
      
      // Create a system message for search
      const systemMessage = {
        role: 'system',
        content: 'You are an AI assistant that helps users with accurate, current information about places, events, and activities in different cities. Return detailed information based on web searches, including specific venue names, event schedules, and links when possible. Format your response in a clean, readable way. Include specifics about real venues, events, and activities.'
      };
      
      // Create a user message with enhanced search prompt
      const userMessage = {
        role: 'user',
        content: `
          Please provide real information about "${query}".
          Include:
          - Names of specific places or events
          - Actual addresses and locations if known
          - Opening hours and pricing when available
          - Any other helpful details
          
          Format your response in a clear, readable way.
        `
      };
      
      // Use our OpenAI chat function
      const { data, error } = await supabase.functions.invoke('openai-chat', {
        body: {
          messages: [systemMessage, userMessage],
          model: 'gpt-4o-mini',
          context: 'user'
        }
      });
      
      if (error) {
        console.error('Error calling OpenAI chat function:', error);
        return null;
      }
      
      return data?.response?.choices?.[0]?.message?.content || null;
    } catch (error) {
      console.error('Error with OpenAI search:', error);
      return null;
    }
  }
};
