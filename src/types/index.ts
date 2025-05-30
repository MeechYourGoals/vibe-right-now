
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
  isVerified?: boolean;
  joinedDate?: string;
  location?: string;
  vibeTags?: string[];
  isCelebrity?: boolean;
}

export interface Location {
  id: string;
  name: string;
  address: string;
  city?: string;
  state?: string;
  zipCode?: string;
  lat?: number;
  lng?: number;
  type?: string;
  rating?: number;
  priceLevel?: number;
  openNow?: boolean;
  images?: string[];
  logo?: string;
  description?: string;
  website?: string;
  phone?: string;
  hours?: Record<string, string>;
  tags?: string[];
  vibeTags?: string[];
  verified?: boolean;
  country?: string;
  vibes?: string[];
  url?: string;
}

export interface EventItem extends Omit<Location, 'openNow' | 'hours'> {
  date?: string;
  startTime?: string;
  endTime?: string;
  performers?: string[];
  ticketPrice?: string;
  ticketUrl?: string;
  category?: string;
  venueName?: string;
}

export interface Media {
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
}

export interface Comment {
  id: string;
  userId: string;
  postId: string;
  content: string;
  timestamp: string;
  user?: User;
  likes?: number;
  replies?: Comment[];
  text?: string;
  vibedHere?: boolean;
}

export interface Post {
  id: string;
  userId: string;
  locationId?: string;
  content: string;
  media?: Media[];
  timestamp: string;
  likes: number;
  comments: number;
  user?: User;
  location?: Location;
  vibeTags?: string[];
  isVenuePost?: boolean;
  isPinned?: boolean;
}

export interface SavedPlace {
  id: string;
  locationId: string;
  userId: string;
  savedAt: string;
  notes?: string;
  visitedAt?: string;
  rating?: number;
  status: 'visited' | 'want_to_visit';
  location?: Location;
}

export interface VenueInsights {
  id: string;
  venueId: string;
  period: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
  date: string;
  visitorCount: number;
  checkInsCount: number;
  newFollowersCount: number;
  postEngagement: number;
  averageRating: number;
  peakHours: Record<string, number>;
  customerDemographics?: any;
  venue?: Location;
}
