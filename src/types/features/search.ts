
export interface SearchResult {
  id: string;
  title: string;
  description: string;
  url?: string;
  type: 'venue' | 'event' | 'user' | 'general';
  score?: number;
}

export interface SearchOptions {
  query: string;
  type?: 'venue' | 'event' | 'user' | 'all';
  location?: {
    lat: number;
    lng: number;
    radius?: number;
  };
  filters?: Record<string, any>;
}
