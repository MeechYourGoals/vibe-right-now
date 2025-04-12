
export interface Post {
  id: string;
  user: User;
  location: Location;
  timestamp: string;
  text: string;
  content?: string; // Added for content property
  media?: Media[];
  likes: number;
  comments: number | Comment[]; // Updated to accept both number and Comment array
  liked?: boolean;
  saved?: boolean;
  categories?: string[];
  isPinned?: boolean; // Added for isPinned property
  isVenuePost?: boolean; // Added for isVenuePost property
  expiresAt?: string; // Added for expiresAt property
}

export interface Media {
  id: string;
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
}

export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  verified?: boolean;
  isCelebrity?: boolean;
  bio?: string; // Added for bio property
  isPrivate?: boolean; // Added for isPrivate property
  followers?: number; // Added for followers property
  following?: number; // Added for following property
}

export interface Location {
  id: string;
  name: string;
  address?: string;
  city: string;
  state: string;
  country?: string;
  lat: number;
  lng: number;
  rating?: number;
  price?: string;
  type?: string;
  verified?: boolean;
  hours?: BusinessHours;
  website?: string;
  phone?: string;
  email?: string;
  description?: string;
  vibes?: string[]; // Added for vibes property
  photos?: string[]; // Added for photos property
  tags?: string[]; // Added for tags property
  userProfile?: any; // Added for userProfile property
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

export interface Comment {
  id: string;
  postId: string;
  user: User;
  text: string;
  content?: string; // Added for content property
  timestamp: string;
  likes: number;
  vibedHere?: boolean; // Added for vibedHere property
}

// Add the VenueInsights interface
export interface VenueInsights {
  visitorCount: number;
  checkInCount: number;
  receiptUploads: number;
  discountRedemptions: number;
  userEngagement?: {
    likes: number;
    comments: number;
    shares: number;
  };
  demographics?: {
    ageGroups: Record<string, number>;
    genderDistribution: Record<string, number>;
  };
  peakHours?: Record<string, number>;
  popularItems?: Array<{
    name: string;
    count: number;
    revenue: number;
  }>;
}
