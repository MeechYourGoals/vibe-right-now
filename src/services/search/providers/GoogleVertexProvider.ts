
import { supabase } from '@/integrations/supabase/client';

export class GoogleVertexProvider {
  static async search(query: string): Promise<string> {
    try {
      const { data, error } = await supabase.functions.invoke('vertex-ai', {
        body: {
          prompt: `Search and provide information about: ${query}`,
          model: 'gemini-1.5-flash'
        }
      });

      if (error) {
        console.error('Error calling Google Vertex AI:', error);
        return `I searched for "${query}" but couldn't find specific results at the moment.`;
      }

      return data?.response || `I searched for "${query}" but couldn't find specific results at the moment.`;
    } catch (error) {
      console.error('Error in Google Vertex provider:', error);
      return `I encountered an error while searching for "${query}". Please try again later.`;
    }
  }
}
