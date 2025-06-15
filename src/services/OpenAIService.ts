
import { supabaseApiClient } from './api';
import { toast } from 'sonner';

/**
 * Service for interacting with OpenAI API via Supabase Edge Functions
 * Now uses the unified API client architecture
 */
export class OpenAIService {
  /**
   * Generate a chat completion using OpenAI models
   */
  static async chatCompletion(
    messages: Array<{role: string; content: string}>,
    options: {
      model?: string;
      context?: 'user' | 'venue';
      stream?: boolean;
      useOpenRouter?: boolean;
    } = {}
  ): Promise<any> {
    try {
      console.log('Generating OpenAI chat completion');
      
      const response = await supabaseApiClient.callOpenAI(messages, {
        model: options.model || 'anthropic/claude-3-haiku',
        context: options.context || 'user',
        stream: options.stream || false,
        useOpenRouter: options.useOpenRouter !== false
      });
      
      return response;
    } catch (error) {
      console.error('Error in OpenAI chat completion:', error);
      throw error;
    }
  }

  /**
   * Generate text using OpenAI with conversation context
   */
  static async generateResponse(
    prompt: string,
    context: any[] = [],
    mode: 'user' | 'venue' = 'user'
  ): Promise<string> {
    try {
      // Convert context to OpenAI message format
      const messages = context.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text || msg.content || ''
      }));
      
      // Add the new prompt
      messages.push({
        role: 'user',
        content: prompt
      });
      
      const response = await this.chatCompletion(messages, { context: mode });
      return response.response?.choices?.[0]?.message?.content || 'No response generated';
    } catch (error) {
      console.error('Error generating OpenAI response:', error);
      return 'I apologize, but I encountered an error while processing your request. Please try again.';
    }
  }

  /**
   * Search using OpenAI with web context
   */
  static async searchWithOpenAI(query: string): Promise<string> {
    try {
      console.log('Searching with OpenAI:', query);
      
      const searchPrompt = `
        Please provide comprehensive information about "${query}".
        Include specific details like venues, events, locations, hours, and current information.
        Format your response clearly and provide actionable information.
      `;
      
      const response = await this.generateResponse(searchPrompt);
      return response;
    } catch (error) {
      console.error('Error in OpenAI search:', error);
      return `I couldn't find specific information about "${query}". Please try a different search.`;
    }
  }
}
