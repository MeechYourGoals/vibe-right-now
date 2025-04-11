
/**
 * Text generation services using Vertex AI
 */
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { GenerateTextOptions } from './types';

/**
 * Generate text using Vertex AI
 */
export async function generateText(
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
    console.error('Error in generateText:', error);
    toast.error('AI text generation encountered an error');
    return "I'm having trouble generating a response right now. Please try again later.";
  }
}

/**
 * Generate factual information using Vertex AI search capabilities
 */
export async function searchWithAI(query: string): Promise<string> {
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
    console.error('Error in searchWithAI:', error);
    return "I couldn't find specific information about that. Could you try rephrasing your question?";
  }
}
