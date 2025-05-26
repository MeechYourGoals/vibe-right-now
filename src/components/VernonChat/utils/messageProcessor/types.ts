
export interface MessageContext {
  query: string;
  timestamp: Date;
  userId?: string;
  sessionId?: string;
}

export interface MessageProcessor {
  canProcess(context: MessageContext): boolean;
  process(
    context: MessageContext,
    setMessages: React.Dispatch<React.SetStateAction<any[]>>
  ): Promise<boolean>;
}
