
// Types for social media posts and API keys (Google ecosystem only)
export interface SocialMediaPost {
  id: string;
  content: string;
  author: string;
  timestamp: string;
  username: string;
  userAvatar: string;
  venueName: string;
  source: 'instagram' | 'yelp' | 'google' | 'tiktok' | 'tripadvisor' | 'foursquare' | 'franki' | 'other';
  platform: 'google' | 'yelp' | 'instagram' | 'tiktok' | 'tripadvisor' | 'foursquare' | 'franki' | 'other';
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
  tiktok: string;
  tripadvisor: string;
  foursquare: string;
  franki: string;
  other: string;
  otherUrl: string;
}
