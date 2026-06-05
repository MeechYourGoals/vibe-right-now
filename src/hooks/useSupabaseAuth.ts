import { useContext } from "react";
import { SupabaseAuthContext, type SupabaseAuthContextValue } from "@/auth/SupabaseAuthProvider";

/**
 * Access the Supabase auth session/user and auth actions.
 *
 * Replaces the previous Auth0 hook. Provides:
 *  - session / user (Supabase auth types)
 *  - isAuthenticated / isLoading
 *  - signIn (email + password), signUp, signInWithGoogle, signInWithMagicLink, signOut
 *
 * Must be used inside <SupabaseAuthProvider> (wired in App.tsx).
 */
export const useSupabaseAuth = (): SupabaseAuthContextValue => {
  const ctx = useContext(SupabaseAuthContext);
  if (!ctx) {
    throw new Error("useSupabaseAuth must be used within a SupabaseAuthProvider");
  }
  return ctx;
};

export default useSupabaseAuth;
