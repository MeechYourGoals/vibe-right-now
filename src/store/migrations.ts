
import { useAppStore } from './appStore';
import { Message } from '@/components/VernonChat/types';

// Helper functions to migrate existing component state to store
export const migrationHelpers = {
  // Migrate chat messages from local state to store
  migrateChatMessages: (messages: Message[]) => {
    const { setMessages } = useAppStore.getState();
    setMessages(messages);
  },
  
  // Migrate user authentication state
  migrateUserAuth: (isAuthenticated: boolean, userData?: any) => {
    const { login, logout } = useAppStore.getState();
    if (isAuthenticated && userData) {
      login(userData);
    } else {
      logout();
    }
  },
  
  // Migrate UI theme preferences
  migrateThemePreference: (theme: 'light' | 'dark' | 'system') => {
    const { setTheme } = useAppStore.getState();
    setTheme(theme);
  },
  
  // Migrate venue following state
  migrateFollowedVenues: (venues: any[]) => {
    const { followVenue } = useAppStore.getState();
    venues.forEach(venue => followVenue(venue));
  }
};

// Store selectors for common use cases
export const storeSelectors = {
  // Get user info
  selectUser: (state: ReturnType<typeof useAppStore.getState>) => state.user,
  selectIsAuthenticated: (state: ReturnType<typeof useAppStore.getState>) => state.isAuthenticated,
  
  // Get chat state
  selectChatMessages: (state: ReturnType<typeof useAppStore.getState>) => state.chatState.messages,
  selectChatMode: (state: ReturnType<typeof useAppStore.getState>) => state.chatState.chatMode,
  selectIsTyping: (state: ReturnType<typeof useAppStore.getState>) => state.chatState.isTyping,
  
  // Get UI state
  selectTheme: (state: ReturnType<typeof useAppStore.getState>) => state.ui.currentTheme,
  selectIsLoading: (state: ReturnType<typeof useAppStore.getState>) => state.ui.isLoading,
  selectNotifications: (state: ReturnType<typeof useAppStore.getState>) => state.ui.notifications,
  
  // Get venue state
  selectFollowedVenues: (state: ReturnType<typeof useAppStore.getState>) => state.followedVenues,
  selectCurrentVenue: (state: ReturnType<typeof useAppStore.getState>) => state.currentVenue,
  
  // Get location state
  selectNearbyLocations: (state: ReturnType<typeof useAppStore.getState>) => state.nearbyLocations,
  selectSelectedLocation: (state: ReturnType<typeof useAppStore.getState>) => state.selectedLocation,
  selectSearchResults: (state: ReturnType<typeof useAppStore.getState>) => state.searchResults,
};
