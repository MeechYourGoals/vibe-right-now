
import { useState, useCallback } from 'react';
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

  const handleSendMessage = useCallback(async (inputValue: string) => {
    if (!inputValue || inputValue.trim() === '') {
      return;
    }
    
    try {
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
    } catch (error) {
      console.error('Error sending message:', error);
      // Make sure we show an error to the user
      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          text: "I'm sorry, I encountered an error. Please try again.",
          sender: 'ai',
          timestamp: new Date()
        }
      ]);
    }
  }, [processMessage]);

  return {
    messages,
    isTyping,
    isSearching,
    handleSendMessage
  };
};
