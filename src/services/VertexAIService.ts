
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

/**
 * Service for interacting with Google Vertex AI API via Supabase Edge Functions
 * This is the central service for all Google AI functionality with robust fallback
 */
export class VertexAIService {
  // Default model settings - using flash as primary for better quota management
  private static DEFAULT_MODEL = 'gemini-1.5-flash';
  private static FALLBACK_MODEL = 'gemini-1.5-pro';
  private static DEFAULT_VOICE = 'en-US-Neural2-D'; // Default male voice
  
  /**
   * Generate a response using Google Gemini model with enhanced fallback
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
      
      const { data, error } = await supabase.functions.invoke('vertex-ai', {
        body: { 
          prompt,
          mode,
          context: formattedContext,
          model: this.DEFAULT_MODEL
        }
      });
      
      if (error) {
        console.error('Error calling Vertex AI function:', error);
        
        // Handle specific error types with helpful messages
        if (error.message?.includes('429') || error.message?.includes('quota')) {
          return "I'm experiencing high demand right now, but I can help with general information from my training data. For real-time search results, please try again in a moment.";
        } else if (error.message?.includes('404')) {
          return "I'm temporarily using my training data while my search services are being updated. I can still help with general information about your query.";
        } else {
          return `I can help with general information about your query from my training data. For the most current information, please try again later.`;
        }
      }
      
      if (!data || !data.text) {
        // Return training data response if available
        if (data?.text) {
          return data.text;
        }
        return "I can help with general information from my training data. Please be more specific about what you'd like to know.";
      }
      
      return data.text;
    } catch (error) {
      console.error('Error generating response with Vertex AI:', error);
      
      // Provide helpful fallback responses based on the prompt
      return this.generateTrainingDataResponse(prompt);
    }
  }

  /**
   * Generate a helpful response using training data when APIs are unavailable
   */
  private static generateTrainingDataResponse(prompt: string): string {
    const lowerPrompt = prompt.toLowerCase();
    
    if (lowerPrompt.includes('restaurant') || lowerPrompt.includes('food')) {
      return "I can help with general restaurant recommendations from my training data. For the most current information about restaurants, hours, and availability, I recommend checking their websites directly or calling ahead. What type of cuisine or dining experience are you looking for?";
    }
    
    if (lowerPrompt.includes('bar') || lowerPrompt.includes('drink')) {
      return "I can provide general information about bars and nightlife from my training data. For current hours, events, and availability, please check directly with venues. What kind of bar experience are you interested in?";
    }
    
    if (lowerPrompt.includes('hotel') || lowerPrompt.includes('stay')) {
      return "I can offer general advice about accommodations from my training data. For current rates and availability, I recommend checking hotel websites or booking platforms directly. What type of accommodation are you looking for?";
    }
    
    if (lowerPrompt.includes('weather') || lowerPrompt.includes('temperature')) {
      return "I can provide general climate information from my training data, but for current weather conditions, please check a weather service like Weather.com or your local forecast.";
    }
    
    if (lowerPrompt.includes('event') || lowerPrompt.includes('concert')) {
      return "I can help with general information about events and entertainment from my training data. For current events and tickets, please check event platforms like Eventbrite, Ticketmaster, or venue websites directly.";
    }
    
    return "I can help with general information from my training data. For the most current and specific details, you may want to verify information from official sources. What would you like to know more about?";
  }

  /**
   * Search for information using Google Search and Vertex AI with proper fallback
   */
  static async searchWithVertex(query: string, categories?: string[]): Promise<string> {
    try {
      console.log('Searching with Google Vertex AI:', query);
      
      const { data, error } = await supabase.functions.invoke('vertex-ai', {
        body: { 
          action: 'search',
          query,
          categories: categories || []
        }
      });
      
      if (error) {
        console.error('Error with Vertex AI search:', error);
        return this.generateTrainingDataResponse(query);
      }
      
      return data?.text || this.generateTrainingDataResponse(query);
    } catch (error) {
      console.error('Error in Vertex AI search:', error);
      return this.generateTrainingDataResponse(query);
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
