
export interface Location {
  id: string;
  name: string;
  description?: string;
  address?: string;
  city: string;
  state: string;
  country?: string;
  lat: number;
  lng: number;
  type?: string;
  rating?: number;
  priceLevel?: number;
  hours?: BusinessHours;
  phone?: string;
  website?: string;
  photos?: any[];
  tags?: string[];
  verified?: boolean;
  vibes?: string[];
  userProfile?: any;
}

export interface BusinessHours {
  monday: { open: string; close: string; } | string;
  tuesday: { open: string; close: string; } | string;
  wednesday: { open: string; close: string; } | string;
  thursday: { open: string; close: string; } | string;
  friday: { open: string; close: string; } | string;
  saturday: { open: string; close: string; } | string;
  sunday: { open: string; close: string; } | string;
  [key: string]: { open: string; close: string; } | string;
}

export interface User {
  id: string;
  username: string;
  name: string;
  avatar: string;
  bio?: string;
  followers?: number;
  following?: number;
  verified?: boolean;
  location?: string;
  website?: string;
  joinDate?: string;
  isPrivate?: boolean;
  isCelebrity?: boolean;
}

export interface Comment {
  id: string;
  postId: string;
  user: User;
  text?: string;
  content: string;
  timestamp: string;
  likes: number;
  vibedHere?: boolean;
}

export interface Post {
  id: string;
  user: User;
  location?: Location;
  text?: string;
  content: string;
  media?: Media[];
  timestamp: string;
  expiresAt?: string;
  likes: number;
  comments: Comment[] | number;
  saved?: boolean;
  isPinned?: boolean;
  isVenuePost?: boolean;
}

export interface Media {
  id: string;
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
}

export interface VenueInsights {
  id: string;
  venueName: string;
  totalVisits: number;
  uniqueVisitors: number;
  averageRating: number;
  topReasons: Array<{reason: string; count: number}>;
  demographics: {
    ageGroups: {[key: string]: number};
    gender: {[key: string]: number};
  };
  visitsByDay: {[key: string]: number};
  visitsByHour: {[key: string]: number};
  competitorAnalysis?: Array<{
    name: string;
    visitors: number;
    rating: number;
    distance: number;
  }>;
  visitorCount: number;
  checkInCount: number;
  receiptUploads: number;
  discountRedemptions: number;
}
