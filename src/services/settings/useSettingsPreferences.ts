/**
 * Settings persistence helper for Vibe Right Now (Phase 2).
 *
 * Wraps `preferencesRepo` so settings pages can hydrate persisted user preferences
 * and save patches with a single hook. Works signed-out (preferencesRepo persists to
 * localStorage) and signed-in (Supabase `user_preferences` table). Writes show a sonner
 * sign-in toast when there is no authenticated user, but still persist locally so the
 * demo experience survives a refresh.
 */
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { preferencesRepo } from "@/services/data";
import { useUserStore } from "@/store";

export type Preferences = Record<string, unknown>;

export function useSettingsPreferences() {
  const { user, isAuthenticated } = useUserStore();
  const userId = user?.id ?? null;
  const [preferences, setPreferences] = useState<Preferences>({});
  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);

  // Hydrate once per user identity change.
  useEffect(() => {
    let active = true;
    setLoaded(false);
    preferencesRepo
      .get(userId)
      .then((prefs) => {
        if (active) {
          setPreferences(prefs ?? {});
          setLoaded(true);
        }
      })
      .catch((err) => {
        console.warn("[useSettingsPreferences] get failed", err);
        if (active) setLoaded(true);
      });
    return () => {
      active = false;
    };
  }, [userId]);

  /**
   * Merge-persist a patch of preferences. Returns the merged blob. Surfaces a sign-in
   * toast (informational) when signed out, but still persists locally so the demo works.
   */
  const save = useCallback(
    async (patch: Preferences, opts?: { silent?: boolean }) => {
      setSaving(true);
      // Optimistic local merge for immediate UI feedback.
      setPreferences((prev) => ({ ...prev, ...patch }));
      try {
        const merged = await preferencesRepo.update(userId, patch);
        setPreferences(merged);
        if (!opts?.silent) {
          if (!isAuthenticated) {
            toast.info("Saved on this device. Sign in to sync your preferences.");
          } else {
            toast.success("Preferences saved");
          }
        }
        return merged;
      } catch (err) {
        console.warn("[useSettingsPreferences] update failed", err);
        if (!opts?.silent) toast.error("Could not save your preferences.");
        throw err;
      } finally {
        setSaving(false);
      }
    },
    [userId, isAuthenticated],
  );

  return { preferences, loaded, saving, save, isAuthenticated, userId };
}
