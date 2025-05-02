
import { env } from '@/env';
import { pipeline, AutoTokenizer } from '@huggingface/transformers';

/**
 * Service for running AI models locally in the browser
 * Uses Hugging Face's Transformers.js to run models without API calls
 */
export class LocalAIService {
  private static instance: LocalAIService;
  private sentimentModel: any = null;
  private embeddingModel: any = null;
  private tokenizer: any = null;
  private isLoading: boolean = false;
  private modelLoadPromise: Promise<void> | null = null;

  private constructor() {
    // Private constructor for singleton pattern
  }

  static getInstance(): LocalAIService {
    if (!LocalAIService.instance) {
      LocalAIService.instance = new LocalAIService();
    }
    return LocalAIService.instance;
  }

  /**
   * Initialize and load the models
   * Models are loaded once and reused for all subsequent calls
   */
  async initModels(): Promise<void> {
    if (this.modelLoadPromise) {
      return this.modelLoadPromise;
    }

    this.isLoading = true;
    
    this.modelLoadPromise = new Promise<void>(async (resolve) => {
      try {
        console.log('Loading local AI models...');
        
        // Load sentiment analysis model (small and fast)
        this.sentimentModel = await pipeline(
          'sentiment-analysis',
          'Xenova/distilbert-base-uncased-finetuned-sst-2-english'
        );
        
        // Load embedding model for preference matching
        this.embeddingModel = await pipeline(
          'feature-extraction',
          'Xenova/all-MiniLM-L6-v2'
        );
        
        console.log('Local AI models loaded successfully');
        this.isLoading = false;
        resolve();
      } catch (error) {
        console.error('Error loading AI models:', error);
        this.isLoading = false;
        // We resolve anyway to prevent hanging, but log the error
        resolve();
      }
    });

    return this.modelLoadPromise;
  }

  /**
   * Analyzes the sentiment of text
   * @param text The text to analyze
   * @returns An object with sentiment score and label
   */
  async analyzeSentiment(text: string): Promise<{ label: string; score: number }> {
    try {
      if (!this.sentimentModel) {
        await this.initModels();
      }
      
      if (!this.sentimentModel) {
        return { label: 'NEUTRAL', score: 0.5 };
      }
      
      const result = await this.sentimentModel(text);
      return result[0];
    } catch (error) {
      console.error('Error analyzing sentiment:', error);
      return { label: 'NEUTRAL', score: 0.5 };
    }
  }

  /**
   * Create embeddings for text
   * @param text The text to create embeddings for
   * @returns A vector representation of the text
   */
  async createEmbedding(text: string): Promise<number[]> {
    try {
      if (!this.embeddingModel) {
        await this.initModels();
      }
      
      if (!this.embeddingModel) {
        return new Array(384).fill(0);
      }
      
      const result = await this.embeddingModel(text, { pooling: 'mean', normalize: true });
      return result.tolist()[0];
    } catch (error) {
      console.error('Error creating embedding:', error);
      return new Array(384).fill(0);
    }
  }

  /**
   * Calculate similarity between two texts
   * @param text1 First text
   * @param text2 Second text
   * @returns Similarity score between 0 and 1
   */
  async calculateTextSimilarity(text1: string, text2: string): Promise<number> {
    try {
      const embedding1 = await this.createEmbedding(text1);
      const embedding2 = await this.createEmbedding(text2);
      
      return this.cosineSimilarity(embedding1, embedding2);
    } catch (error) {
      console.error('Error calculating text similarity:', error);
      return 0;
    }
  }

  /**
   * Preload models for better user experience
   * Call this during app initialization
   */
  preloadModels(): void {
    // Load models in background without awaiting
    this.initModels().catch(err => 
      console.error('Error preloading models:', err)
    );
  }

  /**
   * Calculate cosine similarity between two vectors
   * @param a First vector
   * @param b Second vector
   * @returns Similarity score between 0 and 1
   */
  private cosineSimilarity(a: number[], b: number[]): number {
    if (!a || !b || a.length !== b.length) {
      return 0;
    }

    let dotProduct = 0;
    let normA = 0;
    let normB = 0;
    
    for (let i = 0; i < a.length; i++) {
      dotProduct += a[i] * b[i];
      normA += a[i] * a[i];
      normB += b[i] * b[i];
    }
    
    if (normA === 0 || normB === 0) {
      return 0;
    }
    
    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
  }
}

export const localAI = LocalAIService.getInstance();

// Preload models on module import for better UX
setTimeout(() => {
  localAI.preloadModels();
}, 3000); // Delay load to not block initial page render
