
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
}

export const localAI = new LocalAIService();
