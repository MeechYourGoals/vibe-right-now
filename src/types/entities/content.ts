
import { BaseEntity, Timestamps, MediaItem, GeoCoordinates, VisibilityLevel, ContentType } from '../core/base';
import { UserProfile } from './user';

export interface Content extends BaseEntity, Timestamps {
  title?: string;
  body: string;
  content?: string; // Added for compatibility
  type: ContentType;
  author: UserProfile;
  user?: UserProfile; // Added for compatibility
  visibility: VisibilityLevel;
  status: ContentStatus;
  media: MediaItem[];
  tags: string[];
  categories: string[];
  location?: ContentLocation;
  engagement: ContentEngagement;
  moderation: ContentModeration;
  metadata: ContentMetadata;
}

export type ContentStatus = 'draft' | 'published' | 'archived' | 'deleted' | 'pending_review';

export interface ContentLocation {
  coordinates?: GeoCoordinates;
  venueId?: string;
  address?: string;
  city?: string;
  country?: string;
}

export interface ContentEngagement {
  views: number;
  likes: number;
  shares: number;
  comments: number;
  saves: number;
  reactions: ContentReaction[];
}

export interface ContentReaction {
  id: string;
  userId: string;
  type: ReactionType;
  createdAt: Date;
}

export type ReactionType = 'like' | 'love' | 'laugh' | 'wow' | 'sad' | 'angry';

export interface ContentModeration {
  status: ModerationStatus;
  flags: ModerationFlag[];
  reviewedBy?: string;
  reviewedAt?: Date;
  notes?: string;
}

export type ModerationStatus = 'pending' | 'approved' | 'rejected' | 'flagged';

export interface ModerationFlag {
  type: FlagType;
  reason: string;
  reportedBy: string;
  reportedAt: Date;
  severity: FlagSeverity;
}

export type FlagType = 'spam' | 'harassment' | 'inappropriate' | 'misinformation' | 'copyright' | 'other';
export type FlagSeverity = 'low' | 'medium' | 'high' | 'critical';

export interface ContentMetadata {
  featured: boolean;
  pinned: boolean;
  trending: boolean;
  sponsored: boolean;
  originalSource?: string;
  editHistory: ContentEdit[];
  seo?: SEOMetadata;
}

export interface ContentEdit {
  editedBy: string;
  editedAt: Date;
  changes: string[];
  reason?: string;
}

export interface SEOMetadata {
  metaTitle?: string;
  metaDescription?: string;
  keywords: string[];
  canonicalUrl?: string;
}

// Comment system with all required compatibility properties
export interface Comment extends BaseEntity, Timestamps {
  contentId: string;
  postId?: string; // Added for compatibility
  parentId?: string; // For nested comments
  author: UserProfile;
  user?: UserProfile; // Added for compatibility
  body: string;
  content?: string; // Added for compatibility
  timestamp?: Date; // Added for compatibility
  vibedHere?: boolean; // Added for compatibility
  status: CommentStatus;
  engagement: CommentEngagement;
  moderation: ContentModeration;
}

export type CommentStatus = 'published' | 'pending' | 'hidden' | 'deleted';

export interface CommentEngagement {
  likes: number;
  replies: number;
  reactions: ContentReaction[];
}

// Content collections
export interface Collection extends BaseEntity, Timestamps {
  name: string;
  description?: string;
  owner: UserProfile;
  visibility: VisibilityLevel;
  contentIds: string[];
  tags: string[];
  featured: boolean;
  collaborators: CollectionCollaborator[];
}

export interface CollectionCollaborator {
  userId: string;
  role: CollaboratorRole;
  permissions: CollaboratorPermission[];
  addedAt: Date;
}

export type CollaboratorRole = 'editor' | 'contributor' | 'viewer';
export type CollaboratorPermission = 'read' | 'write' | 'delete' | 'share' | 'moderate';

// Content scheduling
export interface ContentSchedule {
  id: string;
  contentId: string;
  publishAt: Date;
  unpublishAt?: Date;
  timezone: string;
  status: ScheduleStatus;
  createdBy: string;
}

export type ScheduleStatus = 'scheduled' | 'published' | 'failed' | 'cancelled';

// Content analytics
export interface ContentAnalytics {
  contentId: string;
  period: AnalyticsPeriod;
  metrics: ContentMetrics;
  demographics: ContentDemographics;
  performance: ContentPerformance;
}

export type AnalyticsPeriod = 'hour' | 'day' | 'week' | 'month' | 'year';

export interface ContentMetrics {
  impressions: number;
  reach: number;
  engagement: number;
  clickThrough: number;
  conversionRate: number;
  averageTimeSpent: number;
}

export interface ContentDemographics {
  ageGroups: Record<string, number>;
  genders: Record<string, number>;
  locations: Record<string, number>;
  devices: Record<string, number>;
}

export interface ContentPerformance {
  hourlyViews: number[];
  dailyViews: number[];
  topReferrers: ReferrerData[];
  searchTerms: SearchTermData[];
}

export interface ReferrerData {
  source: string;
  visits: number;
  percentage: number;
}

export interface SearchTermData {
  term: string;
  count: number;
  ranking: number;
}
