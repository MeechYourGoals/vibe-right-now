
import { BaseEntity, UserProfile, MediaItem, Location } from '../core/base';

// Comment interface
export interface Comment extends BaseEntity {
  contentId: string;
  postId: string;
  parentId?: string;
  user: UserProfile;
  author: UserProfile;
  body: string;
  content: string;
  timestamp: Date;
  vibedHere: boolean;
  likes: number;
  status: CommentStatus;
  engagement: CommentEngagement;
  moderation: CommentModeration;
}

export type CommentStatus = 'published' | 'pending' | 'hidden' | 'deleted';

export interface CommentEngagement {
  likes: number;
  replies: number;
  reactions: CommentReaction[];
}

export interface CommentReaction {
  type: 'like' | 'love' | 'laugh' | 'wow' | 'sad' | 'angry';
  count: number;
  userReacted: boolean;
}

export interface CommentModeration {
  status: 'approved' | 'pending' | 'flagged' | 'rejected';
  flags: string[];
  moderatedAt?: Date;
  moderatedBy?: string;
}

// Media interface for compatibility
export interface Media extends MediaItem {}
