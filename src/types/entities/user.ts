
export interface User {
  id: string;
  username: string;
  name: string;
  avatar: string;
  isPrivate: boolean;
  verified: boolean;
  bio?: string;
  isCelebrity?: boolean;
  createdAt: string;
  updatedAt: string;
  displayName?: string;
  posts?: number;
  email?: string;
  followers?: number;
  following?: number;
}

export interface UserProfile {
  id: string;
  username: string;
  name: string;
  avatar: string;
  bio?: string;
  isPrivate: boolean;
  verified: boolean;
  isCelebrity?: boolean;
  followers: number;
  following: number;
  posts: number;
  createdAt: string;
  updatedAt: string;
  email?: string;
  likes?: number;
}

// User Memory Types for AI Recommendations
export interface UserMemory {
  id: string;
  user_id: string;
  location_history: string[];
  venue_ratings: Record<string, number>;
  favorite_categories: string[];
  disliked_features: string[];
  booking_history: BookingEntry[];
  language_tone_preference: string;
  ai_feedback_summary: string;
  created_at: string;
  updated_at: string;
}

export interface BookingEntry {
  venue_id: string;
  venue_name: string;
  timestamp: string;
  rating?: number;
}

export interface UserInteraction {
  id: string;
  user_id: string;
  interaction_type: 'venue_view' | 'venue_rating' | 'search_query' | 'booking_attempt' | 'recommendation_feedback';
  venue_id?: string;
  query?: string;
  rating?: number;
  feedback?: string;
  metadata?: Record<string, any>;
  timestamp: string;
}

export interface RecommendationFeedback {
  id: string;
  user_id: string;
  recommendation_id: string;
  feedback_type: 'helpful' | 'not_helpful' | 'inaccurate' | 'perfect';
  feedback_text?: string;
  timestamp: string;
}

export interface UserVenueHistory {
  id: string;
  user_id: string;
  venue_id: string;
  venue_name: string;
  visit_count: number;
  last_visit: string;
  average_rating?: number;
  notes?: string;
}
