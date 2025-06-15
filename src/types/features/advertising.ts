
// Advertising-related types for campaigns and targeting

export interface AdFormat {
  id: string;
  name: string;
  type: 'image' | 'video' | 'carousel' | 'text' | 'MomentCard' | 'VibeOverlay' | 'SpawnPoint' | 'HeatRingTakeover';
  description?: string;
  duration?: string;
  placement?: string;
  kpis?: string[];
  dimensions?: {
    width: number;
    height: number;
  };
  maxFileSize?: number;
  supportedFormats?: string[];
}

export interface TargetingOptions {
  demographics: {
    ageRange?: [number, number];
    gender?: 'all' | 'male' | 'female' | 'other';
    interests?: string[];
    behaviors?: string[];
    location?: string[];
  };
  geographic: {
    countries?: string[];
    regions?: string[];
    cities?: string[];
    radius?: number;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  platform: {
    devices?: ('mobile' | 'desktop' | 'tablet')[];
    operatingSystems?: string[];
    browsers?: string[];
  };
  budget: {
    dailyBudget?: number;
    totalBudget?: number;
    bidStrategy?: 'automatic' | 'manual';
    maxCpc?: number;
  };
  behavioral: {
    pastAttendance?: string[];
    clipHistory?: string[];
    tripsIntent?: boolean;
  };
  contextual: {
    vibeTags?: string[];
    venueTypes?: string[];
    daypart?: string[];
  };
  momentScore: {
    hypeLevel?: number;
    crowdDensity?: number;
  };
}

export interface AdCampaign {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'completed' | 'draft';
  format: AdFormat;
  targeting: TargetingOptions;
  createdAt: Date;
  updatedAt: Date;
  startDate: Date;
  endDate?: Date;
  budget: number;
  spent: number;
  impressions: number;
  clicks: number;
  conversions: number;
}
