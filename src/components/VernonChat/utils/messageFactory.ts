
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
}
