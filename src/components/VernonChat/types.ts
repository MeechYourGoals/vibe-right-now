
import { ChatMessage } from '@/types';

// Alias ChatMessage to Message for backward compatibility
export type Message = ChatMessage;

// For compatibility with existing code that expects the old interface
export interface LegacyMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  verified?: boolean;
  // For compatibility with newer format
  content?: string;
  role?: 'user' | 'assistant' | 'system' | 'error';
}
