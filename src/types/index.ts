export interface User {
  id: string;
  username: string;
  fullName: string;
  avatarUrl: string;
  bio?: string;
  location?: string;
  website?: string;
  email?: string;
  phone?: string;
  isVerified?: boolean;
}

export interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  lat: number;
  lng: number;
  type: string;
  verified: boolean;
}

export interface Media {
  type: "image" | "video";
  url: string;
}

export interface Post {
  id: string;
  user: User;
  location: Location;
  content: string;
  media: Media[];
  timestamp: string;
  expiresAt: string;
  likes: number;
  comments: number;
  isPinned?: boolean;
  saved: boolean;
}

// Update Comment interface to include text and likes properties
export interface Comment {
  id: string;
  postId: string;
  user: User;
  content: string;
  text?: string; // Add this to maintain compatibility
  timestamp: string;
  vibedHere: boolean;
  likes?: number; // Add this to maintain compatibility
}

export interface Vibe {
  id: string;
  name: string;
  icon: string;
  color: string;
}

