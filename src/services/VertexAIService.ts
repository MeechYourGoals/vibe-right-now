
/**
 * Service for interacting with Google's Vertex AI platform
 */
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { GenerateTextOptions } from './VertexAI/types';

export class VertexAIService {
  /**
   * Generate a response using Vertex AI / Gemini
   * @param query The user's query
   * @param mode The mode to use (default, venue, search)
   * @param history Previous messages for context
   * @returns The generated text
   */
  static async generateResponse(query: string, mode: string = 'default', history: any[] = []): Promise<string> {
    try {
      console.log(`Generating ${mode} response for query: "${query.substring(0, 50)}..."`);
      
      const { data, error } = await supabase.functions.invoke('vertex-ai', {
        body: { 
          prompt: query,
          mode,
          context: history,
          model: 'gemini-1.5-pro',
          temperature: 0.7
        }
      });
      
      if (error) {
        console.error('Error calling Vertex AI function:', error);
        throw new Error(`Failed to generate response: ${error.message}`);
      }
      
      if (!data || !data.text) {
        throw new Error('No response text received from Vertex AI');
      }
      
      return data.text;
    } catch (error) {
      console.error('Error in VertexAIService.generateResponse:', error);
      return "I'm having trouble connecting to the AI services right now. Please try again later.";
    }
  }
  
  /**
   * Generate text using Vertex AI
   * @param prompt The prompt for generating text
   * @param history Previous conversation history
   * @param options Generation options
   * @returns The generated text
   */
  static async generateText(
    prompt: string, 
    history: Array<{sender: 'user' | 'ai', text: string}> = [],
    options: GenerateTextOptions = {}
  ): Promise<string> {
    return await VertexAI.generateText(prompt, history, options);
  }
  
  /**
   * Search for information using Vertex AI
   * @param query The search query
   * @param categories Optional category filters
   * @returns Search results as text
   */
  static async searchWithVertex(query: string, categories?: string[]): Promise<string> {
    return await VertexAI.searchWithAI(query, categories);
  }
  
  /**
   * Convert text to speech using Google's TTS
   * @param text The text to convert to speech
   * @param options Voice and audio options
   * @returns Audio content as ArrayBuffer or null
   */
  static async textToSpeech(text: string, options: any = {}): Promise<ArrayBuffer | null> {
    try {
      console.log(`Converting text to speech: "${text.substring(0, 50)}..."`);
      
      const { data, error } = await supabase.functions.invoke('vertex-ai', {
        body: { 
          action: 'text-to-speech',
          text,
          options
        }
      });
      
      if (error) {
        console.error('Error calling TTS function:', error);
        throw new Error(`Text-to-speech conversion failed: ${error.message}`);
      }
      
      if (!data || !data.audioContent) {
        throw new Error('No audio content received from TTS service');
      }
      
      // Convert base64 audio content to ArrayBuffer
      const binaryString = atob(data.audioContent);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      
      return bytes.buffer;
    } catch (error) {
      console.error('Error in VertexAIService.textToSpeech:', error);
      return null;
    }
  }
  
  /**
   * Extract entities from text using Vertex AI NLP
   * @param text The text to analyze
   * @returns Extracted entities
   */
  static async extractEntities(text: string): Promise<any[]> {
    try {
      console.log(`Extracting entities from: "${text.substring(0, 50)}..."`);
      
      // Implementation through Vertex AI's NLP capabilities
      return [];
    } catch (error) {
      console.error('Error extracting entities:', error);
      return [];
    }
  }
  
  /**
   * Generate an image using Imagen
   * @param prompt The image description
   * @param options Generation options
   * @returns The generated image as a base64 string
   */
  static async generateImage(prompt: string, options: any = {}): Promise<string | null> {
    try {
      console.log(`Generating image with Imagen: "${prompt.substring(0, 50)}..."`);
      
      // Would call the Imagen API through a Supabase Edge Function
      return null;
    } catch (error) {
      console.error('Error generating image with Imagen:', error);
      return null;
    }
  }
  
  /**
   * Generate a short marketing video using Veo
   * @param prompt Description of the video to generate
   * @param options Generation options
   * @returns URL to the generated video
   */
  static async generateVideo(prompt: string, options: any = {}): Promise<string | null> {
    try {
      console.log(`Generating video with Veo: "${prompt.substring(0, 50)}..."`);
      
      // Would call the Veo API through a Supabase Edge Function
      return null;
    } catch (error) {
      console.error('Error generating video with Veo:', error);
      return null;
    }
  }
  
  /**
   * Analyze a document using Gemini
   * @param documentText The text content of the document
   * @param analysisType Type of analysis to perform
   * @returns Analysis results
   */
  static async analyzeDocument(documentText: string, analysisType: string = 'financial'): Promise<any> {
    try {
      console.log(`Analyzing ${analysisType} document with Gemini`);
      
      const { data, error } = await supabase.functions.invoke('vertex-ai', {
        body: { 
          prompt: `Analyze this ${analysisType} document and provide insights:\n\n${documentText}`,
          mode: 'analysis',
          model: 'gemini-1.5-pro',
          temperature: 0.2
        }
      });
      
      if (error) {
        console.error('Error analyzing document:', error);
        throw new Error(`Document analysis failed: ${error.message}`);
      }
      
      return data;
    } catch (error) {
      console.error('Error in VertexAIService.analyzeDocument:', error);
      return { error: "Analysis failed", message: "Couldn't analyze the document" };
    }
  }
}

// For backward compatibility, import from the VertexAI module
import * as VertexAI from './VertexAI';
