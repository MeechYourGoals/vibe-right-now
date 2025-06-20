
import { useState, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { useMessageProcessor } from './useMessageProcessor';
import { useEnhancedSpeechRecognition } from './speechRecognition/useEnhancedSpeechRecognition';
import { useEnhancedSpeechSynthesis } from './speechSynthesis/useEnhancedSpeechSynthesis';
import { Message, MessageDirection, ChatMode } from '../types';

export const useEnhancedVernonChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useLocalStorage<Message[]>('vernon_messages', []);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [chatMode, setChatMode] = useLocalStorage<ChatMode>('vernon_chat_mode', 'user');
  const { processMessage } = useMessageProcessor();
  
  // Enhanced speech synthesis with stop/pause functionality
  const { 
    speak, 
    stop: stopSpeaking, 
    togglePause,
    isSpeaking,
    isPaused,
    currentText,
    speechMethod,
    hasElevenLabsKey,
    setSpeechMethod
  } = useEnhancedSpeechSynthesis({
    useElevenLabs: true
  });

  // Enhanced speech recognition with auto-processing
  const { 
    isListening, 
    transcript, 
    interimTranscript,
    isProcessing: speechProcessing,
    toggleListening,
    clearTranscript,
    hasBrowserSupport
  } = useEnhancedSpeechRecognition({
    continuous: true,
    interimResults: true,
    autoSend: true,
    silenceTimeout: 3000 // 3 seconds of silence triggers auto-send
  }, handleTranscriptComplete);

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

  // Handle when speech recognition completes with final transcript
  function handleTranscriptComplete(finalTranscript: string) {
    if (finalTranscript.trim()) {
      console.log('Auto-sending transcript:', finalTranscript);
      handleSendMessage(finalTranscript);
      clearTranscript();
    }
  }

  const handleSendMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;
    
    // Stop any current speech and clear transcript
    stopSpeaking();
    clearTranscript();
    
    setInput('');
    addMessage(text, 'outgoing');
    setIsProcessing(true);

    try {
      const response = await processMessage(text, messages, chatMode);
      addMessage(response, 'incoming', true);
      
      // Auto-speak response if we have ElevenLabs or if user was just using voice
      if (isListening || hasElevenLabsKey) {
        await speak(response);
      }
    } catch (error) {
      console.error('Error processing message:', error);
      const errorMsg = 'Sorry, I encountered an error. Please try again later.';
      addMessage(errorMsg, 'incoming');
    } finally {
      setIsProcessing(false);
    }
  }, [addMessage, messages, processMessage, chatMode, speak, stopSpeaking, clearTranscript, isListening, hasElevenLabsKey]);

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
    isProcessing: isProcessing || speechProcessing,
    chatMode,
    toggleMode,
    clearMessages,
    
    // Enhanced speech recognition
    isListening,
    toggleListening,
    transcript: interimTranscript || transcript,
    hasBrowserSupport,
    
    // Enhanced speech synthesis
    isSpeaking,
    isPaused,
    currentText,
    speak,
    stopSpeaking,
    togglePause,
    speechMethod,
    hasElevenLabsKey,
    setSpeechMethod,
    
    // Utilities
    initializeWelcomeMessage
  };
};
