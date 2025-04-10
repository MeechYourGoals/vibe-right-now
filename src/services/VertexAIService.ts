
import { supabase } from '@/integrations/supabase/client';
import { Message } from '@/components/VernonChat/types';

/**
 * Service to interact with Google's Vertex AI API via Supabase Edge Functions
 */
export const VertexAIService = {
  /**
   * Generate a text response using Vertex AI
   * @param prompt The user's prompt
   * @param mode The chat mode ('venue' or default user)
   * @param history Previous chat messages for context
   * @returns The generated text response
   */
  async generateResponse(prompt: string, mode: 'venue' | 'user' = 'user', history: Message[] = []): Promise<string> {
    try {
      console.log(`Calling Vertex AI with prompt: "${prompt.substring(0, 50)}..."`);
      
      const { data, error } = await supabase.functions.invoke('vertex-ai', {
        body: { prompt, mode, history }
      });
      
      if (error) {
        console.error('Error calling Vertex AI function:', error);
        throw new Error(`Failed to generate response: ${error.message}`);
      }
      
      if (!data || !data.text) {
        throw new Error('No response received from Vertex AI');
      }
      
      return data.text;
    } catch (error) {
      console.error('Error in VertexAIService.generateResponse:', error);
      return "I'm having trouble connecting to my AI services right now. Please try again later.";
    }
  }
};
