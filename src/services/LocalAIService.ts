
// Simple AI service for local processing
export const LocalAIService = {
  init: async (): Promise<boolean> => {
    console.log('Initializing local AI service');
    return true;
  },

  initModels: async (): Promise<boolean> => {
    console.log('Initializing AI models');
    return true;
  },

  analyzeSentiment: async (text: string): Promise<{ label: string; score: number }> => {
    // Simple sentiment analysis
    const positive = text.match(/good|great|excellent|happy|love|like|enjoy/gi);
    const negative = text.match(/bad|terrible|awful|sad|hate|dislike|poor/gi);
    
    const positiveScore = positive ? positive.length : 0;
    const negativeScore = negative ? negative.length : 0;
    
    if (positiveScore > negativeScore) {
      return { label: 'positive', score: 0.5 + (positiveScore - negativeScore) * 0.1 };
    } else if (negativeScore > positiveScore) {
      return { label: 'negative', score: 0.5 - (negativeScore - positiveScore) * 0.1 };
    } else {
      return { label: 'neutral', score: 0.5 };
    }
  },
  
  extractKeywords: async (text: string): Promise<string[]> => {
    // Simple keyword extraction
    const words = text.toLowerCase().split(/\W+/);
    const stopWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'with', 'by'];
    const keywords = words.filter(word => word.length > 3 && !stopWords.includes(word));
    return [...new Set(keywords)].slice(0, 5); // Return up to 5 unique keywords
  },
  
  calculateTextSimilarity: (text1: string, text2: string): number => {
    // Simple Jaccard similarity
    const set1 = new Set(text1.toLowerCase().split(/\W+/).filter(w => w.length > 2));
    const set2 = new Set(text2.toLowerCase().split(/\W+/).filter(w => w.length > 2));
    
    const intersection = new Set([...set1].filter(x => set2.has(x)));
    const union = new Set([...set1, ...set2]);
    
    return intersection.size / union.size;
  },
  
  // Simple mock text embedding function
  getTextEmbedding: async (text: string): Promise<number[]> => {
    // Mock implementation that returns a simplified vector
    const hash = text.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    // Generate a simple mock embedding vector of 10 dimensions
    return Array(10).fill(0).map((_, i) => Math.sin(hash * (i + 1)) * 0.5 + 0.5);
  }
};

// Export LocalAIService as 'localAI' for backward compatibility
export const localAI = LocalAIService;

export default LocalAIService;
