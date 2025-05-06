
import { supabase } from '@/integrations/supabase/client';

/**
 * Service for interacting with Google Vertex AI API
 */
export class VertexAIService {
  // Text-to-speech voice configuration
  static DEFAULT_MALE_VOICE = "en-US-Neural2-D";
  static DEFAULT_FEMALE_VOICE = "en-US-Neural2-F";

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
      console.log('Generating response with Vertex AI:', mode);
      
      // Create system prompt based on mode
      let systemPrompt = '';
      if (mode === 'venue') {
        systemPrompt = "You are Vernon, a helpful AI assistant for venue owners. Provide insightful business analysis and actionable recommendations based on venue data.";
      } else if (mode === 'search') {
        systemPrompt = "You are Vernon, a helpful search assistant. Provide accurate, detailed information about places, events, and activities.";
      } else {
        systemPrompt = "You are Vernon, a helpful and friendly AI assistant. Your primary goal is to help users discover great places to go and things to do based on their requests.";
      }
      
      // Format messages for the API request
      const messages = [
        { role: 'system', content: systemPrompt }
      ];
      
      // Add conversation context if available
      if (context && context.length > 0) {
        context.forEach(msg => {
          messages.push({
            role: msg.sender === 'user' ? 'user' : 'assistant',
            content: msg.text
          });
        });
      }
      
      // Add the new prompt
      messages.push({
        role: 'user',
        content: prompt
      });
      
      // Call the Vertex AI edge function
      const { data, error } = await supabase.functions.invoke('vertex-ai', {
        body: {
          messages,
          model: mode === 'venue' ? 'gemini-1.5-pro' : 'gemini-1.5-flash',
          temperature: mode === 'search' ? 0.2 : 0.7,
          maxTokens: 1000
        }
      });
      
      if (error) {
        console.error('Error calling Vertex AI function:', error);
        throw new Error(`Failed to generate response: ${error.message}`);
      }
      
      return data?.text || "I couldn't generate a response at the moment.";
    } catch (error) {
      console.error('Error generating response with Vertex AI:', error);
      return `I'm having trouble generating a response right now. Please try again later.`;
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
      
      // Create search prompt with categories if available
      const enhancedPrompt = `
        Please provide real information about "${query}".
        ${categories && categories.length > 0 ? `Focusing on these categories: ${categories.join(', ')}` : ''}
        Include:
        - Names of specific places or events
        - Actual addresses and locations if known
        - Opening hours and pricing when available
        - Any other helpful details
        
        Format your response in a clear, readable way.
      `;
      
      // Call Vertex AI with search configuration
      return await this.generateResponse(enhancedPrompt, 'search');
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
      console.log('Converting text to speech with Vertex AI');
      
      const { data, error } = await supabase.functions.invoke('google-tts', {
        body: {
          text,
          voice: options.voice || this.DEFAULT_MALE_VOICE,
          speakingRate: options.speakingRate || 1.0,
          pitch: options.pitch || 0
        }
      });
      
      if (error) {
        console.error('Error calling Google TTS function:', error);
        throw new Error(`Failed to convert text to speech: ${error.message}`);
      }
      
      return data?.audioContent || '';
    } catch (error) {
      console.error('Error in text-to-speech:', error);
      throw error;
    }
  }
}
