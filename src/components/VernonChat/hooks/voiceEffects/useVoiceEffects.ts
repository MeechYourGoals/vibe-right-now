
import { useEffect } from 'react';
import { Message } from '../../types';
import { useIntroMessages } from './useIntroMessages';
import { useAiResponseReader } from './useAiResponseReader';
import { useTranscriptProcessor } from './useTranscriptProcessor';
import { useCloseEffects } from './useCloseEffects';

interface UseVoiceEffectsProps {
  messages: Message[];
  isTyping: boolean;
  isSpeaking: boolean;
  isListening: boolean;
  isProcessing: boolean;
  setIsProcessing: (value: boolean) => void;
  isFirstInteraction: boolean;
  introMessageSpoken: boolean;
  setIntroMessageSpoken: (value: boolean) => void;
  speakIntroOnce: (text: string) => Promise<void>;
  markIntroAsSpoken: () => void;
  speakResponse: (text: string) => Promise<boolean>;
  stopSpeaking: () => void;
  stopListening: () => void;
  processTranscript: () => void;
  onSendMessage: (message: string) => void;
  isOpen: boolean;
}

export const useVoiceEffects = ({
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
}: UseVoiceEffectsProps) => {
  
  // Handle intro message speech
  useIntroMessages({
    messages,
    isListening,
    isFirstInteraction,
    introMessageSpoken,
    setIntroMessageSpoken,
    speakIntroOnce,
    markIntroAsSpoken
  });
  
  // Play AI's latest response message
  useAiResponseReader({
    messages,
    isTyping,
    speakResponse,
    isSpeaking,
    isOpen
  });
  
  // Handle transcript processing when stopping listening
  useTranscriptProcessor({
    isListening,
    isProcessing,
    setIsProcessing,
    processTranscript,
    onSendMessage
  });
  
  // Handle effects when closing chat
  useCloseEffects({
    isOpen,
    stopSpeaking,
    stopListening
  });
  
  // Play intro message when chat first opens (if not already played)
  useEffect(() => {
    if (isOpen && messages.length > 0 && !introMessageSpoken && isFirstInteraction) {
      const introMessage = messages[0];
      console.log('Attempting to speak intro message on chat open:', introMessage.text);
      
      // Speak the intro message with a small delay to ensure audio context is ready
      setTimeout(() => {
        speakIntroOnce(introMessage.text).then(() => {
          console.log('Intro message spoken successfully');
          markIntroAsSpoken();
          setIntroMessageSpoken(true);
        }).catch(err => {
          console.error('Error speaking intro:', err);
        });
      }, 500);
    }
  }, [isOpen, messages, introMessageSpoken, isFirstInteraction, speakIntroOnce, markIntroAsSpoken, setIntroMessageSpoken]);
};
