
import { Message } from '../types';
import { v4 as uuidv4 } from 'uuid';

export const createUserMessage = (content: string): Message => {
  return {
    id: uuidv4(),
    role: 'user',
    content,
    timestamp: new Date().toISOString()
  };
};

export const createAssistantMessage = (content: string): Message => {
  return {
    id: uuidv4(),
    role: 'assistant',
    content,
    timestamp: new Date().toISOString()
  };
};

// For backward compatibility
export const createMessage = (role: 'user' | 'assistant', content: string): Message => {
  if (role === 'user') {
    return createUserMessage(content);
  } else {
    return createAssistantMessage(content);
  }
};
