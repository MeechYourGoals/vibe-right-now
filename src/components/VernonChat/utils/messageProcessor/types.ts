
import { Message } from '../../types';

export interface MessageContext {
  query: string;
  timestamp: Date;
  userId?: string;
  sessionId?: string;
  messages: Message[];
  paginationState: any;
  options: ProcessMessageOptions;
}

export interface ProcessMessageOptions {
  setIsTyping: (typing: boolean) => void;
  setIsSearching: (searching: boolean) => void;
  updatePaginationState: (params: any) => any;
  isVenueMode: boolean;
}

export interface MessageProcessor {
  canProcess(context: MessageContext): boolean;
  process(
    context: MessageContext,
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>
  ): Promise<boolean>;
}
