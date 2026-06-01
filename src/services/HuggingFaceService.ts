
import { invokeEdgeWithFallback } from '@/services/edge/invokeEdge';

/**
 * Service for interacting with Hugging Face Transformers
 */
export class HuggingFaceService {
  private static isInitialized = false;
  
  /**
   * Check if the service is initialized and available
   */
  static async isAvailable(): Promise<boolean> {
    if (this.isInitialized) {
      return true;
    }
    
    try {
      // In a real implementation, we would initialize the transformers library
      // For now, we'll simulate initialization
      await new Promise(resolve => setTimeout(resolve, 100));
      this.isInitialized = true;
      console.log('HuggingFace service initialized');
      return true;
    } catch (error) {
      console.error('Error initializing HuggingFace service:', error);
      return false;
    }
  }

  /**
   * Analyze a query to extract entities and enhance it
   */
  static async analyzeQuery(query: string): Promise<{ 
    enhancedQuery: string; 
    extractedEntities: string[] 
  }> {
    try {
      // In a real implementation, we would use a pre-trained model
      // For now, we'll simulate entity extraction with regex
      const locationRegex = /(in|at|near|around|from) ([A-Z][a-z]+(?: [A-Z][a-z]+)*)/g;
      const timeRegex = /(today|tomorrow|next week|this weekend|tonight|morning|evening|afternoon)/gi;
      const categoryRegex = /(restaurants?|bars?|clubs?|venues?|concerts?|shows?|theaters?|museums?|parks?)/gi;
      
      const entities: string[] = [];
      let enhancedQuery = query;
      
      // Extract locations
      const locationMatches = query.match(locationRegex);
      if (locationMatches) {
        locationMatches.forEach(match => {
          const location = match.split(' ').slice(1).join(' ');
          if (location && location.length > 2) {
            entities.push(location);
          }
        });
      }
      
      // Extract time references
      const timeMatches = query.match(timeRegex);
      if (timeMatches) {
        timeMatches.forEach(match => {
          entities.push(match);
        });
      }
      
      // Extract categories
      const categoryMatches = query.match(categoryRegex);
      if (categoryMatches) {
        categoryMatches.forEach(match => {
          entities.push(match);
        });
      }
      
      // Enhance query if needed (simple example)
      if (query.includes('good places') || query.includes('nice places')) {
        enhancedQuery = query.replace(/(good|nice) places/g, 'highly rated places');
      }
      
      return {
        enhancedQuery,
        extractedEntities: [...new Set(entities)]
      };
    } catch (error) {
      console.error('Error analyzing query with HuggingFace:', error);
      return { enhancedQuery: query, extractedEntities: [] };
    }
  }

  /**
   * Generate text using a pre-trained model
   */
  static async generateText(prompt: string): Promise<string> {
    const fallback = () => `Here's information about "${prompt}" based on my knowledge.`;
    const data = await invokeEdgeWithFallback<unknown>(
      'vertex-ai',
      { prompt, mode: 'default' },
      async () =>
        invokeEdgeWithFallback<unknown>('openai-chat', { prompt }, fallback)
    );

    if (typeof data === 'string' && data.trim()) return data;
    if (data && typeof data === 'object') {
      const obj = data as Record<string, any>;
      const text = obj.text || obj.response || obj.content;
      if (typeof text === 'string' && text.trim()) return text;
    }
    return fallback();
  }
}
