
import { BaseEntity, MediaItem, Timestamps, ContentType, VisibilityLevel } from '../core/base';
import { User } from './user';
import { Venue } from './venue';

// Content-related types
export interface Post extends BaseEntity, Timestamps {
  content: string;
  contentType: ContentType;
  author: User;
  venue?: Venue;
  location?: PostLocation;
  media: MediaItem[];
  visibility: VisibilityLevel;
  engagement: PostEngagement;
  metadata: PostMetadata;
  tags: string[];
  vibes: string[];
  status: PostStatus;
}

export interface PostLocation {
  venueId?: string;
  venueName?: string;
  coordinates?: GeoCoordinates;
  address?: string;
  checkedIn: boolean;
}

export interface PostEngagement {
  likes: number;
  comments: number;
  shares: number;
  saves: number;
  views: number;
  vibeScore: number;
  interactions: PostInteraction[];
}

export interface PostInteraction {
  userId: string;
  type: InteractionType;
  timestamp: Date;
  metadata?: Record<string, any>;
}

export type InteractionType = 'like' | 'comment' | 'share' | 'save' | 'view' | 'vibe';
export type PostStatus = 'draft' | 'published' | 'archived' | 'deleted' | 'flagged';

export interface PostMetadata {
  isSponsored: boolean;
  isPinned: boolean;
  isVenuePost: boolean;
  expiresAt?: Date;
  editHistory: PostEdit[];
  moderationStatus: ModerationStatus;
  analytics?: PostAnalytics;
}

export interface PostEdit {
  timestamp: Date;
  userId: string;
  changes: string;
  reason?: string;
}

export type ModerationStatus = 'pending' | 'approved' | 'rejected' | 'flagged' | 'reviewed';

export interface PostAnalytics {
  impressions: number;
  reach: number;
  clickThrough: number;
  engagementRate: number;
  demographics: Record<string, number>;
  devices: Record<string, number>;
  sources: Record<string, number>;
}

export interface Comment extends BaseEntity, Timestamps {
  postId: string;
  author: User;
  content: string;
  parentCommentId?: string;
  replies: Comment[];
  engagement: CommentEngagement;
  status: CommentStatus;
  metadata: CommentMetadata;
}

export interface CommentEngagement {
  likes: number;
  replies: number;
  reports: number;
}

export type CommentStatus = 'published' | 'deleted' | 'flagged' | 'hidden';

export interface CommentMetadata {
  isEdited: boolean;
  editHistory: CommentEdit[];
  moderationStatus: ModerationStatus;
  mentionedUsers: string[];
}

export interface CommentEdit {
  timestamp: Date;
  originalContent: string;
  reason?: string;
}

// Story types (temporary content)
export interface Story extends BaseEntity, Timestamps {
  author: User;
  content: StoryContent;
  venue?: Venue;
  location?: PostLocation;
  engagement: StoryEngagement;
  metadata: StoryMetadata;
  status: StoryStatus;
}

export interface StoryContent {
  type: 'image' | 'video' | 'text';
  media?: MediaItem;
  text?: string;
  backgroundColor?: string;
  stickers?: StorySticker[];
  duration: number; // in seconds
}

export interface StorySticker {
  type: 'location' | 'mention' | 'poll' | 'question' | 'music';
  position: { x: number; y: number };
  data: Record<string, any>;
}

export interface StoryEngagement {
  views: number;
  reactions: StoryReaction[];
  replies: number;
}

export interface StoryReaction {
  userId: string;
  type: string; // emoji or reaction type
  timestamp: Date;
}

export type StoryStatus = 'active' | 'expired' | 'archived' | 'deleted';

export interface StoryMetadata {
  expiresAt: Date;
  isHighlight: boolean;
  highlightId?: string;
  viewedBy: string[];
  analytics?: StoryAnalytics;
}

export interface StoryAnalytics {
  impressions: number;
  reach: number;
  completionRate: number;
  exitRate: number;
  replayRate: number;
}
