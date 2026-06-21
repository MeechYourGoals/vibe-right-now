
import { StateCreator } from 'zustand';
import { AppStore, UserSlice, User } from './types';
import type { User as RichUser } from '@/types';

/**
 * Map the rich profile `User` (returned by profilesRepo / Supabase auth) into the
 * lightweight Zustand store `User` shape. Centralized here so the Supabase auth
 * provider has a single source of truth for the mapping.
 */
export function mapProfileToStoreUser(profile: RichUser, fallbackEmail?: string): User {
  const tier = (profile.subscription as unknown as string) ?? 'free';
  return {
    id: profile.id,
    name: profile.displayName || profile.name || profile.username || '',
    email: profile.email ?? fallbackEmail ?? '',
    avatar: profile.avatar,
    subscription: (tier === 'pro' || tier === 'premium' ? tier : 'free') as User['subscription'],
    points: profile.points ?? 0,
  };
}

export const createUserSlice: StateCreator<
  AppStore,
  [["zustand/immer", never]],
  [],
  UserSlice
> = (set) => ({
  user: null,
  isAuthenticated: false,
  
  login: (user: User) => {
    set((state) => {
      state.user = user;
      state.isAuthenticated = true;
    });
  },
  
  logout: () => {
    set((state) => {
      state.user = null;
      state.isAuthenticated = false;
    });
  },
  
  updateUser: (updates: Partial<User>) => {
    set((state) => {
      if (state.user) {
        Object.assign(state.user, updates);
      }
    });
  },
  
  updatePoints: (points: number) => {
    set((state) => {
      if (state.user) {
        state.user.points = points;
      }
    });
  },
});
