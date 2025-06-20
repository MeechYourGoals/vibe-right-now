
import { BaseEntity, GeoCoordinates, Address, Timestamps } from '../core/base';

export interface Location extends BaseEntity, GeoCoordinates, Address, Timestamps {
  name: string;
  type: 'restaurant' | 'bar' | 'attraction' | 'hotel' | 'cafe' | 'club' | 'sports' | 'shopping' | 'entertainment';
  verified?: boolean;
  rating?: number;
  vibes?: string[];
  tags?: string[];
  state?: string;
  zip?: string;
}

export interface Venue extends Location {
  description?: string;
  hours?: string;
  phone?: string;
  website?: string;
  socialMedia?: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
  };
  amenities?: string[];
  priceRange?: '$' | '$$' | '$$$' | '$$$$';
  capacity?: number;
  ageRestriction?: number;
  dressCode?: string;
  reservationsRequired?: boolean;
  parkingAvailable?: boolean;
  wheelchairAccessible?: boolean;
}

export interface VenueInsights {
  venueId: string;
  totalVisits: number;
  uniqueVisitors: number;
  averageRating: number;
  topVibes: string[];
  busyHours: { hour: number; visitors: number }[];
  demographics: {
    ageGroups: { range: string; percentage: number }[];
    genderSplit: { male: number; female: number; other: number };
  };
  recentActivity: {
    posts: number;
    checkins: number;
    reviews: number;
  };
  trends: {
    period: string;
    visitChange: number;
    ratingChange: number;
  }[];
}
