
// Artisan Coffee House Sentiment Analysis Service
// This provides realistic coffee shop sentiment analysis data for demonstration.
// In a production environment, you would integrate with sentiment analysis APIs
// like Google Cloud Natural Language API, Azure Cognitive Services, etc.

import { SentimentAnalysisResult, SentimentTheme, VenueSentimentAnalysis, PlatformSentimentSummary } from '@/types';

// Coffee shop specific themes and realistic data
const COFFEE_SHOP_THEMES: SentimentTheme[] = [
  {
    name: 'Coffee Quality',
    theme: 'Coffee Quality',
    sentiment: 'positive',
    confidence: 0.92,
    mentions: 143,
    keywords: ['coffee', 'espresso', 'latte', 'quality', 'beans', 'roast'],
    examples: [
      'Best espresso in town, perfectly balanced with rich crema',
      'Their single-origin coffee is exceptional, you can taste the difference'
    ],
    score: 0.85,
  },
  {
    name: 'Atmosphere & Ambiance',
    theme: 'Atmosphere & Ambiance',
    sentiment: 'positive',
    confidence: 0.88,
    mentions: 97,
    keywords: ['cozy', 'atmosphere', 'music', 'lighting', 'comfortable', 'vibe'],
    examples: [
      'Perfect spot for studying, quiet and comfortable seating',
      'Love the rustic decor and soft jazz music in the background'
    ],
    score: 0.78,
  },
  {
    name: 'Service Speed',
    theme: 'Service Speed',
    sentiment: 'neutral',
    confidence: 0.76,
    mentions: 67,
    keywords: ['wait', 'service', 'fast', 'slow', 'queue', 'staff'],
    examples: [
      'Service can be slow during morning rush, but staff is friendly',
      'Quick service even when busy, well-organized team'
    ],
    score: 0.12,
  },
  {
    name: 'Wi-Fi & Study Space',
    theme: 'Wi-Fi & Study Space',
    sentiment: 'positive',
    confidence: 0.91,
    mentions: 89,
    keywords: ['wifi', 'study', 'laptop', 'quiet', 'tables', 'power outlets'],
    examples: [
      'Great for remote work, strong Wi-Fi and plenty of outlets',
      'Perfect study environment, not too crowded during weekdays'
    ],
    score: 0.82,
  },
  {
    name: 'Pricing',
    theme: 'Pricing',
    sentiment: 'neutral',
    confidence: 0.73,
    mentions: 54,
    keywords: ['price', 'expensive', 'value', 'cost', 'affordable', 'worth'],
    examples: [
      'A bit pricey but the quality justifies the cost',
      'Reasonable prices for artisan coffee, good value overall'
    ],
    score: 0.23,
  }
];

// Realistic platform summaries for coffee shop
const PLATFORM_SUMMARIES: PlatformSentimentSummary[] = [
  {
    platform: 'google',
    totalReviews: 247,
    reviewCount: 247,
    averageSentiment: 0.72,
    overallSentiment: 0.72,
    summary: 'Customers consistently praise the high-quality coffee and cozy atmosphere. The artisan approach to coffee making and comfortable study environment are frequently highlighted. Some mention slower service during peak hours.',
    sentimentDistribution: {
      positive: 0.68,
      negative: 0.12,
      neutral: 0.20,
    },
    themes: COFFEE_SHOP_THEMES,
    lastUpdated: new Date(),
    trends: [
      { period: 'Past Week', change: 0.05 },
      { period: 'Past Month', change: 0.12 }
    ],
  },
  {
    platform: 'yelp',
    totalReviews: 156,
    reviewCount: 156,
    averageSentiment: 0.68,
    overallSentiment: 0.68,
    summary: 'Yelp reviewers appreciate the authentic coffee experience and knowledgeable baristas. The locally-sourced beans and commitment to quality brewing methods receive positive feedback. Pricing concerns are occasionally mentioned.',
    sentimentDistribution: {
      positive: 0.64,
      negative: 0.18,
      neutral: 0.18,
    },
    themes: COFFEE_SHOP_THEMES.map(theme => ({
      ...theme,
      score: theme.score * 0.95 // Slightly lower scores on Yelp
    })),
    lastUpdated: new Date(),
    trends: [
      { period: 'Past Week', change: 0.02 },
      { period: 'Past Month', change: 0.08 }
    ],
  },
  {
    platform: 'facebook',
    totalReviews: 89,
    reviewCount: 89,
    averageSentiment: 0.75,
    overallSentiment: 0.75,
    summary: 'Facebook reviews highlight the community feel and regular customer loyalty. The friendly staff and consistent quality are frequently praised. Study-friendly environment and Wi-Fi quality receive positive mentions.',
    sentimentDistribution: {
      positive: 0.71,
      negative: 0.09,
      neutral: 0.20,
    },
    themes: COFFEE_SHOP_THEMES.map(theme => ({
      ...theme,
      score: theme.score * 1.03 // Slightly higher scores on Facebook
    })),
    lastUpdated: new Date(),
    trends: [
      { period: 'Past Week', change: 0.08 },
      { period: 'Past Month', change: 0.15 }
    ],
  }
];

// Mock function to analyze sentiment of a text
export const analyzeSentiment = async (text: string): Promise<SentimentAnalysisResult> => {
  // Simulate sentiment analysis for coffee shop context
  const score = Math.random() * 1.5 - 0.25; // Bias toward positive for coffee shop
  const magnitude = Math.random() * 0.8 + 0.2;

  return {
    score,
    magnitude,
    themes: COFFEE_SHOP_THEMES.slice(0, 3),
    summary: `Coffee shop sentiment analysis shows ${score > 0.3 ? 'positive' : score < -0.3 ? 'negative' : 'neutral'} customer feedback with focus on coffee quality and atmosphere.`,
  };
};

// Mock function to analyze sentiment for a venue
export const analyzeVenueSentiment = async (venueId: string, venueName: string = 'Artisan Coffee House'): Promise<VenueSentimentAnalysis> => {
  const overallSentiment = 0.71; // Positive sentiment for coffee shop
  const totalReviews = 492; // Total across all platforms

  // Generate sentiment trend data (coffee shops typically have consistent positive trends)
  const sentimentTrend = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return {
      date,
      sentiment: 0.65 + (Math.random() * 0.2 - 0.1), // Fluctuate around positive sentiment
    };
  }).reverse();

  return {
    venueId,
    venueName,
    overallSentiment,
    totalReviews,
    platformSummaries: PLATFORM_SUMMARIES,
    topThemes: COFFEE_SHOP_THEMES,
    sentimentTrend,
    lastAnalyzed: new Date(),
    recommendations: [
      'Consider expanding seating during peak morning hours to reduce wait times',
      'Highlight your Wi-Fi and study-friendly environment in marketing to attract remote workers',
      'Feature customer testimonials about coffee quality in social media posts',
      'Consider loyalty program to reward frequent customers who praise your consistency'
    ],
  };
};

// Mock function to analyze sentiment of multiple texts
export const analyzeBatchSentiment = async (texts: string[]): Promise<SentimentAnalysisResult[]> => {
  try {
    return texts.map(text => ({
      score: Math.random() * 1.5 - 0.25, // Coffee shop bias
      magnitude: Math.random() * 0.8 + 0.2,
      themes: COFFEE_SHOP_THEMES.slice(0, 2),
      summary: `Analysis for coffee shop review: ${text.substring(0, 50)}...`
    }));
  } catch (error) {
    console.error('Error in batch sentiment analysis:', error);
    throw error;
  }
};

// Mock function to extract themes from a text
export const extractThemes = async (text: string): Promise<SentimentTheme[]> => {
  return COFFEE_SHOP_THEMES.slice(0, 3);
};

// Service class that components expect
export const SentimentAnalysisService = {
  getPlatformSentimentSummaries: async (venueId: string, venueName?: string): Promise<PlatformSentimentSummary[]> => {
    const analysis = await analyzeVenueSentiment(venueId, venueName);
    return analysis.platformSummaries;
  },
  
  getVenueSentimentAnalysis: async (venueId: string, venueName?: string): Promise<VenueSentimentAnalysis> => {
    return analyzeVenueSentiment(venueId, venueName);
  },
  
  triggerMockAnalysis: async (venueId: string): Promise<void> => {
    console.log(`Triggering sentiment analysis for venue ${venueId}`);
    return Promise.resolve();
  }
};
