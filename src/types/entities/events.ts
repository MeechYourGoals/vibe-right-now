
import { BaseEntity, Address, MediaItem, Timestamps, EntityStatus } from '../core/base';
import { User } from './user';
import { Venue } from './venue';

// Event-related types
export interface Event extends BaseEntity, Timestamps {
  title: string;
  description: string;
  category: EventCategory;
  subcategory?: string;
  venue: Venue;
  organizer: EventOrganizer;
  schedule: EventSchedule;
  ticketing: EventTicketing;
  media: EventMedia;
  attendees: EventAttendance;
  promotion: EventPromotion;
  settings: EventSettings;
  status: EventStatus;
  tags: string[];
  vibes: string[];
}

export type EventCategory = 
  | 'music' 
  | 'comedy' 
  | 'sports' 
  | 'theater' 
  | 'festival' 
  | 'conference' 
  | 'workshop' 
  | 'nightlife' 
  | 'food' 
  | 'art' 
  | 'culture' 
  | 'other';

export interface EventOrganizer {
  type: 'user' | 'venue' | 'company';
  id: string;
  name: string;
  avatar?: MediaItem;
  contact: EventOrganizerContact;
  verified: boolean;
}

export interface EventOrganizerContact {
  email?: string;
  phone?: string;
  website?: string;
  socialMedia?: Record<string, string>;
}

export interface EventSchedule {
  startDate: Date;
  endDate: Date;
  timezone: string;
  duration?: number; // in minutes
  sessions?: EventSession[];
  isRecurring: boolean;
  recurrence?: EventRecurrence;
  doors?: Date;
  ageRestriction?: AgeRestriction;
}

export interface EventSession {
  id: string;
  title: string;
  description?: string;
  startTime: Date;
  endTime: Date;
  location?: string; // specific location within venue
  speakers?: EventSpeaker[];
  capacity?: number;
}

export interface EventSpeaker {
  id: string;
  name: string;
  title?: string;
  bio?: string;
  avatar?: MediaItem;
  socialMedia?: Record<string, string>;
}

export interface EventRecurrence {
  pattern: RecurrencePattern;
  interval: number;
  daysOfWeek?: number[];
  endDate?: Date;
  occurrences?: number;
  exceptions?: Date[];
}

export type RecurrencePattern = 'daily' | 'weekly' | 'monthly' | 'yearly';
export type AgeRestriction = 'all_ages' | '18+' | '21+' | 'custom';

export interface EventTicketing {
  isTicketed: boolean;
  isFree: boolean;
  tickets: TicketType[];
  salesStart?: Date;
  salesEnd?: Date;
  maxTicketsPerPerson?: number;
  refundPolicy?: string;
  terms?: string;
  provider?: TicketProvider;
}

export interface TicketType {
  id: string;
  name: string;
  description?: string;
  price: number;
  currency: string;
  quantity: number;
  sold: number;
  maxPerPerson?: number;
  salesStart?: Date;
  salesEnd?: Date;
  benefits?: string[];
  restrictions?: string[];
}

export interface TicketProvider {
  name: string;
  url?: string;
  apiKey?: string;
  configuration?: Record<string, any>;
}

export interface EventMedia {
  coverImage?: MediaItem;
  gallery: MediaItem[];
  videos: MediaItem[];
  livestream?: LivestreamInfo;
}

export interface LivestreamInfo {
  isLive: boolean;
  url?: string;
  platform?: string;
  viewerCount?: number;
  chatEnabled: boolean;
  recordingEnabled: boolean;
}

export interface EventAttendance {
  capacity?: number;
  registered: number;
  attending: number;
  interested: number;
  declined: number;
  waitlist: number;
  checkIns: number;
  attendees: EventAttendee[];
}

export interface EventAttendee {
  userId: string;
  status: AttendeeStatus;
  registeredAt: Date;
  checkedInAt?: Date;
  ticketId?: string;
  metadata?: Record<string, any>;
}

export type AttendeeStatus = 
  | 'registered' 
  | 'attending' 
  | 'interested' 
  | 'declined' 
  | 'waitlist' 
  | 'checked_in' 
  | 'no_show';

export interface EventPromotion {
  featured: boolean;
  featuredUntil?: Date;
  promoted: boolean;
  promotionBudget?: number;
  discounts: EventDiscount[];
  affiliates: EventAffiliate[];
  socialMedia: EventSocialPromotion;
}

export interface EventDiscount {
  id: string;
  code: string;
  type: 'percentage' | 'fixed' | 'bogo';
  value: number;
  maxUses?: number;
  used: number;
  validFrom: Date;
  validTo: Date;
  applicableTickets: string[];
  description?: string;
}

export interface EventAffiliate {
  id: string;
  name: string;
  commissionRate: number;
  trackingCode: string;
  sales: number;
  earnings: number;
  status: 'active' | 'inactive' | 'suspended';
}

export interface EventSocialPromotion {
  autoPost: boolean;
  platforms: string[];
  hashtags: string[];
  mentions: string[];
  scheduledPosts: ScheduledPost[];
}

export interface ScheduledPost {
  id: string;
  platform: string;
  content: string;
  media?: MediaItem[];
  scheduledFor: Date;
  posted: boolean;
  postedAt?: Date;
}

export interface EventSettings {
  visibility: EventVisibility;
  registration: RegistrationSettings;
  communication: CommunicationSettings;
  analytics: EventAnalyticsSettings;
}

export type EventVisibility = 'public' | 'private' | 'invite_only' | 'unlisted';

export interface RegistrationSettings {
  requireApproval: boolean;
  allowWaitlist: boolean;
  collectCustomFields: boolean;
  customFields: RegistrationField[];
  confirmationEmail: boolean;
  reminderEmails: boolean;
}

export interface RegistrationField {
  id: string;
  name: string;
  type: 'text' | 'email' | 'phone' | 'select' | 'checkbox' | 'textarea';
  required: boolean;
  options?: string[];
  placeholder?: string;
}

export interface CommunicationSettings {
  enableChat: boolean;
  allowQuestions: boolean;
  moderateQuestions: boolean;
  enableUpdates: boolean;
  allowFeedback: boolean;
}

export interface EventAnalyticsSettings {
  trackAttendance: boolean;
  trackEngagement: boolean;
  shareWithPartners: boolean;
  generateReports: boolean;
}

export type EventStatus = 
  | 'draft' 
  | 'published' 
  | 'live' 
  | 'completed' 
  | 'cancelled' 
  | 'postponed' 
  | 'sold_out';
