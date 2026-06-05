import { supabase } from "@/services/data";
import { useAppStore } from "@/store";

/**
 * Resolve the current user's id for persistence writes (like / save / delete / create
 * / check-in).
 *
 * Order of resolution:
 *  1. Supabase auth session (authoritative when signed in against a real backend).
 *  2. The Zustand app store user (covers demo / mock sign-in flows).
 *
 * Returns `null` when nobody is signed in. Callers should treat `null` as "prompt the
 * user to sign in" rather than throwing.
 */
export async function getCurrentUserId(): Promise<string | null> {
  try {
    const { data } = await supabase.auth.getUser();
    if (data?.user?.id) return data.user.id;
  } catch {
    // ignore — fall through to store
  }
  const storeUser = useAppStore.getState().user;
  return storeUser?.id ?? null;
}

/** Synchronous best-effort current user id from the Zustand store (no auth round-trip). */
export function getCurrentUserIdSync(): string | null {
  return useAppStore.getState().user?.id ?? null;
}
