
// Types for social media posts and API keys
export interface SocialMediaPost {
  id: string;
  content: string;
  timestamp: string;
  username: string;
  userAvatar: string;
  venueName: string;
  source: 'instagram' | 'tiktok' | 'yelp' | 'tripadvisor' | 'foursquare' | 'google' | 'franki' | 'other';
  mediaUrl?: string;
  mediaType?: 'image' | 'video';
  likes?: number;
  comments?: number;
  rating?: number;
  originalUrl?: string; // URL to the original post
}

export interface SocialMediaApiKeys {
  instagram: string;
  tiktok: string;
  yelp: string;
  tripadvisor?: string;
  foursquare?: string;
  google?: string;
  franki?: string;
  other?: string;
  otherUrl?: string; // Custom URL for other platform
}
