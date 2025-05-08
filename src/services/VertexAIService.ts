
import { supabase } from '@/integrations/supabase/client';

/**
 * Service for interacting with Google Vertex AI API via Supabase Edge Functions
 */
export class VertexAIService {
  // Default settings
  private static API_KEY = "AIzaSyBeEJvxSAjyvoRS6supoob0F7jGW7lhZUU";
  
  /**
   * Generate a response using Vertex AI API
   * @param prompt The prompt to send to the model
   * @param mode The mode to use (default, search, venue)
   * @param context Optional context for the conversation
   * @returns The generated response
   */
  static async generateResponse(
    prompt: string, 
    mode: 'default' | 'search' | 'venue' = 'default', 
    context: any[] = []
  ): Promise<string> {
    try {
      console.log(`Generating Vertex AI response with mode: ${mode}`);
      
      const { data, error } = await supabase.functions.invoke('vertex-ai', {
        body: { 
          prompt,
          mode,
          context,
          model: 'gemini-pro'
        }
      });
      
      if (error) {
        console.error('Error calling Vertex AI function:', error);
        throw new Error(`Failed to generate response: ${error.message}`);
      }
      
      if (!data || !data.text) {
        throw new Error('No response received from Vertex AI');
      }
      
      return data.text;
    } catch (error) {
      console.error('Error generating response with Vertex AI:', error);
      return "I'm having trouble connecting to my AI services right now. Please try again later.";
    }
  }

  /**
   * Search for information using Vertex AI
   * @param query The search query
   * @param categories Optional categories to filter the search
   * @returns The search results as text
   */
  static async searchWithVertex(
    query: string,
    categories?: string[]
  ): Promise<string> {
    try {
      console.log('Searching with Vertex AI:', query);
      if (categories && categories.length > 0) {
        console.log('With categories:', categories);
      }
      
      const searchPrompt = `
        Please provide real information about "${query}".
        ${categories && categories.length > 0 ? `Focusing on these categories: ${categories.join(', ')}` : ''}
        Include:
        - Names of specific places or events
        - Actual addresses and locations if known
        - Opening hours and pricing when available
        - Any other helpful details
        
        Format your response in a clear, readable way.
      `;
      
      return await this.generateResponse(searchPrompt, 'search');
    } catch (error) {
      console.error('Error in Vertex AI search:', error);
      return `I couldn't find specific information about "${query}". Please try a different search.`;
    }
  }

  /**
   * Convert text to speech using Vertex AI API
   * @param text The text to convert to speech
   * @param options Options for the text-to-speech conversion
   * @returns The audio data as a base64 string
   */
  static async textToSpeech(
    text: string, 
    options: { voice?: string; speakingRate?: number; pitch?: number } = {}
  ): Promise<string> {
    try {
      const { data, error } = await supabase.functions.invoke('vertex-ai', {
        body: { 
          action: 'text-to-speech',
          text,
          options
        }
      });
      
      if (error) {
        console.error('Error calling Vertex AI TTS function:', error);
        throw new Error(`Failed to convert text to speech: ${error.message}`);
      }
      
      if (!data || !data.audio) {
        throw new Error('No audio data received from Vertex AI');
      }
      
      return data.audio;
    } catch (error) {
      console.error('Error in Vertex AI text-to-speech:', error);
      throw error;
    }
  }
}
