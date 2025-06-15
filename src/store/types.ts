
import { Message, ChatMode } from '@/components/VernonChat/types';

// Common state types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  subscription: 'free' | 'pro' | 'premium';
  points: number;
}

export interface Venue {
  id: string;
  name: string;
  address: string;
  category: string;
  rating: number;
  isFollowed: boolean;
}

export interface Location {
  id: string;
  name: string;
  address: string;
  coordinates: [number, number];
  category: string;
  rating: number;
  images: string[];
}

export interface UIState {
  isLoading: boolean;
  isSidebarOpen: boolean;
  currentTheme: 'light' | 'dark' | 'system';
  notifications: Notification[];
}

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: Date;
}

export interface ChatState {
  messages: Message[];
  isTyping: boolean;
  isProcessing: boolean;
  chatMode: ChatMode;
  isOpen: boolean;
  isListening: boolean;
  transcript: string;
}

// Store slice types
export interface UserSlice {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  updatePoints: (points: number) => void;
}

export interface VenueSlice {
  venues: Venue[];
  followedVenues: Venue[];
  currentVenue: Venue | null;
  followVenue: (venue: Venue) => void;
  unfollowVenue: (venueId: string) => void;
  setCurrentVenue: (venue: Venue | null) => void;
  updateVenue: (venueId: string, updates: Partial<Venue>) => void;
}

export interface LocationSlice {
  locations: Location[];
  nearbyLocations: Location[];
  selectedLocation: Location | null;
  searchResults: Location[];
  isLoading: boolean;
  setLocations: (locations: Location[]) => void;
  setNearbyLocations: (locations: Location[]) => void;
  setSelectedLocation: (location: Location | null) => void;
  setSearchResults: (results: Location[]) => void;
  setLoading: (loading: boolean) => void;
}

export interface ChatSlice {
  chatState: ChatState;
  setChatOpen: (open: boolean) => void;
  setMessages: (messages: Message[]) => void;
  addMessage: (message: Message) => void;
  setTyping: (typing: boolean) => void;
  setProcessing: (processing: boolean) => void;
  setChatMode: (mode: ChatMode) => void;
  setListening: (listening: boolean) => void;
  setTranscript: (transcript: string) => void;
  clearMessages: () => void;
}

export interface UISlice {
  ui: UIState;
  setLoading: (loading: boolean) => void;
  setSidebarOpen: (open: boolean) => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
}

// Combined store type
export interface AppStore extends UserSlice, VenueSlice, LocationSlice, ChatSlice, UISlice {}
