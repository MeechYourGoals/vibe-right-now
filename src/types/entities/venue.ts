
// Location and venue related types
export interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  state?: string;
  country: string;
  zip?: string;
  lat: number;
  lng: number;
  type: "restaurant" | "bar" | "event" | "attraction" | "sports" | "other" | "nightclub" | "cafe";
  verified?: boolean;
  rating?: number;
  price_level?: number;
  vibes?: string[];
  tags?: string[];
  hours?: string | { [key: string]: string | { open: string; close: string; closed?: boolean } };
  phone?: string;
  website?: string;
  business_status?: string;
  google_maps_url?: string;
  isOpen24Hours?: boolean;
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
}
