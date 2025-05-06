
import { supabase } from '@/integrations/supabase/client';
import { GeminiService } from '@/services/GeminiService';
import { VertexAIService } from '@/services/VertexAIService';

/**
 * Gemini search provider implementation
 * (Previously named OpenAISearchProvider for compatibility)
 */
export const OpenAISearchProvider = {
  /**
   * Search using Google's AI APIs via our Supabase edge function
   * @param query The search query
   * @returns The search results as text or null if search fails
   */
  async search(query: string): Promise<string | null> {
    try {
      console.log('Searching with Google AI:', query);
      
      // Create a system message for search
      const systemPrompt = 'You are an AI assistant that helps users with accurate, current information about places, events, and activities in different cities. Return detailed information based on web searches, including specific venue names, event schedules, and links when possible. Format your response in a clean, readable way. Include specifics about real venues, events, and activities.';
      
      // Create a user message with enhanced search prompt
      const userPrompt = `
        Please provide real information about "${query}".
        Include:
        - Names of specific places or events
        - Actual addresses and locations if known
        - Opening hours and pricing when available
        - Any other helpful details
        
        Format your response in a clear, readable way.
      `;
      
      // Try Gemini first
      try {
        const geminiResponse = await GeminiService.generateResponse(`${systemPrompt}\n\n${userPrompt}`, 'user');
        if (geminiResponse) {
          return geminiResponse;
        }
      } catch (error) {
        console.error('Error with Gemini search, falling back to Vertex AI:', error);
      }
      
      // Fall back to Vertex AI
      try {
        const vertexResponse = await VertexAIService.searchWithVertex(`${systemPrompt}\n\n${userPrompt}`);
        if (vertexResponse) {
          return vertexResponse;
        }
      } catch (error) {
        console.error('Error with Vertex AI search:', error);
      }
      
      return null;
    } catch (error) {
      console.error('Error with Google AI search:', error);
      return null;
    }
  }
};
