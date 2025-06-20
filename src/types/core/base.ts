export interface BaseEntity {
  id: string;
}

export interface Address {
  address: string;
  city: string;
  state?: string;
  country: string;
  zip?: string;
}

export interface GeoCoordinates {
  lat: number;
  lng: number;
}

export interface Timestamps {
  createdAt: string;
  updatedAt: string;
}

// User profile related types
export interface UserProfile {
  id: string;
  username: string;
  name: string;
  displayName?: string;
  avatar: string;
  bio?: string;
  verified: boolean;
  isPrivate?: boolean;
  isCelebrity?: boolean;
  followers?: number;
  following?: number;
  posts?: number;
}

export interface SearchParams {
  query?: string;
  category?: string;
  location?: string;
  rating?: number;
  price_level?: number;
  vibes?: string[];
  tags?: string[];
  page?: number;
  limit?: number;
  sort?: string;
  order?: string;
}

export interface ApiResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}
