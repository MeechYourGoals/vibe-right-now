
import { BaseEntity, MediaItem, Timestamps } from '../core/base';
import { User } from './user';
import { Venue } from './venue';

// Messaging types
export interface Conversation extends BaseEntity, Timestamps {
  type: ConversationType;
  participants: ConversationParticipant[];
  lastMessage?: Message;
  metadata: ConversationMetadata;
  settings: ConversationSettings;
  status: ConversationStatus;
}

export type ConversationType = 'direct' | 'group' | 'venue' | 'support' | 'automated';
export type ConversationStatus = 'active' | 'archived' | 'muted' | 'blocked' | 'deleted';

export interface ConversationParticipant {
  userId: string;
  role: ParticipantRole;
  joinedAt: Date;
  lastReadAt?: Date;
  status: ParticipantStatus;
  permissions: ParticipantPermissions;
}

export type ParticipantRole = 'owner' | 'admin' | 'moderator' | 'member' | 'guest';
export type ParticipantStatus = 'active' | 'left' | 'removed' | 'banned';

export interface ParticipantPermissions {
  canSendMessages: boolean;
  canSendMedia: boolean;
  canAddMembers: boolean;
  canRemoveMembers: boolean;
  canEditSettings: boolean;
}

export interface ConversationMetadata {
  title?: string;
  description?: string;
  avatar?: MediaItem;
  venueId?: string;
  messageCount: number;
  unreadCount: Record<string, number>; // userId -> unread count
  tags: string[];
}

export interface ConversationSettings {
  isPublic: boolean;
  allowInvites: boolean;
  requireApproval: boolean;
  allowMedia: boolean;
  allowLinks: boolean;
  autoDeleteDays?: number;
  moderationLevel: ModerationLevel;
}

export type ModerationLevel = 'none' | 'basic' | 'strict' | 'custom';

export interface Message extends BaseEntity, Timestamps {
  conversationId: string;
  senderId: string;
  content: MessageContent;
  replyTo?: string;
  reactions: MessageReaction[];
  delivery: MessageDelivery;
  metadata: MessageMetadata;
  status: MessageStatus;
}

export interface MessageContent {
  type: MessageContentType;
  text?: string;
  media?: MediaItem[];
  location?: MessageLocation;
  system?: SystemMessageData;
  rich?: RichMessageData;
}

export type MessageContentType = 
  | 'text' 
  | 'media' 
  | 'location' 
  | 'system' 
  | 'rich' 
  | 'sticker' 
  | 'voice' 
  | 'file';

export interface MessageLocation {
  coordinates: GeoCoordinates;
  address?: string;
  venueName?: string;
  venueId?: string;
}

export interface SystemMessageData {
  type: SystemMessageType;
  data: Record<string, any>;
}

export type SystemMessageType = 
  | 'user_joined' 
  | 'user_left' 
  | 'user_added' 
  | 'user_removed' 
  | 'settings_changed' 
  | 'conversation_created';

export interface RichMessageData {
  type: RichMessageType;
  title?: string;
  description?: string;
  thumbnail?: MediaItem;
  url?: string;
  actions?: MessageAction[];
}

export type RichMessageType = 'link' | 'venue' | 'event' | 'post' | 'booking' | 'payment';

export interface MessageAction {
  id: string;
  label: string;
  type: ActionType;
  data: Record<string, any>;
}

export type ActionType = 'url' | 'callback' | 'share' | 'save' | 'book' | 'pay';

export interface MessageReaction {
  userId: string;
  emoji: string;
  timestamp: Date;
}

export interface MessageDelivery {
  sent: boolean;
  delivered: boolean;
  read: boolean;
  sentAt?: Date;
  deliveredAt?: Date;
  readAt?: Date;
  readBy: Record<string, Date>; // userId -> readAt
}

export interface MessageMetadata {
  isEdited: boolean;
  editHistory: MessageEdit[];
  isForwarded: boolean;
  forwardedFrom?: string;
  mentions: string[];
  isAutomated: boolean;
  botId?: string;
}

export interface MessageEdit {
  timestamp: Date;
  originalContent: string;
  reason?: string;
}

export type MessageStatus = 'sending' | 'sent' | 'delivered' | 'read' | 'failed' | 'deleted';

// Automated messaging types
export interface ChatBot extends BaseEntity, Timestamps {
  name: string;
  description: string;
  avatar?: MediaItem;
  venueId?: string;
  configuration: BotConfiguration;
  capabilities: BotCapability[];
  status: BotStatus;
  analytics: BotAnalytics;
}

export interface BotConfiguration {
  language: string;
  personality: string;
  responseTime: number;
  workingHours?: BusinessHours;
  fallbackToHuman: boolean;
  trainingData: string[];
}

export interface BotCapability {
  type: BotCapabilityType;
  enabled: boolean;
  configuration: Record<string, any>;
}

export type BotCapabilityType = 
  | 'greeting' 
  | 'booking' 
  | 'faq' 
  | 'menu' 
  | 'directions' 
  | 'hours' 
  | 'recommendations';

export type BotStatus = 'active' | 'inactive' | 'training' | 'error';

export interface BotAnalytics {
  totalConversations: number;
  totalMessages: number;
  averageResponseTime: number;
  satisfactionScore: number;
  handoffRate: number;
  resolutionRate: number;
}
