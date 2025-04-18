
export class MessageFactory {
  static createUserMessage(content: string) {
    return {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date(),
      // For compatibility with VernonNext
      text: content,
      sender: 'user' as const
    };
  }

  static createAssistantMessage(content: string) {
    return {
      id: Date.now().toString(),
      content,
      role: 'assistant',
      timestamp: new Date(),
      // For compatibility with VernonNext
      text: content,
      sender: 'ai' as const
    };
  }

  static createSystemMessage(content: string) {
    return {
      id: Date.now().toString(),
      content,
      role: 'system',
      timestamp: new Date(),
      // For compatibility with VernonNext
      text: content,
      sender: 'ai' as const
    };
  }

  static createAIMessage(content: string) {
    return this.createAssistantMessage(content);
  }

  static createErrorMessage(content: string = "I'm sorry, I couldn't process that request. Please try again.") {
    return {
      id: Date.now().toString(),
      content,
      role: 'error',
      timestamp: new Date(),
      // For compatibility with VernonNext
      text: content,
      sender: 'ai' as const
    };
  }

  static get INITIAL_MESSAGE() {
    return this.createSystemMessage("Hi! I'm Vernon, your personal concierge. How can I help you today?");
  }
}

// Export individual functions for backward compatibility
export const createUserMessage = (content: string) => MessageFactory.createUserMessage(content);
export const createAssistantMessage = (content: string) => MessageFactory.createAssistantMessage(content);
export const createSystemMessage = (content: string) => MessageFactory.createSystemMessage(content);
export const createAIMessage = (content: string) => MessageFactory.createAIMessage(content);
export const createErrorMessage = (content: string = "I'm sorry, I couldn't process that request. Please try again.") => 
  MessageFactory.createErrorMessage(content);
export const INITIAL_MESSAGE = MessageFactory.INITIAL_MESSAGE;
