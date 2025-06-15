
import { supabase } from '@/integrations/supabase/client';
import { PostgrestError } from '@supabase/supabase-js';

export interface DatabaseResult<T> {
  data: T | null;
  error: PostgrestError | Error | null;
  success: boolean;
}

export interface PaginatedResult<T> extends DatabaseResult<T[]> {
  count?: number;
  hasMore?: boolean;
}

export abstract class BaseRepository {
  protected supabase = supabase;

  protected handleResult<T>(data: T | null, error: PostgrestError | null): DatabaseResult<T> {
    return {
      data,
      error,
      success: !error
    };
  }

  protected handlePaginatedResult<T>(
    data: T[] | null, 
    error: PostgrestError | null, 
    count?: number
  ): PaginatedResult<T> {
    return {
      data: data || [],
      error,
      success: !error,
      count,
      hasMore: count ? (data?.length || 0) < count : false
    };
  }

  protected async executeQuery<T>(
    queryFn: () => Promise<{ data: T | null; error: PostgrestError | null }>
  ): Promise<DatabaseResult<T>> {
    try {
      const { data, error } = await queryFn();
      return this.handleResult(data, error);
    } catch (err) {
      return this.handleResult(null, err as PostgrestError);
    }
  }
}
