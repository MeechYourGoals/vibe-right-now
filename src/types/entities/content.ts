
export interface Post {
  id: string;
  user: any;
  location: any;
  content: string;
  media?: any[];
  timestamp: Date;
  expiresAt?: string;
  likes: number;
  comments: number;
  isPinned?: boolean;
  isVenuePost?: boolean;
  saved: boolean;
  vibeTags?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: string;
  postId: string;
  user: any;
  content: string;
  timestamp: Date;
  likes: number;
  replies?: Comment[];
  vibedHere?: boolean;
  contentId?: string;
  parentId?: string;
  author?: any;
  body?: string;
  createdAt?: Date;
  updatedAt?: Date;
  status?: 'published';
  engagement?: { likes: number; replies: number; reactions: any[] };
  moderation?: { status: 'approved'; flags: any[] };
}
