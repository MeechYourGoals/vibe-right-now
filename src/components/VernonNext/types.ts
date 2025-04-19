
export type ChatMessage = {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
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
  isLoading: boolean;
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
