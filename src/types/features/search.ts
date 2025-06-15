
import { PaginationParams, PaginationMeta } from '../core/api';
import { GeoCoordinates } from '../core/base';
import { Venue } from '../entities/venue';
import { Event } from '../entities/events';
import { User } from '../entities/user';

// Search and discovery types
export interface SearchQuery {
  query: string;
  type: SearchType;
  filters: SearchFilters;
  sorting: SearchSorting;
  pagination: PaginationParams;
  context: SearchContext;
}

export type SearchType = 
  | 'venues' 
  | 'events' 
  | 'users' 
  | 'posts' 
  | 'mixed' 
  | 'suggestions';

export interface SearchFilters {
  location?: LocationFilter;
  category?: string[];
  price?: PriceFilter;
  rating?: RatingFilter;
  time?: TimeFilter;
  features?: FeatureFilter;
  vibes?: string[];
  custom?: Record<string, any>;
}

export interface LocationFilter {
  coordinates?: GeoCoordinates;
  radius?: number; // in meters
  city?: string;
  state?: string;
  country?: string;
  neighborhood?: string;
}

export interface PriceFilter {
  min?: number;
  max?: number;
  level?: number[]; // 1-4 ($-$$$$)
  currency?: string;
}

export interface RatingFilter {
  min?: number;
  max?: number;
  reviewCount?: number;
}

export interface TimeFilter {
  openNow?: boolean;
  openAt?: Date;
  dateRange?: {
    start: Date;
    end: Date;
  };
  timeOfDay?: {
    start: string; // HH:mm
    end: string; // HH:mm
  };
}

export interface FeatureFilter {
  amenities?: string[];
  accessibility?: boolean;
  parking?: boolean;
  wifi?: boolean;
  outdoorSeating?: boolean;
  liveMusic?: boolean;
  reservations?: boolean;
}

export interface SearchSorting {
  field: SortField;
  order: 'asc' | 'desc';
  secondary?: SearchSorting;
}

export type SortField = 
  | 'relevance' 
  | 'distance' 
  | 'rating' 
  | 'price' 
  | 'popularity' 
  | 'newest' 
  | 'alphabetical'
  | 'vibeScore';

export interface SearchContext {
  userId?: string;
  userLocation?: GeoCoordinates;
  userPreferences?: UserSearchPreferences;
  searchHistory?: string[];
  sessionId?: string;
  source?: SearchSource;
  intent?: ExtractedSearchIntent;
}

export type SearchSource = 'manual' | 'voice' | 'suggestion' | 'recommendation' | 'filter';

export interface UserSearchPreferences {
  defaultRadius: number;
  preferredCategories: string[];
  priceRange: [number, number];
  preferredVibes: string[];
  savedSearches: SavedSearch[];
  searchHistory: SearchHistoryItem[];
}

export interface SavedSearch {
  id: string;
  name: string;
  query: SearchQuery;
  createdAt: Date;
  lastUsed: Date;
  useCount: number;
  notifications: boolean;
}

export interface SearchHistoryItem {
  query: string;
  timestamp: Date;
  results: number;
  clicked?: string; // ID of clicked result
}

export interface ExtractedSearchIntent {
  primaryIntent: string;
  secondaryIntents: string[];
  entities: SearchEntity[];
  confidence: number;
  suggestedFilters: Partial<SearchFilters>;
}

export interface SearchEntity {
  type: EntityType;
  value: string;
  confidence: number;
  metadata?: Record<string, any>;
}

export type EntityType = 
  | 'location' 
  | 'cuisine' 
  | 'event_type' 
  | 'date' 
  | 'time' 
  | 'price' 
  | 'feature' 
  | 'vibe';

export interface SearchResult<T = any> {
  id: string;
  type: SearchResultType;
  item: T;
  score: number;
  relevance: SearchRelevance;
  metadata: SearchResultMetadata;
}

export type SearchResultType = 'venue' | 'event' | 'user' | 'post' | 'suggestion';

export interface SearchRelevance {
  textMatch: number;
  locationMatch: number;
  preferenceMatch: number;
  popularityBoost: number;
  recencyBoost: number;
  personalizedBoost: number;
  overallScore: number;
}

export interface SearchResultMetadata {
  searchQuery: string;
  matchedFields: string[];
  distance?: number;
  isSponsored: boolean;
  promotionLevel?: number;
  ranking: number;
  alternativeResults?: SearchResult[];
}

export interface SearchResponse<T = any> {
  results: SearchResult<T>[];
  pagination: PaginationMeta;
  aggregations: SearchAggregations;
  suggestions: SearchSuggestion[];
  metadata: SearchResponseMetadata;
}

export interface SearchAggregations {
  categories: AggregationBucket[];
  priceRanges: AggregationBucket[];
  ratings: AggregationBucket[];
  features: AggregationBucket[];
  locations: LocationAggregation[];
}

export interface AggregationBucket {
  key: string;
  count: number;
  selected: boolean;
}

export interface LocationAggregation {
  name: string;
  count: number;
  coordinates: GeoCoordinates;
  radius: number;
}

export interface SearchSuggestion {
  type: SuggestionType;
  text: string;
  count?: number;
  category?: string;
  icon?: string;
  action?: SearchAction;
}

export type SuggestionType = 
  | 'query_completion' 
  | 'recent_search' 
  | 'trending' 
  | 'category' 
  | 'location'
  | 'correction';

export interface SearchAction {
  type: ActionType;
  params: Record<string, any>;
}

export type ActionType = 'search' | 'filter' | 'navigate' | 'save';

export interface SearchResponseMetadata {
  query: SearchQuery;
  took: number; // milliseconds
  totalResults: number;
  maxScore: number;
  searchId: string;
  algorithms: string[];
  cached: boolean;
  personalizedResults: boolean;
}

// Auto-complete and suggestions
export interface AutocompleteRequest {
  input: string;
  location?: GeoCoordinates;
  types?: AutocompleteType[];
  limit?: number;
  filters?: Partial<SearchFilters>;
}

export type AutocompleteType = 
  | 'venues' 
  | 'locations' 
  | 'categories' 
  | 'queries' 
  | 'events';

export interface AutocompleteResponse {
  suggestions: AutocompleteSuggestion[];
  metadata: AutocompleteMetadata;
}

export interface AutocompleteSuggestion {
  text: string;
  type: AutocompleteType;
  confidence: number;
  metadata: SuggestionMetadata;
  action?: SearchAction;
}

export interface SuggestionMetadata {
  category?: string;
  location?: string;
  resultCount?: number;
  trending?: boolean;
  recent?: boolean;
  personalized?: boolean;
}

export interface AutocompleteMetadata {
  took: number;
  totalSuggestions: number;
  cached: boolean;
  algorithms: string[];
}
