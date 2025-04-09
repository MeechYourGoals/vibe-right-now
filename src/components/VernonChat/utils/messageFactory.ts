
import { Message } from '../types';
import { v4 as uuidv4 } from 'uuid';

// Define initial message constant
export const INITIAL_MESSAGE: Message = {
  id: '1',
  role: 'assistant',
  content: "Hi there! I'm VeRNon, your assistant. How can I help you today?",
  timestamp: new Date()
};

export const createUserMessage = (content: string): Message => {
  return {
    id: uuidv4(),
    role: 'user',
    content,
    timestamp: new Date()
  };
};

export const createAssistantMessage = (content: string): Message => {
  return {
    id: uuidv4(),
    role: 'assistant',
    content,
    timestamp: new Date()
  };
};

// Alias for createAssistantMessage to fix existing imports
export const createAIMessage = createAssistantMessage;

// For backward compatibility
export const createMessage = (role: 'user' | 'assistant', content: string): Message => {
  if (role === 'user') {
    return createUserMessage(content);
  } else {
    return createAssistantMessage(content);
  }
};
