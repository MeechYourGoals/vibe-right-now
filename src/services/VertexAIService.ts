
import { supabase } from '@/integrations/supabase/client';

/**
 * Service for interacting with Google Vertex AI API via Supabase Edge Functions
 * Provides direct answers without training data disclaimers
 */
export class VertexAIService {
  // Default model settings - using flash as primary for better quota management
  private static DEFAULT_MODEL = 'gemini-1.5-flash';
  private static FALLBACK_MODEL = 'gemini-1.5-pro';
  private static DEFAULT_VOICE = 'en-US-Neural2-D'; // Default male voice
  
  /**
   * Generate a response using Google Gemini model - direct answers
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
          model: this.DEFAULT_MODEL
        }
      });
      
      if (error) {
        console.error('Error calling Vertex AI function:', error);
        return this.generateDirectResponse(prompt);
      }
      
      if (!data || !data.text) {
        return "I'd be happy to help with that! Could you provide a bit more detail about what you're looking for?";
      }
      
      return data.text;
    } catch (error) {
      console.error('Error generating response with Vertex AI:', error);
      return this.generateDirectResponse(prompt);
    }
  }

  /**
   * Generate a direct helpful response
   */
  private static generateDirectResponse(prompt: string): string {
    const lowerPrompt = prompt.toLowerCase();
    
    if (lowerPrompt.includes('restaurant') || lowerPrompt.includes('food')) {
      return "I'd recommend checking out local favorites in your area! Popular spots often include farm-to-table restaurants, local bistros, and well-reviewed establishments. What type of cuisine are you in the mood for?";
    }
    
    if (lowerPrompt.includes('bar') || lowerPrompt.includes('drink')) {
      return "Great bars often have unique atmospheres - from craft cocktail lounges to sports bars and rooftop venues. Look for places with good reviews and the vibe you're after. Are you looking for cocktails, beer, or a specific type of bar experience?";
    }
    
    if (lowerPrompt.includes('hotel') || lowerPrompt.includes('stay')) {
      return "For accommodations, consider factors like location, amenities, and budget. Popular booking sites can help you compare options and read reviews. What's your destination and what kind of stay are you looking for?";
    }
    
    if (lowerPrompt.includes('weather') || lowerPrompt.includes('temperature')) {
      return "Weather can vary significantly by location and season. For current conditions, weather apps provide up-to-date forecasts. What area are you interested in?";
    }
    
    if (lowerPrompt.includes('event') || lowerPrompt.includes('concert')) {
      return "Events and concerts are great ways to experience local culture! Check platforms like Eventbrite, venue websites, or local event listings. What type of event interests you?";
    }
    
    return "I'd be happy to help with that! Could you provide a bit more detail about what you're looking for?";
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
