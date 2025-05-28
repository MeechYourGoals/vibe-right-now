
export interface SocialMediaPost {
  id: string;
  content: string;
  author: string;
  username: string;
  userAvatar?: string;
  venueName?: string;
  rating?: number;
  timestamp: string;
  platform: string;
  source: 'instagram' | 'google' | 'yelp' | 'other';
  likes?: number;
  comments?: number;
  engagement?: {
    likes: number;
    comments: number;
    shares: number;
  };
  media?: {
    type: 'image' | 'video';
    url: string;
  }[];
}

export interface SocialMediaApiKeys {
  instagram?: string;
  google?: string;
  yelp?: string;
}
