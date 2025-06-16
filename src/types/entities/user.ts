import { BaseEntity, UserProfile as BaseUserProfile, GeoCoordinates, Address, Timestamps } from '../core/base';

// Re-export UserProfile from base
export type { UserProfile } from '../core/base';

// User-related types
export interface User extends BaseEntity, BaseUserProfile, Timestamps {
  email: string;
  phone?: string;
  subscription: UserSubscription;
  preferences: UserPreferences;
  stats: UserStats;
  socialLinks?: SocialLinks;
  location?: UserLocation;
}

export interface UserSubscription {
  tier: SubscriptionTier;
  isActive: boolean;
  expiresAt?: Date;
  features: SubscriptionFeatures;
  billing?: BillingInfo;
}

export type SubscriptionTier = 'free' | 'plus' | 'premium' | 'pro';

export interface SubscriptionFeatures {
  basicExploration: boolean;
  savePreferences: boolean;
  groupTrips: boolean;
  aiRecommendations: boolean;
  externalReviewsAISummaries: boolean;
  venueMessaging: boolean;
  periodicBonusPoints: boolean;
  vibeWithMe: boolean;
  linkTicketingTransportation: boolean;
  basicVernonChat: boolean;
  vernonConcierge: boolean;
  enhancedVernonChat: boolean;
  vernonAgenticBooking: boolean;
  influencerMarketplace: boolean;
  earlyAccessARXR: boolean;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  language: string;
  notifications: NotificationPreferences;
  privacy: PrivacySettings;
  content: ContentPreferences;
}

export interface NotificationPreferences {
  email: boolean;
  push: boolean;
  sms: boolean;
  marketing: boolean;
  updates: boolean;
}

export interface PrivacySettings {
  profileVisibility: 'public' | 'private' | 'friends';
  showLocation: boolean;
  showActivity: boolean;
  allowMessaging: boolean;
}

export interface ContentPreferences {
  categories: string[];
  vibes: string[];
  priceRange: [number, number];
  distance: number;
  autoFilter: boolean;
}

export interface UserStats {
  points: number;
  level: number;
  checkIns: number;
  posts: number;
  followers: number;
  following: number;
  vibesShared: number;
  placesVisited: number;
}

export interface SocialLinks {
  instagram?: string;
  twitter?: string;
  tiktok?: string;
  linkedin?: string;
  website?: string;
}

export interface UserLocation {
  current?: GeoCoordinates;
  home?: Address;
  timezone: string;
}

export interface BillingInfo {
  customerId: string;
  subscriptionId: string;
  paymentMethod?: PaymentMethod;
  nextBilling?: Date;
  cancelAtPeriodEnd: boolean;
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal' | 'apple_pay' | 'google_pay';
  last4?: string;
  brand?: string;
  expiryMonth?: number;
  expiryYear?: number;
  isDefault: boolean;
}
