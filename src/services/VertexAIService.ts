
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
    query: string
    // context: any[] = [] // context can be passed if needed for search queries
  ): Promise<string> {
    try {
      console.log('Performing search-enabled generation for query:', query);
      // The 'search' mode in `generateResponse` will trigger tool use in the Supabase function
      return await VertexAIService.generateResponse(query, 'search', []); // Pass empty context or relevant context
    } catch (error) {
      // generateResponse already has robust error handling including fallback and user-friendly messages.
      // This catch block is for any unexpected errors specific to searchWithVertex itself,
      // or if generateResponse re-throws an error that should be specifically handled for search.
      console.error('Error in searchWithVertex:', error);
      // Return the error message from generateResponse, or a generic search error.
      return error.message || `I couldn't find specific information about "${query}". Please try a different search.`;
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
  static async speechToText(
    audioBase64: string,
    options: { audioEncoding?: string; languageCode?: string; sampleRateHertz?: number } = {}
  ): Promise<string | null> {
    try {
      console.log('Sending audio to STT function with options:', options);
      const { data, error } = await supabase.functions.invoke('vertex-ai', {
        body: { 
          action: 'speech-to-text',
          prompt: audioBase64, // 'prompt' field is used for base64 audio in the Supabase func
          options: options      // Pass STT specific options
        }
      });
      
      if (error) {
        console.error('Error calling Vertex AI STT function:', error);
        // Supabase function invocation errors might be in error.message or error.details
        const errorMessage = error.message || (error.details ? JSON.stringify(error.details) : 'Unknown STT error');
        throw new Error(`Speech-to-text conversion failed: ${errorMessage}`);
      }
      
      // The Supabase function returns { transcript: "..." } or { error: "...", transcript: null }
      if (data && data.error) {
        console.error('STT function returned an error:', data.error);
        throw new Error(`Speech-to-text failed: ${data.error}`);
      }

      if (!data || typeof data.transcript !== 'string') { // Check type of transcript
        console.error('No transcript string received from Vertex AI STT. Data:', data);
        throw new Error('No transcript received from Vertex AI STT');
      }
      
      return data.transcript;
    } catch (error) {
      console.error('Error in speechToText service method:', error.message);
      // Optionally, display a toast or specific user feedback here
      // For now, let the caller handle the thrown error or return null
      return null;
    }
  }

  /**
   * Analyze text using Google Natural Language API
   * @param text The text to analyze
   * @param tasks Specifies which NLP tasks to perform
   * @returns Analysis results
   */
  static async analyzeText(
    text: string,
    tasks: { entities?: boolean; sentiment?: boolean; syntax?: boolean; entitySentiment?: boolean } =
           { entities: true, sentiment: true } // Default tasks
  ): Promise<any> {
    try {
      console.log('Analyzing text with tasks:', tasks);
      const { data, error } = await supabase.functions.invoke('google-nlp', {
        body: { 
          text,
          tasks: tasks // Pass the tasks object to the Supabase function
        }
      });
      
      if (error) {
        console.error('Error calling Google NLP function:', error);
        throw new Error(`Text analysis failed: ${error.message}`);
      }

      // The Supabase function returns the full response from NLP API or an error object
      if (data && data.error) {
        console.error('NLP function returned an error:', data.error);
        throw new Error(`Text analysis failed: ${data.error}`);
      }
      
      return data;
    } catch (error) {
      console.error('Error in analyzeText service method:', error.message);
      toast.error(`Text analysis failed: ${error.message}`);
      return null;
    }
  }
}
