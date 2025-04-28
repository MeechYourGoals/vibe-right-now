
export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system' | 'error';
  content: string;
  timestamp: string;
  sender?: 'user' | 'ai';
  text?: string; // For backward compatibility
}

export interface ChatMessage {
  role: string;
  content: string;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  isListening: boolean;
  isSpeaking: boolean;
  transcript: string;
  interimTranscript: string;
  isOpen: boolean;
  isMinimized: boolean;
  searchResults?: any[];
}

export interface SearchResult {
  id: string;
  title: string;
  description: string;
  url: string;
  score: number;
}

export interface ExtractedIntent {
  intent: string;
  entities: Record<string, any>;
  confidence: number;
  type?: string;
  location?: string;
  keywords?: string[];
  mood?: string;
}

export interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zip?: string; // Keeping this optional as per design
  lat: number;
  lng: number;
  type: string;
  verified: boolean;
  vibes?: string[];
  hours?: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
}
