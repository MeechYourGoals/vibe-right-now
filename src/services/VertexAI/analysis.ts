
import { supabase } from '@/integrations/supabase/client';

/**
 * Extract entities from text using Google NLP API
 * @param text The text to analyze
 * @returns Array of extracted entities
 */
export const extractEntities = async (text: string): Promise<any[]> => {
  try {
    const { data, error } = await supabase.functions.invoke('google-nlp', {
      body: {
        action: 'analyze-entities',
        text
      }
    });
    
    if (error) {
      console.error('Error calling Google NLP for entity extraction:', error);
      return [];
    }
    
    return data?.entities || [];
  } catch (error) {
    console.error('Error extracting entities:', error);
    return [];
  }
};

/**
 * Analyze sentiment of text using Google NLP API
 * @param text The text to analyze
 * @returns Sentiment analysis result
 */
export const analyzeText = async (text: string): Promise<any> => {
  try {
    const { data, error } = await supabase.functions.invoke('google-nlp', {
      body: {
        action: 'analyze-sentiment',
        text
      }
    });
    
    if (error) {
      console.error('Error calling Google NLP for sentiment analysis:', error);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('Error analyzing text sentiment:', error);
    return null;
  }
};

/**
 * Extract categories from text using Google NLP API
 * @param text The text to analyze
 * @returns Array of categories
 */
export const extractCategories = async (text: string): Promise<string[]> => {
  try {
    const { data, error } = await supabase.functions.invoke('google-nlp', {
      body: {
        action: 'extract-categories',
        text
      }
    });
    
    if (error) {
      console.error('Error calling Google NLP for category extraction:', error);
      return [];
    }
    
    return data?.categories || [];
  } catch (error) {
    console.error('Error extracting categories:', error);
    return [];
  }
};
