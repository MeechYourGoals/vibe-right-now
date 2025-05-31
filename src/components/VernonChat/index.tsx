
import React, { useState, useEffect, useCallback } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import ChatWindow from './ChatWindow';
import ChatButton from './ChatButton';
import { Message, MessageDirection, ChatMode } from './types';
import { useMessageProcessor } from './hooks/useMessageProcessor';

const VernonChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useLocalStorage<Message[]>('vernon_messages', []);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [chatMode, setChatMode] = useLocalStorage<ChatMode>('vernon_chat_mode', 'user');
  const [isModelLoading, setIsModelLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
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
    const timestamp = new Date();
    
    setMessages(prevMessages => [
      ...prevMessages, 
      { 
        id: `msg-${Date.now()}-${Math.random()}`, 
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

  const toggleListening = useCallback(() => {
    setIsListening(prev => !prev);
    // Here you would implement actual speech recognition
    // For now, this is a placeholder
  }, []);

  // Add welcome message on first load if no messages exist
  useEffect(() => {
    if (messages.length === 0) {
      const timestamp = new Date();
      setMessages([
        {
          id: 'welcome',
          content: 'Hello! I\'m Vernon, your AI assistant powered by Google Gemini. I can help you discover venues, answer questions, and have meaningful conversations. How can I assist you today?',
          direction: 'incoming',
          timestamp,
          aiResponse: true,
          text: 'Hello! I\'m Vernon, your AI assistant powered by Google Gemini. I can help you discover venues, answer questions, and have meaningful conversations. How can I assist you today?',
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
          toggleListening={toggleListening}
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
