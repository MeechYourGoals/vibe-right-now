
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
      console.log('Sending message to Vernon:', text);
      const response = await processMessage(text, messages, chatMode);
      console.log('Received response from Vernon:', response.substring(0, 100));
      addMessage(response, 'incoming', true);
    } catch (error) {
      console.error('Error processing message:', error);
      addMessage('Sorry, I encountered an error while processing your message. Please try again.', 'incoming');
    } finally {
      setIsProcessing(false);
    }
  }, [addMessage, messages, processMessage, chatMode]);

  // Add welcome message on first load if no messages exist
  useEffect(() => {
    if (messages.length === 0) {
      const timestamp = new Date();
      setMessages([
        {
          id: 'welcome',
          content: 'Hi! I\'m Vernon, your AI assistant powered by Google Gemini. I can help you discover venues, events, answer questions, and provide real-time information. What would you like to know?',
          direction: 'incoming',
          timestamp,
          aiResponse: true,
          text: 'Hi! I\'m Vernon, your AI assistant powered by Google Gemini. I can help you discover venues, events, answer questions, and provide real-time information. What would you like to know?',
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
          isListening={false}
          toggleListening={() => {}}
          isModelLoading={isModelLoading}
          transcript=""
        />
      ) : (
        <ChatButton onClick={toggleChat} />
      )}
    </>
  );
};

export default VernonChat;
