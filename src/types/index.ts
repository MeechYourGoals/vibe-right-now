
// Add your type definitions here
export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio?: string;
  verified?: boolean;
  isCelebrity?: boolean;
  followers?: number;
  following?: number;
}

export type MediaObject = {
  type: "image" | "video";
  url: string;
  thumbnail?: string;
};

export type Media = MediaObject | string;

export interface Post {
  id: string;
  content: string;
  timestamp: string;
  expiresAt?: string;
  likes: number;
  comments: number;
  media?: Media[];
  user?: User;
  authorId: string;
  location?: Location;
  locationId: string;
  isPinned?: boolean;
  isVenuePost?: boolean;
  vibeTags?: string[];
  saved?: boolean;
}

export interface Comment {
  id: string;
  text?: string;
  content?: string;
  timestamp: string;
  user?: User; 
  author?: User;
  authorId?: string;
  vibedHere?: boolean;
  postId?: string;
}

export interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  state?: string;
  country?: string;
  zip?: string;
  lat: number;
  lng: number;
  type: string;
  verified?: boolean;
  hours?: BusinessHours;
  rating?: number;
  reviewCount?: number;
  geminiSummary?: string;
  distance?: number;
}

export interface BusinessHours {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
  isOpen?: boolean;
}

export interface VenueInsights {
  visitorsCount: number;
  checkInsCount: number;
  reviewsCount: number;
  photosCount: number;
  visitorsByTime: {
    timeSlot: string;
    count: number;
  }[];
  visitorsByDay: {
    day: string;
    count: number;
  }[];
  demographics: {
    ageRange: string;
    percentage: number;
  }[];
}

export interface AmenityFeature {
  icon: string;
  title: string;
  description?: string;
}

export interface SearchResult {
  id: string;
  type: "venue" | "event" | "user" | "post";
  title: string;
  subtitle?: string;
  image?: string;
  distance?: string;
  date?: string;
  rating?: number;
  reviewCount?: number;
}
