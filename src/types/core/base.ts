
// Basic type definitions for legacy imports
export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile {
  id: string;
  name: string;
  username: string;
  avatar: string;
  verified: boolean;
  bio?: string;
  followers?: number;
  following?: number;
  posts?: number;
}

export interface GeoCoordinates {
  lat: number;
  lng: number;
}

export interface Address {
  street?: string;
  city: string;
  state?: string;
  country: string;
  zip?: string;
}

export interface Timestamps {
  createdAt: string;
  updatedAt: string;
}
