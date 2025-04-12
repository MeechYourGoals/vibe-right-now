
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
    // For now, we'll delegate to OpenAI since that's what we have configured
    try {
      // Convert context to the format expected by OpenAI
      const messages = context.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text
      }));
      
      // Add the new prompt
      messages.push({
        role: 'user',
        content: prompt
      });
      
      // Determine the context based on mode
      const chatContext = mode === 'venue' ? 'venue' : 'user';
      
      return await OpenAIService.sendChatRequest(messages, { context: chatContext });
    } catch (error) {
      console.error('Error generating response with Vertex AI:', error);
      throw error;
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
    // For now, we'll delegate to OpenAI since that's what we have configured
    return OpenAIService.textToSpeech(text);
  }
}

// Import OpenAIService for fallback
import { OpenAIService } from './OpenAIService';
