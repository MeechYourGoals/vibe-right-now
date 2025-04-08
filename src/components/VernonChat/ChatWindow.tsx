
import React, { useEffect } from 'react';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import ChatControls from './ChatControls';
import { useSpeechInteraction } from './hooks/useSpeechInteraction';
import { Message } from './types';

interface ChatWindowProps {
  isOpen: boolean;
  isMinimized: boolean;
  toggleMinimize: () => void;
  closeChat: () => void;
  messages: Message[];
  isTyping: boolean;
  isSearching: boolean;
  onSendMessage: (message: string) => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  isOpen,
  isMinimized,
  toggleMinimize,
  closeChat,
  messages,
  isTyping,
  isSearching,
  onSendMessage
}) => {
  const {
    isListening,
    isProcessing,
    setIsProcessing,
    transcript,
    toggleListening,
    stopListening,
    stopSpeaking,
    speakResponse,
    processTranscript
  } = useSpeechInteraction();

  // Effect to read AI responses in voice mode
  useEffect(() => {
    if (messages.length > 0 && !isTyping && isListening) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.sender === 'ai') {
        speakResponse(lastMessage.text);
      }
    }
  }, [messages, isTyping, isListening]);

  // Effect to stop speaking when chat is closed
  useEffect(() => {
    if (!isOpen) {
      stopSpeaking();
    }
  }, [isOpen]);

  // Handle sending voice transcript as a message
  useEffect(() => {
    if (!isListening && isProcessing) {
      const transcriptText = processTranscript();
      if (transcriptText) {
        // Small delay to show processing state
        setTimeout(() => {
          onSendMessage(transcriptText);
          setIsProcessing(false);
        }, 300);
      } else {
        setIsProcessing(false);
      }
    }
  }, [isListening, isProcessing]);

  if (isMinimized) {
    return (
      <ChatHeader
        isMinimized={isMinimized}
        toggleMinimize={toggleMinimize}
        closeChat={closeChat}
      />
    );
  }

  return (
    <>
      <ChatHeader
        isMinimized={isMinimized}
        toggleMinimize={toggleMinimize}
        closeChat={closeChat}
      />
      <MessageList
        messages={messages}
        isTyping={isTyping}
        isSearching={isSearching}
      />
      <ChatControls
        isListening={isListening}
        isProcessing={isProcessing}
        transcript={transcript}
        toggleListening={toggleListening}
        onSendMessage={onSendMessage}
        isTyping={isTyping}
      />
    </>
  );
};

export default ChatWindow;
