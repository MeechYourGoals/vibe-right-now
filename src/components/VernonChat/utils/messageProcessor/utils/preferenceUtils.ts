
import { localAI } from '@/services/LocalAIService';
import { preferenceMatcher } from '@/services/PreferenceMatcherService';

/**
 * Utility functions for handling user preferences in chat
 */
export const preferenceUtils = {
  /**
   * Get user preferences from local storage
   * @returns Array of user preferences as strings
   */
  getUserPreferences(): string[] {
    try {
      const savedPrefs = localStorage.getItem('userPreferences');
      if (savedPrefs) {
        const prefs = JSON.parse(savedPrefs);
        return [
          ...(prefs.vibes || []),
          ...(prefs.categories || []),
          ...(prefs.interests || [])
        ];
      }
    } catch (error) {
      console.error('Error loading user preferences:', error);
    }
    return [];
  },

  /**
   * Analyze sentiment of a query text
   * @param text Query text to analyze
   * @returns Sentiment label and score or null if analysis fails
   */
  async getSentiment(text: string): Promise<{ label: string; score: number } | null> {
    try {
      return await localAI.analyzeSentiment(text);
    } catch (error) {
      console.error('Error analyzing sentiment:', error);
      return null;
    }
  },

  /**
   * Check if a query matches user preferences
   * @param query Query text
   * @returns Boolean indicating if query aligns with user preferences
   */
  async isQueryRelevantToPreferences(query: string): Promise<boolean> {
    try {
      const preferences = this.getUserPreferences();
      if (!preferences.length) return false;

      const preferencesText = preferences.join(", ");
      const similarity = await localAI.calculateTextSimilarity(query, preferencesText);
      
      return similarity > 0.35; // Threshold for considering it relevant
    } catch (error) {
      console.error('Error checking query relevance:', error);
      return false;
    }
  },

  /**
   * Enhance content by sorting items based on user preferences
   * @param items Array of content items
   * @returns Sorted array with preference-matching items first
   */
  async enhanceContent(items: any[]): Promise<any[]> {
    try {
      const preferences = this.getUserPreferences();
      if (!preferences.length) return items;

      return await preferenceMatcher.sortByPreferenceMatch(items, preferences);
    } catch (error) {
      console.error('Error enhancing content with preferences:', error);
      return items;
    }
  }
};
