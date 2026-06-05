import { table, USE_MOCK_FALLBACK } from "./config";

const LS_KEY = "vibe-user-preferences";

function readLocal(): Record<string, unknown> {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY) ?? "{}");
  } catch {
    return {};
  }
}

function writeLocal(prefs: Record<string, unknown>) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(prefs));
  } catch {
    /* ignore */
  }
}

export const preferencesRepo = {
  /** Get the user's preferences blob. Falls back to localStorage when signed out. */
  async get(userId: string | null): Promise<Record<string, unknown>> {
    if (!userId) return readLocal();
    try {
      const { data, error } = await table("user_preferences")
        .select("preferences")
        .eq("user_id", userId)
        .maybeSingle();
      if (error) throw error;
      return data?.preferences ?? readLocal();
    } catch (err) {
      if (USE_MOCK_FALLBACK) {
        console.warn("[data:preferences.get] falling back to localStorage:", err);
        return readLocal();
      }
      throw err;
    }
  },

  /** Merge-update preferences. Persists to localStorage too so it survives sign-out. */
  async update(
    userId: string | null,
    patch: Record<string, unknown>,
  ): Promise<Record<string, unknown>> {
    const merged = { ...readLocal(), ...patch };
    writeLocal(merged);
    if (!userId) return merged;
    try {
      const { data, error } = await table("user_preferences")
        .upsert({ user_id: userId, preferences: merged }, { onConflict: "user_id" })
        .select("preferences")
        .maybeSingle();
      if (error) throw error;
      return data?.preferences ?? merged;
    } catch (err) {
      if (USE_MOCK_FALLBACK) {
        console.warn("[data:preferences.update] persisted to localStorage only:", err);
        return merged;
      }
      throw err;
    }
  },
};
