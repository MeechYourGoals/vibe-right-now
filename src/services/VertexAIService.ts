
import { supabase } from '@/integrations/supabase/client';

export class VertexAIService {
  static async generateResponse(prompt: string, mode: string = 'default', context: any[] = []) {
    try {
      console.log('Calling vertex-ai function with prompt:', prompt.substring(0, 50));
      
      const { data, error } = await supabase.functions.invoke('vertex-ai', {
        body: { 
          prompt,
          mode,
          context
        }
      });
      
      if (error) {
        console.error('Error from vertex-ai function:', error);
        throw new Error(error.message || 'Failed to get response from AI service');
      }
      
      if (!data || !data.text) {
        throw new Error('No response received from AI service');
      }
      
      return data.text;
    } catch (error) {
      console.error('Error in VertexAIService:', error);
      throw error;
    }
  }

  static async searchWithVertex(query: string, options: any = {}) {
    try {
      console.log('Searching with Vertex AI:', query.substring(0, 50));
      
      const { data, error } = await supabase.functions.invoke('vertex-ai', {
        body: { 
          prompt: query,
          mode: 'search',
          context: options.context || []
        }
      });
      
      if (error) {
        console.error('Error from vertex-ai search function:', error);
        throw new Error(error.message || 'Failed to search with AI service');
      }
      
      if (!data || !data.text) {
        throw new Error('No search results received from AI service');
      }
      
      return data.text;
    } catch (error) {
      console.error('Error in VertexAIService search:', error);
      throw error;
    }
  }

  static async textToSpeech(text: string, options: any = {}) {
    try {
      console.log('Converting text to speech:', text.substring(0, 50));
      
      const { data, error } = await supabase.functions.invoke('vertex-ai', {
        body: { 
          prompt: text,
          mode: 'tts',
          options
        }
      });
      
      if (error) {
        console.error('Error from vertex-ai TTS function:', error);
        return null; // Return null for fallback handling
      }
      
      return data?.audioContent || null;
    } catch (error) {
      console.error('Error in VertexAIService TTS:', error);
      return null; // Return null for fallback handling
    }
  }
}
