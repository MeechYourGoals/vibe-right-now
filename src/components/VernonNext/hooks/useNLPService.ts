
import { ExtractedIntent } from '../types';

export const useNLPService = () => {
  const extractIntent = async (text: string): Promise<ExtractedIntent> => {
    try {
      // Default intent structure
      const intent: ExtractedIntent = {
        intent: 'search',
        entities: {},
        confidence: 0.8,
        type: 'query'
      };

      // Basic intent classification
      if (text.toLowerCase().includes('find') || text.toLowerCase().includes('search')) {
        intent.intent = 'search';
        intent.confidence = 0.9;
      } else if (text.toLowerCase().includes('book') || text.toLowerCase().includes('reserve')) {
        intent.intent = 'booking';
        intent.confidence = 0.85;
      }

      // Extract location entities
      const locationMatch = text.match(/in\s+([a-zA-Z\s]+)(?:,\s*([a-zA-Z\s]+))?/i);
      if (locationMatch) {
        intent.entities.city = locationMatch[1];
        if (locationMatch[2]) {
          intent.entities.state = locationMatch[2];
        }
        intent.location = locationMatch[0];
      }

      // Extract keywords
      const keywords = text.toLowerCase()
        .replace(/[^\w\s]/g, '')
        .split(' ')
        .filter(word => word.length > 3);
      
      intent.keywords = keywords;

      return intent;
    } catch (error) {
      console.error('Error in NLP service:', error);
      return {
        intent: 'unknown',
        entities: {},
        confidence: 0,
        type: 'error'
      };
    }
  };

  return { extractIntent };
};
