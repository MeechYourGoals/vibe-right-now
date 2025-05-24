
export interface MessageContext {
  query: string;
  timestamp: Date;
  userId?: string;
  sessionId?: string;
  messages?: any[];
  options?: ProcessMessageOptions;
  paginationState?: any;
}

export interface ProcessMessageOptions {
  query: string;
  messages: any[];
  setMessages: React.Dispatch<React.SetStateAction<any[]>>;
}

export interface MessageProcessor {
  canProcess(context: MessageContext): boolean;
  process(
    context: MessageContext,
    setMessages: React.Dispatch<React.SetStateAction<any[]>>
  ): Promise<boolean>;
}
