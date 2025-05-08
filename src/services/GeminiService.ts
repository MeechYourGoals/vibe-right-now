
import { supabase } from '@/integrations/supabase/client';
import { Message } from '@/components/VernonChat/types';

/**
 * Service to interact with Google's Gemini API via Supabase Edge Functions
 */
export const GeminiService = {
  /**
   * Generate a text response using Gemini
   * @param prompt The user's prompt
   * @param mode The chat mode ('venue' or default user)
   * @param history Previous chat messages for context
   * @returns The generated text response
   */
  async generateResponse(prompt: string, mode: 'venue' | 'user' = 'user', history: Message[] = []): Promise<string> {
    try {
      console.log(`Calling Gemini AI with prompt: "${prompt.substring(0, 50)}..."`);
      
      const { data, error } = await supabase.functions.invoke('gemini-ai', {
        body: { prompt, mode, history }
      });
      
      if (error) {
        console.error('Error calling Gemini AI function:', error);
        throw new Error(`Failed to generate response: ${error.message}`);
      }
      
      if (!data || !data.text) {
        throw new Error('No response received from Gemini');
      }
      
      return data.text;
    } catch (error) {
      console.error('Error in GeminiService.generateResponse:', error);
      return "I'm having trouble connecting to my AI services right now. Please try again later.";
    }
  },
  
  /**
   * Generate an image using Gemini's Imagen
   * @param prompt The image description
   * @returns Base64 encoded image data
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
      console.error('Error in GeminiService.generateImage:', error);
      throw error;
    }
  }
};
