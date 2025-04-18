
import { ChatMessage } from '@/types';

export class MessageFactory {
  static createUserMessage(content: string): ChatMessage {
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

  static createAssistantMessage(content: string): ChatMessage {
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

  static createSystemMessage(content: string): ChatMessage {
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

  static createAIMessage(content: string): ChatMessage {
    return this.createAssistantMessage(content);
  }

  static createErrorMessage(content: string = "I'm sorry, I couldn't process that request. Please try again."): ChatMessage {
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

  static get INITIAL_MESSAGE(): ChatMessage {
    return this.createSystemMessage("Hi! I'm Vernon, your personal concierge. How can I help you today?");
  }
}

// Export individual functions for backward compatibility
export const createUserMessage = (content: string): ChatMessage => MessageFactory.createUserMessage(content);
export const createAssistantMessage = (content: string): ChatMessage => MessageFactory.createAssistantMessage(content);
export const createSystemMessage = (content: string): ChatMessage => MessageFactory.createSystemMessage(content);
export const createAIMessage = (content: string): ChatMessage => MessageFactory.createAIMessage(content);
export const createErrorMessage = (content: string = "I'm sorry, I couldn't process that request. Please try again."): ChatMessage => 
  MessageFactory.createErrorMessage(content);
export const INITIAL_MESSAGE = MessageFactory.INITIAL_MESSAGE;
