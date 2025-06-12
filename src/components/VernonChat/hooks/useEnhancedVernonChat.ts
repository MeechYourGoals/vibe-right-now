
import { useState, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { useMessageProcessor } from './useMessageProcessor';
import { useConversationalMicrophone } from './useConversationalMicrophone';
import { useEnhancedSpeechSynthesis } from './useEnhancedSpeechSynthesis';
import { Message, MessageDirection, ChatMode } from '../types';

export const useEnhancedVernonChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useLocalStorage<Message[]>('vernon_messages', []);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [chatMode, setChatMode] = useLocalStorage<ChatMode>('vernon_chat_mode', 'user');
  const { processMessage } = useMessageProcessor();
  const { speak, stopSpeaking, isSpeaking } = useEnhancedSpeechSynthesis();

  const addMessage = useCallback((content: string, direction: MessageDirection, aiResponse = false) => {
    const timestamp = new Date();
    
    setMessages(prevMessages => [
      ...prevMessages, 
      { 
        id: `msg-${Date.now()}`, 
        content, 
        direction, 
        timestamp,
        aiResponse,
        text: content,
        sender: direction === 'outgoing' ? 'user' : 'ai'
      }
    ]);
  }, [setMessages]);

  const handleSendMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;
    
    // Stop any current speech
    stopSpeaking();
    
    setInput('');
    addMessage(text, 'outgoing');
    setIsProcessing(true);

    try {
      const response = await processMessage(text, messages, chatMode);
      addMessage(response, 'incoming', true);
      
      // Automatically speak the response
      await speak(response);
    } catch (error) {
      console.error('Error processing message:', error);
      const errorMsg = 'Sorry, I encountered an error. Please try again later.';
      addMessage(errorMsg, 'incoming');
      await speak(errorMsg);
    } finally {
      setIsProcessing(false);
    }
  }, [addMessage, messages, processMessage, chatMode, speak, stopSpeaking]);

  const onTranscriptComplete = useCallback((transcript: string) => {
    handleSendMessage(transcript);
  }, [handleSendMessage]);

  const { 
    isListening, 
    transcript, 
    toggleListening 
  } = useConversationalMicrophone({ 
    onTranscriptComplete,
    isVoiceEnabled: true 
  });

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const toggleMode = useCallback(() => {
    setChatMode(prev => prev === 'user' ? 'venue' : 'user');
  }, [setChatMode]);

  const clearMessages = useCallback(() => {
    setMessages([]);
    stopSpeaking();
  }, [setMessages, stopSpeaking]);

  // Add welcome message on first load if no messages exist
  const initializeWelcomeMessage = useCallback(() => {
    if (messages.length === 0) {
      const timestamp = new Date();
      const welcomeMsg = 'Hello! I\'m Vernon, your AI assistant powered by Google Gemini. How can I help you discover venues and events today?';
      
      setMessages([
        {
          id: 'welcome',
          content: welcomeMsg,
          direction: 'incoming',
          timestamp,
          aiResponse: true,
          text: welcomeMsg,
          sender: 'ai'
        }
      ]);
    }
  }, [messages.length, setMessages]);

  return {
    isOpen,
    toggleChat,
    messages,
    input,
    setInput,
    handleSendMessage,
    isProcessing,
    chatMode,
    toggleMode,
    clearMessages,
    isListening,
    toggleListening,
    transcript,
    isSpeaking,
    initializeWelcomeMessage
  };
};
