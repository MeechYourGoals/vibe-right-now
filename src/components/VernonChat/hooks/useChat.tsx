
import { useState } from 'react';
import { Message } from '../types';
import { INITIAL_MESSAGE } from '../utils/messageFactory';
import { useMessageProcessor } from './useMessageProcessor';

export const useChat = (isProPlan: boolean = false, isVenueMode: boolean = false) => {
  const initialMessage = isVenueMode 
    ? {
        id: '1',
        text: "Hi there! I'm VeRNon for Venues, your business insights assistant. I can help you understand your venue metrics, customer trends, and marketing performance. What would you like to know about your venue's performance?",
        sender: 'ai' as const,
        timestamp: new Date()
      }
    : INITIAL_MESSAGE;
  
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  
  const {
    isTyping,
    isSearching,
    processMessage
  } = useMessageProcessor(isProPlan, isVenueMode);

  const handleSendMessage = async (inputValue: string) => {
    if (!inputValue || inputValue.trim() === '') {
      return;
    }
    
    // Add user message immediately
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Process the message to get AI response
    await processMessage(inputValue, setMessages);
  };

  return {
    messages,
    isTyping,
    isSearching,
    handleSendMessage
  };
};
