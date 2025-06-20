
import { BaseEntity } from '../core/base';

export interface Ad extends BaseEntity {
  title: string;
  content: string;
}

// Extended AdFormat for compatibility
export interface AdFormat {
  id: string;
  name: string;
  type: string;
  description?: string;
  duration?: number | string;
  platform?: string;
  dimensions?: string;
  kpis?: string[];
  placement?: string;
  specifications?: any;
  bestPractices?: string[];
}

// Fix TargetingOptions to match actual component usage
export interface TargetingOptions {
  ageRanges: string[];
  locations: string[];
  interests: string[];
  gender: GenderTargeting;
  ageRange: { min: number; max: number };
  location: string;
  demographics?: {
    gender: GenderTargeting | string;
    ageRange: { min: number; max: number } | number[];
    interests?: string[];
    behaviors?: string[];
    location?: string[];
  };
  geographic?: {
    radius: number;
    cities: string[];
    regions: string[];
  };
  behaviors?: {
    categories: string[];
    frequency: string;
    venueVisits?: string[];
    socialEngagement?: string[];
    purchaseHistory?: string[];
  };
  contextual?: {
    categories: string[];
    frequency: string;
    vibeTags?: string[];
    venueTypes?: string[];
    daypart?: string[];
    timeOfDay?: string[];
    dayOfWeek?: string[];
    weather?: string[];
    eventTypes?: string[];
  };
  momentScore?: number | {
    crowdDensity: string;
    vibeScore: string;
    crowdLevel: string;
    engagement: string;
  };
}

export interface GenderTargeting {
  all: boolean;
  male: boolean;
  female: boolean;
  other: boolean;
}
