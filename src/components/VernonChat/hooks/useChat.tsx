
import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  
  const {
    isTyping,
    isSearching,
    processMessage
  } = useMessageProcessor(isProPlan, isVenueMode);

  // Parse messages for explore page links
  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    
    if (lastMessage && lastMessage.sender === 'ai') {
      // Look for explore page links in the format [view all these results on our Explore page](/explore?q=...)
      const exploreRegex = /\[(.*?explore.*?)\]\(\/explore\?q=(.*?)\)/i;
      const match = lastMessage.text.match(exploreRegex);
      
      if (match && match[2]) {
        const query = decodeURIComponent(match[2]);
        
        // Store the query information for the explore page
        try {
          sessionStorage.setItem('lastChatQuery', query);
          sessionStorage.setItem('lastChatTimestamp', new Date().toISOString());
          
          // Check if this is a complex natural language query
          const isComplexQuery = query.length > 50 && 
            /(\w+\s+(and|or|with|near|before|after)\s+\w+)|(\w+\s+for\s+\w+)/i.test(query);
          
          if (isComplexQuery) {
            sessionStorage.setItem('isComplexQuery', 'true');
          }
        } catch (e) {
          console.error('Error storing query in sessionStorage:', e);
        }
      }
    }
  }, [messages, navigate]);

  const handleSendMessage = useCallback(async (inputValue: string) => {
    if (!inputValue || inputValue.trim() === '') {
      return;
    }
    
    try {
      // Check if this is a direct query for explore page
      const explorePageTerms = /restaurants|bars|clubs|things to do|attractions|events|venues|nightlife|sports game|concert|show/i;
      const containsLocationTerms = /in|at|near|around|chicago|miami|new york|los angeles|san francisco|boston|seattle/i;
      const isExploreCityQuery = explorePageTerms.test(inputValue) && containsLocationTerms.test(inputValue);
      
      // Check if this is a complex natural language query
      const isComplexQuery = inputValue.length > 50 && 
        /(\w+\s+(and|or|with|near|before|after)\s+\w+)|(\w+\s+for\s+\w+)/i.test(inputValue);
        
      if ((isExploreCityQuery || isComplexQuery) && inputValue.length > 15) {
        // Store query for the explore page
        try {
          sessionStorage.setItem('lastChatQuery', inputValue);
          sessionStorage.setItem('lastChatTimestamp', new Date().toISOString());
          
          if (isComplexQuery) {
            sessionStorage.setItem('isComplexQuery', 'true');
          }
        } catch (e) {
          console.error('Error storing query in sessionStorage:', e);
        }
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
