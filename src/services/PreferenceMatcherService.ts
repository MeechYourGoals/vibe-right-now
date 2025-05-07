
import { Location } from "@/types";
import { localAI } from "./LocalAIService";

class PreferenceMatcherService {
  /**
   * Sorts locations based on how well they match user preferences
   * @param locations Array of locations to sort
   * @param userPreferences Array of user preference strings
   * @returns Sorted array of locations
   */
  async sortByPreferenceMatch(locations: Location[], userPreferences: string[]): Promise<Location[]> {
    if (!userPreferences.length || !locations.length) {
      return locations;
    }

    try {
      // Create a single text representation of user preferences
      const userPreferencesText = userPreferences.join(", ");
      
      const scoredLocations = await Promise.all(
        locations.map(async (location) => {
          // Create a text representation of the location
          const locationText = [
            location.name,
            location.description || "",
            location.type || "",
            location.vibes?.join(", ") || "",
            location.tags?.join(", ") || ""
          ].join(" ");

          // Calculate similarity score based on text embedding comparison
          const similarityScore = await this.calculateSimilarityScore(
            locationText,
            userPreferencesText
          );

          return {
            location,
            score: similarityScore
          };
        })
      );

      // Sort locations by similarity score (descending)
      const sortedLocations = scoredLocations
        .sort((a, b) => b.score - a.score)
        .map(item => item.location);

      return sortedLocations;
    } catch (error) {
      console.error("Error in preference matching:", error);
      return locations; // Return original order if error occurs
    }
  }

  /**
   * Calculates similarity between two texts using embeddings
   */
  private async calculateSimilarityScore(text1: string, text2: string): Promise<number> {
    try {
      // Get embeddings for both texts
      const [embedding1, embedding2] = await Promise.all([
        localAI.getTextEmbedding(text1),
        localAI.getTextEmbedding(text2)
      ]);
      
      // Calculate cosine similarity
      return this.cosineSimilarity(embedding1, embedding2);
    } catch (error) {
      console.error("Error calculating similarity:", error);
      return 0.5; // Neutral score as fallback
    }
  }

  /**
   * Calculate cosine similarity between two vectors
   */
  private cosineSimilarity(vecA: number[], vecB: number[]): number {
    let dotProduct = 0;
    let normA = 0;
    let normB = 0;
    
    for (let i = 0; i < vecA.length; i++) {
      dotProduct += vecA[i] * vecB[i];
      normA += vecA[i] ** 2;
      normB += vecB[i] ** 2;
    }
    
    if (normA === 0 || normB === 0) {
      return 0; // Handle zero vectors
    }
    
    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
  }
}

export const preferenceMatcher = new PreferenceMatcherService();
