
export type ChatMessage = {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  verified?: boolean;
};

export type ChatState = {
  messages: ChatMessage[];
  loading: boolean;
  isOpen: boolean;
  isMinimized: boolean;
  isListening: boolean;
  isSpeaking: boolean;
  transcript: string;
  interimTranscript: string;
  isLoading?: boolean; // For backward compatibility
};

export type MessagePayload = {
  text: string;
  userId?: string;
  username?: string;
};

export type AnalysisResult = {
  entities?: Array<{
    name: string;
    type: string;
    metadata: Record<string, any>;
    salience: number;
  }>;
  categories?: Array<{
    name: string;
    confidence: number;
  }>;
  sentiment?: {
    magnitude: number;
    score: number;
  };
};

export type ExtractedIntent = {
  type?: string;
  intent?: string;
  entities?: Record<string, any>;
  confidence?: number;
  location?: string;
  date?: string;
  categories?: any[];
  mood?: string[];
  keywords?: string[];
};

export type SearchResult = {
  id: string;
  name: string;
  description?: string;
  address?: string;
  type?: string;
  distance?: string;
  rating?: number;
  imageUrl?: string;
  price?: string;
  category?: string;
};
