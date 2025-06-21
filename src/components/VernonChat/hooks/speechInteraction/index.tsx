
import { useEffect } from 'react';
import { useSpeechRecognition } from '../speechRecognition';
import { useSpeechSynthesis } from '../useSpeechSynthesis';
import { useVoiceInit } from './useVoiceInit';
import { useListeningToggle } from './useListeningToggle';
import { useInterruptionHandler } from './useInterruptionHandler';
import { INITIAL_MESSAGE } from '../../utils/messageFactory';

export const useSpeechInteraction = () => {
  // Set up speech recognition
  const {
    isListening,
    isProcessing,
    setIsProcessing,
    transcript,
    interimTranscript,
    startListening,
    stopListening,
    processTranscript
  } = useSpeechRecognition();
  
  // Set up speech synthesis
  const {
    isSpeaking,
    speakResponse,
    stopSpeaking,
    // These are now added to the return object in useSpeechSynthesis
    useDeepgram,
    promptForDeepgramKey
  } = useSpeechSynthesis();
  
  // Set up voice initialization
  const {
    hasSpokenIntro,
    markIntroAsSpoken,
    isFirstInteraction,
    setIsFirstInteraction,
    speakIntroOnce: voiceInitSpeakIntroOnce
  } = useVoiceInit();
  
  // Set up listening toggle
  const { toggleListening } = useListeningToggle({
    isListening,
    startListening,
    stopListening,
    stopSpeaking,
    setIsFirstInteraction
  });
  
  // Set up interruption handler
  useInterruptionHandler({
    isSpeaking,
    isListening,
    interimTranscript,
    stopSpeaking
  });
  
  // Attempt to speak intro message when component mounts
  useEffect(() => {
    if (isFirstInteraction && !hasSpokenIntro) {
      console.log('Attempting to speak initial intro message on mount');
      speakIntroOnce(INITIAL_MESSAGE.text);
    }
  }, [isFirstInteraction, hasSpokenIntro]);
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopListening();
      stopSpeaking();
    };
  }, [stopListening, stopSpeaking]);
  
  // Custom speakIntroOnce wrapper that returns a Promise<boolean>
  const speakIntroOnce = async (introMessage: string): Promise<boolean> => {
    try {
      await voiceInitSpeakIntroOnce(introMessage);
      markIntroAsSpoken();
      return true;
    } catch (error) {
      console.error('Error in speakIntroOnce:', error);
      return false;
    }
  };
  
  return {
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
    useDeepgram,
    promptForDeepgramKey,
    hasSpokenIntro,
    markIntroAsSpoken,
    isFirstInteraction,
    speakIntroOnce
  };
};
