
import React, { useState, useCallback } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import ChatWindow from './ChatWindow';
import ChatButton from './ChatButton';
import { Message, MessageDirection, ChatMode } from './types';
import { useEnhancedVernonChat } from './hooks/useEnhancedVernonChat';

const VernonChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [chatMode, setChatMode] = useLocalStorage<ChatMode>('vernon_chat_mode', 'user');

  // Use enhanced Vernon Chat with ElevenLabs and conversational microphone
  const {
    messages,
    isListening,
    isProcessing,
    isSpeaking,
    transcript,
    toggleListening,
    sendTextMessage,
    cancelSpeech
  } = useEnhancedVernonChat(chatMode === 'venue');

  const toggleChat = () => {
    setIsOpen(!isOpen);
    
    // Cancel any ongoing speech when closing chat
    if (!isOpen && isSpeaking) {
      cancelSpeech();
    }
  };

  const toggleMode = useCallback(() => {
    setChatMode(prev => prev === 'user' ? 'venue' : 'user');
  }, [setChatMode]);

  const clearMessages = useCallback(() => {
    // For now, just close and reopen to reset
    setIsOpen(false);
    setTimeout(() => setIsOpen(true), 100);
  }, []);

  const handleSendMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;
    
    setInput('');
    await sendTextMessage(text);
  }, [sendTextMessage]);

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
          isModelLoading={false}
          transcript={transcript}
          isSpeaking={isSpeaking}
        />
      ) : (
        <ChatButton onClick={toggleChat} />
      )}
    </>
  );
};

export default VernonChat;
