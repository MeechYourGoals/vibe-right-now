// Update the types to include what's needed for Vernon Chat
export interface Message {
  id: string;
  content: string;
  direction: MessageDirection;
  timestamp: Date;
  aiResponse?: boolean;
  // Adding these fields for compatibility with existing components
  text?: string;
  sender?: 'user' | 'ai' | string;
  role?: 'user' | 'assistant' | 'system';
  spoken?: boolean;
  verified?: boolean;
}

export type MessageDirection = 'incoming' | 'outgoing';
export type ChatMode = 'user' | 'venue';

export interface ChatWindowProps {
  messages: Message[];
  onSendMessage: (text: string) => Promise<void>;
  onClose: () => void;
  isProcessing: boolean;
  chatMode: ChatMode;
  toggleMode: () => void;
  clearMessages: () => void;
  isListening: boolean;
  toggleListening: () => void;
  isModelLoading: boolean;
  transcript: string;
  input?: string;
  setInput?: React.Dispatch<React.SetStateAction<string>>;
  isSpeaking?: boolean;
  stopSpeaking?: () => void;
}

export interface SpeechRecognitionHookReturn {
  transcript: string;
  resetTranscript: () => void;
  listening: boolean;
  toggleListening: () => void;
  startListening: () => void;
  stopListening: () => void;
}

export interface ChatButtonProps {
  onClick: () => void;
}

export interface MessageContextMenuProps {
  message: Message;
}

// For Chat Next
export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  isListening: boolean;
  isSpeaking: boolean;
  transcript: string;
  interimTranscript: string;
  isOpen: boolean;
  isMinimized: boolean;
}

export interface ChatMessage {
  id: string;
  content?: string;
  text?: string;
  role?: 'user' | 'assistant' | 'system';
  sender?: 'user' | 'ai' | string;
  timestamp: string | Date;
}
