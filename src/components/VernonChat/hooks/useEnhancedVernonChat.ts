
import { useState, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { useMessageProcessor } from './useMessageProcessor';
import { useOptimizedSpeechRecognition } from './speechRecognition/useOptimizedSpeechRecognition';
import { useOptimizedSpeechSynthesis } from './speechSynthesis/useOptimizedSpeechSynthesis';
import { Message, MessageDirection, ChatMode } from '../types';

export const useEnhancedVernonChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useLocalStorage<Message[]>('vernon_messages', []);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [chatMode, setChatMode] = useLocalStorage<ChatMode>('vernon_chat_mode', 'user');
  const { processMessage } = useMessageProcessor();
  
  // Use optimized speech hooks
  const { speak, stop: stopSpeaking, isSpeaking, promptForElevenLabsKey } = useOptimizedSpeechSynthesis();

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
    
    // Stop any current speech before sending new message
    stopSpeaking();
    
    setInput('');
    addMessage(text, 'outgoing');
    setIsProcessing(true);

    try {
      const response = await processMessage(text, messages, chatMode);
      addMessage(response, 'incoming', true);
      
      // Auto-speak response if listening mode was active
      if (isListening) {
        // Add a small delay to ensure the message is rendered first
        setTimeout(() => {
          speak(response);
        }, 100);
      }
    } catch (error) {
      console.error('Error processing message:', error);
      const errorMsg = 'Sorry, I encountered an error. Please try again later.';
      addMessage(errorMsg, 'incoming');
      if (isListening) {
        setTimeout(() => {
          speak(errorMsg);
        }, 100);
      }
    } finally {
      setIsProcessing(false);
    }
  }, [addMessage, messages, processMessage, chatMode, speak, stopSpeaking, isListening]);

  // Auto-processing callback for speech recognition
  const handleTranscriptComplete = useCallback(async (finalTranscript: string) => {
    console.log('Auto-processing transcript:', finalTranscript);
    if (finalTranscript.trim()) {
      await handleSendMessage(finalTranscript);
    }
  }, [handleSendMessage]);

  // Initialize speech recognition with auto-processing
  const { 
    isListening, 
    transcript, 
    interimTranscript,
    toggleListening,
    clearTranscript 
  } = useOptimizedSpeechRecognition({
    continuous: true,
    interimResults: true,
    onTranscriptComplete: handleTranscriptComplete
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
    clearTranscript();
  }, [setMessages, stopSpeaking, clearTranscript]);

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
    transcript: interimTranscript || transcript,
    isSpeaking,
    stopSpeaking,
    promptForElevenLabsKey,
    initializeWelcomeMessage
  };
};
