
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
  text: "Hi there! I'm VeRNon, your Vibe guide. I can help you discover cool places, events happening tonight, or answer questions about specific venues. What are you looking for?",
  sender: 'ai',
  timestamp: new Date()
};
