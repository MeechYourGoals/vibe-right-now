
import { GeoCoordinates } from '../core/base';

// Core advertising types
export interface AdCampaign {
  id: string;
  name: string;
  description?: string;
  status: CampaignStatus;
  budget: CampaignBudget;
  schedule: CampaignSchedule;
  targeting: TargetingOptions;
  creatives: AdCreative[];
  metrics: CampaignMetrics;
  createdAt: Date;
  updatedAt: Date;
}

export type CampaignStatus = 'draft' | 'active' | 'paused' | 'completed' | 'archived';

export interface CampaignBudget {
  total: number;
  daily?: number;
  currency: string;
  bidStrategy: 'automatic' | 'manual';
  maxCpc?: number;
}

export interface CampaignSchedule {
  startDate: Date;
  endDate?: Date;
  timezone: string;
  dayParting?: DayPartingRule[];
}

export interface DayPartingRule {
  days: number[]; // 0-6 (Sunday-Saturday)
  startHour: number; // 0-23
  endHour: number; // 0-23
  bidModifier?: number; // Percentage modifier
}

// Targeting system
export interface TargetingOptions {
  demographics: Demographics;
  geographic: GeographicTargeting;
  behaviors: BehavioralTargeting;
  interests: InterestTargeting;
  contextual: ContextualTargeting;
  momentScore: MomentScoring;
}

export interface Demographics {
  gender: 'all' | 'male' | 'female' | 'other';
  ageRange?: [number, number];
  interests?: string[];
  behaviors?: string[];
  location?: string[];
}

export interface GeographicTargeting {
  countries?: string[];
  regions?: string[];
  cities?: string[];
  radius?: number; // km
  coordinates?: GeoCoordinates;
}

export interface BehavioralTargeting {
  venueTypes: string[];
  visitFrequency: 'high' | 'medium' | 'low';
  spendingHabits: 'premium' | 'moderate' | 'budget';
  socialActivity: 'high' | 'medium' | 'low';
  timePreferences: string[];
}

export interface InterestTargeting {
  categories: string[];
  keywords: string[];
  competitors?: string[];
  lookalike?: LookalikeAudience;
}

export interface ContextualTargeting {
  venueCategories: string[];
  eventTypes: string[];
  weatherConditions?: string[];
  timeOfDay?: string[];
  dayOfWeek?: string[];
}

export interface LookalikeAudience {
  sourceVenueId: string;
  similarity: number; // 1-10
  size: 'narrow' | 'balanced' | 'broad';
}

// Moment-based targeting
export interface MomentScoring {
  min: number;
  max: number;
  weight: number;
  hypeLevel?: number;
}

// Creative management
export interface AdCreative {
  id: string;
  name: string;
  format: AdFormat;
  assets: CreativeAsset[];
  copy: AdCopy;
  callToAction: CallToAction;
  status: CreativeStatus;
  performance: CreativePerformance;
}

export interface AdFormat {
  id: string;
  name: string;
  description: string;
  type: string;
  placement: string;
  platform: string;
  dimensions: {
    width: number;
    height: number;
  };
  specifications: FormatSpecification[];
  bestPractices: string[];
  kpis: string[];
}

export interface FormatSpecification {
  property: string;
  requirement: string;
  value?: string | number;
}

export interface CreativeAsset {
  id: string;
  type: 'image' | 'video' | 'audio' | 'text';
  url: string;
  metadata: AssetMetadata;
}

export interface AssetMetadata {
  filename: string;
  size: number;
  dimensions?: {
    width: number;
    height: number;
  };
  duration?: number; // for video/audio
  format: string;
  alt?: string;
}

export interface AdCopy {
  headline: string;
  description: string;
  disclaimer?: string;
  localizations?: Record<string, Partial<AdCopy>>;
}

export interface CallToAction {
  text: string;
  action: CTAAction;
  url?: string;
  trackingParams?: Record<string, string>;
}

export type CTAAction = 
  | 'visit_venue'
  | 'book_table'
  | 'view_menu'
  | 'get_directions'
  | 'call_venue'
  | 'learn_more'
  | 'download_app'
  | 'sign_up';

export type CreativeStatus = 'draft' | 'pending_review' | 'approved' | 'rejected' | 'active' | 'paused';

// Performance tracking
export interface CampaignMetrics {
  impressions: number;
  clicks: number;
  conversions: number;
  spend: number;
  revenue?: number;
  ctr: number; // Click-through rate
  cpc: number; // Cost per click
  cpa: number; // Cost per acquisition
  roas?: number; // Return on ad spend
  frequency: number;
  reach: number;
}

export interface CreativePerformance extends CampaignMetrics {
  engagementRate: number;
  viewRate?: number; // for video
  completionRate?: number; // for video
}

// Advanced features
export interface DynamicAdContent {
  template: string;
  dataSource: DataSource;
  rules: ContentRule[];
  fallbacks: FallbackContent[];
}

export interface DataSource {
  type: 'venue_feed' | 'event_feed' | 'menu_items' | 'reviews';
  endpoint?: string;
  refreshInterval: number; // minutes
  filters?: Record<string, any>;
}

export interface ContentRule {
  condition: string;
  template: string;
  priority: number;
}

export interface FallbackContent {
  condition: string;
  content: AdCopy;
  priority: number;
}

// Attribution and conversion tracking
export interface ConversionEvent {
  id: string;
  campaignId: string;
  creativeId: string;
  eventType: ConversionType;
  value?: number;
  currency?: string;
  timestamp: Date;
  attributionWindow: number; // hours
  touchpoints: AttributionTouchpoint[];
}

export type ConversionType = 
  | 'reservation'
  | 'purchase'
  | 'signup'
  | 'app_install'
  | 'venue_visit'
  | 'menu_view'
  | 'review_submission';

export interface AttributionTouchpoint {
  campaignId: string;
  creativeId: string;
  timestamp: Date;
  platform: string;
  contribution: number; // percentage
}

// A/B testing
export interface AdExperiment {
  id: string;
  name: string;
  description: string;
  status: ExperimentStatus;
  variants: ExperimentVariant[];
  trafficSplit: Record<string, number>;
  metrics: ExperimentMetrics;
  duration: number; // days
  confidenceLevel: number;
  startDate: Date;
  endDate?: Date;
}

export type ExperimentStatus = 'draft' | 'running' | 'completed' | 'cancelled';

export interface ExperimentVariant {
  id: string;
  name: string;
  creative: AdCreative;
  targeting?: Partial<TargetingOptions>;
  weight: number; // percentage of traffic
}

export interface ExperimentMetrics {
  variants: Record<string, VariantMetrics>;
  winner?: string;
  confidence: number;
  significance: number;
}

export interface VariantMetrics extends CampaignMetrics {
  conversionRate: number;
  improvement?: number; // percentage vs control
  confidenceInterval: [number, number];
}

// Platform integrations
export interface PlatformIntegration {
  platform: AdPlatform;
  status: IntegrationStatus;
  credentials: PlatformCredentials;
  capabilities: PlatformCapability[];
  lastSync: Date;
  syncErrors?: SyncError[];
}

export type AdPlatform = 
  | 'google_ads'
  | 'facebook_ads'
  | 'instagram_ads'
  | 'tiktok_ads'
  | 'snapchat_ads'
  | 'twitter_ads'
  | 'linkedin_ads';

export type IntegrationStatus = 'connected' | 'disconnected' | 'error' | 'syncing';

export interface PlatformCredentials {
  accountId: string;
  accessToken?: string;
  refreshToken?: string;
  expiresAt?: Date;
  scope?: string[];
}

export interface PlatformCapability {
  feature: string;
  supported: boolean;
  limitations?: string[];
}

export interface SyncError {
  timestamp: Date;
  error: string;
  severity: 'warning' | 'error' | 'critical';
  resolved: boolean;
}
