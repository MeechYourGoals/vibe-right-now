
import { supabase } from '@/integrations/supabase/client';
import { SearchService } from './search/SearchService';

/**
 * Service to interact with search APIs and AI-assisted search
 * This is kept for backward compatibility but delegates to the new SearchService
 */
export const PerplexityService = {
  /**
   * Generate a chat completion using Perplexity
   */
  async generateResponse(prompt: string): Promise<string> {
    try {
      const { data, error } = await supabase.functions.invoke('perplexity-search', {
        body: { query: prompt }
      });

      if (error) {
        console.error('Perplexity API error:', error);
        throw new Error('Failed to generate response');
      }

      return data?.text || '';
    } catch (err) {
      console.error('Perplexity generateResponse error:', err);
      return "I'm having trouble connecting to my AI services right now.";
    }
  },

  /**
   * Search using Perplexity with fallbacks
   */
  async searchPerplexity(query: string): Promise<string> {
    try {
      const { data, error } = await supabase.functions.invoke('perplexity-search', {
        body: { query }
      });

      if (error) {
        console.error('Perplexity search error:', error);
        return SearchService.search(query);
      }

      return data?.text || SearchService.search(query);
    } catch (err) {
      console.error('Perplexity search exception:', err);
      return SearchService.search(query);
    }
  }
};
