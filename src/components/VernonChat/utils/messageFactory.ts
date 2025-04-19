
import { Message } from '../types';

export class MessageFactory {
  static createUserMessage(content: string): Message {
    return {
      id: Date.now().toString(),
      content,
      role: 'user',
      text: content,
      sender: 'user',
      timestamp: new Date()
    };
  }

  static createAssistantMessage(content: string): Message {
    return {
      id: Date.now().toString(),
      content,
      role: 'assistant',
      text: content,
      sender: 'ai',
      timestamp: new Date()
    };
  }

  static createSystemMessage(content: string): Message {
    return {
      id: Date.now().toString(),
      content,
      role: 'system',
      text: content,
      sender: 'ai',
      timestamp: new Date()
    };
  }

  // New message types to fix import errors
  static createAIMessage(content: string): Message {
    return this.createAssistantMessage(content);
  }

  static createErrorMessage(content: string = "Sorry, I couldn't process that request. Please try again."): Message {
    return {
      id: Date.now().toString(),
      content,
      role: 'error',
      text: content,
      sender: 'ai',
      timestamp: new Date()
    };
  }

  // Add initial message constant to fix import errors
  static get INITIAL_MESSAGE(): Message {
    return this.createSystemMessage("Hi! I'm Vernon, your personal concierge. How can I help you today?");
  }
}

// Export singleton functions for backward compatibility
export const createUserMessage = MessageFactory.createUserMessage;
export const createAssistantMessage = MessageFactory.createAssistantMessage;
export const createSystemMessage = MessageFactory.createSystemMessage;
export const createAIMessage = MessageFactory.createAIMessage;
export const createErrorMessage = MessageFactory.createErrorMessage;
export const INITIAL_MESSAGE = MessageFactory.INITIAL_MESSAGE;
