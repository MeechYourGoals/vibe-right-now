
import { BaseEntity, Timestamps } from '../core/base';

// Analytics and insights types
export interface AnalyticsEvent extends BaseEntity, Timestamps {
  type: EventType;
  category: EventCategory;
  action: string;
  label?: string;
  value?: number;
  userId?: string;
  sessionId?: string;
  properties: EventProperties;
  context: AnalyticsContext;
}

export type EventType = 
  | 'page_view' 
  | 'user_action' 
  | 'business_metric' 
  | 'error' 
  | 'performance';

export type EventCategory = 
  | 'navigation' 
  | 'engagement' 
  | 'conversion' 
  | 'social' 
  | 'search' 
  | 'booking' 
  | 'payment'
  | 'chat'
  | 'venue'
  | 'content';

export interface EventProperties {
  page?: string;
  component?: string;
  feature?: string;
  duration?: number;
  location?: string;
  venueId?: string;
  eventId?: string;
  amount?: number;
  currency?: string;
  custom?: Record<string, any>;
}

export interface AnalyticsContext {
  userAgent: string;
  platform: string;
  device: DeviceInfo;
  location: LocationContext;
  referrer?: string;
  utm?: UTMParameters;
  session: SessionContext;
}

export interface DeviceInfo {
  type: 'desktop' | 'mobile' | 'tablet';
  os: string;
  browser: string;
  screenSize: string;
  viewport: string;
  touchCapable: boolean;
}

export interface LocationContext {
  country?: string;
  region?: string;
  city?: string;
  timezone: string;
  coordinates?: GeoCoordinates;
  ipAddress?: string;
}

export interface UTMParameters {
  source?: string;
  medium?: string;
  campaign?: string;
  term?: string;
  content?: string;
}

export interface SessionContext {
  sessionId: string;
  isNewSession: boolean;
  sessionStart: Date;
  sessionDuration: number;
  pageViews: number;
  isAuthenticated: boolean;
  userId?: string;
}

// Metrics and KPIs
export interface MetricDefinition {
  id: string;
  name: string;
  description: string;
  type: MetricType;
  category: MetricCategory;
  calculation: MetricCalculation;
  dimensions: string[];
  filters?: MetricFilter[];
  format: MetricFormat;
}

export type MetricType = 'count' | 'sum' | 'average' | 'percentage' | 'ratio' | 'unique_count';
export type MetricCategory = 'traffic' | 'engagement' | 'conversion' | 'revenue' | 'retention';

export interface MetricCalculation {
  numerator: string;
  denominator?: string;
  aggregation: AggregationType;
  timeWindow?: string;
  filters?: string[];
}

export type AggregationType = 'sum' | 'count' | 'avg' | 'min' | 'max' | 'distinct';

export interface MetricFilter {
  field: string;
  operator: FilterOperator;
  value: any;
}

export type FilterOperator = 'eq' | 'ne' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'nin' | 'contains';

export interface MetricFormat {
  type: 'number' | 'percentage' | 'currency' | 'duration';
  decimals?: number;
  prefix?: string;
  suffix?: string;
  currency?: string;
}

export interface MetricValue {
  metric: string;
  value: number;
  formatted: string;
  timestamp: Date;
  dimensions?: Record<string, string>;
  change?: MetricChange;
  trend?: TrendData;
}

export interface MetricChange {
  absolute: number;
  percentage: number;
  direction: 'up' | 'down' | 'flat';
  period: string;
  significance: 'low' | 'medium' | 'high';
}

export interface TrendData {
  points: TrendPoint[];
  direction: 'up' | 'down' | 'flat';
  strength: number;
  seasonality?: SeasonalityPattern;
}

export interface TrendPoint {
  timestamp: Date;
  value: number;
}

export interface SeasonalityPattern {
  type: 'daily' | 'weekly' | 'monthly' | 'yearly';
  pattern: number[];
  confidence: number;
}

// Dashboards and reports
export interface Dashboard {
  id: string;
  name: string;
  description?: string;
  owner: string;
  widgets: DashboardWidget[];
  layout: DashboardLayout;
  filters: DashboardFilter[];
  sharing: SharingSettings;
  schedule?: ReportSchedule;
  metadata: DashboardMetadata;
}

export interface DashboardWidget {
  id: string;
  type: WidgetType;
  title: string;
  description?: string;
  metrics: string[];
  visualization: VisualizationConfig;
  filters?: DashboardFilter[];
  position: WidgetPosition;
  size: WidgetSize;
  settings: WidgetSettings;
}

export type WidgetType = 
  | 'metric' 
  | 'chart' 
  | 'table' 
  | 'map' 
  | 'funnel' 
  | 'cohort' 
  | 'text'
  | 'goal';

export interface VisualizationConfig {
  chartType: ChartType;
  axes?: AxisConfig[];
  series?: SeriesConfig[];
  colors?: string[];
  formatting?: VisualizationFormatting;
  interactions?: InteractionConfig;
}

export type ChartType = 
  | 'line' 
  | 'bar' 
  | 'pie' 
  | 'scatter' 
  | 'area' 
  | 'heatmap' 
  | 'funnel'
  | 'gauge'
  | 'histogram';

export interface AxisConfig {
  dimension: string;
  label?: string;
  scale?: 'linear' | 'log' | 'time';
  format?: MetricFormat;
}

export interface SeriesConfig {
  metric: string;
  label?: string;
  type?: ChartType;
  color?: string;
  yAxis?: number;
}

export interface VisualizationFormatting {
  showLegend: boolean;
  showTooltips: boolean;
  showDataLabels: boolean;
  animation: boolean;
  responsive: boolean;
}

export interface InteractionConfig {
  zoom: boolean;
  drill: boolean;
  filter: boolean;
  export: boolean;
}

export interface WidgetPosition {
  x: number;
  y: number;
  z: number;
}

export interface WidgetSize {
  width: number;
  height: number;
  minWidth?: number;
  minHeight?: number;
}

export interface WidgetSettings {
  refreshInterval?: number;
  autoRefresh: boolean;
  cacheDuration: number;
  showTitle: boolean;
  showBorder: boolean;
  theme?: WidgetTheme;
}

export interface WidgetTheme {
  background?: string;
  text?: string;
  accent?: string;
  border?: string;
}

export interface DashboardLayout {
  type: 'grid' | 'free' | 'flow';
  columns: number;
  rowHeight: number;
  margin: number;
  responsive: boolean;
}

export interface DashboardFilter {
  id: string;
  name: string;
  type: FilterType;
  field: string;
  values: any[];
  defaultValue?: any;
  required: boolean;
  cascading?: string[]; // dependent filters
}

export type FilterType = 
  | 'date_range' 
  | 'select' 
  | 'multi_select' 
  | 'text' 
  | 'number_range'
  | 'location';

export interface SharingSettings {
  isPublic: boolean;
  allowEmbed: boolean;
  allowExport: boolean;
  password?: string;
  expiration?: Date;
  permissions: SharePermission[];
}

export interface SharePermission {
  userId: string;
  role: 'viewer' | 'editor' | 'owner';
  grantedAt: Date;
  grantedBy: string;
}

export interface ReportSchedule {
  enabled: boolean;
  frequency: ScheduleFrequency;
  time?: string; // HH:mm
  timezone: string;
  recipients: string[];
  format: ReportFormat;
  filters?: DashboardFilter[];
}

export type ScheduleFrequency = 'daily' | 'weekly' | 'monthly' | 'quarterly';
export type ReportFormat = 'pdf' | 'excel' | 'csv' | 'email' | 'slack';

export interface DashboardMetadata {
  createdAt: Date;
  updatedAt: Date;
  lastViewed?: Date;
  viewCount: number;
  tags: string[];
  version: number;
  isTemplate: boolean;
  category?: string;
}

// A/B testing and experiments
export interface Experiment extends BaseEntity, Timestamps {
  name: string;
  description: string;
  hypothesis: string;
  status: ExperimentStatus;
  variants: ExperimentVariant[];
  targeting: ExperimentTargeting;
  metrics: ExperimentMetric[];
  duration: ExperimentDuration;
  results?: ExperimentResults;
  settings: ExperimentSettings;
}

export type ExperimentStatus = 
  | 'draft' 
  | 'running' 
  | 'paused' 
  | 'completed' 
  | 'cancelled';

export interface ExperimentVariant {
  id: string;
  name: string;
  description?: string;
  allocation: number; // percentage
  configuration: Record<string, any>;
  isControl: boolean;
}

export interface ExperimentTargeting {
  audience: AudienceDefinition;
  allocation: number; // percentage of total traffic
  filters: ExperimentFilter[];
  exclusions?: ExperimentFilter[];
}

export interface AudienceDefinition {
  type: 'all' | 'segment' | 'custom';
  segmentId?: string;
  criteria?: AudienceCriteria[];
}

export interface AudienceCriteria {
  field: string;
  operator: FilterOperator;
  value: any;
  type: 'user' | 'session' | 'event';
}

export interface ExperimentFilter {
  field: string;
  operator: FilterOperator;
  value: any;
}

export interface ExperimentMetric {
  id: string;
  name: string;
  type: 'primary' | 'secondary' | 'guardrail';
  definition: MetricDefinition;
  target?: MetricTarget;
}

export interface MetricTarget {
  type: 'increase' | 'decrease' | 'change';
  threshold: number;
  unit: 'absolute' | 'percentage';
}

export interface ExperimentDuration {
  type: 'time' | 'sample_size' | 'conversions';
  value: number;
  minimumDuration?: number;
  maximumDuration?: number;
}

export interface ExperimentResults {
  status: ResultStatus;
  winner?: string;
  confidence: number;
  significance: number;
  variants: VariantResults[];
  metrics: MetricResults[];
  summary: ResultSummary;
}

export type ResultStatus = 'no_winner' | 'winner_found' | 'inconclusive' | 'early_stop';

export interface VariantResults {
  variantId: string;
  sampleSize: number;
  conversionRate: number;
  revenue?: number;
  metrics: Record<string, number>;
  confidence: ConfidenceInterval;
}

export interface ConfidenceInterval {
  lower: number;
  upper: number;
  level: number; // e.g., 95 for 95% confidence
}

export interface MetricResults {
  metricId: string;
  baseline: number;
  variants: Record<string, number>;
  lift: Record<string, number>;
  significance: Record<string, number>;
  pValue: Record<string, number>;
}

export interface ResultSummary {
  recommendation: 'implement' | 'iterate' | 'stop';
  reasoning: string;
  impact: ImpactEstimate;
  risks: string[];
  nextSteps: string[];
}

export interface ImpactEstimate {
  metric: string;
  expectedLift: number;
  potentialRevenue?: number;
  confidenceLevel: number;
  timeToImpact: number; // days
}

export interface ExperimentSettings {
  allowOverride: boolean;
  persistAssignment: boolean;
  trackingLevel: 'basic' | 'detailed' | 'full';
  qualityAssurance: QualityAssuranceSettings;
  alerts: ExperimentAlert[];
}

export interface QualityAssuranceSettings {
  sampleRatioMismatch: boolean;
  trafficSplitValidation: boolean;
  metricValidation: boolean;
  fraudDetection: boolean;
}

export interface ExperimentAlert {
  type: AlertType;
  condition: AlertCondition;
  threshold: number;
  recipients: string[];
  enabled: boolean;
}

export type AlertType = 
  | 'ssd' // sample size degradation
  | 'metric_degradation' 
  | 'traffic_imbalance' 
  | 'significance_reached'
  | 'duration_exceeded';

export interface AlertCondition {
  metric?: string;
  operator: FilterOperator;
  value: number;
  duration?: number; // minutes
}
