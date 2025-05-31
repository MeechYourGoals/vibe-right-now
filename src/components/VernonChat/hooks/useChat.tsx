
import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Message } from '../types'; // ChatMode is not directly used here anymore for initial message
import { createAIMessage, createUserMessage } from '../utils/messageFactory';
import { useMessageProcessor } from './useMessageProcessor';

const VERNON_CHAT_HISTORY_KEY = 'vernonChatHistory';

// Create initial welcome message
const createWelcomeMessage = (isVenueMode: boolean): Message => {
  const text = isVenueMode 
    ? "Hi there! I'm VeRNon for Venues, your business insights assistant. I can help you understand your venue metrics, customer trends, and marketing performance. What would you like to know about your venue's performance?"
    : "Hi there! I'm Vernon, your AI assistant for discovering the best venues and events. How can I help you today?";
  
  return {
    id: `welcome-${Date.now()}`, // Ensure unique ID for welcome message
    text: text,
    content: text,
    sender: 'ai',
    direction: 'incoming',
    timestamp: new Date()
  };
};

export const useChat = (isProPlan: boolean = false, isVenueMode: boolean = false) => {
  const [messages, setMessages] = useState<Message[]>(() => {
    try {
      const storedMessages = localStorage.getItem(VERNON_CHAT_HISTORY_KEY);
      if (storedMessages) {
        const parsedMessages = JSON.parse(storedMessages) as Message[];
        // Convert timestamp strings back to Date objects
        return parsedMessages.map(msg => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
      }
    } catch (error) {
      console.error("Error loading messages from localStorage:", error);
    }
    return [createWelcomeMessage(isVenueMode)];
  });

  const [paginationState, setPaginationState] = useState<Record<string, number>>({});
  const [isTyping, setIsTyping] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  
  const navigate = useNavigate();
  
  const { processMessage, isProcessing } = useMessageProcessor(); // isProcessing can be returned if needed by UI

  // Save messages to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(VERNON_CHAT_HISTORY_KEY, JSON.stringify(messages));
    } catch (error) {
      console.error("Error saving messages to localStorage:", error);
    }
  }, [messages]);

  // Function to update pagination state
  const updatePaginationState = useCallback((params: Record<string, number>) => {
    setPaginationState(prev => ({ ...prev, ...params }));
    return { ...paginationState, ...params };
  }, [paginationState]);

  // Parse messages for explore page links (existing useEffect)
  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    
    if (lastMessage && (lastMessage.direction === 'incoming' || lastMessage.sender === 'ai')) {
      const messageContent = lastMessage.content || lastMessage.text || '';
      const exploreRegex = /\[(.*?explore.*?)\]\(\/explore\?q=(.*?)\)/i;
      const match = messageContent.match(exploreRegex);
      
      if (match && match[2]) {
        const query = decodeURIComponent(match[2]);
        try {
          sessionStorage.setItem('lastChatQuery', query);
          sessionStorage.setItem('lastChatTimestamp', new Date().toISOString());
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
    
    // Optimistically add user message
    const userMessage = createUserMessage(inputValue);
    setMessages(prev => [...prev, userMessage]);

    setIsTyping(true);
    setIsSearching(false); // Reset searching state

    try {
      // Session storage logic for explore page (existing)
      const explorePageTerms = /restaurants|bars|clubs|things to do|attractions|events|venues|nightlife|sports game|concert|show/i;
      const containsLocationTerms = /in|at|near|around|chicago|miami|new york|los angeles|san francisco|boston|seattle/i;
      const isExploreCityQuery = explorePageTerms.test(inputValue) && containsLocationTerms.test(inputValue);
      const isComplexQuery = inputValue.length > 50 && 
        /(\w+\s+(and|or|with|near|before|after)\s+\w+)|(\w+\s+for\s+\w+)/i.test(inputValue);
      if ((isExploreCityQuery || isComplexQuery) && inputValue.length > 15) {
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
      
      // Process the message to get AI response
      const chatModeForAPI = isVenueMode ? 'venue' : 'user';
      // Pass only previous messages, not the one just added by the user for context
      const response = await processMessage(inputValue, messages.slice(0, -1), chatModeForAPI);
      const aiMessage = createAIMessage(response);
      setMessages(prev => [...prev.slice(0, -1), userMessage, aiMessage]); // Replace user message if AI responds, or add AI
    } catch (error) {
      console.error('Error processing message with AI:', error);
      const errorMessage = error.message || "I'm sorry, I encountered an error. Please try again later.";
      const aiErrorMessage = createAIMessage(errorMessage);
      // Ensure user message is still there, then add error
      setMessages(prev => [...prev.filter(m => m.id !== userMessage.id), userMessage, aiErrorMessage]);
    } finally {
      setIsTyping(false);
      setIsSearching(false);
    }
  }, [messages, isVenueMode, processMessage, navigate]); // Added navigate to dependencies

  const clearMessages = useCallback(() => {
    const newWelcomeMessage = createWelcomeMessage(isVenueMode);
    setMessages([newWelcomeMessage]);
    try {
      localStorage.removeItem(VERNON_CHAT_HISTORY_KEY);
    } catch (error) {
      console.error("Error clearing chat history from localStorage:", error);
    }
  }, [isVenueMode]);

  return {
    messages,
    isTyping, // Renamed from isProcessing to match typical chat UI state
    isProcessing, // Exporting the original isProcessing from useMessageProcessor
    isSearching,
    handleSendMessage,
    updatePaginationState,
    clearMessages // Export clearMessages
  };
};
