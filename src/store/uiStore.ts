
import { StateCreator } from 'zustand';
import { AppStore, UISlice, Notification } from './types';
import { useAppStore } from './appStore';

export const createUISlice: StateCreator<
  AppStore,
  [["zustand/immer", never]],
  [],
  UISlice
> = (set) => ({
  ui: {
    isLoading: false,
    currentTheme: 'system',
    notifications: [],
  },
  
  setLoading: (loading: boolean) => {
    set((state) => {
      state.ui.isLoading = loading;
    });
  },
  
  
  setTheme: (theme: 'light' | 'dark' | 'system') => {
    set((state) => {
      state.ui.currentTheme = theme;
    });
  },
  
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => {
    set((state) => {
      const newNotification: Notification = {
        ...notification,
        id: crypto.randomUUID(),
        timestamp: new Date(),
      };
      state.ui.notifications.push(newNotification);
      
      // Keep only last 10 notifications
      if (state.ui.notifications.length > 10) {
        state.ui.notifications = state.ui.notifications.slice(-10);
      }
    });
  },
  
  removeNotification: (id: string) => {
    set((state) => {
      state.ui.notifications = state.ui.notifications.filter(n => n.id !== id);
    });
  },
  
  clearNotifications: () => {
    set((state) => {
      state.ui.notifications = [];
    });
  },
});

// Export individual store hook
export const useUIStore = () => {
  const {
    ui,
    setLoading,
    setTheme,
    addNotification,
    removeNotification,
    clearNotifications
  } = useAppStore();
  
  return { 
    ui,
    setLoading,
    setTheme,
    addNotification,
    removeNotification,
    clearNotifications
  };
};
