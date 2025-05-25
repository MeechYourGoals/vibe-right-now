
// Types for social media posts and API keys (Google ecosystem only)
export interface SocialMediaPost {
  id: string;
  content: string;
  timestamp: string;
  username: string;
  userAvatar: string;
  venueName: string;
  source: 'instagram' | 'yelp' | 'google' | 'other';
  mediaUrl?: string;
  mediaType?: 'image' | 'video';
  likes?: number;
  comments?: number;
  rating?: number;
  originalUrl?: string; // URL to the original post
}

export interface SocialMediaApiKeys {
  instagram: string;
  yelp: string;
  google: string;
}
