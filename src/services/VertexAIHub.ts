
/**
 * Comprehensive service to coordinate all Vertex AI capabilities
 * This service acts as a central hub for all interactions with Google's Vertex AI
 */
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

// Types for the different Vertex AI capabilities
export type VertexAIModel = 'gemini-1.5-pro' | 'gemini-1.5-flash';
export type VertexAIVisionModel = 'gemini-1.5-pro-vision';
export type VertexVoiceModel = 'en-US-Neural2-J' | 'en-US-Neural2-F' | 'en-US-Neural2-D';

interface GenerateTextOptions {
  model?: VertexAIModel;
  maxTokens?: number;
  temperature?: number;
}

interface GenerateImageOptions {
  width?: number;
  height?: number;
  samples?: number;
}

interface TextToSpeechOptions {
  voice?: VertexVoiceModel;
  pitch?: number;
  speakingRate?: number;
}

/**
 * Central service for interacting with Google Vertex AI
 */
export const VertexAIHub = {
  /**
   * Generate text using Vertex AI
   */
  async generateText(
    prompt: string, 
    history: Array<{sender: 'user' | 'ai', text: string}> = [],
    options: GenerateTextOptions = {}
  ): Promise<string> {
    try {
      console.log(`Generating text with Vertex AI for prompt: "${prompt.substring(0, 50)}..."`);
      
      const { data, error } = await supabase.functions.invoke('vertex-ai', {
        body: { 
          prompt, 
          history,
          model: options.model || 'gemini-1.5-pro',
          maxTokens: options.maxTokens || 2048,
          temperature: options.temperature || 0.7
        }
      });
      
      if (error) {
        console.error('Error calling Vertex AI function:', error);
        throw new Error(`Vertex AI text generation failed: ${error.message}`);
      }
      
      if (!data || !data.text) {
        throw new Error('No text received from Vertex AI');
      }
      
      return data.text;
    } catch (error) {
      console.error('Error in VertexAIHub.generateText:', error);
      toast.error('AI text generation encountered an error');
      return "I'm having trouble generating a response right now. Please try again later.";
    }
  },
  
  /**
   * Generate factual information using Vertex AI search capabilities
   */
  async searchWithAI(query: string): Promise<string> {
    try {
      console.log(`Searching with Vertex AI: "${query.substring(0, 50)}..."`);
      
      const { data, error } = await supabase.functions.invoke('vertex-ai', {
        body: { 
          prompt: query,
          mode: 'search',
          searchMode: true,
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
      console.error('Error in VertexAIHub.searchWithAI:', error);
      return "I couldn't find specific information about that. Could you try rephrasing your question?";
    }
  },
  
  /**
   * Analyze text with Natural Language API
   */
  async analyzeText(text: string): Promise<any> {
    try {
      const { data, error } = await supabase.functions.invoke('google-nlp', {
        body: { text }
      });
      
      if (error) {
        console.error('Error calling Google NLP function:', error);
        throw new Error(`Text analysis failed: ${error.message}`);
      }
      
      return data;
    } catch (error) {
      console.error('Error in VertexAIHub.analyzeText:', error);
      return null;
    }
  },
  
  /**
   * Generate speech from text using Google Text-to-Speech API
   */
  async textToSpeech(text: string, options: TextToSpeechOptions = {}): Promise<string | null> {
    try {
      const { data, error } = await supabase.functions.invoke('google-tts', {
        body: { 
          text,
          voice: options.voice || 'en-US-Neural2-J',
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
      console.error('Error in VertexAIHub.textToSpeech:', error);
      return null;
    }
  },
  
  /**
   * Transcribe speech to text using Google Speech-to-Text API
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
      console.error('Error in VertexAIHub.speechToText:', error);
      return null;
    }
  },
  
  /**
   * Evaluate if content is safe using Vertex AI Content Safety API
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
      console.error('Error in VertexAIHub.checkContentSafety:', error);
      // Default to safe if we can't check
      return { safe: true };
    }
  }
};
