
import { AgentHandler } from '../../handlers/agentHandler';
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
    console.log('Using Project Mariner agentic browsing to process query');
    return await AgentHandler.handleAgentQuery(
      context.query, 
      setMessages,
      context.options.isVenueMode
    );
  }
}
