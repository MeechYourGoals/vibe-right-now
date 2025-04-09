
import React, { useState, useEffect, useRef } from 'react';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import ChatControls from './ChatControls';
import { useSpeechInteraction } from './hooks/speechInteraction';
import { Message } from './types';
import VoiceIndicator from './components/VoiceIndicator';
import ChatSettings from './components/ChatSettings';
import { useVoiceEffects } from './hooks/voiceEffects';
import { toast } from 'sonner';

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
  const [introAttempted, setIntroAttempted] = useState(false);
  const introTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  
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

  // Cancel any previous intro attempts on unmount
  useEffect(() => {
    return () => {
      if (introTimeout.current) {
        clearTimeout(introTimeout.current);
      }
    };
  }, []);

  // Trigger intro speech when chat is opened for the first time
  useEffect(() => {
    if (isOpen && messages.length > 0 && !introMessageSpoken && !introAttempted) {
      setIntroAttempted(true);
      console.log('Attempting to speak intro message on first open');
      
      // Clear any previous timeout
      if (introTimeout.current) {
        clearTimeout(introTimeout.current);
      }
      
      // Try to speak the intro with a small delay to ensure everything is loaded
      introTimeout.current = setTimeout(() => {
        // Make sure we're not already speaking something
        stopSpeaking();
        
        // Now try to speak the intro
        speakIntroOnce(messages[0].text)
          .then(success => {
            if (success) {
              console.log('Intro message spoken successfully');
              setIntroMessageSpoken(true);
              markIntroAsSpoken();
            } else {
              console.warn('Failed to speak intro message with speakIntroOnce');
              
              // Try one more time with direct speakResponse
              console.log('Attempting direct speak response for intro');
              speakResponse(messages[0].text)
                .then(() => {
                  console.log('Direct speak response for intro completed');
                  setIntroMessageSpoken(true);
                  markIntroAsSpoken();
                })
                .catch(err => {
                  console.error('Second attempt to speak intro also failed:', err);
                  toast.error('Voice synthesis not available. Check your audio settings.');
                });
            }
          })
          .catch(err => {
            console.error('Error during intro speech:', err);
            toast.error('Error initializing voice. Check your audio settings.');
          });
      }, 1000);
      
      return () => {
        if (introTimeout.current) {
          clearTimeout(introTimeout.current);
        }
      };
    }
  }, [isOpen, messages, introMessageSpoken, introAttempted, speakIntroOnce, markIntroAsSpoken, speakResponse, stopSpeaking]);

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
