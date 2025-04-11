
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
    <div className="flex flex-col h-full backdrop-blur-sm bg-background/70 rounded-lg overflow-hidden shadow-xl border border-blue-500/20">
      <ChatHeader
        isMinimized={isMinimized}
        toggleMinimize={toggleMinimize}
        closeChat={closeChat}
      />
      
      {/* Voice Activity Indicator */}
      <div className="relative">
        {(isListening || isSpeaking) && (
          <div className={`absolute top-2 left-0 right-0 flex justify-center z-10 ${isListening ? 'text-red-500' : 'text-blue-500'} animate-pulse text-sm font-medium`}>
            <div className="px-3 py-1 bg-background/80 rounded-full backdrop-blur-md flex items-center gap-2 shadow-md border border-current/30">
              <span className="h-2 w-2 rounded-full bg-current"></span>
              {isListening ? 'Listening...' : isSpeaking ? 'Speaking...' : ''}
            </div>
          </div>
        )}
      </div>
      
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
        toggleListening={toggleListening}
        onSendMessage={onSendMessage}
        isTyping={isTyping}
      />
    </div>
  );
};

export default ChatWindow;
