
export interface AdFormat {
  id: string;
  name: string;
  type: string;
  description: string;
  dimensions?: string;
  duration?: string;
  platform?: string;
  kpis?: string[];
  placement?: string;
  specifications?: any;
  bestPractices?: string[];
}

export interface GenderTargeting {
  all: boolean;
  male: boolean;
  female: boolean;
  other: boolean;
}

export interface TargetingOptions {
  ageRange?: {
    min: number;
    max: number;
  };
  ageRanges?: any[];
  locations?: string[];
  interests: string[];
  gender?: GenderTargeting;
  demographics?: {
    gender?: string;
    ageRange?: number[] | { min: number; max: number };
    interests?: string[];
    behaviors?: string[];
    location?: string[];
  };
  geographic?: {
    radius?: number;
    cities?: string[];
    regions?: string[];
  };
  behaviors?: {
    categories?: string[];
    frequency?: string;
    venueVisits?: string[];
    socialEngagement?: string[];
    purchaseHistory?: string[];
  };
  contextual?: {
    categories?: string[];
    frequency?: string;
    vibeTags?: string[];
    venueTypes?: string[];
    daypart?: string[];
    timeOfDay?: string[];
    dayOfWeek?: string[];
    weather?: string[];
    eventTypes?: string[];
  };
  momentScore?: {
    min?: number;
    max?: number;
    crowdDensity?: string;
    vibeScore?: string;
    crowdLevel?: string;
    engagement?: string;
  } | string;
}

export interface AdCampaign {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'completed';
  budget: number;
  spent: number;
  startDate: string;
  endDate: string;
  targeting: TargetingOptions;
  formats: AdFormat[];
  metrics: {
    impressions: number;
    clicks: number;
    conversions: number;
    ctr: number;
    cpc: number;
    roas: number;
  };
}
