
import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { ExtractedIntent } from '../types';

export const useNLPService = () => {
  // Function to analyze text using Google Cloud NLP
  const analyzeIntent = useCallback(async (text: string): Promise<ExtractedIntent> => {
    try {
      const { data, error } = await supabase.functions.invoke('google-nlp', {
        body: { text }
      });
      
      if (error) {
        console.error('Error calling NLP service:', error);
        return { type: 'unknown' };
      }
      
      // Default intent if we can't determine
      let intentType: 'search' | 'info' | 'question' | 'booking' | 'unknown' = 'unknown';
      
      // Determine intent type based on text patterns
      if (text.match(/find|search|looking for|show me|where (can|is)|suggest/i)) {
        intentType = 'search';
      } else if (text.match(/book|reserve|appointment|schedule|table for/i)) {
        intentType = 'booking';
      } else if (text.match(/\?|how|what|when|where|why|who|is there|can you tell/i)) {
        intentType = 'question';
      } else if (text.match(/tell me about|information|details|describe|explain/i)) {
        intentType = 'info';
      }
      
      // Extract location from entities
      let location = '';
      if (data?.entities) {
        const locationEntities = data.entities.filter(
          (entity: any) => entity.type === 'LOCATION' || entity.type === 'ADDRESS'
        );
        
        if (locationEntities.length > 0) {
          location = locationEntities[0].name;
        }
      }
      
      // Extract date
      let date = '';
      if (data?.entities) {
        const dateEntities = data.entities.filter(
          (entity: any) => entity.type === 'DATE' || entity.type === 'TIME'
        );
        
        if (dateEntities.length > 0) {
          date = dateEntities[0].name;
        }
      }
      
      // Get categories from NLP analysis
      const categories = data?.categories || [];
      
      // Extract mood keywords
      const moodKeywords = extractMoodKeywords(text);
      
      return {
        type: intentType,
        location,
        date,
        categories,
        mood: moodKeywords,
        keywords: extractKeywords(text, data?.entities)
      };
    } catch (error) {
      console.error('Error in analyzeIntent:', error);
      return { type: 'unknown' };
    }
  }, []);
  
  // Helper to extract mood keywords
  const extractMoodKeywords = (text: string): string[] => {
    const moodWords = [
      'cozy', 'romantic', 'casual', 'fancy', 'quiet', 'lively', 'energetic',
      'relaxed', 'intimate', 'elegant', 'rustic', 'modern', 'trendy', 'hipster',
      'family-friendly', 'upscale', 'budget', 'authentic', 'exotic', 'local'
    ];
    
    const foundMoods: string[] = [];
    moodWords.forEach(mood => {
      if (text.toLowerCase().includes(mood)) {
        foundMoods.push(mood);
      }
    });
    
    return foundMoods;
  };
  
  // Helper to extract keywords
  const extractKeywords = (text: string, entities: any[] = []): string[] => {
    // Extract nouns and relevant terms from entities
    const keywords: string[] = [];
    
    if (entities) {
      entities.forEach((entity: any) => {
        if (entity.type === 'CONSUMER_GOOD' || 
            entity.type === 'WORK_OF_ART' || 
            entity.type === 'EVENT' || 
            entity.type === 'ORGANIZATION') {
          keywords.push(entity.name);
        }
      });
    }
    
    // Add common food terms and activities if present in the text
    const foodTerms = ['restaurant', 'food', 'cafe', 'dinner', 'lunch', 'breakfast', 'brunch', 'coffee', 'cuisine', 'pizza', 'sushi', 'burger', 'vegan', 'vegetarian'];
    const activityTerms = ['museum', 'gallery', 'park', 'movie', 'theater', 'concert', 'bar', 'nightclub', 'shop', 'mall', 'hiking', 'beach', 'attractions', 'events'];
    
    [...foodTerms, ...activityTerms].forEach(term => {
      if (text.toLowerCase().includes(term) && !keywords.includes(term)) {
        keywords.push(term);
      }
    });
    
    return keywords;
  };
  
  return {
    analyzeIntent
  };
};
