
import { BaseEntity, Timestamps, GeoCoordinates, BusinessHours } from '../core/base';
import { UserProfile } from './user';

export type ActionType = 'send' | 'receive' | 'read' | 'typing' | 'delete';

export interface Message extends BaseEntity, Timestamps {
  content: string;
  senderId: string;
  conversationId: string;
  status: MessageStatus;
  type: MessageType;
  metadata?: MessageMetadata;
  reactions?: MessageReaction[];
  attachments?: MessageAttachment[];
  threadId?: string;
  replyToId?: string;
}

export type MessageStatus = 'sent' | 'delivered' | 'read' | 'failed';
export type MessageType = 'text' | 'image' | 'video' | 'audio' | 'file' | 'location' | 'system';

export interface MessageMetadata {
  edited?: boolean;
  editedAt?: Date;
  priority?: 'low' | 'normal' | 'high' | 'urgent';
  expiresAt?: Date;
}

export interface MessageReaction {
  id: string;
  userId: string;
  messageId: string;
  emoji: string;
  createdAt: Date;
}

export interface MessageAttachment {
  id: string;
  type: 'image' | 'video' | 'audio' | 'document';
  url: string;
  filename: string;
  size: number;
  mimeType: string;
  thumbnail?: string;
}

export interface Conversation extends BaseEntity, Timestamps {
  participants: ConversationParticipant[];
  lastMessageId?: string;
  lastMessageAt?: Date;
  settings: ConversationSettings;
  type: ConversationType;
  metadata?: ConversationMetadata;
}

export type ConversationType = 'direct' | 'group' | 'venue_inquiry' | 'support';

export interface ConversationParticipant {
  id: string;
  userId: string;
  role: ParticipantRole;
  joinedAt: Date;
  lastReadAt?: Date;
  settings: ParticipantSettings;
}

export type ParticipantRole = 'owner' | 'admin' | 'member' | 'guest';

export interface ParticipantSettings {
  muted: boolean;
  notifications: boolean;
  nickname?: string;
}

export interface ConversationSettings {
  allowNewMembers: boolean;
  messageRetention: number; // days
  autoDelete: boolean;
  readReceipts: boolean;
}

export interface ConversationMetadata {
  name?: string;
  description?: string;
  image?: string;
  tags?: string[];
  venueId?: string;
}

export interface NotificationSettings {
  enabled: boolean;
  sound: boolean;
  vibration: boolean;
  preview: boolean;
  quietHours: {
    enabled: boolean;
    start: string;
    end: string;
  };
}

export interface MessageThread {
  id: string;
  parentMessageId: string;
  participantIds: string[];
  messageCount: number;
  lastActivity: Date;
}

export interface VenueInquiry extends BaseEntity, Timestamps {
  venueId: string;
  customerId: string;
  subject: string;
  status: InquiryStatus;
  priority: InquiryPriority;
  assignedTo?: string;
  conversationId: string;
  metadata?: InquiryMetadata;
}

export type InquiryStatus = 'open' | 'in_progress' | 'resolved' | 'closed';
export type InquiryPriority = 'low' | 'normal' | 'high' | 'urgent';

export interface InquiryMetadata {
  category?: string;
  tags?: string[];
  customFields?: Record<string, any>;
}

export interface AutoReplyRule {
  id: string;
  venueId: string;
  trigger: AutoReplyTrigger;
  response: string;
  conditions: AutoReplyCondition[];
  isActive: boolean;
  priority: number;
}

export interface AutoReplyTrigger {
  type: 'keyword' | 'time' | 'user_type' | 'message_type';
  value: string | string[];
}

export interface AutoReplyCondition {
  field: string;
  operator: 'equals' | 'contains' | 'starts_with' | 'ends_with';
  value: string;
}

export interface MessageTemplate {
  id: string;
  venueId: string;
  name: string;
  content: string;
  category: string;
  variables: string[];
  usage: number;
  isActive: boolean;
}

export interface MessageAnalytics {
  venueId: string;
  period: AnalyticsPeriod;
  totalMessages: number;
  responseTime: ResponseTime;
  satisfactionScore: number;
  conversionRate: number;
  metrics: MessageMetric[];
}

export type AnalyticsPeriod = 'day' | 'week' | 'month' | 'quarter' | 'year';

export interface ResponseTime {
  average: number; // minutes
  median: number;
  percentile95: number;
  byHour: number[];
}

export interface MessageMetric {
  date: Date;
  sent: number;
  received: number;
  responseTime: number;
  satisfaction: number;
}

export interface ChatBot {
  id: string;
  venueId: string;
  name: string;
  capabilities: BotCapability[];
  isActive: boolean;
  settings: BotSettings;
  analytics: BotAnalytics;
}

export interface BotCapability {
  type: CapabilityType;
  confidence: number;
  enabled: boolean;
}

export type CapabilityType = 'faq' | 'booking' | 'recommendations' | 'hours' | 'directions';

export interface BotSettings {
  fallbackToHuman: boolean;
  confidenceThreshold: number;
  greeting: string;
  language: string;
}

export interface BotAnalytics {
  totalInteractions: number;
  successRate: number;
  fallbackRate: number;
  averageConfidence: number;
}

export interface BotResponse {
  content: string;
  confidence: number;
  capabilities: string[];
  fallback: boolean;
  suggestions?: string[];
}

export interface BotTrigger {
  id: string;
  pattern: string;
  response: string;
  confidence: number;
  metadata?: Record<string, any>;
}

export interface BookingRequest {
  id: string;
  venueId: string;
  customerId: string;
  details: BookingDetails;
  status: BookingStatus;
  paymentInfo?: PaymentInfo;
  conversationId: string;
}

export interface BookingDetails {
  date: Date;
  time: string;
  partySize: number;
  specialRequests?: string;
  contactInfo: ContactInfo;
}

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';

export interface PaymentInfo {
  method: PaymentMethod;
  amount: number;
  currency: string;
  status: PaymentStatus;
  transactionId?: string;
}

export type PaymentMethod = 'card' | 'cash' | 'digital_wallet';
export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded';

export interface ContactInfo {
  phone?: string;
  email?: string;
  name: string;
}

export interface Location {
  id: string;
  name: string;
  coordinates: GeoCoordinates;
  address: string;
  type: LocationType;
  metadata?: LocationMetadata;
}

export type LocationType = 'venue' | 'landmark' | 'address' | 'poi';

export interface LocationMetadata {
  accuracy?: number;
  timestamp?: Date;
  source?: string;
}
