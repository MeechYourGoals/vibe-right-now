
import { GeoCoordinates } from '../core/base';

// Analytics and reporting types
export interface AnalyticsData {
  timeframe: TimeFrame;
  metrics: Metric[];
  dimensions: Dimension[];
  filters: Filter[];
}

export interface TimeFrame {
  start: Date;
  end: Date;
  granularity: 'hour' | 'day' | 'week' | 'month' | 'year';
}

export interface Metric {
  name: string;
  value: number;
  change?: number;
  changeType?: 'increase' | 'decrease' | 'stable';
  format: 'number' | 'percentage' | 'currency' | 'duration';
}

export interface Dimension {
  name: string;
  values: DimensionValue[];
}

export interface DimensionValue {
  key: string;
  value: string | number;
  metrics: Record<string, number>;
}

export interface Filter {
  dimension: string;
  operator: 'equals' | 'not_equals' | 'contains' | 'greater_than' | 'less_than' | 'between';
  value: any;
}

// Venue analytics
export interface VenueAnalytics {
  venueId: string;
  period: AnalyticsPeriod;
  overview: VenueOverview;
  visitors: VisitorAnalytics;
  content: ContentAnalytics;
  engagement: EngagementAnalytics;
  revenue: RevenueAnalytics;
  comparisons: ComparisonData[];
}

export type AnalyticsPeriod = 'day' | 'week' | 'month' | 'quarter' | 'year';

export interface VenueOverview {
  totalVisitors: number;
  uniqueVisitors: number;
  averageVisitDuration: number;
  bounceRate: number;
  conversionRate: number;
  satisfaction: number;
}

export interface VisitorAnalytics {
  demographics: VisitorDemographics;
  behavior: VisitorBehavior;
  acquisition: VisitorAcquisition;
  retention: VisitorRetention;
}

export interface VisitorDemographics {
  ageGroups: Record<string, number>;
  genders: Record<string, number>;
  locations: LocationData[];
  interests: Record<string, number>;
}

export interface LocationData {
  coordinates: GeoCoordinates;
  count: number;
  city?: string;
  region?: string;
  country?: string;
}

export interface VisitorBehavior {
  peakHours: number[];
  averageStayTime: number;
  repeatVisitRate: number;
  pathAnalysis: PathData[];
}

export interface PathData {
  from: string;
  to: string;
  count: number;
  conversionRate: number;
}

export interface VisitorAcquisition {
  sources: SourceData[];
  campaigns: CampaignData[];
  referrals: ReferralData[];
}

export interface SourceData {
  source: string;
  visitors: number;
  conversions: number;
  cost?: number;
}

export interface CampaignData {
  name: string;
  type: string;
  reach: number;
  engagement: number;
  cost: number;
  roi: number;
}

export interface ReferralData {
  referrer: string;
  visits: number;
  quality: number;
}

export interface VisitorRetention {
  returnRate: number;
  frequency: FrequencyData[];
  loyalty: LoyaltySegment[];
}

export interface FrequencyData {
  visits: number;
  userCount: number;
  percentage: number;
}

export interface LoyaltySegment {
  segment: string;
  userCount: number;
  value: number;
  characteristics: string[];
}

export interface ContentAnalytics {
  posts: PostAnalytics[];
  media: MediaAnalytics;
  engagement: ContentEngagementAnalytics;
}

export interface PostAnalytics {
  postId: string;
  views: number;
  likes: number;
  shares: number;
  comments: number;
  engagement: number;
  reach: number;
}

export interface MediaAnalytics {
  images: MediaMetrics;
  videos: MediaMetrics;
  totalStorage: number;
  bandwidthUsage: number;
}

export interface MediaMetrics {
  count: number;
  views: number;
  downloads: number;
  averageEngagement: number;
}

export interface ContentEngagementAnalytics {
  totalEngagement: number;
  engagementRate: number;
  topContent: TopContentItem[];
  viralContent: ViralContentItem[];
}

export interface TopContentItem {
  contentId: string;
  title: string;
  type: string;
  engagement: number;
  reach: number;
}

export interface ViralContentItem {
  contentId: string;
  viralScore: number;
  shareVelocity: number;
  peakReach: number;
}

export interface EngagementAnalytics {
  overall: OverallEngagement;
  byType: Record<string, EngagementMetrics>;
  trends: EngagementTrend[];
  sentiment: SentimentAnalytics;
}

export interface OverallEngagement {
  rate: number;
  total: number;
  averagePerUser: number;
  growthRate: number;
}

export interface EngagementMetrics {
  likes: number;
  comments: number;
  shares: number;
  saves: number;
  clicks: number;
}

export interface EngagementTrend {
  date: Date;
  engagement: number;
  reach: number;
  impressions: number;
}

export interface SentimentAnalytics {
  overall: number; // -1 to 1
  distribution: SentimentDistribution;
  trends: SentimentTrend[];
  topics: SentimentTopic[];
}

export interface SentimentDistribution {
  positive: number;
  neutral: number;
  negative: number;
}

export interface SentimentTrend {
  date: Date;
  sentiment: number;
  volume: number;
}

export interface SentimentTopic {
  topic: string;
  sentiment: number;
  mentions: number;
  keywords: string[];
}

export interface RevenueAnalytics {
  total: number;
  bySource: RevenueSource[];
  trends: RevenueTrend[];
  forecasts: RevenueForecast[];
}

export interface RevenueSource {
  source: string;
  amount: number;
  percentage: number;
  growth: number;
}

export interface RevenueTrend {
  date: Date;
  revenue: number;
  orders: number;
  averageOrderValue: number;
}

export interface RevenueForecast {
  date: Date;
  predicted: number;
  confidence: number;
  factors: string[];
}

export interface ComparisonData {
  metric: string;
  current: number;
  previous: number;
  change: number;
  benchmark?: number;
}

// Real-time analytics
export interface RealTimeAnalytics {
  timestamp: Date;
  activeUsers: number;
  currentEvents: LiveEvent[];
  alerts: AnalyticsAlert[];
  performance: PerformanceMetrics;
}

export interface LiveEvent {
  type: string;
  count: number;
  trend: 'up' | 'down' | 'stable';
  velocity: number;
}

export interface AnalyticsAlert {
  id: string;
  type: 'threshold' | 'anomaly' | 'trend';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  metric: string;
  value: number;
  threshold?: number;
  triggeredAt: Date;
}

export interface PerformanceMetrics {
  pageLoadTime: number;
  serverResponseTime: number;
  errorRate: number;
  uptime: number;
}
