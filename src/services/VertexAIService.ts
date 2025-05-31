
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

/**
 * Service for interacting with Google Vertex AI API via Supabase Edge Functions
 * This is the central service for all Google AI functionality
 */
export class VertexAIService {
  // Default model settings
  private static DEFAULT_MODEL = 'gemini-1.5-pro';
  private static FALLBACK_MODEL = 'gemini-1.0-pro';
  private static DEFAULT_VOICE = 'en-US-Neural2-D'; // Default male voice
  
  /**
   * Generate a response using Google Gemini model
   * @param prompt The prompt to send to the model
   * @param mode The mode to use (default, search, venue)
   * @param context Optional conversation history
   * @returns The generated response
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
        throw new Error(`Failed to generate response: ${error.message}`);
      }
      
      if (!data || !data.text) {
        if (data?.fallbackResponse) {
          return data.fallbackResponse;
        }
        throw new Error('No response text received from Vertex AI');
      }
      
      return data.text;
    } catch (error) {
      console.error('Error generating response with Vertex AI:', error);
      
      // Try with fallback model if we get a quota error
      if (error.message?.includes('429') || error.message?.includes('quota')) {
        try {
          console.log('Rate limit exceeded, trying fallback model');
          
          const { data, error: fallbackError } = await supabase.functions.invoke('vertex-ai', {
            body: { 
              prompt,
              mode,
              context,
              model: this.FALLBACK_MODEL
            }
          });
          
          if (fallbackError) {
            throw fallbackError;
          }
          
          if (data?.text) {
            return data.text;
          }
        } catch (fallbackAttemptError) {
          console.error('Fallback model also failed:', fallbackAttemptError);
        }
      }
      
      return "I'm having trouble connecting to Google AI services right now. Please try again later.";
    }
  }

  /**
   * Search for information using Google Search and Vertex AI
   * @param query The search query
   * @param categories Optional categories to filter the search
   * @returns The search results as text
   */
  static async searchWithVertex(
    query: string,
    categories?: string[]
  ): Promise<string> {
    try {
      console.log('Searching with Google Vertex AI:', query);
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
      
      // Try with primary model first
      try {
        return await this.generateResponse(searchPrompt, 'search');
      } catch (primaryError) {
        console.error('Error with primary model for search:', primaryError);
        
        // Try with fallback model
        if (primaryError.message?.includes('429') || primaryError.message?.includes('quota')) {
          try {
            console.log('Using fallback model for search');
            
            const { data, error } = await supabase.functions.invoke('vertex-ai', {
              body: { 
                prompt: searchPrompt,
                mode: 'search',
                model: this.FALLBACK_MODEL
              }
            });
            
            if (error) {
              throw error;
            }
            
            if (data?.text) {
              return data.text;
            }
          } catch (fallbackError) {
            console.error('Fallback model also failed for search:', fallbackError);
          }
        }
        
        throw primaryError;
      }
    } catch (error) {
      console.error('Error in Vertex AI search:', error);
      return `I couldn't find specific information about "${query}". Please try a different search.`;
    }
  }

  /**
   * Convert text to speech using Google Text-to-Speech API
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
   * @param audioBase64 The audio data as a base64 string
   * @returns The transcribed text
   */
  static async speechToText(audioBase64: string): Promise<string | null> {
    try {
      const { data, error } = await supabase.functions.invoke('vertex-ai', {
        body: { 
          action: 'speech-to-text',
          prompt: audioBase64
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
   * Analyze text using Google Natural Language API
   * @param text The text to analyze
   * @returns Analysis results including entities, sentiment, and categories
   */
  static async analyzeText(text: string): Promise<any> {
    try {
      const { data, error } = await supabase.functions.invoke('google-nlp', {
        body: { 
          text,
          features: ['entities', 'sentiment', 'categories']
        }
      });
      
      if (error) {
        console.error('Error calling Google NLP function:', error);
        throw new Error(`Text analysis failed: ${error.message}`);
      }
      
      return data;
    } catch (error) {
      console.error('Error in text analysis:', error);
      toast.error('Text analysis failed');
      return null;
    }
  }
}
