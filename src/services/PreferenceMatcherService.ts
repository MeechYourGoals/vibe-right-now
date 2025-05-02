
import { localAI } from "./LocalAIService";

type ContentItem = {
  id: string;
  name?: string;
  description?: string;
  tags?: string[];
  vibes?: string[];
  category?: string;
  type?: string;
  [key: string]: any;
};

export class PreferenceMatcherService {
  private static instance: PreferenceMatcherService;
  private cache: Map<string, number> = new Map();

  private constructor() {}

  static getInstance(): PreferenceMatcherService {
    if (!PreferenceMatcherService.instance) {
      PreferenceMatcherService.instance = new PreferenceMatcherService();
    }
    return PreferenceMatcherService.instance;
  }

  /**
   * Check if a content item matches user preferences
   * @param item Content item to check
   * @param preferences User preferences
   * @returns Score between 0 and 1 indicating match quality
   */
  async getPreferenceMatchScore(
    item: ContentItem,
    preferences: string[]
  ): Promise<number> {
    if (!preferences.length) return 0.5;

    // Create cache key
    const itemStr = JSON.stringify(item);
    const prefStr = JSON.stringify(preferences);
    const cacheKey = `${itemStr}-${prefStr}`;

    // Check cache
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }

    try {
      // Extract all text properties from the item
      const itemText = this.getItemText(item);
      
      // Join preferences into a single text
      const preferencesText = preferences.join(", ");
      
      // Calculate similarity using local AI
      const similarityScore = await localAI.calculateTextSimilarity(
        itemText,
        preferencesText
      );
      
      // Direct tag/vibe matching boost
      let directMatchBoost = 0;
      
      // Check for exact matches in tags/vibes
      if (item.tags || item.vibes) {
        const allTags = [...(item.tags || []), ...(item.vibes || [])];
        
        for (const pref of preferences) {
          if (allTags.some(tag => tag.toLowerCase() === pref.toLowerCase())) {
            directMatchBoost += 0.2; // 20% boost per direct match
          }
        }
      }
      
      // Combine semantic similarity with direct matches
      let finalScore = similarityScore + directMatchBoost;
      
      // Cap at 1.0
      finalScore = Math.min(finalScore, 1.0);
      
      // Store in cache
      this.cache.set(cacheKey, finalScore);
      
      return finalScore;
    } catch (error) {
      console.error('Error calculating preference match:', error);
      return 0.5; // Neutral score on error
    }
  }

  /**
   * Sort items by preference match score
   * @param items Array of content items
   * @param preferences User preferences
   * @returns Sorted items with highest match first
   */
  async sortByPreferenceMatch<T extends ContentItem>(
    items: T[],
    preferences: string[]
  ): Promise<T[]> {
    if (!preferences.length) return items;
    
    try {
      // Create array of items with scores
      const itemsWithScores = await Promise.all(
        items.map(async item => {
          const score = await this.getPreferenceMatchScore(item, preferences);
          return { item, score };
        })
      );
      
      // Sort by score (highest first)
      const sortedItems = itemsWithScores
        .sort((a, b) => b.score - a.score)
        .map(({ item }) => item);
      
      return sortedItems;
    } catch (error) {
      console.error('Error sorting items by preference:', error);
      return items; // Return original array on error
    }
  }

  /**
   * Filter items that match user preferences above a threshold
   * @param items Array of content items
   * @param preferences User preferences
   * @param threshold Minimum score (0-1) to include item
   * @returns Filtered items that match preferences
   */
  async filterByPreferenceMatch<T extends ContentItem>(
    items: T[],
    preferences: string[],
    threshold: number = 0.5
  ): Promise<T[]> {
    if (!preferences.length) return items;
    
    try {
      const filtered = [];
      
      for (const item of items) {
        const score = await this.getPreferenceMatchScore(item, preferences);
        if (score >= threshold) {
          filtered.push(item);
        }
      }
      
      return filtered;
    } catch (error) {
      console.error('Error filtering items by preference:', error);
      return items; // Return original array on error
    }
  }

  /**
   * Extract text representation of an item
   * @param item Content item
   * @returns Concatenated text representing the item
   */
  private getItemText(item: ContentItem): string {
    const textParts: string[] = [];
    
    if (item.name) textParts.push(item.name);
    if (item.description) textParts.push(item.description);
    if (item.category) textParts.push(item.category);
    if (item.type) textParts.push(item.type);
    
    // Add tags and vibes
    if (item.tags && item.tags.length) textParts.push(item.tags.join(" "));
    if (item.vibes && item.vibes.length) textParts.push(item.vibes.join(" "));
    
    return textParts.join(" ");
  }
}

export const preferenceMatcher = PreferenceMatcherService.getInstance();
