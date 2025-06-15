
import { BaseEntity, Address, MediaItem, Timestamps, EntityStatus } from '../core/base';
import { UserProfile } from './user';

// Venue-related types
export interface Venue extends BaseEntity, Timestamps {
  name: string;
  description?: string;
  category: VenueCategory;
  subcategory?: string;
  address: Address;
  contact: VenueContact;
  hours: BusinessHours;
  amenities: VenueAmenities;
  pricing: VenuePricing;
  media: VenueMedia;
  verification: VenueVerification;
  stats: VenueStats;
  settings: VenueSettings;
  status: EntityStatus;
  tags: string[];
  vibes: string[];
}

export type VenueCategory = 
  | 'restaurant' 
  | 'bar' 
  | 'nightclub' 
  | 'cafe' 
  | 'event' 
  | 'attraction' 
  | 'sports' 
  | 'entertainment'
  | 'shopping'
  | 'hotel'
  | 'other';

export interface VenueContact {
  phone?: string;
  email?: string;
  website?: string;
  socialMedia?: VenueSocialMedia;
}

export interface VenueSocialMedia {
  instagram?: string;
  facebook?: string;
  twitter?: string;
  tiktok?: string;
  yelp?: string;
  google?: string;
}

export interface BusinessHours {
  monday: DayHours;
  tuesday: DayHours;
  wednesday: DayHours;
  thursday: DayHours;
  friday: DayHours;
  saturday: DayHours;
  sunday: DayHours;
  timezone: string;
  specialHours?: SpecialHours[];
}

export interface DayHours {
  isOpen: boolean;
  openTime?: string; // HH:mm format
  closeTime?: string; // HH:mm format
  is24Hours?: boolean;
  breaks?: TimeSlot[];
}

export interface TimeSlot {
  startTime: string;
  endTime: string;
}

export interface SpecialHours {
  date: Date;
  hours: DayHours;
  reason?: string;
}

export interface VenueAmenities {
  wifi: boolean;
  parking: boolean;
  accessibility: boolean;
  petFriendly: boolean;
  reservations: boolean;
  delivery: boolean;
  takeout: boolean;
  outdoorSeating: boolean;
  liveMusic: boolean;
  wheelchairAccessible: boolean;
  customAmenities: string[];
}

export interface VenuePricing {
  priceLevel: 1 | 2 | 3 | 4; // $ to $$$$
  averageSpend?: number;
  currency: string;
  acceptedPayments: PaymentType[];
}

export type PaymentType = 'cash' | 'card' | 'apple_pay' | 'google_pay' | 'crypto';

export interface VenueMedia {
  logo?: MediaItem;
  coverImage?: MediaItem;
  gallery: MediaItem[];
  videos: MediaItem[];
  virtualTour?: string;
}

export interface VenueVerification {
  isVerified: boolean;
  verifiedAt?: Date;
  verifiedBy?: string;
  claimedBy?: UserProfile;
  claimedAt?: Date;
  documents?: string[];
}

export interface VenueStats {
  rating: number;
  reviewCount: number;
  checkInCount: number;
  followerCount: number;
  postCount: number;
  vibeScore: number;
  popularTimes: PopularTimes[];
  waitTime?: number;
  crowdLevel?: CrowdLevel;
}

export interface PopularTimes {
  dayOfWeek: number; // 0-6 (Sunday-Saturday)
  hours: number[]; // Array of 24 numbers (0-100) representing popularity
}

export type CrowdLevel = 'empty' | 'quiet' | 'moderate' | 'busy' | 'packed';

export interface VenueSettings {
  messaging: VenueMessagingSettings;
  notifications: VenueNotificationSettings;
  social: VenueSocialSettings;
  analytics: VenueAnalyticsSettings;
}

export interface VenueMessagingSettings {
  enabled: boolean;
  autoReply: boolean;
  autoReplyMessage?: string;
  businessHoursOnly: boolean;
  allowAttachments: boolean;
}

export interface VenueNotificationSettings {
  newMessages: boolean;
  newFollowers: boolean;
  newReviews: boolean;
  mentions: boolean;
  checkIns: boolean;
}

export interface VenueSocialSettings {
  autoPost: boolean;
  platforms: string[];
  hashtagStrategy: string[];
  contentTypes: string[];
}

export interface VenueAnalyticsSettings {
  trackVisitors: boolean;
  trackEngagement: boolean;
  shareWithPartners: boolean;
  dataRetention: number; // days
}
