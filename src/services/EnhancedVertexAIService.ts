
import { VertexAIService } from './VertexAIService';
import { UserMemoryService } from './UserMemoryService';
import { UserMemory } from '@/types/entities/user';

/**
 * Enhanced Vertex AI Service with user memory integration
 */
export class EnhancedVertexAIService extends VertexAIService {
  /**
   * Generate response with user memory context
   */
  static async generatePersonalizedResponse(
    prompt: string,
    userMemory: UserMemory | null,
    mode: 'default' | 'search' | 'venue' = 'default',
    context: any[] = []
  ): Promise<string> {
    // Generate user context from memory
    const userContext = UserMemoryService.formatContextForAI(userMemory);
    
    // Enhance the prompt with user context
    const enhancedPrompt = userMemory ? `
${userContext}

Based on the user's preferences and history above, please respond to: ${prompt}

Make your response personalized and reference their preferences when relevant.
    `.trim() : prompt;

    try {
      // Call the parent class method with enhanced prompt
      const response = await super.generateResponse(enhancedPrompt, mode, context);
      
      // Add personalization indicator if user memory was used
      if (userMemory) {
        return response + '\n\n*Personalized based on your preferences*';
      }
      
      return response;
    } catch (error) {
      console.error('Error in personalized response generation:', error);
      return this.generatePersonalizedFallback(prompt, userMemory);
    }
  }

  /**
   * Generate venue recommendations with user memory
   */
  static async generateVenueRecommendations(
    location: string,
    userMemory: UserMemory | null,
    specificRequest?: string
  ): Promise<string> {
    let prompt = `Find great venues in ${location}`;
    
    if (specificRequest) {
      prompt += ` for ${specificRequest}`;
    }

    if (userMemory) {
      // Customize search based on user preferences
      if (userMemory.favorite_categories.length > 0) {
        prompt += `. Focus on: ${userMemory.favorite_categories.join(', ')}`;
      }
      
      if (userMemory.disliked_features.length > 0) {
        prompt += `. Avoid places that are: ${userMemory.disliked_features.join(', ')}`;
      }
    }

    return this.generatePersonalizedResponse(prompt, userMemory, 'venue');
  }

  /**
   * Search with user context
   */
  static async searchWithUserContext(
    query: string,
    userMemory: UserMemory | null,
    categories?: string[]
  ): Promise<string> {
    // Enhance categories with user preferences
    const enhancedCategories = categories || [];
    
    if (userMemory?.favorite_categories) {
      enhancedCategories.push(...userMemory.favorite_categories);
    }

    const response = await super.searchWithVertex(query, enhancedCategories);
    
    if (userMemory) {
      return response + '\n\n*Results tailored to your interests*';
    }
    
    return response;
  }

  /**
   * Generate personalized fallback response
   */
  private static generatePersonalizedFallback(prompt: string, userMemory: UserMemory | null): string {
    const lowerPrompt = prompt.toLowerCase();
    
    let baseResponse = '';
    
    if (lowerPrompt.includes('restaurant') || lowerPrompt.includes('food')) {
      baseResponse = "I can help with restaurant recommendations from my training data.";
      
      if (userMemory?.favorite_categories.some(cat => cat.includes('food') || cat.includes('restaurant'))) {
        const foodPrefs = userMemory.favorite_categories.filter(cat => 
          cat.includes('food') || cat.includes('restaurant') || cat.includes('cuisine')
        );
        baseResponse += ` Based on your preferences for ${foodPrefs.join(', ')}, I'd suggest looking for similar options.`;
      }
    } else if (lowerPrompt.includes('bar') || lowerPrompt.includes('drink')) {
      baseResponse = "I can provide general information about bars and nightlife.";
      
      if (userMemory?.favorite_categories.some(cat => cat.includes('bar') || cat.includes('cocktail'))) {
        baseResponse += " I remember you enjoy cocktail bars and nightlife venues.";
      }
    } else {
      baseResponse = "I can help with general information from my training data.";
    }

    // Add user-specific context if available
    if (userMemory?.language_tone_preference === 'brief') {
      baseResponse += " What specific information would you like?";
    } else if (userMemory?.language_tone_preference === 'detailed') {
      baseResponse += " I can provide comprehensive information about your query.";
    }

    return baseResponse;
  }
}
