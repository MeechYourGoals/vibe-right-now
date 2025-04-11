
import { supabase } from '@/integrations/supabase/client';
import { Message } from '@/components/VernonChat/types';
import { VertexAIHub } from '@/services/VertexAI';

/**
 * Service to interact with Google's Vertex AI API via Supabase Edge Functions
 */
export const VertexAIService = {
  /**
   * Generate a text response using Vertex AI
   * @param prompt The user's prompt
   * @param mode The chat mode ('venue' or default user)
   * @param history Previous chat messages for context
   * @returns The generated text response
   */
  async generateResponse(prompt: string, mode: 'venue' | 'default' = 'default', history: Message[] = []): Promise<string> {
    try {
      console.log(`Calling Vertex AI with prompt: "${prompt.substring(0, 50)}..."`);
      
      // Convert Message[] to format expected by VertexAIHub
      const formattedHistory = history.map(msg => ({
        sender: msg.sender,
        text: msg.text
      }));
      
      // Use our new hub to generate text
      return await VertexAIHub.generateText(prompt, formattedHistory, {
        temperature: mode === 'venue' ? 0.5 : 0.7, // Lower temperature for business insights
        mode: mode
      });
    } catch (error) {
      console.error('Error in VertexAIService.generateResponse:', error);
      return "I'm having trouble connecting to my AI services right now. Please try again later.";
    }
  },
  
  /**
   * Search for real-world information using Vertex AI
   * @param query The search query
   * @param categories Optional categories to help categorize the search
   * @returns The search results from Vertex AI
   */
  async searchWithVertex(query: string, categories?: string[]): Promise<string> {
    try {
      console.log(`Searching with Vertex AI: "${query.substring(0, 50)}..."`);
      
      // Add location context to the query if it seems to be about nearby places
      const enhancedQuery = this.enhanceQueryWithLocationContext(query);
      
      // Use our new hub for AI search capabilities
      return await VertexAIHub.searchWithAI(enhancedQuery, categories);
    } catch (error) {
      console.error('Error in VertexAIService.searchWithVertex:', error);
      return "I couldn't find specific information about that. Could you try rephrasing your question?";
    }
  },
  
  /**
   * Add location context to queries about nearby places
   */
  enhanceQueryWithLocationContext(query: string): string {
    // If query contains terms about "nearby", "close", etc. try to add location context
    if (/nearby|close|around|near me|in the area|local|vicinity|closest/i.test(query)) {
      // Try to get location from session storage (set by other parts of the app)
      try {
        const lastCity = sessionStorage.getItem('lastSearchedCity');
        const userLat = sessionStorage.getItem('userLat');
        const userLng = sessionStorage.getItem('userLng');
        
        if (lastCity) {
          return `${query} in ${lastCity}`;
        } else if (userLat && userLng) {
          return `${query} at coordinates ${userLat},${userLng}`;
        }
      } catch (e) {
        console.warn('Could not access session storage for location context');
      }
    }
    
    return query;
  }
};
