
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
}

