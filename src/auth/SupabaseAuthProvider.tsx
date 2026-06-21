import React, { createContext, useCallback, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { Session, User as SupabaseUser } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { profilesRepo } from "@/services/data";
import { useUserStore, mapProfileToStoreUser } from "@/store";

export interface SupabaseAuthContextValue {
  session: Session | null;
  user: SupabaseUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithMagicLink: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const SupabaseAuthContext = createContext<SupabaseAuthContextValue | null>(null);

export const SupabaseAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { login, logout } = useUserStore();

  // Load the profile for an authenticated user and push it into the Zustand store.
  const syncProfileToStore = useCallback(
    async (supaUser: SupabaseUser | null) => {
      if (!supaUser) {
        logout();
        return;
      }
      try {
        const profile = await profilesRepo.getById(supaUser.id);
        if (profile) {
          login(mapProfileToStoreUser(profile, supaUser.email ?? undefined));
        } else {
          // No profile row yet (trigger lag) — seed store with minimal data from auth user.
          login({
            id: supaUser.id,
            name:
              (supaUser.user_metadata?.name as string) ||
              supaUser.email?.split("@")[0] ||
              "",
            email: supaUser.email ?? "",
            avatar: supaUser.user_metadata?.avatar_url as string | undefined,
            subscription: "free",
            points: 0,
          });
        }
      } catch (err) {
        console.warn("[auth] failed to sync profile to store:", err);
      }
    },
    [login, logout],
  );

  useEffect(() => {
    let mounted = true;

    // 1. Subscribe to auth state changes first so nothing is missed.
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      if (!mounted) return;
      setSession(newSession);
      // Defer store sync to avoid running async work directly inside the callback.
      setTimeout(() => syncProfileToStore(newSession?.user ?? null), 0);
    });

    // 2. Then hydrate the existing session.
    supabase.auth
      .getSession()
      .then(({ data }) => {
        if (!mounted) return;
        setSession(data.session);
        return syncProfileToStore(data.session?.user ?? null);
      })
      .finally(() => {
        if (mounted) setIsLoading(false);
      });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [syncProfileToStore]);

  const signIn = useCallback(async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  }, []);

  const signUp = useCallback(async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: window.location.origin },
    });
    if (error) throw error;
  }, []);

  const signInWithGoogle = useCallback(async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin },
    });
    if (error) throw error;
  }, []);

  const signInWithMagicLink = useCallback(async (email: string) => {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: window.location.origin },
    });
    if (error) throw error;
  }, []);

  const signOut = useCallback(async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    logout();
  }, [logout]);

  const value = useMemo<SupabaseAuthContextValue>(
    () => ({
      session,
      user: session?.user ?? null,
      isAuthenticated: !!session?.user,
      isLoading,
      signIn,
      signUp,
      signInWithGoogle,
      signInWithMagicLink,
      signOut,
    }),
    [session, isLoading, signIn, signUp, signInWithGoogle, signInWithMagicLink, signOut],
  );

  return (
    <SupabaseAuthContext.Provider value={value}>{children}</SupabaseAuthContext.Provider>
  );
};

export default SupabaseAuthProvider;
