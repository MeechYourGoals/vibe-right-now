
export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  verified?: boolean;
  role?: 'user' | 'assistant' | 'system' | 'error';
  content?: string;
}
