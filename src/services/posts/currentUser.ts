import { supabase } from "@/services/data";

/**
 * Resolve the current user's id for persistence writes (like / save / delete / create
 * / check-in).
 *
 * Production writes require an authoritative Supabase Auth user. The Zustand user is
 * presentation/cache state only and must not authorize database mutations.
 */
export async function getCurrentUserId(): Promise<string | null> {
  try {
    const { data } = await supabase.auth.getUser();
    if (data?.user?.id) return data.user.id;
  } catch {
    // ignore — fall through to store
  }
  return null;
}

/**
 * No synchronous value is authoritative enough for writes/deletes. Components may use
 * this as a conservative UI hint only; Supabase RLS remains the source of truth.
 */
export function getCurrentUserIdSync(): string | null {
  return null;
}
