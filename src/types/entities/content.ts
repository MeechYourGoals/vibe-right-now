
import { Location } from './venue';
import { User } from './user';

export interface Media {
  id?: string;
  type: 'image' | 'video' | 'audio';
  url: string;
  thumbnail?: string;
}

export interface Post {
  id: string;
  content: string;
  media?: string[] | Media[];
  likes: number;
  comments: number;
  shares?: number;
  timestamp: string;
  location?: Location;
  user: User;
  vibes?: string[];
  tags?: string[];
  verified?: boolean;
}

export interface Comment {
  id: string;
  content: string;
  author: string;
  timestamp: string;
  likes: number;
  user: User;
  postId: string;
  contentId?: string;
  parentId?: string;
  body?: string;
  createdAt?: Date;
  updatedAt?: Date;
  vibedHere?: boolean;
  status?: 'published';
  engagement?: { likes: number; replies: number; reactions: any[] };
  moderation?: { status: 'approved'; flags: any[] };
}
