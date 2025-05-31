
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
}
