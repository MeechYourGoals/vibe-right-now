
import { useState } from 'react';

interface ExtractedIntent {
  intent: string;
  entities: Record<string, any>;
  confidence: number;
  type: string;
}

export const useNLPService = () => {
  const [intent, setIntent] = useState<ExtractedIntent | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const extractIntent = async (text: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Mock implementation
      setTimeout(() => {
        if (text.toLowerCase().includes('restaurant') || text.toLowerCase().includes('food')) {
          setIntent({
            intent: 'findRestaurant',
            entities: {
              cuisine: text.toLowerCase().includes('italian') ? 'italian' : 
                       text.toLowerCase().includes('chinese') ? 'chinese' : 'any'
            },
            confidence: 0.85,
            type: 'search'
          });
        } else if (text.toLowerCase().includes('bar') || text.toLowerCase().includes('drink')) {
          setIntent({
            intent: 'findBar',
            entities: {
              type: text.toLowerCase().includes('sports') ? 'sports bar' : 'bar'
            },
            confidence: 0.82,
            type: 'search'
          });
        } else if (text.toLowerCase().includes('event') || text.toLowerCase().includes('show')) {
          setIntent({
            intent: 'findEvent',
            entities: {
              type: text.toLowerCase().includes('music') ? 'music' : 
                    text.toLowerCase().includes('comedy') ? 'comedy' : 'any'
            },
            confidence: 0.79,
            type: 'search'
          });
        } else {
          setIntent({
            intent: 'generalSearch',
            entities: {},
            confidence: 0.6,
            type: 'search'
          });
        }
        setIsLoading(false);
      }, 300);
    } catch (err) {
      setError('Error processing natural language');
      setIntent({
        intent: 'unknown',
        entities: {},
        confidence: 0,
        type: 'error'
      });
      setIsLoading(false);
    }
  };

  const getSearchCategories = (text: string): string => {
    const categoryMap: Record<string, string[]> = {
      'restaurant': ['restaurant', 'food', 'eat', 'dining'],
      'bar': ['bar', 'drink', 'pub', 'brewery'],
      'event': ['event', 'show', 'concert', 'game'],
      'attraction': ['attraction', 'museum', 'park', 'visit'],
    };
    
    let matchedCategory = '';
    
    for (const [category, keywords] of Object.entries(categoryMap)) {
      if (keywords.some(keyword => text.toLowerCase().includes(keyword))) {
        matchedCategory = category;
        break;
      }
    }
    
    return matchedCategory || 'all';
  };

  return {
    intent,
    isLoading,
    error,
    extractIntent,
    getSearchCategories
  };
};

export default useNLPService;
