
import { supabaseApiClient } from './api';
import { toast } from 'sonner';

/**
 * Service for interacting with Google Gemini API via Supabase Edge Functions
 * Now uses the unified API client architecture
 */
export class GeminiService {
  /**
   * Generate a response using Google Gemini model
   */
  static async generateResponse(
    prompt: string, 
    mode: 'default' | 'search' | 'venue' = 'default', 
    context: any[] = []
  ): Promise<string> {
    try {
      console.log(`Generating Gemini response with mode: ${mode}`);
      
      // Ensure context is in the correct format
      const formattedContext = context.map(msg => ({
        sender: msg.sender || (msg.role === 'user' || msg.direction === 'outgoing' ? 'user' : 'ai'),
        text: msg.text || msg.content || ''
      }));
      
      const response = await supabaseApiClient.callGeminiAI(prompt, mode, formattedContext);
      return response;
    } catch (error) {
      console.error('Error generating response with Gemini:', error);
      
      // Return user-friendly error messages
      if (error.message?.includes('quota') || error.message?.includes('429')) {
        return "I'm experiencing high demand right now. Please wait a moment and try again.";
      } else if (error.message?.includes('404')) {
        return "I'm temporarily unavailable due to service maintenance. Please try again shortly.";
      } else {
        return "I'm having trouble connecting to my AI services right now. Please try again later.";
      }
    }
  }

  /**
   * Search for information using Google Search and Gemini AI
   */
  static async searchWithGemini(query: string, categories?: string[]): Promise<string> {
    try {
      console.log('Searching with Google Gemini:', query);
      
      const searchPrompt = `
        Please provide comprehensive, up-to-date information about "${query}".
        Include specific details like:
        - Names of venues, events, or places
        - Addresses and locations when relevant
        - Hours, prices, and availability if applicable
        - Current and recent information
        
        Format your response clearly and provide actionable information.
      `;
      
      const response = await this.generateResponse(searchPrompt, 'search');
      return response;
    } catch (error) {
      console.error('Error in Gemini search:', error);
      return `I couldn't find specific information about "${query}". Please try a different search.`;
    }
  }

  /**
   * Chat completion compatible with OpenAI format
   */
  static async chatCompletion(messages: Array<{role: string; content: string}>): Promise<any> {
    try {
      // Convert to Gemini format and call
      const lastMessage = messages[messages.length - 1];
      const history = messages.slice(0, -1);
      
      const response = await this.generateResponse(
        lastMessage.content,
        'default',
        history
      );
      
      return {
        choices: [{
          message: {
            content: response,
            role: 'assistant'
          }
        }]
      };
    } catch (error) {
      console.error('Error in Gemini chat completion:', error);
      throw error;
    }
  }
}
