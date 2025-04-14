
import { useState } from 'react';
import { useRecognitionSetup } from './useRecognitionSetup';
import { useRecognitionEventHandlers } from './useRecognitionEventHandlers';
import { useListeningControls } from './useListeningControls';
import { useTranscriptProcessor } from './useTranscriptProcessor';
import { useSilenceDetection } from './useSilenceDetection';
import { SpeechRecognitionHookReturn } from './types';
import { OpenRouterService } from '@/services/OpenRouterService';

// Main hook that composes other hooks for speech recognition functionality
export const useSpeechRecognition = (): SpeechRecognitionHookReturn => {
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [isPushToTalkActive, setIsPushToTalkActive] = useState(false);
  
  // Setup speech recognition
  const { 
    speechRecognition, 
    initialized,
    restartAttempts,
    previousInterims,
    useLocalWhisper,
    mediaRecorder,
    audioChunks
  } = useRecognitionSetup();

  // Set up silence detection for auto-stopping
  const { resetSilenceTimer, clearSilenceTimer } = useSilenceDetection({
    onSilenceDetected: () => {
      if (isListening) {
        console.log('Silence detected, stopping listening');
        stopListening();
      }
    }
  });
  
  // Set up event handlers for speech recognition
  useRecognitionEventHandlers({
    speechRecognition,
    setTranscript,
    setInterimTranscript,
    setIsListening,
    isListening,
    restartAttempts,
    previousInterims,
    resetSilenceTimer
  });

  // Process audio with OpenRouter when available
  const processAudioWithOpenRouter = async (audioBlob: Blob): Promise<string> => {
    try {
      // Convert blob to base64
      const reader = new FileReader();
      return new Promise((resolve, reject) => {
        reader.onloadend = async () => {
          try {
            const base64Audio = (reader.result as string).split(',')[1];
            
            console.log('Processing audio with OpenRouter...');
            
            // Use OpenRouter for speech-to-text
            const transcription = await OpenRouterService.speechToText({
              audioBase64: base64Audio
            });
            
            if (transcription) {
              console.log('OpenRouter transcription successful:', transcription);
              resolve(transcription);
            } else {
              console.log('No transcription returned from OpenRouter, falling back...');
              reject('No transcription returned');
            }
          } catch (error) {
            console.error('Error processing audio with OpenRouter:', error);
            reject(error);
          }
        };
        
        reader.onerror = reject;
        reader.readAsDataURL(audioBlob);
      });
    } catch (error) {
      console.error('Error in processAudioWithOpenRouter:', error);
      throw error;
    }
  };
  
  // Function to handle push-to-talk start (mousedown)
  const handlePushToTalkStart = () => {
    console.log('Push-to-talk started');
    setIsPushToTalkActive(true);
    startListening();
  };
  
  // Function to handle push-to-talk end (mouseup)
  const handlePushToTalkEnd = () => {
    console.log('Push-to-talk ended');
    setIsPushToTalkActive(false);
    stopListening();
  };
  
  // Listening controls (start/stop)
  const { 
    startListening, 
    stopListening 
  } = useListeningControls({
    speechRecognition,
    initialized,
    isListening,
    setIsListening,
    setIsProcessing,
    setTranscript,
    setInterimTranscript,
    restartAttempts,
    clearSilenceTimer,
    useLocalWhisper,
    mediaRecorder,
    audioChunks,
    processAudioWithOpenRouter // Add OpenRouter processing
  });
  
  // Process the transcript
  const { processTranscript } = useTranscriptProcessor({
    transcript,
    setTranscript,
    setIsProcessing,
    setInterimTranscript
  });
  
  return {
    isListening,
    isProcessing,
    setIsProcessing,
    transcript,
    interimTranscript,
    startListening,
    stopListening,
    processTranscript,
    isPushToTalkActive,
    handlePushToTalkStart,
    handlePushToTalkEnd
  };
};
