
import React, { useRef } from 'react';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import ChatControls from './ChatControls';
import { Message } from './types';
import VoiceIndicator from './components/VoiceIndicator';
import ChatSettings from './components/ChatSettings';

interface ChatWindowProps {
  isOpen: boolean;
  isMinimized: boolean;
  toggleMinimize: () => void;
  closeChat: () => void;
  messages: Message[];
  isTyping: boolean;
  isSearching: boolean;
  onSendMessage: (message: string) => void;
  isVenueMode?: boolean;
  isListening?: boolean;
  isProcessing?: boolean;
  transcript?: string;
  interimTranscript?: string;
  startListening?: () => void;
  stopListening?: () => void;
  toggleListening?: () => void;
  isSpeaking?: boolean;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  isOpen,
  isMinimized,
  toggleMinimize,
  closeChat,
  messages,
  isTyping,
  isSearching,
  onSendMessage,
  isVenueMode = false,
  isListening = false,
  isProcessing = false,
  transcript = '',
  interimTranscript = '',
  startListening = () => {},
  stopListening = () => {},
  toggleListening = () => {},
  isSpeaking = false
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
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
      
      {/* Voice Active Indicator */}
      <VoiceIndicator 
        isListening={isListening}
        isSpeaking={isSpeaking}
        toggleListening={toggleListening}
      />
      
      <MessageList
        messages={messages}
        isTyping={isTyping}
        isSearching={isSearching}
        messagesEndRef={messagesEndRef}
      />
      
      <ChatControls
        isListening={isListening}
        isProcessing={isProcessing}
        transcript={transcript}
        interimTranscript={interimTranscript}
        startListening={startListening}
        stopListening={stopListening}
        onSendMessage={onSendMessage}
        isTyping={isTyping}
        handlePushToTalkStart={isListening ? undefined : startListening}
        handlePushToTalkEnd={isListening ? stopListening : undefined}
      />
    </>
  );
};

export default ChatWindow;
