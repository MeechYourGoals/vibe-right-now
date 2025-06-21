
import { useState, useRef, useCallback, useEffect } from 'react';
import { useVoiceActivityDetection } from './useVoiceActivityDetection';
import { useOptimizedSpeechSynthesis } from './speechSynthesis/useOptimizedSpeechSynthesis';
import { useOptimizedSpeechRecognition } from './speechRecognition/useOptimizedSpeechRecognition';

export type ConversationState = 'idle' | 'listening' | 'processing' | 'speaking' | 'interrupted';

interface UseConversationManagerProps {
  onMessageSend: (message: string) => Promise<void>;
  autoStartListening?: boolean;
  interruptionEnabled?: boolean;
  voiceSettings?: {
    voice: string;
    volume: number;
    speechRate: number;
  };
}

export const useConversationManager = ({
  onMessageSend,
  autoStartListening = true,
  interruptionEnabled = true,
  voiceSettings = { voice: 'aura-asteria-en', volume: 80, speechRate: 1.0 }
}: UseConversationManagerProps) => {
  const [conversationState, setConversationState] = useState<ConversationState>('idle');
  const [isConversationMode, setIsConversationMode] = useState(false);
  
  const { speak, stop: stopSpeaking, isSpeaking } = useOptimizedSpeechSynthesis();
  const { 
    isListening, 
    transcript, 
    interimTranscript,
    startListening, 
    stopListening,
    clearTranscript 
  } = useOptimizedSpeechRecognition({
    continuous: true,
    interimResults: true
  });
  
  const conversationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isProcessingRef = useRef(false);
  
  // Voice Activity Detection for interruption
  const { 
    isVoiceActive, 
    audioLevel,
    startMonitoring,
    stopMonitoring 
  } = useVoiceActivityDetection({
    threshold: 0.02,
    silenceTimeout: 1500,
    onVoiceStart: () => {
      if (interruptionEnabled && isSpeaking && conversationState === 'speaking') {
        console.log('Voice interruption detected - stopping TTS');
        stopSpeaking();
        setConversationState('interrupted');
        startListening();
      }
    },
    onSilenceDetected: () => {
      if (conversationState === 'listening' && transcript.trim()) {
        handleTranscriptComplete(transcript);
      }
    }
  });
  
  // Handle transcript completion
  const handleTranscriptComplete = useCallback(async (finalTranscript: string) => {
    if (isProcessingRef.current || !finalTranscript.trim()) return;
    
    isProcessingRef.current = true;
    setConversationState('processing');
    stopListening();
    clearTranscript();
    
    try {
      await onMessageSend(finalTranscript);
    } catch (error) {
      console.error('Error processing message:', error);
    } finally {
      isProcessingRef.current = false;
    }
  }, [onMessageSend, stopListening, clearTranscript]);
  
  // Speak response and manage conversation flow
  const speakResponse = useCallback(async (text: string) => {
    if (!text.trim()) return;
    
    setConversationState('speaking');
    
    try {
      await speak(text);
      
      // After speaking, start listening again if in conversation mode
      if (isConversationMode && autoStartListening) {
        // Add a small delay before starting to listen again
        setTimeout(() => {
          setConversationState('listening');
          startListening();
        }, 500);
      } else {
        setConversationState('idle');
      }
    } catch (error) {
      console.error('Error speaking response:', error);
      setConversationState('idle');
    }
  }, [speak, isConversationMode, autoStartListening, startListening]);
  
  // Start conversation mode
  const startConversation = useCallback(() => {
    setIsConversationMode(true);
    setConversationState('listening');
    startListening();
    
    if (interruptionEnabled) {
      startMonitoring();
    }
    
    // Auto-stop conversation after 5 minutes of inactivity
    conversationTimeoutRef.current = setTimeout(() => {
      stopConversation();
    }, 300000); // 5 minutes
  }, [startListening, startMonitoring, interruptionEnabled]);
  
  // Stop conversation mode
  const stopConversation = useCallback(() => {
    setIsConversationMode(false);
    setConversationState('idle');
    stopListening();
    stopSpeaking();
    stopMonitoring();
    clearTranscript();
    
    if (conversationTimeoutRef.current) {
      clearTimeout(conversationTimeoutRef.current);
      conversationTimeoutRef.current = null;
    }
    
    isProcessingRef.current = false;
  }, [stopListening, stopSpeaking, stopMonitoring, clearTranscript]);
  
  // Toggle conversation mode
  const toggleConversation = useCallback(() => {
    if (isConversationMode) {
      stopConversation();
    } else {
      startConversation();
    }
  }, [isConversationMode, startConversation, stopConversation]);
  
  // Manual listening control
  const toggleListening = useCallback(() => {
    if (isListening) {
      stopListening();
      setConversationState('idle');
    } else {
      startListening();
      setConversationState('listening');
    }
  }, [isListening, startListening, stopListening]);
  
  // Update conversation state based on speech/listening status
  useEffect(() => {
    if (isSpeaking && conversationState !== 'speaking' && conversationState !== 'interrupted') {
      setConversationState('speaking');
    } else if (isListening && conversationState !== 'listening') {
      setConversationState('listening');
    }
  }, [isSpeaking, isListening, conversationState]);
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopConversation();
    };
  }, [stopConversation]);
  
  return {
    // State
    conversationState,
    isConversationMode,
    isListening,
    isSpeaking,
    transcript: interimTranscript || transcript,
    isVoiceActive,
    audioLevel,
    
    // Actions
    startConversation,
    stopConversation,
    toggleConversation,
    toggleListening,
    speakResponse,
    handleTranscriptComplete,
    
    // Manual controls
    startListening,
    stopListening,
    stopSpeaking
  };
};
