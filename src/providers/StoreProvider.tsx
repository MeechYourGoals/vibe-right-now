
import React from 'react';
import { useAppStore } from '@/store';

interface StoreProviderProps {
  children: React.ReactNode;
}

export const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  // Initialize any store data or effects here if needed
  React.useEffect(() => {
    // Initialize store on app load
    console.log('Store initialized');
  }, []);

  return <>{children}</>;
};

// Store hooks for easier access
export const useStoreSelector = <T,>(selector: (state: ReturnType<typeof useAppStore>) => T) => {
  return useAppStore(selector);
};

export const useStoreActions = () => {
  const store = useAppStore();
  
  return {
    // User actions
    login: store.login,
    logout: store.logout,
    updateUser: store.updateUser,
    updatePoints: store.updatePoints,
    
    // Venue actions
    followVenue: store.followVenue,
    unfollowVenue: store.unfollowVenue,
    setCurrentVenue: store.setCurrentVenue,
    updateVenue: store.updateVenue,
    
    // Location actions
    setLocations: store.setLocations,
    setNearbyLocations: store.setNearbyLocations,
    setSelectedLocation: store.setSelectedLocation,
    setSearchResults: store.setSearchResults,
    
    // Chat actions
    setChatOpen: store.setChatOpen,
    setMessages: store.setMessages,
    addMessage: store.addMessage,
    setTyping: store.setTyping,
    setProcessing: store.setProcessing,
    setChatMode: store.setChatMode,
    setListening: store.setListening,
    setTranscript: store.setTranscript,
    clearMessages: store.clearMessages,
    
    // UI actions
    setLoading: store.setLoading,
    setTheme: store.setTheme,
    addNotification: store.addNotification,
    removeNotification: store.removeNotification,
    clearNotifications: store.clearNotifications,
  };
};
