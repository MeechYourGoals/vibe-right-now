export interface Post {
  id: string;
  user: User;
  location: Location;
  timestamp: string;
  text: string;
  media?: Media[];
  likes: number;
  comments: number;
  liked?: boolean;
  saved?: boolean;
  categories?: string[];
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
  timestamp: string;
  likes: number;
}
