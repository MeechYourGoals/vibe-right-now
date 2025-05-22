
// Export all types
export * from './custom';

export interface User {
  id: string;
  name: string;
  username: string;
  email?: string;
  bio?: string;
  avatar?: string;
  coverPhoto?: string;
  followers?: number;
  following?: number;
  posts?: number;
  isVerified?: boolean;
  isCelebrity?: boolean;
  isPrivate?: boolean;
  vibeTags?: string[];
}

export interface Media {
  url: string;
  type: 'image' | 'video';
  thumbnail?: string;
}

export interface Comment {
  id: string;
  userId: string;
  postId: string;
  user: User;
  content: string;
  timestamp: string;
  vibedHere: boolean;
  likes: number;
  text?: string; // For backwards compatibility
}

export interface Post {
  id: string;
  user: User;
  userId: string; 
  text?: string;
  locationId?: string;
  location?: Location;
  timestamp: string;
  likes: number;
  comments: number;
  media: (Media | string)[];
  isPinned?: boolean;
  isVenuePost?: boolean;
  vibeTags?: string[];
}

export interface Location {
  id: string;
  name: string;
  address: string;
  city?: string;
  state?: string;
  country?: string;
  latitude?: number;
  longitude?: number;
  rating?: number;
  photos?: string[];
  price?: string;
  hours?: Record<string, string>;
  phone?: string;
  website?: string;
  description?: string;
  categories?: string[];
  vibes?: string[];
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  image?: string;
  description?: string;
  price?: string;
}

export interface VenueInsights {
  visitors: number;
  visitorsChange: number;
  posts: number;
  postsChange: number;
  likes: number;
  likesChange: number;
  mentions: number;
  mentionsChange: number;
  checkins: number;
  checkinsChange: number;
  reviews: number;
  reviewsChange: number;
  rating: number;
  ratingChange: number;
}
