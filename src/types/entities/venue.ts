
import { BaseEntity, GeoCoordinates, Address, Timestamps } from '../core/base';

export type LocationType = 
  | 'restaurant' 
  | 'bar' 
  | 'attraction' 
  | 'hotel' 
  | 'cafe' 
  | 'club' 
  | 'sports' 
  | 'shopping' 
  | 'entertainment' 
  | 'event'
  | 'other'
  | 'city'
  | 'nightlife'
  | 'nightclub'
  | 'music'
  | 'comedy';

export interface Location extends BaseEntity, GeoCoordinates, Address, Timestamps {
  name: string;
  type: LocationType;
  verified?: boolean;
  rating?: number;
  vibes?: string[];
  tags?: string[];
  hours?: string | {
    [key: string]: string | { open: string; close: string; closed?: boolean; isOpen24Hours?: boolean; };
  };
  phone?: string;
  website?: string;
  google_maps_url?: string;
  business_status?: string;
  price_level?: number;
}

export interface Venue extends Location {
  description?: string;
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
