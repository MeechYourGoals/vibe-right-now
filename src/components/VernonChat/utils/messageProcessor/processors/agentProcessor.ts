
import { AgentHandler } from '../../handlers/agentHandler';
import { MessageContext, MessageProcessor } from '../types';
import { Message } from '../../../types';
import { createAIMessage } from '../../messageFactory';

export class AgentProcessor implements MessageProcessor {
  canProcess(context: MessageContext): boolean {
    return AgentHandler.shouldUseAgent(context.query);
  }

  async process(
    context: MessageContext,
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>
  ): Promise<boolean> {
    return await AgentHandler.handleAgentQuery(
      context.query, 
      setMessages,
      context.options.isVenueMode
    );
  }
}
