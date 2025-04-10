
export interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  lat: number;
  lng: number;
  type: "restaurant" | "bar" | "event" | "attraction" | "sports" | "other";
  verified?: boolean;
  vibes?: string[];
  hours?: BusinessHours;
}

export interface BusinessHours {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
  isOpen24Hours?: boolean;
}

export interface User {
  id: string;
  username: string;
  name: string;
  avatar: string;
  bio?: string;
  isPrivate?: boolean;
  isCelebrity?: boolean;
  verified?: boolean;
}

export interface Comment {
  id: string;
  postId: string;
  user: User;
  content: string;
  timestamp: string | Date;
  vibedHere: boolean;
}

export interface Post {
  id: string;
  user: User;
  location: Location;
  content: string;
  media: Media[];
  timestamp: string | Date;
  expiresAt?: string | Date;
  likes: number;
  comments: number;
  isPinned?: boolean;
}

export interface Media {
  type: "image" | "video";
  url: string;
  thumbnail?: string;
}

export interface VenueInsights {
  visitorCount: number;
  checkInCount: number;
  receiptUploads: number;
  discountRedemptions: number;
  popularHours: Record<string, number>;
  demographicData: {
    ageGroups: Record<string, number>;
    gender: Record<string, number>;
  };
  visitorTrends: {
    date: string;
    count: number;
  }[];
  mediaUploads: number; // Changed from object to number to match expected type
}

export interface EventItem {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  imageUrl?: string;
  ticketUrl?: string;
  price?: string;
  type?: "venue" | "sports" | "music" | "comedy" | "nightlife";
  vibes?: string[];
}
