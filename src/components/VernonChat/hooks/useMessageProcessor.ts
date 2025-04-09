
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
    await processMessageInput(inputValue, setMessages, {
      isVenueMode,
      isProPlan,
      updatePaginationState,
      setIsTyping,
      setIsSearching
    });
  };

  return {
    isTyping,
    isSearching,
    processMessage
  };
};
