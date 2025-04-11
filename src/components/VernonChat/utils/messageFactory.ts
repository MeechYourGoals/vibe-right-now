
import { Message } from '../types';

/**
 * Message factory to create consistent message objects
 */
export const createUserMessage = (text: string): Message => ({
  id: Date.now().toString(),
  text,
  sender: 'user',
  timestamp: new Date()
});

export const createAIMessage = (text: string): Message => ({
  id: (Date.now() + 1).toString(),
  text,
  sender: 'ai',
  timestamp: new Date()
});

export const createErrorMessage = (): Message => ({
  id: (Date.now() + 1).toString(),
  text: "I'm having trouble finding that information right now. Could you try asking your question again?",
  sender: 'ai',
  timestamp: new Date()
});

export const INITIAL_MESSAGE: Message = {
  id: '1',
  text: "Hi there! I'm your friendly Lovable guide. I can help you discover amazing places to go and things to do based on your interests. Try asking about restaurants, events, attractions, or specific activities you're interested in. What are you looking for today?",
  sender: 'ai',
  timestamp: new Date()
};
