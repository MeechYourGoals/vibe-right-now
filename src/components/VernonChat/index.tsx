
import React, { useState, useEffect, useCallback } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import ChatWindow from './ChatWindow';
import ChatButton from './ChatButton';
import { Message, MessageDirection, ChatMode } from './types';
import { useMessageProcessor } from './hooks/useMessageProcessor';
import { useSpeechRecognition } from './hooks/useSpeechRecognition';
import { WhisperSpeechService } from '@/services/WhisperSpeechService';
import { CoquiTTSService } from '@/services/CoquiTTSService';

const VernonChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useLocalStorage<Message[]>('vernon_messages', []);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [chatMode, setChatMode] = useLocalStorage<ChatMode>('vernon_chat_mode', 'user');
  const [isListening, setIsListening] = useState(false);
  const [isModelLoading, setIsModelLoading] = useState(false);
  const { processMessage } = useMessageProcessor();

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const toggleMode = useCallback(() => {
    setChatMode(prev => prev === 'user' ? 'venue' : 'user');
  }, [setChatMode]);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, [setMessages]);

  const addMessage = useCallback((content: string, direction: MessageDirection, aiResponse = false) => {
    const timestamp = new Date(); // Fix: Use Date object instead of string
    
    setMessages(prevMessages => [
      ...prevMessages, 
      { 
        id: `msg-${Date.now()}`, 
        content, 
        direction, 
        timestamp,
        aiResponse
      }
    ]);
  }, [setMessages]);

  const handleSendMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;
    
    setInput('');
    addMessage(text, 'outgoing');
    setIsProcessing(true);

    try {
      const response = await processMessage(text, messages, chatMode);
      addMessage(response, 'incoming', true);
    } catch (error) {
      console.error('Error processing message:', error);
      addMessage('Sorry, I encountered an error. Please try again later.', 'incoming');
    } finally {
      setIsProcessing(false);
    }
  }, [addMessage, messages, processMessage, chatMode]);

  // Initialize speech recognition and text-to-speech
  useEffect(() => {
    const initServices = async () => {
      setIsModelLoading(true);
      try {
        await Promise.all([
          WhisperSpeechService.initSpeechRecognition(),
          CoquiTTSService.init()
        ]);
      } catch (error) {
        console.error('Failed to initialize speech services:', error);
      } finally {
        setIsModelLoading(false);
      }
    };
    
    initServices();
  }, []);

  // Handle speech recognition
  const { transcript, resetTranscript, listening, toggleListening } = useSpeechRecognition({
    onResult: (finalTranscript) => {
      if (finalTranscript) {
        handleSendMessage(finalTranscript);
      }
    }
  });

  useEffect(() => {
    setIsListening(listening);
  }, [listening]);

  const toggleMicrophoneListening = useCallback(() => {
    toggleListening();
    if (!listening) {
      resetTranscript();
    }
  }, [listening, resetTranscript, toggleListening]);

  // Add welcome message on first load if no messages exist
  useEffect(() => {
    if (messages.length === 0) {
      // Add welcome message with current timestamp
      const timestamp = new Date(); // Fix: Use Date object instead of string
      setMessages([
        {
          id: 'welcome',
          content: 'Hello! I\'m Vernon, your AI assistant. How can I help you today?',
          direction: 'incoming',
          timestamp,
          aiResponse: true
        }
      ]);
    }
  }, [messages.length, setMessages]);

  return (
    <>
      {isOpen ? (
        <ChatWindow
          messages={messages}
          input={input}
          setInput={setInput}
          onSendMessage={handleSendMessage}
          onClose={toggleChat}
          isProcessing={isProcessing}
          chatMode={chatMode}
          toggleMode={toggleMode}
          clearMessages={clearMessages}
          isListening={isListening}
          toggleListening={toggleMicrophoneListening}
          isModelLoading={isModelLoading}
          transcript={transcript}
        />
      ) : (
        <ChatButton onClick={toggleChat} />
      )}
    </>
  );
};

export default VernonChat;
