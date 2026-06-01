import { supabase } from "@/integrations/supabase/client";

/**
 * Mock-fallback switch for the whole data layer.
 *
 * Defaults to ON so the app renders full demo content even against an empty or
 * unauthenticated database. Set `VITE_USE_MOCK_FALLBACK=false` to force real-data-only
 * mode (useful for verifying persistence end-to-end).
 */
export const USE_MOCK_FALLBACK =
  (import.meta.env.VITE_USE_MOCK_FALLBACK ?? "true") !== "false";

/**
 * Untyped table accessor. The generated Supabase types in
 * src/integrations/supabase/types.ts don't yet include the core social tables added by
 * the 20260601120000_core_social_schema migration. Until `supabase gen types` is re-run
 * against the migrated database, repositories use this accessor to query the new tables
 * without TypeScript complaining about unknown table names.
 */
export const table = (name: string) => (supabase as any).from(name);

export { supabase };

type QueryResult<T> = { data: T | null; error: unknown };

/**
 * Run a Supabase query and transparently fall back to mock data when the query errors
 * (network/RLS/missing table) or returns nothing — but only while USE_MOCK_FALLBACK is
 * on. With it off, errors propagate so we can verify real persistence.
 *
 * @param label    short identifier for logging
 * @param query    function returning a Supabase query result ({ data, error })
 * @param mock      lazily-evaluated mock value used as the fallback
 * @param treatEmptyAsMissing  when true (default), an empty array also triggers fallback
 */
export async function withFallback<T>(
  label: string,
  query: () => Promise<QueryResult<T>>,
  mock: () => T | Promise<T>,
  treatEmptyAsMissing = true,
): Promise<T> {
  try {
    const { data, error } = await query();
    if (error) throw error;

    const isEmpty =
      data == null || (Array.isArray(data) && data.length === 0 && treatEmptyAsMissing);

    if (isEmpty && USE_MOCK_FALLBACK) {
      return await mock();
    }
    return (data ?? (await mock())) as T;
  } catch (err) {
    if (USE_MOCK_FALLBACK) {
      console.warn(`[data:${label}] falling back to mock:`, err);
      return await mock();
    }
    throw err;
  }
}
