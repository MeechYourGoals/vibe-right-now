
// If this file doesn't exist, we're creating it
import { MockUserProfile } from "@/utils/locations/types";

export interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  state?: string;
  country: string;
  zip?: string; // Added for compatibility
  lat: number;
  lng: number;
  type: "restaurant" | "bar" | "event" | "attraction" | "sports" | "other";
  verified: boolean;
  hours?: Record<string, string>;
  vibes?: string[];
  userProfile?: MockUserProfile;
}

// VernonChat types
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system' | 'error';
  content: string;
  timestamp: Date | string;
  // For compatibility with older format
  text?: string;
  sender?: 'user' | 'ai';
}

export interface ChatState {
  messages: ChatMessage[];
  loading: boolean;
  error: string | null;
  isOpen?: boolean;
  isMinimized?: boolean;
  isLoading?: boolean;
  isListening?: boolean;
  isSpeaking?: boolean;
  searchResults?: any[];
  transcript?: string;
  interimTranscript?: string;
}

export * from "./index";
