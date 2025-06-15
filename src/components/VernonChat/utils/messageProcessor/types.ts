
import { Message } from '../../types';

export interface MessageContext {
  query: string;
  messages: Message[];
  isVenueMode: boolean;
  isProPlan: boolean;
  paginationState: Record<string, number>;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  setIsTyping: (isTyping: boolean) => void;
  setIsSearching: (isSearching: boolean) => void;
}

export interface ProcessingResult {
  success: boolean;
  handled: boolean;
  response?: string;
  error?: string;
}

export interface MessageProcessor {
  name: string;
  priority: number;
  canHandle(context: MessageContext): boolean;
  process(context: MessageContext): Promise<ProcessingResult>;
}

export interface Middleware {
  name: string;
  execute(context: MessageContext, next: () => Promise<ProcessingResult>): Promise<ProcessingResult>;
}
