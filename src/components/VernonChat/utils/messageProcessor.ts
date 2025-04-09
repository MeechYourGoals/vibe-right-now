
import { Message } from '../types';
import { processQuery } from './handlers';
import { createMessage } from './messageFactory';

interface ProcessMessageOptions {
  isVenueMode: boolean;
  isProPlan: boolean;
  updatePaginationState: (options: any) => void;
  setIsTyping: (isTyping: boolean) => void;
  setIsSearching: (isSearching: boolean) => void;
}

export const processMessageInput = async (
  inputValue: string,
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
  options: ProcessMessageOptions
) => {
  const { isVenueMode, isProPlan, updatePaginationState, setIsTyping, setIsSearching } = options;
  
  // Add user message
  const userMessage = createMessage('user', inputValue);
  setMessages(prevMessages => [...prevMessages, userMessage]);
  
  // Set typing state
  setIsTyping(true);
  
  try {
    // Process the user query
    const { responseText, paginationData } = await processQuery(inputValue, isVenueMode, isProPlan, setIsSearching);
    
    // Update pagination state if needed
    if (paginationData) {
      updatePaginationState(paginationData);
    }
    
    // Add assistant response
    const assistantMessage = createMessage('assistant', responseText);
    setMessages(prevMessages => [...prevMessages, assistantMessage]);
  } catch (error) {
    console.error('Error processing message:', error);
    
    // Add error message
    const errorMessage = createMessage(
      'assistant', 
      'I apologize, but I encountered an error processing your request. Please try again or ask something else.'
    );
    setMessages(prevMessages => [...prevMessages, errorMessage]);
  } finally {
    setIsTyping(false);
    setIsSearching(false);
  }
};
