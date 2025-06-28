
export interface Media {
  id: string;
  url: string;
  type: 'image' | 'video' | 'audio';
  thumbnail?: string;
  duration?: number;
  width?: number;
  height?: number;
  alt?: string;
}

export interface Post {
  id: string;
  userId: string;
  user?: User; // Add user property
  content: string;
  media?: Media[] | string[];
  vibes?: string[];
  tags?: string[];
  vibeTags?: string[]; // Add vibeTags property
  timestamp: string;
  likes: number;
  comments: number;
  shares?: number;
  saved?: boolean; // Add saved property
  isVenuePost?: boolean; // Add isVenuePost property
  location?: {
    id: string;
    name: string;
    city: string;
    state: string;
    country?: string; // Add country property
  };
  isVerified?: boolean;
  isPinned?: boolean;
  visibility: 'public' | 'friends' | 'private';
  reactions?: {
    type: string;
    count: number;
    users: string[];
  }[];
  mentions?: string[];
  hashtags?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: string;
  postId: string;
  contentId: string;
  userId: string;
  user: User; // Add user property
  author: User; // Add author property
  content: string;
  body: string; // Add body property
  timestamp: string | Date;
  createdAt: string | Date;
  updatedAt: string | Date;
  likes: number;
  replies?: Comment[];
  parentId?: string;
  isVerified?: boolean;
  vibedHere?: boolean; // Add vibedHere property
  mentions?: string[];
  status: 'published' | 'draft' | 'deleted';
  engagement: {
    likes: number;
    replies: number;
    reactions: any[];
  };
  moderation: {
    status: 'approved' | 'pending' | 'rejected';
    flags: string[];
  };
}

export interface Story {
  id: string;
  userId: string;
  media: Media;
  timestamp: string;
  expiresAt: string;
  views: number;
  isActive: boolean;
  location?: {
    id: string;
    name: string;
  };
  mentions?: string[];
  hashtags?: string[];
  createdAt: string;
}

export interface ContentMetrics {
  totalPosts: number;
  totalLikes: number;
  totalComments: number;
  totalShares: number;
  engagementRate: number;
  reachMetrics: {
    impressions: number;
    reach: number;
    uniqueViews: number;
  };
  demographicBreakdown: {
    ageGroups: Record<string, number>;
    genderDistribution: Record<string, number>;
    locationDistribution: Record<string, number>;
  };
  contentPerformance: {
    topPerformingPosts: Post[];
    averageEngagement: number;
    bestPostingTimes: string[];
  };
}

// Add User interface here to avoid circular imports
export interface User {
  id: string;
  username: string;
  displayName?: string; // Add displayName property
  name: string;
  email?: string;
  avatar?: string;
  bio?: string;
  verified?: boolean;
  isPrivate?: boolean;
  followers?: number;
  following?: number;
  posts?: number;
  createdAt?: string;
  updatedAt?: string;
}
