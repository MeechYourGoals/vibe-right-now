
import { useState } from 'react';
import { Message } from '../types';
import { INITIAL_MESSAGE } from '../utils/messageFactory';
import { useMessageProcessor } from './useMessageProcessor';

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  
  const {
    isTyping,
    isSearching,
    processMessage
  } = useMessageProcessor();

  const handleSendMessage = async (inputValue: string) => {
    await processMessage(inputValue, setMessages);
  };

  return {
    messages,
    isTyping,
    isSearching,
    handleSendMessage
  };
};
