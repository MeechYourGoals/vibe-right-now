
import { BaseEntity, Timestamps, GeoCoordinates, Address, MediaItem } from '../core/base';
import { UserProfile } from './user';

export type EventCategory = 'concert' | 'sports' | 'theater' | 'conference' | 'social' | 'cultural' | 'educational' | 'other';

export interface Event extends BaseEntity, Timestamps {
  title: string;
  description?: string;
  category: EventCategory;
  type: EventType;
  status: EventStatus;
  venueId?: string;
  location: EventLocation;
  startTime: Date;
  endTime: Date;
  pricing: EventPricing;
  media: EventMedia;
  participants: EventParticipant[];
  maxCapacity?: number;
  currentCapacity: number;
  tags: string[];
  promotions: EventPromotion[];
  series?: EventSeries;
  analytics: EventAnalytics;
  organizer: UserProfile;
  feedback: EventFeedback[];
  notifications: EventNotification[];
}

export interface EventType {
  id: string;
  name: string;
  category: EventCategory;
  defaultDuration: number; // minutes
  requiresTickets: boolean;
}

export type EventStatus = 'draft' | 'published' | 'active' | 'completed' | 'cancelled' | 'postponed';

export interface EventParticipant {
  id: string;
  userId: string;
  eventId: string;
  role: ParticipantRole;
  status: ParticipantStatus;
  registeredAt: Date;
  ticketId?: string;
  metadata?: ParticipantMetadata;
}

export type ParticipantRole = 'organizer' | 'performer' | 'staff' | 'attendee' | 'vip';
export type ParticipantStatus = 'registered' | 'confirmed' | 'attended' | 'no_show' | 'cancelled';

export interface ParticipantMetadata {
  dietary?: string[];
  accessibility?: string[];
  preferences?: Record<string, any>;
}

export interface EventLocation {
  venue?: {
    id: string;
    name: string;
  };
  address: Address;
  coordinates: GeoCoordinates;
  room?: string;
  capacity?: number;
  layout?: string;
}

export interface EventPricing {
  currency: string;
  tiers: TicketTier[];
  fees: PricingFee[];
  discounts: PricingDiscount[];
  refundPolicy: RefundPolicy;
}

export interface TicketTier {
  id: string;
  name: string;
  description?: string;
  price: number;
  quantity: number;
  sold: number;
  benefits: string[];
  saleStart?: Date;
  saleEnd?: Date;
}

export type TicketType = 'general' | 'vip' | 'early_bird' | 'group' | 'student' | 'senior';

export interface PricingFee {
  name: string;
  type: 'fixed' | 'percentage';
  amount: number;
  description?: string;
}

export interface PricingDiscount {
  code: string;
  type: 'fixed' | 'percentage';
  amount: number;
  minQuantity?: number;
  maxUses?: number;
  validFrom?: Date;
  validTo?: Date;
}

export interface RefundPolicy {
  allowed: boolean;
  cutoffHours: number;
  feePercentage: number;
  conditions: string[];
}

export interface EventMedia {
  coverImage?: MediaItem;
  gallery: MediaItem[];
  videos: MediaItem[];
  livestream?: LivestreamInfo;
}

export interface LivestreamInfo {
  url: string;
  platform: string;
  isActive: boolean;
  viewerCount?: number;
}

export interface EventPromotion {
  id: string;
  type: PromotionType;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  conditions: PromotionCondition[];
  usage: PromotionUsage;
  isActive: boolean;
}

export type PromotionType = 'discount' | 'bundle' | 'early_bird' | 'group' | 'referral';

export interface PromotionCondition {
  field: string;
  operator: string;
  value: any;
}

export interface PromotionUsage {
  maxUses?: number;
  currentUses: number;
  maxPerUser?: number;
}

export interface EventAnalytics {
  views: number;
  registrations: number;
  attendance: number;
  revenue: number;
  conversionRate: number;
  demographics: EventDemographics;
  engagement: EngagementMetrics;
  feedback: FeedbackSummary;
}

export interface EventDemographics {
  ageGroups: Record<string, number>;
  locations: Record<string, number>;
  sources: Record<string, number>;
}

export interface EngagementMetrics {
  pageViews: number;
  timeOnPage: number;
  shareCount: number;
  commentCount: number;
}

export interface FeedbackSummary {
  averageRating: number;
  totalResponses: number;
  categoryScores: Record<string, number>;
}

export interface EventFeedback {
  id: string;
  eventId: string;
  userId: string;
  rating: number;
  comments?: string;
  categories: Record<string, number>;
  submittedAt: Date;
  verified: boolean;
}

export interface EventSeries {
  id: string;
  name: string;
  description?: string;
  pattern: RecurrencePattern;
  events: string[]; // Event IDs
  totalEvents: number;
  isActive: boolean;
}

export interface RecurrencePattern {
  type: 'daily' | 'weekly' | 'monthly' | 'yearly' | 'custom';
  interval: number;
  endType: 'never' | 'date' | 'count';
  endDate?: Date;
  endCount?: number;
  daysOfWeek?: number[];
  monthlyType?: 'date' | 'day';
}

export interface EventNotification {
  id: string;
  eventId: string;
  type: NotificationType;
  recipients: NotificationRecipient[];
  template: NotificationTemplate;
  scheduledFor?: Date;
  sentAt?: Date;
  status: NotificationStatus;
}

export type NotificationType = 'reminder' | 'update' | 'cancellation' | 'confirmation' | 'feedback_request';

export interface NotificationRecipient {
  userId: string;
  method: 'email' | 'sms' | 'push' | 'in_app';
  status: 'pending' | 'sent' | 'delivered' | 'failed';
}

export interface NotificationTemplate {
  subject: string;
  content: string;
  variables: Record<string, string>;
}

export type NotificationStatus = 'draft' | 'scheduled' | 'sending' | 'sent' | 'failed';

export interface VenueEvent {
  eventId: string;
  venueId: string;
  setupTime: Date;
  teardownTime: Date;
  requirements: VenueRequirement[];
  contact: EventContact;
  status: VenueEventStatus;
}

export type VenueEventStatus = 'pending' | 'confirmed' | 'setup' | 'active' | 'teardown' | 'complete';

export interface VenueRequirement {
  type: 'equipment' | 'staffing' | 'setup' | 'catering';
  description: string;
  quantity?: number;
  notes?: string;
}

export interface EventContact {
  name: string;
  role: string;
  phone: string;
  email: string;
}

export interface EventBooking {
  id: string;
  eventId: string;
  userId: string;
  tickets: TicketBooking[];
  totalAmount: number;
  currency: string;
  status: BookingStatus;
  paymentMethod: string;
  bookedAt: Date;
  confirmationCode: string;
  specialRequests?: string;
}

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'refunded' | 'checked_in';

export interface TicketBooking {
  tierId: string;
  quantity: number;
  unitPrice: number;
  personalizations?: Record<string, string>;
}

export interface BookingDetails {
  attendees: AttendeeInfo[];
  contactInfo: ContactInfo;
  emergencyContact?: ContactInfo;
  accessibility?: AccessibilityRequest[];
}

export interface AttendeeInfo {
  name: string;
  email?: string;
  phone?: string;
  dietaryRestrictions?: string[];
  ticketType: string;
}

export interface ContactInfo {
  name: string;
  email: string;
  phone: string;
}

export interface AccessibilityRequest {
  type: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
}

export interface TicketTransfer {
  id: string;
  originalBookingId: string;
  fromUserId: string;
  toUserId: string;
  ticketIds: string[];
  transferredAt: Date;
  status: TransferStatus;
  reason?: string;
}

export type TransferStatus = 'pending' | 'completed' | 'cancelled' | 'expired';
