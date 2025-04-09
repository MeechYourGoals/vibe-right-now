
import { useEffect } from 'react';
import { useSpeechRecognition } from '../speechRecognition';
import { useSpeechSynthesis } from '../speechSynthesis';
import { useVoiceInit } from './useVoiceInit';
import { useListeningToggle } from './useListeningToggle';
import { useInterruptionHandler } from './useInterruptionHandler';

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
    useElevenLabs,
    promptForElevenLabsKey
  } = useSpeechSynthesis();
  
  // Set up voice initialization
  const {
    hasSpokenIntro,
    markIntroAsSpoken,
    isFirstInteraction,
    setIsFirstInteraction,
    speakIntroOnce
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
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopListening();
      stopSpeaking();
    };
  }, [stopListening, stopSpeaking]);
  
  // Custom speakIntroOnce that uses the internal speakResponse
  const handleSpeakIntroOnce = (introMessage: string) => {
    return speakIntroOnce(speakResponse, introMessage);
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
    useElevenLabs,
    promptForElevenLabsKey,
    hasSpokenIntro,
    markIntroAsSpoken,
    isFirstInteraction,
    speakIntroOnce: handleSpeakIntroOnce
  };
};
