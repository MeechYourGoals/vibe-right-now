
export interface AdFormat {
  id: string;
  name: string;
  dimensions: string;
  type: 'image' | 'video' | 'carousel';
  specifications: {
    minWidth?: number;
    minHeight?: number;
    maxFileSize?: string;
    aspectRatio?: string;
    formats?: string[];
  };
}

export interface TargetingOptions {
  demographics: {
    ageRanges: string[];
    genders: string[];
    interests: string[];
  };
  geographic: {
    countries: string[];
    cities: string[];
    radius?: number;
  };
  locations: string[];
  behavioral: {
    deviceTypes: string[];
    platforms: string[];
    spendingHabits: string[];
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
