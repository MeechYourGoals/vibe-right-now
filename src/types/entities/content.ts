
export interface Media {
  id: string;
  url: string;
  type: 'image' | 'video';
  thumbnail?: string;
  duration?: number;
  width?: number;
  height?: number;
  alt?: string;
}

export interface Post {
  id: string;
  userId: string;
  content: string;
  media?: Media[] | string[];
  vibes?: string[];
  tags?: string[];
  timestamp: string;
  likes: number;
  comments: number;
  shares?: number;
  location?: {
    id: string;
    name: string;
    city: string;
    state: string;
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
  userId: string;
  content: string;
  timestamp: string;
  likes: number;
  replies?: Comment[];
  parentId?: string;
  isVerified?: boolean;
  mentions?: string[];
  createdAt: string;
  updatedAt: string;
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
