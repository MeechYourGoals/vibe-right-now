
/**
 * Content safety services using Vertex AI
 */
import { supabase } from '@/integrations/supabase/client';

/**
 * Evaluate if content is safe using Vertex AI Content Safety API
 */
export async function checkContentSafety(content: string): Promise<{safe: boolean, reasons?: string[]}> {
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
}
