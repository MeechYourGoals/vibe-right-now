
export class MessageFactory {
  static createUserMessage(content: string) {
    return {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date().toISOString()
    };
  }

  static createAssistantMessage(content: string) {
    return {
      id: Date.now().toString(),
      content,
      role: 'assistant',
      timestamp: new Date().toISOString()
    };
  }

  static createSystemMessage(content: string) {
    return {
      id: Date.now().toString(),
      content,
      role: 'system',
      timestamp: new Date().toISOString()
    };
  }

  // New message types to fix import errors
  static createAIMessage(content: string) {
    return this.createAssistantMessage(content);
  }

  static createErrorMessage(content: string) {
    return {
      id: Date.now().toString(),
      content,
      role: 'error',
      timestamp: new Date().toISOString()
    };
  }

  // Add initial message constant to fix import errors
  static get INITIAL_MESSAGE() {
    return this.createSystemMessage("Hi! I'm Vernon, your personal concierge. How can I help you today?");
  }
}
