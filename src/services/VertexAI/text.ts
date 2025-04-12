
/**
 * Text generation services using Vertex AI with Model Context Protocol
 */
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { GenerateTextOptions } from './types';

/**
 * Generate text using Vertex AI with MCP (Model Context Protocol)
 */
export async function generateText(
  prompt: string, 
  history: Array<{sender: 'user' | 'ai', text: string}> = [],
  options: GenerateTextOptions = {}
): Promise<string> {
  try {
    console.log(`Generating text with Vertex AI MCP for prompt: "${prompt.substring(0, 50)}..."`);
    
    const { data, error } = await supabase.functions.invoke('vertex-ai', {
      body: { 
        prompt, 
        history,
        model: options.model || 'gemini-1.5-pro',
        maxTokens: options.maxTokens || 2048,
        temperature: options.temperature || 0.7,
        mode: options.mode || 'default',
        safetySettings: options.safetySettings
      }
    });
    
    if (error) {
      console.error('Error calling Vertex AI function:', error);
      throw new Error(`Vertex AI text generation failed: ${error.message}`);
    }
    
    if (!data || !data.text) {
      throw new Error('No text received from Vertex AI');
    }
    
    // Process MCP format if present
    let responseText = data.text;
    if (responseText.includes('<response>') && responseText.includes('</response>')) {
      const responseContent = responseText.match(/<response>(.*?)<\/response>/s);
      if (responseContent && responseContent[1]) {
        responseText = responseContent[1].trim();
      }
    }
    
    return responseText;
  } catch (error) {
    console.error('Error in generateText:', error);
    toast.error('AI text generation encountered an error');
    return "I'm having trouble generating a response right now. Please try again later.";
  }
}

/**
 * Generate factual information using Vertex AI search capabilities with MCP
 */
export async function searchWithAI(query: string, categories?: string[]): Promise<string> {
  try {
    console.log(`Searching with Vertex AI MCP: "${query.substring(0, 50)}..."`);
    
    // Format query with MCP if not already formatted
    let mcpQuery = query;
    if (!query.includes('<request') && categories && categories.length > 0) {
      const categoryContext = categories.join(', ');
      mcpQuery = `<request type="search" categories="${categoryContext}">${query}</request>`;
    } else if (!query.includes('<request')) {
      mcpQuery = `<request type="search">${query}</request>`;
    }
    
    const { data, error } = await supabase.functions.invoke('vertex-ai', {
      body: { 
        prompt: mcpQuery,
        mode: 'search',
        searchMode: true,
        categories: categories || [],
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
    
    // Process MCP format if present 
    let responseText = data.text;
    if (responseText.includes('<response>') && responseText.includes('</response>')) {
      const responseContent = responseText.match(/<response>(.*?)<\/response>/s);
      if (responseContent && responseContent[1]) {
        responseText = responseContent[1].trim();
      }
    }
    
    return responseText;
  } catch (error) {
    console.error('Error in searchWithAI:', error);
    return "I couldn't find specific information about that. Could you try rephrasing your question?";
  }
}
