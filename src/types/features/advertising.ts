
export interface AdFormat {
  id: string;
  name: string;
  description: string;
  type: 'MomentCard' | 'VibeOverlay' | 'SpawnPoint' | 'HeatRingTakeover';
  duration?: string;
  placement: string;
  kpis: string[];
  platform: string;
  dimensions: string;
  specifications: {
    minWidth?: number;
    minHeight?: number;
    maxFileSize?: string;
    aspectRatio?: string;
    formats?: string[];
    duration?: number;
    autoplay?: boolean;
    opacity?: number;
    blendMode?: string;
    triggers?: string[];
    customColor?: boolean;
  };
  bestPractices: string[];
}

export interface GenderTargeting {
  all: boolean;
  male: boolean;
  female: boolean;
  other: boolean;
}

export interface TargetingOptions {
  ageRanges: string[];
  locations: string[];
  interests: string[];
  gender?: GenderTargeting;
  demographics?: {
    gender: string;
    ageRange: number[] | { min: number; max: number };
    interests: string[];
    behaviors: string[];
    location: string[];
  };
  geographic?: {
    radius: number;
    cities: string[];
    regions: string[];
  };
  behaviors?: {
    categories: string[];
    frequency: string;
    venueVisits: string[];
    socialEngagement: string[];
    purchaseHistory: string[];
  };
  contextual?: {
    categories: string[];
    frequency: string;
    vibeTags: string[];
    venueTypes: string[];
    daypart: string[];
    timeOfDay: string[];
    dayOfWeek: string[];
    weather: string[];
    eventTypes: string[];
  };
  momentScore?: string | {
    crowdDensity: string;
    vibeScore: string;
    crowdLevel: string;
    engagement: string;
  };
}

export interface AdCampaign {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'completed';
  budget: number;
  spent: number;
  impressions: number;
  clicks: number;
  conversions: number;
  startDate: string;
  endDate?: string;
  targeting: TargetingOptions;
  createdAt: string;
  updatedAt: string;
}

export interface AdMetrics {
  impressions: number;
  clicks: number;
  conversions: number;
  ctr: number;
  cpc: number;
  cpm: number;
  roas: number;
}
