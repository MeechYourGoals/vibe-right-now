
import React, { useState, useEffect, useCallback } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import ChatWindow from './ChatWindow';
import ChatButton from './ChatButton';
import { Message, MessageDirection, ChatMode } from './types';
import { useMessageProcessor } from './hooks/useMessageProcessor';
import { useSpeechRecognition } from './hooks/useSpeechRecognition';
import { useSpeechSynthesis } from './hooks/speechSynthesis/useSpeechSynthesis';

const VernonChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useLocalStorage<Message[]>('vernon_messages', []);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [chatMode, setChatMode] = useLocalStorage<ChatMode>('vernon_chat_mode', 'user');
  const [isListening, setIsListening] = useState(false);
  const [isModelLoading, setIsModelLoading] = useState(false);
  const { processMessage } = useMessageProcessor();
  const { speak, cancel, isSpeaking } = useSpeechSynthesis();

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
    const timestamp = new Date();
    
    setMessages(prevMessages => [
      ...prevMessages, 
      { 
        id: `msg-${Date.now()}`, 
        content, 
        direction, 
        timestamp,
        aiResponse,
        text: content, // Add for compatibility
        sender: direction === 'outgoing' ? 'user' : 'ai' // Add for compatibility
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
      
      // Speak the response if it's an AI message
      speak(response);
    } catch (error) {
      console.error('Error processing message:', error);
      addMessage('Sorry, I encountered an error. Please try again later.', 'incoming');
    } finally {
      setIsProcessing(false);
    }
  }, [addMessage, messages, processMessage, chatMode, speak]);

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
  }, [toggleListening]);

  // Add welcome message on first load if no messages exist
  useEffect(() => {
    if (messages.length === 0) {
      // Add welcome message with current timestamp
      const timestamp = new Date();
      setMessages([
        {
          id: 'welcome',
          content: 'Hello! I\'m Vernon, your AI assistant powered by Google Gemini. How can I help you today?',
          direction: 'incoming',
          timestamp,
          aiResponse: true,
          text: 'Hello! I\'m Vernon, your AI assistant powered by Google Gemini. How can I help you today?',
          sender: 'ai'
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
