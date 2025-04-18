
import { ChatMessage, ChatState } from '@/types';

// Reuse ChatMessage type from global types
export type Message = ChatMessage;

export interface ChatOptions {
  useVoice: boolean;
  useLocation: boolean;
  theme: 'light' | 'dark' | 'system';
  voiceType: 'male' | 'female';
}

export interface SearchResult {
  id: string;
  name: string;
  address: string;
  rating?: number;
  types?: string[];
  url?: string;
  location?: {
    lat: number;
    lng: number;
  };
}

// Extend the global ChatState with additional properties as needed
export interface VernonNextChatState extends ChatState {
  searchResults: SearchResult[];
}

export type IntentType = 'search' | 'info' | 'question' | 'booking' | 'unknown';

export interface ExtractedIntent {
  type: IntentType;
  location?: string;
  date?: string;
  categories?: string[];
  keywords?: string[];
  mood?: string[];
}
