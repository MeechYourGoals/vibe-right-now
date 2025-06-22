
export interface AdFormat {
  id: string;
  name: string;
  type: string;
  description: string;
  dimensions?: string;
  duration?: string;
  platform?: string;
  kpis?: string[];
}

export interface GenderTargeting {
  all: boolean;
  male: boolean;
  female: boolean;
  other: boolean;
}

export interface TargetingOptions {
  ageRange: {
    min: number;
    max: number;
  };
  gender: GenderTargeting;
  demographics: {
    income: string[];
    education: string[];
  };
  behaviors: string[];
  contextual: string[];
  momentScore: {
    min: number;
    max: number;
  };
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
