
import { StateCreator } from 'zustand';
import { AppStore, UserSlice, User } from './types';

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

// Export individual store hook
export const useUserStore = () => {
  const { user, isAuthenticated, login, logout, updateUser, updatePoints } = useAppStore();
  return { user, isAuthenticated, login, logout, updateUser, updatePoints };
};
