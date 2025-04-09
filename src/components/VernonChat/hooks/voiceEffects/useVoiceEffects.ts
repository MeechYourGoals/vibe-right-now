
import { useRef } from 'react';
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
  speakResponse: (text: string) => Promise<void>;
  stopSpeaking: () => void;
  stopListening: () => void;
  processTranscript: () => string;
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
  // Use the individual hooks for specific effects
  
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
  
  // Handle reading AI responses
  useAiResponseReader({
    messages,
    isTyping,
    isSpeaking,
    isListening,
    speakResponse
  });
  
  // Handle transcript processing and sending
  useTranscriptProcessor({
    isListening,
    isProcessing,
    isTyping,
    setIsProcessing,
    processTranscript,
    onSendMessage
  });
  
  // Handle close effects
  useCloseEffects({
    isOpen,
    stopSpeaking,
    stopListening
  });
};
