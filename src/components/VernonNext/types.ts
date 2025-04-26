
export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system' | 'error';
  content: string;
  timestamp: string;
  sender?: 'user' | 'ai';
  text?: string; // For backward compatibility
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
