
export interface SearchOptions {
  priorityStrategy?: 'google' | 'openai' | 'wikipedia' | 'duckduckgo';
  includeCategories?: string[];
  maxResults?: number;
  useCache?: boolean;
}

export interface SearchResult {
  query: string;
  response: string;
  source: string;
  timestamp: string;
  categories?: string[];
}

export interface ComedySearchOptions extends SearchOptions {
  location?: string;
  dateRange?: {
    start: string;
    end: string;
  };
  priceRange?: {
    min: number;
    max: number;
  };
}

export interface VenueSearchOptions extends SearchOptions {
  venueType?: string;
  radius?: number;
  coordinates?: {
    lat: number;
    lng: number;
  };
}
