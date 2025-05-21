import { supabase } from '@/integrations/supabase/client';
import { Message } from '@/components/VernonChat/types';

/**
 * Centralized service for interacting with Google AI services through Firebase Functions
 */
export const GoogleAIService = {
  /**
   * Generate text using Google's Vertex AI Gemini models
   */
  async generateText(prompt: string, mode: 'venue' | 'user' = 'user', history: Message[] = []): Promise<string> {
    try {
      console.log(`Generating text with prompt: "${prompt.substring(0, 50)}..."`);
      
      const { data, error } = await supabase.functions.invoke('gemini-ai', {
        body: { prompt, mode, history }
      });
      
      if (error) {
        console.error('Error calling Gemini AI function:', error);
        throw new Error(`Failed to generate text: ${error.message}`);
      }
      
      if (!data || !data.text) {
        throw new Error('No response received from Gemini');
      }
      
      return data.text;
    } catch (error) {
      console.error('Error in GoogleAIService.generateText:', error);
      return "I'm having trouble connecting to my AI services right now. Please try again later.";
    }
  },
  
  /**
   * Generate an image using Google's Imagen model
   */
  async generateImage(prompt: string): Promise<string> {
    try {
      console.log(`Generating image with prompt: "${prompt.substring(0, 50)}..."`);
      
      const { data, error } = await supabase.functions.invoke('gemini-imagen', {
        body: { prompt }
      });
      
      if (error) {
        console.error('Error calling Gemini Imagen function:', error);
        throw new Error(`Failed to generate image: ${error.message}`);
      }
      
      if (!data || !data.imageData) {
        throw new Error('No image data received from Imagen');
      }
      
      return data.imageData;
    } catch (error) {
      console.error('Error in GoogleAIService.generateImage:', error);
      throw error;
    }
  },

  /**
   * Convert text to speech using Google TTS
   */
  async textToSpeech(text: string, options = {}): Promise<string | null> {
    try {
      console.log('Converting text to speech with Google TTS:', text.substring(0, 50) + '...');
      
      const { data, error } = await supabase.functions.invoke('google-tts', {
        body: { 
          text,
          voice: options.voice || 'en-US-Neural2-D', // Default male voice
          speakingRate: options.speakingRate || 1.0,
          pitch: options.pitch || 0
        }
      });
      
      if (error) {
        console.error('Error calling Google TTS function:', error);
        throw new Error(`Text-to-speech conversion failed: ${error.message}`);
      }
      
      if (!data || !data.audioContent) {
        throw new Error('No audio content received from Google TTS');
      }
      
      return data.audioContent;
    } catch (error) {
      console.error('Error in textToSpeech:', error);
      return null;
    }
  },
  
  /**
   * Convert speech to text using Google STT
   */
  async speechToText(audioBase64: string): Promise<string | null> {
    try {
      const { data, error } = await supabase.functions.invoke('google-stt', {
        body: { audio: audioBase64 }
      });
      
      if (error) {
        console.error('Error calling Google STT function:', error);
        throw new Error(`Speech-to-text conversion failed: ${error.message}`);
      }
      
      if (!data || !data.transcript) {
        throw new Error('No transcript received from Google STT');
      }
      
      return data.transcript;
    } catch (error) {
      console.error('Error in speechToText:', error);
      return null;
    }
  },

  /**
   * Check content safety using Google's content filtering
   */
  async checkContentSafety(content: string): Promise<{safe: boolean, reasons?: string[]}> {
    try {
      const { data, error } = await supabase.functions.invoke('content-safety', {
        body: { content }
      });
      
      if (error) {
        console.error('Error calling content safety function:', error);
        // Default to safe if we can't check
        return { safe: true };
      }
      
      return data;
    } catch (error) {
      console.error('Error in checkContentSafety:', error);
      // Default to safe if we can't check
      return { safe: true };
    }
  },

  /**
   * Perform natural language analysis 
   */
  async analyzeText(text: string): Promise<any> {
    try {
      const { data, error } = await supabase.functions.invoke('google-nlp', {
        body: { text, features: ['entities', 'sentiment', 'categories'] }
      });
      
      if (error) {
        console.error('Error calling Google NLP function:', error);
        throw new Error(`Failed to analyze text: ${error.message}`);
      }
      
      return data;
    } catch (error) {
      console.error('Error in analyzeText:', error);
      return { sentiment: 0, entities: [], categories: [] };
    }
  },

  /**
   * Extract entities from text
   */
  async extractEntities(text: string): Promise<string[]> {
    try {
      const analysis = await this.analyzeText(text);
      
      if (analysis && analysis.entities) {
        return analysis.entities.map(entity => entity.name);
      }
      return [];
    } catch (error) {
      console.error('Error extracting entities:', error);
      return [];
    }
  },

  /**
   * Extract categories from text
   */
  async extractCategories(text: string): Promise<string[]> {
    try {
      const analysis = await this.analyzeText(text);
      
      if (analysis && analysis.categories) {
        return analysis.categories.map(category => category.name);
      }
      return [];
    } catch (error) {
      console.error('Error extracting categories:', error);
      return [];
    }
  },

  /**
   * Perform a search query using Vertex AI
   */
  async search(query: string, categories: string[] = []): Promise<string | null> {
    try {
      console.log('Searching with Google Vertex AI:', query);
      
      const { data, error } = await supabase.functions.invoke('vertex-ai', {
        body: { 
          prompt: query,
          mode: 'search',
          categories,
          temperature: 0.1 // Low temperature for factual responses
        }
      });
      
      if (error) {
        console.error('Error calling Vertex AI search:', error);
        throw new Error(`Vertex AI search failed: ${error.message}`);
      }
      
      if (!data || !data.text) {
        throw new Error('No search results received from Vertex AI');
      }
      
      return data.text;
    } catch (error) {
      console.error('Error in search:', error);
      return null;
    }
  },
  
  /**
   * Book tickets for an event using Project Mariner
   * @param eventId The event ID to book tickets for
   * @param details Ticket booking details (quantity, section, etc.)
   * @returns Booking confirmation object
   */
  async bookTickets(eventId: string, details: any): Promise<any> {
    try {
      console.log(`Booking tickets for event: ${eventId} with details:`, details);
      
      const { data, error } = await supabase.functions.invoke('mariner-booking', {
        body: { 
          action: 'bookTickets',
          eventId,
          ticketDetails: details
        }
      });
      
      if (error) {
        console.error('Error calling Mariner booking function:', error);
        throw new Error(`Failed to book tickets: ${error.message}`);
      }
      
      return data;
    } catch (error) {
      console.error('Error in bookTickets:', error);
      return { success: false, error: "Failed to book tickets. Please try again later." };
    }
  },
  
  /**
   * Make a reservation at a venue using Project Mariner
   * @param venueId The venue ID to make a reservation at
   * @param details Reservation details (date, time, party size, etc.)
   * @returns Reservation confirmation object
   */
  async makeReservation(venueId: string, details: any): Promise<any> {
    try {
      console.log(`Making reservation at venue: ${venueId} with details:`, details);
      
      const { data, error } = await supabase.functions.invoke('mariner-booking', {
        body: { 
          action: 'makeReservation',
          venueId,
          reservationDetails: details
        }
      });
      
      if (error) {
        console.error('Error calling Mariner reservation function:', error);
        throw new Error(`Failed to make reservation: ${error.message}`);
      }
      
      return data;
    } catch (error) {
      console.error('Error in makeReservation:', error);
      return { success: false, error: "Failed to make reservation. Please try again later." };
    }
  },
  
  /**
   * Check the status of a Mariner transaction (booking or reservation)
   * @param transactionId The transaction ID to check
   * @returns Transaction status object
   */
  async checkTransactionStatus(transactionId: string): Promise<any> {
    try {
      console.log(`Checking status of transaction: ${transactionId}`);
      
      const { data, error } = await supabase.functions.invoke('mariner-booking', {
        body: { 
          action: 'checkStatus',
          transactionId
        }
      });
      
      if (error) {
        console.error('Error calling Mariner status check function:', error);
        throw new Error(`Failed to check transaction status: ${error.message}`);
      }
      
      return data;
    } catch (error) {
      console.error('Error in checkTransactionStatus:', error);
      return { success: false, status: "unknown", error: "Failed to check transaction status." };
    }
  },
  
  /**
   * Cancel a Mariner transaction (booking or reservation)
   * @param transactionId The transaction ID to cancel
   * @returns Cancellation confirmation object
   */
  async cancelTransaction(transactionId: string): Promise<any> {
    try {
      console.log(`Cancelling transaction: ${transactionId}`);
      
      const { data, error } = await supabase.functions.invoke('mariner-booking', {
        body: { 
          action: 'cancelTransaction',
          transactionId
        }
      });
      
      if (error) {
        console.error('Error calling Mariner cancellation function:', error);
        throw new Error(`Failed to cancel transaction: ${error.message}`);
      }
      
      return data;
    } catch (error) {
      console.error('Error in cancelTransaction:', error);
      return { success: false, error: "Failed to cancel transaction. Please try again later." };
    }
  }
};

// Export for backward compatibility with existing code
export const VertexAIService = GoogleAIService;
export const GeminiService = GoogleAIService;
