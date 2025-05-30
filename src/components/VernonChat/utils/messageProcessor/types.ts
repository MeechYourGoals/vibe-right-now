
import { MessageContext, ProcessMessageOptions, Message } from "@/types";

export interface MessageProcessor {
  canHandle: (context: MessageContext) => boolean;
  process: (context: MessageContext) => Promise<Message>;
}

export { MessageContext, ProcessMessageOptions, Message };
