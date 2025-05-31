
import { AgentHandler } from "../agentHandler";

// Re-export the AgentHandler for backward compatibility
export { AgentHandler };

// Pass-through methods for the agent handler
export const shouldUseAgent = (query: string): boolean => {
  return AgentHandler.shouldUseAgent(query);
};

export const isVenueRelatedAgentQuery = (query: string): boolean => {
  return AgentHandler.isVenueRelatedAgentQuery(query);
};

export const handleAgentQuery = (query: string, setMessages: any, isVenueMode = false): Promise<boolean> => {
  return AgentHandler.handleAgentQuery(query, setMessages, isVenueMode);
};
