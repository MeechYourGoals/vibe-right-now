
import * as transformers from "@huggingface/transformers";
import { ENV } from "@/env";

class LocalAIService {
  private sentimentModel: any = null;
  private featureExtractionModel: any = null;
  private initialized: boolean = false;
  private modelLoadPromise: Promise<void> | null = null;

  constructor() {
    this.initialized = false;
  }

  async initModels(): Promise<void> {
    if (this.initialized) {
      return;
    }

    if (this.modelLoadPromise) {
      return this.modelLoadPromise;
    }

    this.modelLoadPromise = this.loadModels();
    return this.modelLoadPromise;
  }

  private async loadModels(): Promise<void> {
    try {
      console.log("Loading local AI models...");
      
      // Load sentiment analysis model for vibe matching
      this.sentimentModel = await transformers.pipeline(
        "sentiment-analysis",
        "Xenova/distilbert-base-uncased-finetuned-sst-2-english"
      );
      
      // Load feature extraction model for embeddings and preference matching
      this.featureExtractionModel = await transformers.pipeline(
        "feature-extraction",
        "Xenova/all-MiniLM-L6-v2"
      );

      console.log("Local AI models loaded successfully");
      this.initialized = true;
    } catch (error) {
      console.error("Error loading models:", error);
      throw new Error("Failed to initialize AI models");
    }
  }

  async analyzeSentiment(text: string): Promise<{label: string, score: number}> {
    await this.initModels();
    try {
      const result = await this.sentimentModel(text);
      return result[0]; // Returns { label: 'POSITIVE/NEGATIVE', score: 0.xxx }
    } catch (error) {
      console.error("Error in sentiment analysis:", error);
      return { label: "NEUTRAL", score: 0.5 };
    }
  }

  async getTextEmbedding(text: string): Promise<number[]> {
    await this.initModels();
    try {
      const result = await this.featureExtractionModel(text, { pooling: "mean", normalize: true });
      return Array.from(result.data);
    } catch (error) {
      console.error("Error getting text embedding:", error);
      return new Array(384).fill(0); // Return zero vector as fallback
    }
  }

  // Add the missing calculateTextSimilarity method
  async calculateTextSimilarity(text1: string, text2: string): Promise<number> {
    try {
      const embedding1 = await this.getTextEmbedding(text1);
      const embedding2 = await this.getTextEmbedding(text2);
      
      // Calculate cosine similarity between the embeddings
      return this.cosineSimilarity(embedding1, embedding2);
    } catch (error) {
      console.error("Error calculating text similarity:", error);
      return 0.5; // Return neutral score as fallback
    }
  }
  
  // Helper function to calculate cosine similarity
  private cosineSimilarity(a: number[], b: number[]): number {
    let dotProduct = 0;
    let normA = 0;
    let normB = 0;
    
    for (let i = 0; i < a.length; i++) {
      dotProduct += a[i] * b[i];
      normA += a[i] ** 2;
      normB += b[i] ** 2;
    }
    
    if (normA === 0 || normB === 0) {
      return 0;
    }
    
    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
  }
}

export const localAI = new LocalAIService();
