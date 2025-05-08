
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

/**
 * Extract entities from text using Natural Language API
 */
export async function extractEntities(text: string): Promise<any[]> {
  const analysisData = await analyzeText(text);
  if (!analysisData || !analysisData.entities) {
    return [];
  }
  return analysisData.entities;
}

/**
 * Extract categories from text based on entity types
 */
export async function extractCategories(text: string): Promise<string[]> {
  const entities = await extractEntities(text);
  
  // Map of entity types to categories
  const categoryMap: Record<string, string> = {
    'LOCATION': 'location',
    'ADDRESS': 'location',
    'CONSUMER_GOOD': 'product',
    'WORK_OF_ART': 'entertainment',
    'EVENT': 'event',
    'ORGANIZATION': 'organization',
    'PERSON': 'person',
    'OTHER': 'other'
  };
  
  const categories = new Set<string>();
  
  entities.forEach((entity: any) => {
    const type = entity.type;
    if (categoryMap[type]) {
      categories.add(categoryMap[type]);
    }
    
    // Extract subcategories from entity metadata
    if (entity.metadata) {
      Object.entries(entity.metadata).forEach(([key, value]: [string, any]) => {
        if (typeof value === 'string' && value.length > 0) {
          categories.add(value.toLowerCase());
        }
      });
    }
  });
  
  return Array.from(categories);
}
