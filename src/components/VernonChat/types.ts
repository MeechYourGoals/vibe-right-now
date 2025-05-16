
// Update the types to include what's needed for Vernon Chat
export interface Message {
  id: string;
  content: string;
  direction: MessageDirection;
  timestamp: Date;
  aiResponse?: boolean;
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
