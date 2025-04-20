
export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  verified?: boolean;
  content?: string; // Add content property to ensure it's always defined
  role?: 'user' | 'assistant' | 'system' | 'error';
}

export interface ChatMessage extends Message {
  role: 'user' | 'assistant' | 'system' | 'error';
  content: string; // Ensure content is required in ChatMessage
}
