
import { localAI } from './LocalAIService';

export interface PreferenceMatcher {
  findBestMatches(input: string, count?: number): Promise<string[]>;
}

export class PreferenceMatcherService implements PreferenceMatcher {
  private userPreferences: UserPreference[] = [];
  private isInitialized = false;

  constructor() {
    this.loadPreferences();
  }

  private async loadPreferences(): Promise<void> {
    try {
      // Check if preferences exist in local storage
      const storedPreferences = localStorage.getItem('userPreferences');
      if (storedPreferences) {
        const prefs = JSON.parse(storedPreferences);
        this.userPreferences = [];

        // Process categories
        if (prefs.categories) {
          prefs.categories.forEach((cat: string) => {
            this.userPreferences.push({
              type: 'category',
              value: cat,
              weight: 0.7
            });
          });
        }

        // Process interests
        if (prefs.interests) {
          prefs.interests.forEach((interest: string) => {
            this.userPreferences.push({
              type: 'interest',
              value: interest,
              weight: 0.8
            });
          });
        }

        // Process vibes
        if (prefs.vibes) {
          prefs.vibes.forEach((vibe: string) => {
            this.userPreferences.push({
              type: 'vibe',
              value: vibe,
              weight: 1.0
            });
          });
        }
      }
      
      this.isInitialized = true;
    } catch (error) {
      console.error('Error loading preferences:', error);
      // Set dummy preferences for testing
      this.setDummyPreferences();
    }
  }

  private setDummyPreferences(): void {
    this.userPreferences = [
      { type: 'category', value: 'restaurants', weight: 0.7 },
      { type: 'category', value: 'bars', weight: 0.7 },
      { type: 'interest', value: 'live music', weight: 0.8 },
      { type: 'vibe', value: 'energetic', weight: 1.0 },
      { type: 'vibe', value: 'chill', weight: 0.9 }
    ];
    this.isInitialized = true;
  }

  async findBestMatches(input: string, count: number = 3): Promise<string[]> {
    if (!this.isInitialized) {
      await this.loadPreferences();
    }
    
    try {
      // Filter preferences that match the input
      const matchedPreferences: {pref: UserPreference, score: number}[] = [];
      
      // For each user preference, calculate similarity score with input
      for (const pref of this.userPreferences) {
        let similarity = 0;
        
        // Try to get embedding similarity if available
        try {
          const inputEmbedding = await localAI.getTextEmbedding(input);
          const prefEmbedding = await localAI.getTextEmbedding(pref.value);
          
          // Calculate cosine similarity between embeddings
          similarity = this.cosineSimilarity(inputEmbedding, prefEmbedding);
        } catch (error) {
          // If embeddings fail, fall back to text similarity
          similarity = localAI.calculateTextSimilarity(input, pref.value);
        }
        
        // Apply preference weight
        const weightedScore = similarity * pref.weight;
        
        // Only include if there's some similarity
        if (similarity > 0.1) {
          matchedPreferences.push({
            pref,
            score: weightedScore
          });
        }
      }
      
      // Sort by score descending
      matchedPreferences.sort((a, b) => b.score - a.score);
      
      // Return top matches
      return matchedPreferences
        .slice(0, count)
        .map(match => match.pref.value);
        
    } catch (error) {
      console.error('Error finding preference matches:', error);
      return [];
    }
  }
  
  // Helper method to calculate cosine similarity between vectors
  private cosineSimilarity(vec1: number[], vec2: number[]): number {
    if (vec1.length !== vec2.length) {
      throw new Error('Vectors must be of the same length');
    }
    
    let dotProduct = 0;
    let mag1 = 0;
    let mag2 = 0;
    
    for (let i = 0; i < vec1.length; i++) {
      dotProduct += vec1[i] * vec2[i];
      mag1 += vec1[i] * vec1[i];
      mag2 += vec2[i] * vec2[i];
    }
    
    mag1 = Math.sqrt(mag1);
    mag2 = Math.sqrt(mag2);
    
    if (mag1 === 0 || mag2 === 0) {
      return 0;
    }
    
    return dotProduct / (mag1 * mag2);
  }
}

interface UserPreference {
  type: 'category' | 'interest' | 'vibe';
  value: string;
  weight: number;
}

// Export a singleton instance
export const preferenceMatcherService = new PreferenceMatcherService();
