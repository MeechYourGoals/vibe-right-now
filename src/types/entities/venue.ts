// Location and venue related types
import { MockUserProfile } from "@/mock/users";

export interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  country: string;
  zip: string;
  lat: number;
  lng: number;
  type: "restaurant" | "bar" | "event" | "attraction" | "sports" | "other";
  verified: boolean;
  rating?: number;
  vibes?: string[];
  tags?: string[];
  createdAt?: Date;
  updatedAt?: Date;
  description?: string;
  phone?: string;
  website?: string;
  hours?: BusinessHours;
  images?: string[];
  userProfile?: MockUserProfile;
  priceRange?: '$' | '$$' | '$$$' | '$$$$';
  features?: VenueFeature[];
  socialMedia?: SocialMediaLinks;
  capacity?: number;
  ageRestriction?: number;
  dresscode?: string;
  reservationRequired?: boolean;
  parkingAvailable?: boolean;
  accessibilityFeatures?: string[];
  cuisine?: string[];
  ambiance?: string[];
  musicGenres?: string[];
  eventTypes?: string[];
  popularTimes?: PopularTime[];
  checkinCount?: number;
  followersCount?: number;
  averageStay?: number;
  peakHours?: string[];
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface VenueHours {
  monday: { open: string; close: string; closed?: boolean };
  tuesday: { open: string; close: string; closed?: boolean };
  wednesday: { open: string; close: string; closed?: boolean };
  thursday: { open: string; close: string; closed?: boolean };
  friday: { open: string; close: string; closed?: boolean };
  saturday: { open: string; close: string; closed?: boolean };
  sunday: { open: string; close: string; closed?: boolean };
  isOpen24Hours?: boolean;
}

export interface VenueInsights {
  totalVibes: number;
  avgRating: number;
  topVibeWords: string[];
  recentActivity: number;
  peakHours: string[];
  crowdLevel: 'low' | 'medium' | 'high';
  priceRange: '$' | '$$' | '$$$' | '$$$$';
  ageGroup: string;
  atmosphere: string[];
  visitorCount?: number;
  visitors?: number;
  checkInCount?: number;
  receiptUploads?: number;
  discountRedemptions?: number;
}
