
import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Message, ChatMode } from '../types';
import { createAIMessage, createUserMessage } from '../utils/messageFactory';
import { useMessageProcessor } from './useMessageProcessor';

// Create initial message
const createInitialMessage = (isVenueMode: boolean): Message => {
  const text = isVenueMode 
    ? "Hi there! I'm VeRNon for Venues, your business insights assistant. I can help you understand your venue metrics, customer trends, and marketing performance. What would you like to know about your venue's performance?"
    : "Hi there! I'm Vernon, your AI assistant for discovering the best venues and events. How can I help you today?";
  
  return {
    id: '1',
    text: text,
    content: text,
    sender: 'ai',
    direction: 'incoming',
    timestamp: new Date()
  };
};

export const useChat = (isProPlan: boolean = false, isVenueMode: boolean = false) => {
  const initialMessage = createInitialMessage(isVenueMode);
  
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [paginationState, setPaginationState] = useState<Record<string, number>>({});
  const [isTyping, setIsTyping] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  
  const navigate = useNavigate();
  
  const { processMessage, isProcessing } = useMessageProcessor();

  // Function to update pagination state
  const updatePaginationState = useCallback((params: Record<string, number>) => {
    setPaginationState(prev => ({ ...prev, ...params }));
    return { ...paginationState, ...params };
  }, [paginationState]);

  // Parse messages for explore page links
  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    
    if (lastMessage && (lastMessage.direction === 'incoming' || lastMessage.sender === 'ai')) {
      const messageContent = lastMessage.content || lastMessage.text || '';
      
      // Look for explore page links in the format [view all these results on our Explore page](/explore?q=...)
      const exploreRegex = /\[(.*?explore.*?)\]\(\/explore\?q=(.*?)\)/i;
      const match = messageContent.match(exploreRegex);
      
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
      const userMessage = createUserMessage(inputValue);
      setMessages(prev => [...prev, userMessage]);
      
      setIsTyping(true);
      setIsSearching(false);
      
      // Process the message to get AI response
      try {
        const chatMode = isVenueMode ? 'venue' : 'user';
        const response = await processMessage(inputValue, messages, chatMode);
        const aiMessage = createAIMessage(response);
        setMessages(prev => [...prev, aiMessage]);
      } catch (error) {
        console.error('Error processing message:', error);
        setMessages(prev => [
          ...prev,
          createAIMessage("I'm sorry, I encountered an error. Please try again later.")
        ]);
      } finally {
        setIsTyping(false);
        setIsSearching(false);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      // Make sure we show an error to the user
      setMessages(prev => [
        ...prev,
        createAIMessage("I'm sorry, I encountered an error. Please try again.")
      ]);
      setIsTyping(false);
      setIsSearching(false);
    }
  }, [messages, isVenueMode, processMessage]);

  return {
    messages,
    isTyping,
    isSearching,
    handleSendMessage,
    updatePaginationState
  };
};
