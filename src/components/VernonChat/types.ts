
export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  verified?: boolean;
  // For compatibility with newer format
  content?: string;
  role?: 'user' | 'assistant' | 'system' | 'error';
}
