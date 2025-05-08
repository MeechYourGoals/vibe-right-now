
import { Location } from '@/types';
import { LocalAIService } from '@/services/LocalAIService';

/**
 * Service for matching user preferences with venues
 */
export const PreferenceMatcherService = {
  /**
   * Calculate preference match score between user preferences and venue
   * @param venue The venue to evaluate
   * @param userPreferences Array of user preference strings
   * @returns A score from 0-1 representing match quality
   */
  calculateMatchScore: async (venue: Location, userPreferences: string[]): Promise<number> => {
    if (!venue || !userPreferences || userPreferences.length === 0) {
      return 0;
    }
    
    // Create a venue description to match against
    const venueDescription = `${venue.name} ${venue.type} ${venue.city} ${venue.geminiSummary || ''}`;
    
    // Calculate individual preference scores and average them
    let totalScore = 0;
    
    for (const preference of userPreferences) {
      // Basic text match
      const basicMatch = venueDescription.toLowerCase().includes(preference.toLowerCase());
      if (basicMatch) {
        totalScore += 0.7; // Strong direct match
        continue;
      }
      
      // Calculate text similarity for more nuanced matching
      try {
        const similarity = LocalAIService.calculateTextSimilarity(venueDescription, preference);
        totalScore += similarity;
      } catch (error) {
        console.error('Error calculating text similarity:', error);
      }
    }
    
    // Average the scores and cap at 1.0
    const averageScore = userPreferences.length > 0 
      ? Math.min(totalScore / userPreferences.length, 1.0)
      : 0;
      
    return averageScore;
  },
  
  /**
   * Sort venues based on how well they match user preferences
   * @param venues Array of venues to sort
   * @param userPreferences Array of user preference strings
   * @returns Sorted array of venues with match scores
   */
  sortVenuesByPreference: async (
    venues: Location[],
    userPreferences: string[]
  ): Promise<{venue: Location; score: number}[]> => {
    if (!venues || venues.length === 0 || !userPreferences || userPreferences.length === 0) {
      return venues.map(venue => ({ venue, score: 0 }));
    }
    
    const venuesWithScores = await Promise.all(
      venues.map(async (venue) => {
        const score = await PreferenceMatcherService.calculateMatchScore(venue, userPreferences);
        return { venue, score };
      })
    );
    
    // Sort by score descending (highest matches first)
    return venuesWithScores.sort((a, b) => b.score - a.score);
  }
};

export default PreferenceMatcherService;
