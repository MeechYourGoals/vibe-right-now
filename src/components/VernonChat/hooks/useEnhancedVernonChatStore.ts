
import { useCallback } from 'react';
import { useChatStore, useUserStore } from '@/store';
import { useMessageProcessor } from './useMessageProcessor';
import { useOptimizedSpeechRecognition } from './speechRecognition/useOptimizedSpeechRecognition';
import { useOptimizedSpeechSynthesis } from './speechSynthesis/useOptimizedSpeechSynthesis';
import { Message, MessageDirection } from '../types';
import { createAIMessage, createUserMessage } from '../utils/messageFactory';

export const useEnhancedVernonChatStore = () => {
  const { 
    chatState,
    setChatOpen,
    addMessage,
    setTyping,
    setProcessing,
    setChatMode,
    setListening,
    setTranscript,
    clearMessages
  } = useChatStore();
  
  const { user } = useUserStore();
  const { processMessage } = useMessageProcessor();
  
  // Use optimized speech hooks
  const { speak, stop: stopSpeaking, isSpeaking } = useOptimizedSpeechSynthesis();
  const { 
    isListening, 
    transcript, 
    interimTranscript,
    toggleListening,
    clearTranscript 
  } = useOptimizedSpeechRecognition({
    continuous: true,
    interimResults: true
  });

  const addChatMessage = useCallback((content: string, direction: MessageDirection, aiResponse = false) => {
    const timestamp = new Date();
    const message: Message = {
      id: `msg-${Date.now()}`, 
      content, 
      direction, 
      timestamp,
      aiResponse,
      text: content,
      sender: direction === 'outgoing' ? 'user' : 'ai'
    };
    
    addMessage(message);
  }, [addMessage]);

  const handleSendMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;
    
    stopSpeaking();
    clearTranscript();
    
    addChatMessage(text, 'outgoing');
    setProcessing(true);

    try {
      const response = await processMessage(text, chatState.messages, chatState.chatMode);
      addChatMessage(response, 'incoming', true);
      
      // Auto-speak response if listening mode is active
      if (isListening) {
        await speak(response);
      }
    } catch (error) {
      console.error('Error processing message:', error);
      const errorMsg = 'Sorry, I encountered an error. Please try again later.';
      addChatMessage(errorMsg, 'incoming');
      if (isListening) {
        await speak(errorMsg);
      }
    } finally {
      setProcessing(false);
    }
  }, [addChatMessage, chatState.messages, chatState.chatMode, processMessage, speak, stopSpeaking, clearTranscript, isListening, setProcessing]);

  // Handle transcript completion (when user stops speaking)
  const onTranscriptComplete = useCallback((finalTranscript: string) => {
    if (finalTranscript.trim()) {
      handleSendMessage(finalTranscript);
    }
  }, [handleSendMessage]);

  const toggleChat = useCallback(() => {
    setChatOpen(!chatState.isOpen);
  }, [setChatOpen, chatState.isOpen]);

  const toggleMode = useCallback(() => {
    setChatMode(chatState.chatMode === 'user' ? 'venue' : 'user');
  }, [setChatMode, chatState.chatMode]);

  const initializeWelcomeMessage = useCallback(() => {
    if (chatState.messages.length === 0) {
      const welcomeMsg = 'Hello! I\'m Vernon, your AI assistant powered by Perplexity. How can I help you discover venues and events today?';
      addChatMessage(welcomeMsg, 'incoming', true);
    }
  }, [chatState.messages.length, addChatMessage]);

  return {
    // State
    isOpen: chatState.isOpen,
    messages: chatState.messages,
    isProcessing: chatState.isProcessing,
    chatMode: chatState.chatMode,
    isListening,
    transcript: interimTranscript || transcript,
    isSpeaking,
    
    // Actions
    toggleChat,
    handleSendMessage,
    toggleMode,
    clearMessages,
    toggleListening,
    initializeWelcomeMessage,
    onTranscriptComplete
  };
};
