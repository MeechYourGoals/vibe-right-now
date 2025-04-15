
import { AgentHandler } from '../../handlers/agent';
import { MessageContext, MessageProcessor } from '../types';
import { Message } from '../../../types';

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
