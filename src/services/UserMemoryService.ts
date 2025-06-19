import { UserMemory, UserInteraction } from '@/types/entities/user';

export class UserMemoryService {
  /**
   * Format user memory into AI context for recommendations
   */
  static formatContextForAI(userMemory: UserMemory | null): string {
    if (!userMemory) {
      return "New user - no previous preferences or history available.";
    }

    const sections = [];

    // Location preferences
    if (userMemory.location_history.length > 0) {
      sections.push(`Recent locations: ${userMemory.location_history.slice(-3).join(', ')}`);
    }

    // Category preferences
    if (userMemory.favorite_categories.length > 0) {
      sections.push(`Prefers: ${userMemory.favorite_categories.join(', ')}`);
    }

    // Venue ratings
    const recentRatings = Object.entries(userMemory.venue_ratings)
      .slice(-3)
      .map(([venueId, rating]) => {
        const booking = userMemory.booking_history.find(b => b.venue_id === venueId);
        return `${booking?.venue_name || `Venue ${venueId}`} (${rating}/5)`;
      });
    
    if (recentRatings.length > 0) {
      sections.push(`Recent ratings: ${recentRatings.join(', ')}`);
    }

    // Dislikes
    if (userMemory.disliked_features.length > 0) {
      sections.push(`Avoids: ${userMemory.disliked_features.join(', ')}`);
    }

    // Communication style
    sections.push(`Prefers ${userMemory.language_tone_preference} responses`);

    // AI feedback summary
    if (userMemory.ai_feedback_summary) {
      sections.push(`Previous feedback: ${userMemory.ai_feedback_summary}`);
    }

    return `User Memory:\n${sections.join('\n')}`;
  }

  /**
   * Extract preferences from user interactions
   */
  static analyzeInteractions(interactions: UserInteraction[]): {
    favoriteCategories: string[];
    dislikedFeatures: string[];
    preferredLocations: string[];
  } {
    const favoriteCategories: string[] = [];
    const dislikedFeatures: string[] = [];
    const preferredLocations: string[] = [];

    // Analyze search queries for patterns
    const searchQueries = interactions
      .filter(i => i.interaction_type === 'search_query')
      .map(i => i.query?.toLowerCase() || '');

    // Extract common terms that might indicate preferences
    const commonTerms = this.extractCommonTerms(searchQueries);
    favoriteCategories.push(...commonTerms);

    // Analyze ratings to understand preferences
    const highRatedVenues = interactions
      .filter(i => i.interaction_type === 'venue_rating' && (i.rating || 0) >= 4)
      .map(i => i.metadata?.category || '')
      .filter(Boolean);

    favoriteCategories.push(...highRatedVenues);

    // Analyze negative feedback
    const negativeRatings = interactions
      .filter(i => i.interaction_type === 'venue_rating' && (i.rating || 0) <= 2)
      .map(i => i.metadata?.features || [])
      .flat();

    dislikedFeatures.push(...negativeRatings);

    return {
      favoriteCategories: [...new Set(favoriteCategories)],
      dislikedFeatures: [...new Set(dislikedFeatures)],
      preferredLocations: [...new Set(preferredLocations)]
    };
  }

  /**
   * Extract common terms from search queries
   */
  private static extractCommonTerms(queries: string[]): string[] {
    const termCounts: Record<string, number> = {};
    
    const excludeWords = ['the', 'and', 'or', 'in', 'at', 'on', 'for', 'with', 'near', 'best', 'good', 'great'];
    
    queries.forEach(query => {
      const words = query.split(/\s+/).filter(word => 
        word.length > 2 && !excludeWords.includes(word)
      );
      
      words.forEach(word => {
        termCounts[word] = (termCounts[word] || 0) + 1;
      });
    });

    // Return terms mentioned more than once
    return Object.entries(termCounts)
      .filter(([_, count]) => count > 1)
      .map(([term, _]) => term);
  }

  /**
   * Update AI feedback summary based on user interactions
   */
  static generateFeedbackSummary(
    interactions: UserInteraction[],
    currentSummary: string
  ): string {
    const recentFeedback = interactions
      .filter(i => i.interaction_type === 'recommendation_feedback')
      .slice(-5)
      .map(i => i.feedback)
      .filter(Boolean);

    if (recentFeedback.length === 0) return currentSummary;

    const newFeedback = recentFeedback.join('. ');
    
    if (!currentSummary) return newFeedback;

    // Combine with existing summary, keeping it concise
    const combined = `${currentSummary}. Recent: ${newFeedback}`;
    
    // Truncate if too long
    return combined.length > 500 ? combined.substring(0, 500) + '...' : combined;
  }
}
