
import { useState } from 'react';
import { Message } from '../types';
import { usePaginationState } from '../utils/pagination/usePaginationState';
import { processMessageInput } from '../utils/messageProcessor';

export const useMessageProcessor = (isProPlan: boolean = false, isVenueMode: boolean = false) => {
  const [isTyping, setIsTyping] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const { currentPaginationState, updatePaginationState } = usePaginationState();

  const processMessage = async (
    inputValue: string,
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>
  ) => {
    // Skip processing if the input is empty
    if (!inputValue || inputValue.trim() === '') {
      return;
    }
    
    console.log('Processing message:', inputValue);
    
    // Set typing and searching states to show loading indicators
    setIsTyping(true);
    setIsSearching(true);
    
    try {
      await processMessageInput(inputValue, setMessages, {
        isVenueMode,
        isProPlan,
        updatePaginationState,
        setIsTyping,
        setIsSearching
      });
    } catch (error) {
      console.error('Error processing message:', error);
      setIsTyping(false);
      setIsSearching(false);
    }
  };

  return {
    isTyping,
    isSearching,
    processMessage
  };
};
