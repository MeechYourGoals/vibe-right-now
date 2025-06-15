
export interface SearchResult {
  text: string;
  source?: string;
  url?: string;
}

export interface SearchOptions {
  maxResults?: number;
  filter?: string[];
  recency?: 'day' | 'week' | 'month' | 'year';
  priorityStrategy?: 'google' | 'openai' | 'auto';
  includeCategories?: string[];
  paginationState?: Record<string, number>;
}

export interface SearchStrategy {
  /**
   * Determine if this strategy can handle the given query
   */
  canHandle(query: string): boolean;
  
  /**
   * Execute the search strategy
   */
  execute(query: string, options?: SearchOptions): Promise<string>;
  
  /**
   * Get the priority of this strategy (lower number = higher priority)
   */
  getPriority(): number;
}

export interface SearchProvider {
  search(query: string, options?: any): Promise<string | null>;
  isAvailable?(): Promise<boolean>;
}
