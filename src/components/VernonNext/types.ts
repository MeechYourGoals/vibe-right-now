
export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  verified?: boolean;
  location?: {
    lat: number;
    lng: number;
    name: string;
  };
  content: string;
  role?: 'user' | 'assistant' | 'system';
}

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

export interface ChatState {
  isOpen: boolean;
  isMinimized: boolean;
  isLoading: boolean;
  isListening: boolean;
  isSpeaking: boolean;
  messages: Message[];
  searchResults: SearchResult[];
  transcript: string;
  interimTranscript: string;
  loading?: boolean; // Added for backward compatibility
  error?: string; // Required by some components
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

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string | Date;
}
