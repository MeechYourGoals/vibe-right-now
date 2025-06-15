
import { BaseRepository, DatabaseResult, PaginatedResult } from '../BaseRepository';

export interface Location {
  id: string;
  name: string;
  category: string;
  address?: string;
  city: string;
  state?: string;
  country?: string;
  lat: number;
  lng: number;
  source: string;
  created_at: string;
  updated_at: string;
}

export interface TrendKeyword {
  id: string;
  keyword: string;
  location_name: string;
  interest_score: number;
  source: string;
  fetched_at: string;
}

export interface VibeScore {
  id: string;
  location_id?: string;
  score: number;
  summary?: string;
  factors?: Record<string, any>;
  timestamp: string;
  expiration?: string;
}

export interface VibeSignal {
  id: string;
  location_id?: string;
  signal_type: string;
  value: number;
  source: string;
  metadata?: Record<string, any>;
  timestamp: string;
}

export class LocationRepository extends BaseRepository {
  async getLocations(
    filters: {
      city?: string;
      category?: string;
      limit?: number;
      offset?: number;
    } = {}
  ): Promise<PaginatedResult<Location>> {
    return this.executeQuery(async () => {
      let query = this.supabase
        .from('locations')
        .select('*', { count: 'exact' });

      if (filters.city) {
        query = query.eq('city', filters.city);
      }
      if (filters.category) {
        query = query.eq('category', filters.category);
      }
      if (filters.limit) {
        query = query.limit(filters.limit);
      }
      if (filters.offset) {
        query = query.range(filters.offset, (filters.offset || 0) + (filters.limit || 10) - 1);
      }

      const { data, error, count } = await query;
      return { data: data as Location[] | null, error, count };
    }) as Promise<PaginatedResult<Location>>;
  }

  async createLocation(location: Omit<Location, 'id' | 'created_at' | 'updated_at'>): Promise<DatabaseResult<Location>> {
    return this.executeQuery(async () => {
      const { data, error } = await this.supabase
        .from('locations')
        .insert(location)
        .select()
        .single();

      return { data: data as Location | null, error };
    });
  }

  async getTrendKeywords(locationName: string): Promise<PaginatedResult<TrendKeyword>> {
    return this.executeQuery(async () => {
      const { data, error } = await this.supabase
        .from('trend_keywords')
        .select('*')
        .eq('location_name', locationName)
        .order('interest_score', { ascending: false });

      return { data: data as TrendKeyword[] | null, error };
    }) as Promise<PaginatedResult<TrendKeyword>>;
  }

  async getVibeScores(locationId: string): Promise<PaginatedResult<VibeScore>> {
    return this.executeQuery(async () => {
      const { data, error } = await this.supabase
        .from('vibe_scores')
        .select('*')
        .eq('location_id', locationId)
        .order('timestamp', { ascending: false });

      return { data: data as VibeScore[] | null, error };
    }) as Promise<PaginatedResult<VibeScore>>;
  }

  async createVibeScore(vibeScore: Omit<VibeScore, 'id' | 'timestamp'>): Promise<DatabaseResult<VibeScore>> {
    return this.executeQuery(async () => {
      const { data, error } = await this.supabase
        .from('vibe_scores')
        .insert(vibeScore)
        .select()
        .single();

      return { data: data as VibeScore | null, error };
    });
  }

  async getVibeSignals(locationId: string): Promise<PaginatedResult<VibeSignal>> {
    return this.executeQuery(async () => {
      const { data, error } = await this.supabase
        .from('vibe_signals')
        .select('*')
        .eq('location_id', locationId)
        .order('timestamp', { ascending: false });

      return { data: data as VibeSignal[] | null, error };
    }) as Promise<PaginatedResult<VibeSignal>>;
  }

  async createVibeSignal(vibeSignal: Omit<VibeSignal, 'id' | 'timestamp'>): Promise<DatabaseResult<VibeSignal>> {
    return this.executeQuery(async () => {
      const { data, error } = await this.supabase
        .from('vibe_signals')
        .insert(vibeSignal)
        .select()
        .single();

      return { data: data as VibeSignal | null, error };
    });
  }
}
