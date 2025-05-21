
// GoogleAIService.ts - Unified Google AI service including Vertex AI and Mariner

// Import required dependencies
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

// Default voice options
export const DEFAULT_MALE_VOICE = "en-US-Neural2-D";
export const DEFAULT_FEMALE_VOICE = "en-US-Neural2-F";

class GoogleAIServiceClass {
  private apiUrl = 'https://generativelanguage.googleapis.com';
  private modelName = 'gemini-1.5-pro';
  private marinerEnabled = true;

  // Text generation with Gemini
  async generateText(prompt: string, options: any = {}) {
    try {
      console.log('Generating text with Google AI');
      
      const response = await this.callGeminiAPI('generateText', {
        prompt,
        options
      });
      
      return response.text || '';
    } catch (error) {
      console.error('Error generating text with Google AI:', error);
      toast.error('Error communicating with Google AI');
      return '';
    }
  }
  
  // Generate a response for a conversation
  async generateResponse(prompt: string, mode: string = 'default') {
    try {
      console.log(`Generating ${mode} response with Google AI`);
      
      const { data, error } = await supabase.functions.invoke('vertex-ai', {
        body: { prompt, mode }
      });
      
      if (error) throw error;
      return data.text || '';
    } catch (error) {
      console.error('Error generating response with Google AI:', error);
      return 'I apologize, but I encountered an error processing your request. Please try again.';
    }
  }

  // Search functionality using Google's AI
  async search(query: string, categories: string[] = []) {
    try {
      console.log('Searching with Google AI');
      
      const { data, error } = await supabase.functions.invoke('vertex-ai', {
        body: { 
          prompt: query, 
          mode: 'search',
          context: categories.map(cat => ({ role: 'system', content: `Consider the category: ${cat}` }))
        }
      });
      
      if (error) throw error;
      return data.text || '';
    } catch (error) {
      console.error('Error searching with Google AI:', error);
      return 'I apologize, but I encountered an error with your search. Please try again.';
    }
  }
  
  // Text-to-Speech using Google's Cloud TTS
  async textToSpeech(text: string, options: any = {}) {
    try {
      console.log('Converting text to speech with Google TTS');
      
      const voice = options.voice || DEFAULT_MALE_VOICE;
      
      const { data, error } = await supabase.functions.invoke('vertex-ai', {
        body: { 
          action: 'text-to-speech',
          text,
          options: {
            voice,
            speakingRate: options.speakingRate || 1.0,
            pitch: options.pitch || 0
          }
        }
      });
      
      if (error) throw error;
      return data.audioContent || null;
    } catch (error) {
      console.error('Error with Google TTS:', error);
      return null;
    }
  }

  // Speech-to-Text using Google's STT
  async speechToText(audioData: ArrayBuffer) {
    try {
      console.log('Converting speech to text with Google STT');
      
      // Convert ArrayBuffer to base64
      const base64Audio = btoa(
        new Uint8Array(audioData)
          .reduce((data, byte) => data + String.fromCharCode(byte), '')
      );
      
      const { data, error } = await supabase.functions.invoke('vertex-ai', {
        body: { 
          action: 'speech-to-text',
          prompt: base64Audio
        }
      });
      
      if (error) throw error;
      return data.transcript || '';
    } catch (error) {
      console.error('Error with Google STT:', error);
      return '';
    }
  }

  // Content safety check using Google's AI
  async checkContentSafety(content: string) {
    try {
      console.log('Checking content safety');
      
      const response = await this.callGeminiAPI('contentSafety', {
        content
      });
      
      return {
        isSafe: response.isSafe || false,
        categories: response.categories || []
      };
    } catch (error) {
      console.error('Error checking content safety:', error);
      return { isSafe: true, categories: [] };
    }
  }

  // Text analysis with Google NLP
  async analyzeText(text: string) {
    try {
      console.log('Analyzing text with Google NLP');
      
      const response = await this.callGeminiAPI('analyzeText', {
        text
      });
      
      return response;
    } catch (error) {
      console.error('Error analyzing text:', error);
      return {};
    }
  }

  // Extract entities from text
  async extractEntities(text: string) {
    try {
      console.log('Extracting entities from text');
      
      const response = await this.callGeminiAPI('extractEntities', {
        text
      });
      
      return response.entities || [];
    } catch (error) {
      console.error('Error extracting entities:', error);
      return [];
    }
  }

  // Extract categories from text
  async extractCategories(text: string) {
    try {
      console.log('Extracting categories from text');
      
      const response = await this.callGeminiAPI('extractCategories', {
        text
      });
      
      return response.categories || [];
    } catch (error) {
      console.error('Error extracting categories:', error);
      return [];
    }
  }

  // Project Mariner functionality - Ticket booking
  async bookTickets(eventId: string, ticketDetails: {
    quantity: number;
    section?: string;
    row?: string;
    priceLevel?: string;
  }, paymentMethod?: string) {
    try {
      console.log('Booking tickets with Project Mariner');
      
      if (!this.marinerEnabled) {
        return {
          success: false,
          error: 'Project Mariner booking is not enabled'
        };
      }
      
      const { data, error } = await supabase.functions.invoke('mariner-booking', {
        body: { 
          action: 'bookTickets',
          eventId,
          ticketDetails,
          paymentMethod
        }
      });
      
      if (error) throw error;
      
      // Toast success message
      if (data.success) {
        toast.success('Tickets booked successfully!');
      }
      
      return data;
    } catch (error) {
      console.error('Error booking tickets:', error);
      toast.error('Failed to book tickets. Please try again.');
      return {
        success: false,
        error: 'Failed to book tickets'
      };
    }
  }

  // Project Mariner functionality - Restaurant reservation
  async makeReservation(venueId: string, reservationDetails: {
    date: string;
    time: string;
    partySize: number;
    specialRequests?: string;
  }) {
    try {
      console.log('Making reservation with Project Mariner');
      
      if (!this.marinerEnabled) {
        return {
          success: false,
          error: 'Project Mariner reservations are not enabled'
        };
      }
      
      const { data, error } = await supabase.functions.invoke('mariner-booking', {
        body: { 
          action: 'makeReservation',
          venueId,
          reservationDetails
        }
      });
      
      if (error) throw error;
      
      // Toast success message
      if (data.success) {
        toast.success('Reservation made successfully!');
      }
      
      return data;
    } catch (error) {
      console.error('Error making reservation:', error);
      toast.error('Failed to make reservation. Please try again.');
      return {
        success: false,
        error: 'Failed to make reservation'
      };
    }
  }

  // Project Mariner functionality - Check transaction status
  async checkTransactionStatus(transactionId: string) {
    try {
      console.log('Checking transaction status with Project Mariner');
      
      const { data, error } = await supabase.functions.invoke('mariner-booking', {
        body: { 
          action: 'checkStatus',
          transactionId
        }
      });
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error checking transaction status:', error);
      return {
        success: false,
        status: 'unknown',
        error: 'Failed to check transaction status'
      };
    }
  }

  // Project Mariner functionality - Cancel transaction
  async cancelTransaction(transactionId: string) {
    try {
      console.log('Cancelling transaction with Project Mariner');
      
      const { data, error } = await supabase.functions.invoke('mariner-booking', {
        body: { 
          action: 'cancelTransaction',
          transactionId
        }
      });
      
      if (error) throw error;
      
      // Toast success message
      if (data.success) {
        toast.success('Transaction cancelled successfully!');
      }
      
      return data;
    } catch (error) {
      console.error('Error cancelling transaction:', error);
      toast.error('Failed to cancel transaction. Please try again.');
      return {
        success: false,
        error: 'Failed to cancel transaction'
      };
    }
  }

  // Wrapper for Gemini API calls
  private async callGeminiAPI(action: string, payload: any) {
    try {
      const { data, error } = await supabase.functions.invoke('vertex-ai', {
        body: { 
          action,
          ...payload
        }
      });
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error(`Error calling ${action}:`, error);
      throw error;
    }
  }
}

// Create singleton instance
export const GoogleAIService = new GoogleAIServiceClass();

// Helper utility functions
export const searchWithVertex = async (query: string) => {
  return await GoogleAIService.search(query);
};

export const generateWithVertex = async (prompt: string, options = {}) => {
  return await GoogleAIService.generateText(prompt, options);
};
