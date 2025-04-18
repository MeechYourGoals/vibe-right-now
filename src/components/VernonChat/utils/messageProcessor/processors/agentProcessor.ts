
import { ChatMessage } from '@/types';
import { AgentHandler } from '../../handlers/agentHandler';
import { MessageContext, MessageProcessor } from '../types';

export class AgentProcessor implements MessageProcessor {
  canProcess(context: MessageContext): boolean {
    return AgentHandler.shouldUseAgent(context.query);
  }

  async process(
    context: MessageContext,
    setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>
  ): Promise<boolean> {
    return await AgentHandler.handleAgentQuery(
      context.query, 
      setMessages,
      context.options.isVenueMode
    );
  }
}
