
import React, { useState } from 'react';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import ChatControls from './ChatControls';
import { useSpeechInteraction } from './hooks/useSpeechInteraction';
import { Message } from './types';
import VoiceIndicator from './components/VoiceIndicator';
import ChatSettings from './components/ChatSettings';
import { useVoiceEffects } from './hooks/useVoiceEffects';

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
  isVenueMode = false
}) => {
  const [introMessageSpoken, setIntroMessageSpoken] = useState(false);
  
  const {
    isListening,
    isProcessing,
    setIsProcessing,
    transcript,
    interimTranscript,
    isSpeaking,
    toggleListening,
    stopListening,
    stopSpeaking,
    speakResponse,
    processTranscript,
    useElevenLabs,
    promptForElevenLabsKey,
    hasSpokenIntro,
    markIntroAsSpoken,
    isFirstInteraction,
    speakIntroOnce
  } = useSpeechInteraction();

  // Use the custom hook to manage voice interaction effects
  useVoiceEffects({
    messages,
    isTyping,
    isSpeaking,
    isListening,
    isProcessing,
    setIsProcessing,
    isFirstInteraction,
    introMessageSpoken,
    setIntroMessageSpoken,
    speakIntroOnce,
    markIntroAsSpoken,
    speakResponse,
    stopSpeaking,
    stopListening,
    processTranscript,
    onSendMessage,
    isOpen
  });

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
      
      {/* Voice Settings Button */}
      <ChatSettings 
        useElevenLabs={useElevenLabs}
        promptForElevenLabsKey={promptForElevenLabsKey}
        isListening={isListening}
        toggleListening={toggleListening}
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
    </>
  );
};

export default ChatWindow;
