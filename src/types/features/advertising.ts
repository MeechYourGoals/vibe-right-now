
import { GeoCoordinates } from '../core/base';

// Advertising and marketing types
export interface Campaign {
  id: string;
  name: string;
  type: CampaignType;
  status: CampaignStatus;
  budget: CampaignBudget;
  targeting: TargetingOptions;
  creative: CreativeAssets;
  schedule: CampaignSchedule;
  performance: CampaignPerformance;
  analytics: CampaignAnalytics;
}

export type CampaignType = 'brand_awareness' | 'engagement' | 'traffic' | 'conversions' | 'app_installs';
export type CampaignStatus = 'draft' | 'active' | 'paused' | 'completed' | 'archived';

export interface CampaignBudget {
  type: 'daily' | 'lifetime';
  amount: number;
  currency: string;
  spent: number;
  remaining: number;
}

export interface TargetingOptions {
  demographics: {
    gender: 'male' | 'female' | 'all' | 'other';
    ageRange?: [number, number];
    interests?: string[];
    behaviors?: string[];
    location?: string[];
  };
  geographic: {
    countries?: string[];
    regions?: string[];
    cities?: string[];
    radius?: number;
    coordinates?: GeoCoordinates;
  };
  interests: string[];
  behaviors: string[];
  customAudiences: string[];
  lookalikes: LookalikeAudience[];
  momentScore: {
    min: number;
    max: number;
    weight: number;
  };
}

export interface LookalikeAudience {
  id: string;
  name: string;
  sourceAudience: string;
  similarity: number;
  size: number;
}

export interface CreativeAssets {
  primary: CreativeAsset;
  variants: CreativeAsset[];
  adCopy: AdCopy[];
  callToAction: CallToAction;
}

export interface CreativeAsset {
  id: string;
  type: 'image' | 'video' | 'carousel' | 'collection';
  url: string;
  dimensions: {
    width: number;
    height: number;
  };
  duration?: number;
  fileSize: number;
}

export interface AdCopy {
  headline: string;
  description: string;
  displayUrl?: string;
  variants: string[];
}

export interface CallToAction {
  type: CTAType;
  text: string;
  url?: string;
  deepLink?: string;
}

export type CTAType = 'learn_more' | 'shop_now' | 'sign_up' | 'download' | 'book_now' | 'call_now' | 'get_directions';

export interface CampaignSchedule {
  startDate: Date;
  endDate?: Date;
  timezone: string;
  dayParting?: DayPartingRule[];
  frequencyCap?: FrequencyCap;
}

export interface DayPartingRule {
  days: number[];
  startHour: number;
  endHour: number;
  bidModifier: number;
}

export interface FrequencyCap {
  impressions: number;
  timeWindow: 'hour' | 'day' | 'week';
}

export interface CampaignPerformance {
  impressions: number;
  clicks: number;
  conversions: number;
  spend: number;
  ctr: number;
  cpc: number;
  cpm: number;
  cpa: number;
  roas: number;
}

export interface CampaignAnalytics {
  reach: number;
  frequency: number;
  engagement: EngagementMetrics;
  demographics: DemographicBreakdown;
  placements: PlacementPerformance[];
  timeline: TimelineMetrics[];
}

export interface EngagementMetrics {
  likes: number;
  shares: number;
  comments: number;
  saves: number;
  videoViews: number;
  videoCompletions: number;
}

export interface DemographicBreakdown {
  age: Record<string, number>;
  gender: Record<string, number>;
  location: Record<string, number>;
  interests: Record<string, number>;
}

export interface PlacementPerformance {
  placement: string;
  impressions: number;
  clicks: number;
  spend: number;
  performance: number;
}

export interface TimelineMetrics {
  date: Date;
  impressions: number;
  clicks: number;
  spend: number;
  conversions: number;
}

// Ad formats and specifications
export interface AdFormat {
  id: string;
  name: string;
  platform: Platform;
  dimensions: AdDimensions[];
  specifications: FormatSpecifications;
  bestPractices: string[];
}

export type Platform = 'facebook' | 'instagram' | 'google' | 'tiktok' | 'twitter' | 'linkedin' | 'pinterest';

export interface AdDimensions {
  width: number;
  height: number;
  aspectRatio: string;
  recommended: boolean;
}

export interface FormatSpecifications {
  fileTypes: string[];
  maxFileSize: number;
  maxDuration?: number;
  textLimits: TextLimits;
  audioRequired?: boolean;
}

export interface TextLimits {
  headline?: number;
  description?: number;
  displayUrl?: number;
}

// Audience management
export interface Audience {
  id: string;
  name: string;
  type: AudienceType;
  size: number;
  criteria: AudienceCriteria;
  performance: AudiencePerformance;
  lastUpdated: Date;
}

export type AudienceType = 'saved' | 'custom' | 'lookalike' | 'retargeting' | 'behavioral';

export interface AudienceCriteria {
  demographics: TargetingOptions['demographics'];
  interests: string[];
  behaviors: string[];
  locations: LocationCriteria[];
  devices: DeviceCriteria[];
  connections: ConnectionCriteria[];
}

export interface LocationCriteria {
  type: 'country' | 'region' | 'city' | 'postal_code' | 'radius';
  value: string;
  radius?: number;
  include: boolean;
}

export interface DeviceCriteria {
  platforms: ('mobile' | 'desktop' | 'tablet')[];
  operatingSystems: string[];
  browsers: string[];
  connectionTypes: ('wifi' | 'cellular')[];
}

export interface ConnectionCriteria {
  type: 'fans' | 'friends_of_fans' | 'exclude_fans';
  pageIds: string[];
}

export interface AudiencePerformance {
  reach: number;
  engagement: number;
  conversionRate: number;
  averageCost: number;
  qualityScore: number;
}

// Bid management
export interface BidStrategy {
  type: BidType;
  amount?: number;
  target?: BidTarget;
  constraints?: BidConstraints;
  optimization: OptimizationGoal;
}

export type BidType = 'manual' | 'automatic' | 'target_cost' | 'target_roas' | 'maximum_delivery';

export interface BidTarget {
  metric: 'cpc' | 'cpm' | 'cpa' | 'roas';
  value: number;
}

export interface BidConstraints {
  minBid?: number;
  maxBid?: number;
  budgetPacing?: 'standard' | 'accelerated';
}

export type OptimizationGoal = 'impressions' | 'clicks' | 'conversions' | 'reach' | 'engagement';

// Attribution and tracking
export interface AttributionModel {
  id: string;
  name: string;
  type: AttributionType;
  lookbackWindow: LookbackWindow;
  weightingRules: WeightingRule[];
}

export type AttributionType = 'last_click' | 'first_click' | 'linear' | 'time_decay' | 'position_based' | 'data_driven';

export interface LookbackWindow {
  click: number;
  view: number;
  unit: 'hours' | 'days';
}

export interface WeightingRule {
  position: 'first' | 'middle' | 'last';
  weight: number;
  conditions?: string[];
}

export interface ConversionTracking {
  pixelId: string;
  events: TrackedEvent[];
  attribution: AttributionModel;
  deduplication: DeduplicationSettings;
}

export interface TrackedEvent {
  name: string;
  type: EventType;
  value?: number;
  currency?: string;
  parameters: Record<string, any>;
}

export type EventType = 'page_view' | 'purchase' | 'add_to_cart' | 'lead' | 'sign_up' | 'custom';

export interface DeduplicationSettings {
  enabled: boolean;
  window: number;
  method: 'last_click' | 'highest_value';
}

// Creative optimization
export interface CreativeTest {
  id: string;
  name: string;
  status: TestStatus;
  type: TestType;
  variants: CreativeVariant[];
  allocation: TrafficAllocation;
  results: TestResults;
  duration: TestDuration;
}

export type TestStatus = 'draft' | 'running' | 'paused' | 'completed' | 'failed';
export type TestType = 'ab' | 'multivariate' | 'dynamic' | 'sequential';

export interface CreativeVariant {
  id: string;
  name: string;
  assets: CreativeAssets;
  weight: number;
  performance: VariantPerformance;
}

export interface TrafficAllocation {
  method: 'equal' | 'weighted' | 'performance_based';
  rampUp: boolean;
  minTraffic: number;
}

export interface TestResults {
  winner?: string;
  confidence: number;
  significance: number;
  improvement: number;
  metrics: TestMetrics;
}

export interface TestMetrics {
  [variantId: string]: {
    impressions: number;
    clicks: number;
    conversions: number;
    cost: number;
  };
}

export interface TestDuration {
  startDate: Date;
  endDate?: Date;
  minRunTime: number;
  maxRunTime?: number;
  earlyStop: boolean;
}

export interface VariantPerformance {
  impressions: number;
  clicks: number;
  conversions: number;
  ctr: number;
  conversionRate: number;
  cost: number;
}

// Budget and pacing
export interface BudgetPlan {
  total: number;
  daily: number;
  currency: string;
  pacing: PacingStrategy;
  adjustments: BudgetAdjustment[];
  forecasts: BudgetForecast[];
}

export interface PacingStrategy {
  type: 'standard' | 'accelerated' | 'custom';
  rules: PacingRule[];
  optimization: PacingOptimization;
}

export interface PacingRule {
  timeOfDay: {
    start: string;
    end: string;
  };
  dayOfWeek: number[];
  multiplier: number;
  priority: number;
}

export interface PacingOptimization {
  goal: 'even_delivery' | 'performance_based' | 'cost_efficiency';
  aggressiveness: number;
  constraints: string[];
}

export interface BudgetAdjustment {
  date: Date;
  amount: number;
  reason: string;
  automatic: boolean;
}

export interface BudgetForecast {
  date: Date;
  projected: number;
  confidence: number;
  factors: string[];
}
