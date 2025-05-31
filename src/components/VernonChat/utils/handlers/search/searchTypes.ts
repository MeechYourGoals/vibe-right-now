
export interface SearchResult {
  text: string;
  source?: string;
  url?: string;
}

export interface SearchOptions {
  maxResults?: number;
  filter?: string[];
  recency?: 'day' | 'week' | 'month' | 'year';
}
