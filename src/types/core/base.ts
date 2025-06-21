
export interface BaseEntity {
  id: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface GeoCoordinates {
  lat: number;
  lng: number;
}

export interface Address {
  address: string;
  city: string;
  state?: string;
  country: string;
  zip?: string;
}

export interface Timestamps {
  createdAt?: string;
  updatedAt?: string;
}

export interface UserProfile {
  username: string;
  name: string;
  avatar: string;
  bio?: string;
  verified?: boolean;
  posts?: number;
  followers?: number;
  following?: number;
  isPrivate?: boolean;
}
