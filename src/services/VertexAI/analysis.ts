
/**
 * Text analysis services using Google's NLP API
 */
import { supabase } from '@/integrations/supabase/client';

/**
 * Analyze text with Natural Language API
 */
export async function analyzeText(text: string): Promise<any> {
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
    console.error('Error in analyzeText:', error);
    return null;
  }
}
