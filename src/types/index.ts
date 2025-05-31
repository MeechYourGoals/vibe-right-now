import { Database } from './supabase';

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface User {
  id: string;
  username: string;
  name: string;
  avatar: string;
  isVerified: boolean;
  bio: string;
  followers: number;
  following: number;
  posts: number;
  isPrivate: boolean;
  vibeTags: string[];
}

export interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  website: string;
  email: string;
  latitude: number;
  longitude: number;
  type: string;
  hours: any;
  price: string;
  rating: number;
  reviews: number;
  photos: string[];
  tags: string[];
  description: string;
  vibes: string[];
  amenities: string[];
  menu: string;
  events: string[];
  deals: string[];
  wait_time: number;
  is_open: boolean;
  is_popular: boolean;
  is_new: boolean;
  is_favorite: boolean;
  is_featured: boolean;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface Media {
  type: 'image' | 'video';
  url: string;
}

export interface Comment {
  id: string;
  user: User;
  content: string;
  timestamp: string;
  likes: number;
  replies: Comment[];
}

export interface Review {
  id: string;
  user: User;
  location: Location;
  rating: number;
  content: string;
  timestamp: string;
  likes: number;
  photos: string[];
}

export interface Event {
  id: string;
  location: Location;
  name: string;
  description: string;
  date: string;
  time: string;
  price: string;
  photos: string[];
  tags: string[];
  amenities: string[];
  deals: string[];
  is_popular: boolean;
  is_new: boolean;
  is_featured: boolean;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface Deal {
  id: string;
  location: Location;
  name: string;
  description: string;
  price: string;
  discount: string;
  photos: string[];
  tags: string[];
  amenities: string[];
  events: string[];
  is_popular: boolean;
  is_new: boolean;
  is_featured: boolean;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface Waitlist {
  id: string;
  location: Location;
  user: User;
  timestamp: string;
  party_size: number;
  is_confirmed: boolean;
  is_notified: boolean;
  is_cancelled: boolean;
  created_at: string;
  updated_at: string;
}

export interface Booking {
  id: string;
  location: Location;
  user: User;
  timestamp: string;
  party_size: number;
  is_confirmed: boolean;
  is_cancelled: boolean;
  created_at: string;
  updated_at: string;
}

export interface Notification {
  id: string;
  user: User;
  type: string;
  content: string;
  timestamp: string;
  is_read: boolean;
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: string;
  user: User;
  content: string;
  timestamp: string;
  is_read: boolean;
  created_at: string;
  updated_at: string;
}

export interface Chat {
  id: string;
  users: User[];
  messages: Message[];
  created_at: string;
  updated_at: string;
}

export interface PaymentMethod {
  id: string;
  user: User;
  type: string;
  card_number: string;
  expiry_date: string;
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

export interface Subscription {
  id: string;
  user: User;
  type: string;
  payment_method: PaymentMethod;
  start_date: string;
  end_date: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface LoyaltyProgram {
  id: string;
  location: Location;
  name: string;
  description: string;
  points_per_dollar: number;
  rewards: Reward[];
  created_at: string;
  updated_at: string;
}

export interface Reward {
  id: string;
  loyalty_program: LoyaltyProgram;
  name: string;
  description: string;
  points_required: number;
  created_at: string;
  updated_at: string;
}

export interface SupportTicket {
  id: string;
  user: User;
  subject: string;
  content: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  created_at: string;
  updated_at: string;
}

export interface Settings {
  id: string;
  user: User;
  notifications_enabled: boolean;
  location_enabled: boolean;
  theme: string;
  created_at: string;
  updated_at: string;
}

export interface CreditCard {
  id: string;
  type: 'visa' | 'mastercard' | 'amex' | 'discover';
  lastFour: string;
  expiryDate: string;
  expMonth: string;
  expYear: string;
  isDefault: boolean;
  maxSpendLimit?: number;
  vernonApproved?: boolean;
}

export interface Post {
  id: string;
  user: User;
  location: Location;
  content: string;
  media: Media[];
  timestamp: string;
  likes: number;
  saved?: boolean;
  shares?: number;
  vibeTags?: string[];
}

export type VenueSentimentAnalysis = Database['public']['Tables']['venue_sentiment_analysis']['Row'];
export type PlatformSentimentSummary = {
    platform: string;
    overallSentiment: string | null;
    summary: string | null;
    themes: SentimentTheme[];
    reviewCount: number | null;
    lastUpdated: string | null;
};
export type SentimentTheme = {
    name: string;
    score: number;
    mentions: number;
    examples: string[];
};
