
import { Message } from '../../types';

export interface ProcessMessageOptions {
  isVenueMode: boolean;
  isProPlan: boolean;
  updatePaginationState: (params: Record<string, number>) => Record<string, number>;
  setIsTyping: (isTyping: boolean) => void;
  setIsSearching: (isSearching: boolean) => void;
}

export interface MessageContext {
  messages: Message[];
  query: string;
  paginationState: Record<string, number>;
  options: ProcessMessageOptions;
}

export interface MessageProcessor {
  canProcess: (context: MessageContext) => boolean;
  process: (context: MessageContext, setMessages: React.Dispatch<React.SetStateAction<Message[]>>) => Promise<boolean>;
}
