
// Vernon Chat specific types to avoid conflicts with global types
export interface VernonLocation {
  id: string;
  name: string;
  type: string;
  city: string;
  state: string;
}

export interface VernonAdFormat {
  id: string;
  name: string;
  description: string;
  type: string;
  duration?: number;
  platform?: string;
  dimensions?: string;
  kpis?: string[];
}

export interface VernonTargetingOptions {
  ageRange: { min: number; max: number };
  gender: VernonGenderTargeting;
  interests: string[];
  location: string;
  demographics?: any;
  behaviors?: any;
  contextual?: any;
  momentScore?: number;
}

export type VernonGenderTargeting = 'all' | 'male' | 'female' | 'other';

export interface VernonUser {
  id: string;
  name: string;
  username: string;
  avatar: string;
  verified: boolean;
}

export interface VernonComment {
  id: string;
  postId: string;
  user: VernonUser;
  content: string;
  timestamp: Date;
  vibedHere?: boolean;
}

export interface VernonVenueInsights {
  visitors: number;
  visitorsChange: number;
  posts: number;
  postsChange: number;
  likes: number;
  likesChange: number;
  mentions: number;
  mentionsChange: number;
  checkins: number;
  checkinsChange: number;
  reviews: number;
  reviewsChange: number;
  rating: number;
  ratingChange: number;
  visitorCount?: number;
  checkInCount?: number;
  receiptUploads?: number;
  discountRedemptions?: number;
}

export interface VernonSentimentTheme {
  theme: string;
  sentiment: number;
  frequency: number;
  name?: string;
  score?: number;
}

export interface VernonPlatformSentimentSummary {
  platform: string;
  sentiment: number;
  mentions: number;
  overallSentiment?: number;
  summary?: string;
  reviewCount?: number;
  themes?: VernonSentimentTheme[];
}
