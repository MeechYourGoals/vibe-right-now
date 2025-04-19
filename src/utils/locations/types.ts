
import { User } from "@/types";

export interface MockUserProfile {
  userId: string;
  username: string;
  displayName: string;
  avatar: string;
  isVerified: boolean;
}

export interface LocationHours {
  [day: string]: string;
}

export interface LocationDetails {
  id: string;
  name: string;
  description?: string;
  address: string;
  city: string;
  state?: string;
  zip?: string;
  country: string;
  lat: number;
  lng: number;
  type: string;
  phone?: string;
  website?: string;
  hours?: LocationHours;
  ratings?: number;
  reviewCount?: number;
  price?: string;
  tags?: string[];
  vibes?: string[];
  verified: boolean;
  userProfile?: MockUserProfile;
}
