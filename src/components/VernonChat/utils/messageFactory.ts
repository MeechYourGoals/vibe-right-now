
import { v4 as uuidv4 } from 'uuid';
import { Message } from '../types';

// Create a user message
export const createUserMessage = (text: string): Message => {
  return {
    id: uuidv4(),
    text: text,
    sender: 'user',
    timestamp: new Date(),
    role: 'user',
    content: text
  };
};

// Create an AI response message
export const createAIMessage = (text: string): Message => {
  return {
    id: uuidv4(),
    text: text,
    sender: 'ai',
    timestamp: new Date(),
    role: 'assistant',
    content: text,
    verified: true
  };
};

// Create an error message
export const createErrorMessage = (): Message => {
  return createAIMessage(
    "I'm sorry, I'm having trouble processing your request right now. Could you try rephrasing your question or asking something else?"
  );
};

// Create a location search message
export const createLocationSearchMessage = (locations: any[]): Message => {
  let responseText = '';
  
  if (locations.length === 0) {
    responseText = "I couldn't find any matching locations. Could you try a different search?";
  } else {
    responseText = `Here are some locations that match your search:\n\n${
      locations.map((loc, index) => `${index + 1}. ${loc.name} - ${loc.address || loc.city}`).join('\n')
    }`;
  }
  
  return createAIMessage(responseText);
};

// Create a search message
export const createSearchMessage = (results: any[]): Message => {
  let responseText = '';
  
  if (results.length === 0) {
    responseText = "I couldn't find any results matching your search. Could you try a different query?";
  } else {
    responseText = `Here are the search results:\n\n${
      results.map((result, index) => `${index + 1}. ${result.title || result.name} - ${result.description || ''}`).join('\n')
    }`;
  }
  
  return createAIMessage(responseText);
};

// Create a processing message
export const createProcessingMessage = (): Message => {
  return createAIMessage("I'm processing your request. This might take a moment...");
};

// Create a booking confirmation message
export const createBookingConfirmationMessage = (details: any): Message => {
  return createAIMessage(
    `Great! I've confirmed your booking for ${details.venueName} on ${details.date} at ${details.time}. You'll receive a confirmation email shortly.`
  );
};
