
// Service for local AI processing using TensorFlow.js
// Used for small tasks that don't need to call external APIs

export const localAI = {
  /**
   * Initializes the local AI models
   */
  async init(): Promise<boolean> {
    try {
      // Simulated initialization - in a real app, we would load TensorFlow.js models here
      console.log('LocalAI service initialized');
      return true;
    } catch (error) {
      console.error('Error initializing LocalAI service:', error);
      return false;
    }
  },
  
  /**
   * Basic sentiment analysis without external API calls
   * Using a simple rule-based approach
   */
  async analyzeSentiment(text: string): Promise<{label: string, score: number}> {
    // Simple keyword-based sentiment analysis
    const positiveWords = ['good', 'great', 'excellent', 'awesome', 'love', 'like', 'happy', 'best', 'recommend', 'amazing', 'fantastic'];
    const negativeWords = ['bad', 'terrible', 'awful', 'hate', 'dislike', 'disappointed', 'worst', 'poor', 'horrible', 'avoid'];
    
    const words = text.toLowerCase().split(/\W+/);
    
    let positiveCount = 0;
    let negativeCount = 0;
    
    words.forEach(word => {
      if (positiveWords.includes(word)) positiveCount++;
      if (negativeWords.includes(word)) negativeCount++;
    });
    
    // Calculate sentiment score
    let score = 0.5; // Neutral by default
    if (positiveCount > 0 || negativeCount > 0) {
      score = positiveCount / (positiveCount + negativeCount);
    }
    
    // Determine sentiment label
    let label = 'neutral';
    if (score > 0.6) label = 'positive';
    if (score < 0.4) label = 'negative';
    
    return { label, score };
  },
  
  /**
   * Simple keyword extraction
   */
  async extractKeywords(text: string): Promise<string[]> {
    // Simple TF-IDF style keyword extraction
    const words = text.toLowerCase().split(/\W+/).filter(word => word.length > 3);
    
    // Count word frequencies
    const wordCounts: Record<string, number> = {};
    words.forEach(word => {
      wordCounts[word] = (wordCounts[word] || 0) + 1;
    });
    
    // Sort by frequency
    const keywords = Object.entries(wordCounts)
      .sort((a, b) => b[1] - a[1])
      .map(entry => entry[0])
      .slice(0, 5);
    
    return keywords;
  }
};
