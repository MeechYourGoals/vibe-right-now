import { useAppStore } from './appStore';

export { useAppStore };
export type * from './types';

export const useUserStore = () => {
  const { user, isAuthenticated, login, logout, updateUser, updatePoints } = useAppStore();
  return { user, isAuthenticated, login, logout, updateUser, updatePoints };
};

export const useVenueStore = () => {
  const { venues, followedVenues, currentVenue, followVenue, unfollowVenue, setCurrentVenue, updateVenue } = useAppStore();
  return { venues, followedVenues, currentVenue, followVenue, unfollowVenue, setCurrentVenue, updateVenue };
};

export const useLocationStore = () => {
  const { locations, nearbyLocations, selectedLocation, searchResults, isLoading, setLocations, setNearbyLocations, setSelectedLocation, setSearchResults, setLoading } = useAppStore();
  return { locations, nearbyLocations, selectedLocation, searchResults, isLoading, setLocations, setNearbyLocations, setSelectedLocation, setSearchResults, setLoading };
};

export const useChatStore = () => {
  const { chatState, setChatOpen, setMessages, addMessage, setTyping, setProcessing, setChatMode, setListening, setTranscript, clearMessages } = useAppStore();
  return { chatState, setChatOpen, setMessages, addMessage, setTyping, setProcessing, setChatMode, setListening, setTranscript, clearMessages };
};

export const useUIStore = () => {
  const { ui, setLoading, setTheme, addNotification, removeNotification, clearNotifications } = useAppStore();
  return { ui, setLoading, setTheme, addNotification, removeNotification, clearNotifications };
};
export { mapProfileToStoreUser } from './userStore';
