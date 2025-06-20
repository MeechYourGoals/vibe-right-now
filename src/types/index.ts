
// Re-export all types from the entities
export * from './entities/venue';
export * from './core/base';

// Define CityData type here to avoid circular imports
export interface CityData {
  name: string;
  state?: string;
  country: string;
  lat: number;
  lng: number;
  venues: Location[];
}

// Export missing types that are causing build errors
export interface Comment {
  id: string;
  postId: string;
  user: User;
  content: string;
  timestamp: Date;
  likes: number;
  replies?: Comment[];
  vibedHere?: boolean;
  contentId?: string;
  parentId?: string;
  author?: User;
  body?: string;
  createdAt?: Date;
  updatedAt?: Date;
  status?: 'published';
  engagement?: { likes: number; replies: number; reactions: any[] };
  moderation?: { status: 'approved'; flags: any[] };
}

export interface Post {
  id: string;
  user: User;
  location: Location;
  content: string;
  media?: Media[];
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

export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  verified: boolean;
  bio?: string;
  followers?: number;
  following?: number;
  posts?: number;
  displayName?: string;
  isPrivate?: boolean;
  email?: string;
  isCelebrity?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Media {
  id?: string;
  type: "image" | "video" | "audio";
  url: string;
  thumbnail?: string;
}

export interface AdFormat {
  id: string;
  name: string;
  description: string;
}

export interface TargetingOptions {
  ageRange: { min: number; max: number };
  gender: GenderTargeting;
  interests: string[];
  location: string;
}

export type GenderTargeting = 'all' | 'male' | 'female' | 'other';

export interface PlatformSentimentSummary {
  platform: string;
  sentiment: number;
  mentions: number;
}

export interface SentimentTheme {
  theme: string;
  sentiment: number;
  frequency: number;
}
