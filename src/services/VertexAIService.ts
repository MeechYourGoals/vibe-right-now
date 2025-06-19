
import { supabase } from '@/integrations/supabase/client';

/**
 * Service for interacting with Google Vertex AI API via Supabase Edge Functions
 * Provides intelligent responses with web search capabilities
 */
export class VertexAIService {
  // Default model settings - using flash as primary for better quota management
  private static DEFAULT_MODEL = 'gemini-1.5-flash';
  private static FALLBACK_MODEL = 'gemini-1.5-pro';
  private static DEFAULT_VOICE = 'en-US-Neural2-D'; // Default male voice
  
  /**
   * Generate a response using Google Gemini model with web search capabilities
   */
  static async generateResponse(
    prompt: string, 
    mode: 'default' | 'venue' = 'default', 
    context: any[] = []
  ): Promise<string> {
    try {
      console.log(`Generating Gemini response with mode: ${mode}`);
      
      // Ensure context is in the correct format
      const formattedContext = context.map(msg => ({
        sender: msg.sender || (msg.role === 'user' || msg.direction === 'outgoing' ? 'user' : 'ai'),
        text: msg.text || msg.content || ''
      }));
      
      const { data, error } = await supabase.functions.invoke('vertex-ai', {
        body: { 
          prompt,
          mode,
          context: formattedContext,
          model: this.DEFAULT_MODEL,
          enableSearch: true // Enable web search for all queries
        }
      });
      
      if (error) {
        console.error('Error calling Vertex AI function:', error);
        throw new Error(`Vernon AI service error: ${error.message}`);
      }
      
      if (!data || !data.text) {
        throw new Error('No response received from Vernon AI');
      }
      
      return data.text;
    } catch (error) {
      console.error('Error generating response with Vertex AI:', error);
      throw error;
    }
  }

  /**
   * Convert text to speech using Google Text-to-Speech API
   */
  static async textToSpeech(text: string, options: { voice?: string; speakingRate?: number; pitch?: number } = {}): Promise<string> {
    try {
      const { data, error } = await supabase.functions.invoke('vertex-ai', {
        body: { 
          action: 'text-to-speech',
          text,
          options: {
            voice: options.voice || this.DEFAULT_VOICE,
            speakingRate: options.speakingRate || 1.0,
            pitch: options.pitch || 0
          }
        }
      });
      
      if (error) {
        console.error('Error calling Vertex AI TTS function:', error);
        throw new Error(`Failed to convert text to speech: ${error.message}`);
      }
      
      if (!data || !data.audioContent) {
        throw new Error('No audio content received from Vertex AI TTS');
      }
      
      return data.audioContent;
    } catch (error) {
      console.error('Error in Vertex AI text-to-speech:', error);
      throw error;
    }
  }

  /**
   * Convert speech to text using Google Speech-to-Text API
   */
  static async speechToText(audioBase64: string): Promise<string | null> {
    try {
      const { data, error } = await supabase.functions.invoke('vertex-ai', {
        body: { 
          action: 'speech-to-text',
          audio: audioBase64
        }
      });
      
      if (error) {
        console.error('Error calling Vertex AI STT function:', error);
        throw new Error(`Speech-to-text conversion failed: ${error.message}`);
      }
      
      if (!data || !data.transcript) {
        throw new Error('No transcript received from Vertex AI STT');
      }
      
      return data.transcript;
    } catch (error) {
      console.error('Error in speech-to-text:', error);
      return null;
    }
  }

  /**
   * Chat completion compatible with OpenAI format
   */
  static async chatCompletion(messages: Array<{role: string; content: string}>): Promise<any> {
    try {
      const { data, error } = await supabase.functions.invoke('vertex-ai', {
        body: { 
          action: 'chat',
          messages,
          model: this.DEFAULT_MODEL
        }
      });
      
      if (error) {
        throw new Error(`Chat completion failed: ${error.message}`);
      }
      
      return data;
    } catch (error) {
      console.error('Error in chat completion:', error);
      throw error;
    }
  }
}
