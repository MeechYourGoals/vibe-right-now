
import { useState, useEffect, useRef, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';
import { Message } from '../types';
import { createUserMessage, createAIMessage, INITIAL_MESSAGE } from '../utils/messageFactory';
import { useMessageProcessor } from './useMessageProcessor';
import { ElevenLabsService } from '@/services/ElevenLabsService';
import { HuggingChatService } from '@/services/HuggingChatService';
import { PerplexityService } from '@/services/PerplexityService';

// Default Eleven Labs voice ID for Vernon (Roger voice)
const DEFAULT_VOICE_ID = 'CwhRBWXzGAHq8TQ4Fs17';

export const useElevenLabsConversation = (isVenueMode = false) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [hasSpokenIntro, setHasSpokenIntro] = useState(false);
  
  const audioContext = useRef<AudioContext | null>(null);
  const audioQueue = useRef<ArrayBuffer[]>([]);
  const audioElement = useRef<HTMLAudioElement | null>(null);
  const isPlaying = useRef<boolean>(false);
  const recognition = useRef<SpeechRecognition | null>(null);
  
  // Use the message processor for handling search queries
  const { isTyping, isSearching, processMessage } = useMessageProcessor(false, isVenueMode);
  
  // Initialize Speech Recognition
  const initSpeechRecognition = useCallback(() => {
    if (!recognition.current && (window.SpeechRecognition || window.webkitSpeechRecognition)) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognition.current = new SpeechRecognition();
      
      if (recognition.current) {
        recognition.current.continuous = true;
        recognition.current.interimResults = true;
        
        recognition.current.onresult = (event) => {
          let interimTranscript = '';
          let finalTranscript = '';
          
          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              finalTranscript += transcript;
            } else {
              interimTranscript += transcript;
            }
          }
          
          if (interimTranscript) {
            setInterimTranscript(interimTranscript);
            
            // If speaking, check for interruption
            if (isSpeaking && interimTranscript.trim().length > 1) {
              console.log('User is interrupting, stopping speech');
              stopSpeaking();
            }
          }
          
          if (finalTranscript) {
            setTranscript(finalTranscript);
          }
        };
        
        recognition.current.onerror = (event) => {
          console.error('Speech recognition error', event.error);
          if (event.error === 'not-allowed') {
            toast.error('Microphone access denied. Please allow microphone access to use voice features.');
          }
          stopListening();
        };
        
        recognition.current.onend = () => {
          if (isListening) {
            // Attempt to restart if it was supposed to be listening
            try {
              recognition.current?.start();
            } catch (error) {
              console.error('Failed to restart speech recognition', error);
              setIsListening(false);
            }
          }
        };
      }
    }
  }, [isListening, isSpeaking, stopSpeaking]);
  
  // Initialize audio context and element
  useEffect(() => {
    // Create audio element for playback
    if (!audioElement.current) {
      audioElement.current = new Audio();
      audioElement.current.onended = () => {
        isPlaying.current = false;
        setIsSpeaking(false);
        playNextAudio();
      };
      audioElement.current.onerror = (e) => {
        console.error('Audio playback error:', e);
        isPlaying.current = false;
        setIsSpeaking(false);
      };
    }
    
    // Create audio context
    if (!audioContext.current && typeof window !== 'undefined') {
      try {
        audioContext.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      } catch (error) {
        console.error('Failed to create audio context:', error);
      }
    }
    
    // Initialize speech recognition
    initSpeechRecognition();
    
    // Initialize with welcome message
    setMessages([
      createAIMessage(isVenueMode
        ? "Hi there! I'm Vernon for Venues, your business insights assistant. I can help you understand your venue metrics, customer trends, and marketing performance. What would you like to know about your venue's performance?"
        : "Hi there! I'm Vernon, your Vibe guide. I can help you discover cool places, events happening tonight, or answer questions about specific venues. What are you looking for?")
    ]);
    
    return () => {
      stopListening();
      
      if (audioElement.current) {
        audioElement.current.pause();
        audioElement.current.src = '';
      }
    };
  }, [isVenueMode, initSpeechRecognition]);
  
  // Play the next audio in queue
  const playNextAudio = useCallback(() => {
    if (audioQueue.current.length === 0 || isPlaying.current || !audioElement.current) {
      return;
    }
    
    const audioData = audioQueue.current.shift();
    if (!audioData) return;
    
    const blob = new Blob([audioData], { type: 'audio/mp3' });
    const url = URL.createObjectURL(blob);
    
    audioElement.current.src = url;
    
    isPlaying.current = true;
    setIsSpeaking(true);
    
    audioElement.current.play().catch((error) => {
      console.error('Failed to play audio:', error);
      isPlaying.current = false;
      setIsSpeaking(false);
      URL.revokeObjectURL(url);
      playNextAudio();
    });
  }, []);
  
  // Process voice input and get AI response
  const processVoiceInput = useCallback(async (text: string) => {
    if (!text.trim()) return;
    
    setIsProcessing(true);
    
    try {
      await processMessage(text, setMessages);
      
      // Get the last message to speak it
      setTimeout(() => {
        const lastMessage = messages[messages.length - 1];
        if (lastMessage && lastMessage.sender === 'ai') {
          speakResponse(lastMessage.text);
        }
        setIsProcessing(false);
      }, 100);
    } catch (error) {
      console.error('Error processing voice input:', error);
      setIsProcessing(false);
    }
  }, [messages, processMessage]);
  
  // Start listening to user
  const startListening = useCallback(() => {
    if (!recognition.current) {
      initSpeechRecognition();
    }
    
    try {
      recognition.current?.start();
      setIsListening(true);
      setIsConnected(true);
      setTranscript('');
      setInterimTranscript('');
      console.log('Started listening');
      
      // If this is first time listening and intro hasn't been spoken, speak it
      if (!hasSpokenIntro && messages.length > 0) {
        const introMessage = messages[0];
        speakResponse(introMessage.text);
        setHasSpokenIntro(true);
      }
    } catch (error) {
      console.error('Error starting to listen:', error);
      setIsListening(false);
    }
  }, [initSpeechRecognition, hasSpokenIntro, messages, speakResponse]);
  
  // Stop listening to user
  const stopListening = useCallback(() => {
    try {
      recognition.current?.stop();
    } catch (error) {
      console.error('Error stopping recognition:', error);
    }
    
    setIsListening(false);
    
    // Process any transcript that's waiting
    if (transcript.trim()) {
      processVoiceInput(transcript);
    }
    
    setInterimTranscript('');
  }, [transcript, processVoiceInput]);
  
  // Stop speaking (for interruptions)
  const stopSpeaking = useCallback(() => {
    if (audioElement.current) {
      audioElement.current.pause();
      audioElement.current.currentTime = 0;
      audioElement.current.src = '';
    }
    
    // Cancel any ongoing speech synthesis
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    
    audioQueue.current = [];
    isPlaying.current = false;
    setIsSpeaking(false);
  }, []);
  
  // Toggle listening state
  const toggleListening = useCallback(() => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  }, [isListening, startListening, stopListening]);
  
  // Speak response using ElevenLabs
  const speakResponse = useCallback(async (text: string) => {
    if (!text) return;
    
    // If already speaking, stop current speech
    if (isSpeaking) {
      stopSpeaking();
    }
    
    setIsSpeaking(true);
    
    try {
      if (ElevenLabsService.hasApiKey()) {
        // Use ElevenLabs for better quality voice
        const audioData = await ElevenLabsService.textToSpeech(text);
        
        if (audioData) {
          // Create blob from array buffer
          const blob = new Blob([audioData], { type: 'audio/mpeg' });
          const url = URL.createObjectURL(blob);
          
          if (audioElement.current) {
            // Stop any current playback
            audioElement.current.pause();
            audioElement.current.currentTime = 0;
            
            // Set new audio source and play
            audioElement.current.src = url;
            
            // Set up event handlers
            const originalOnEnded = audioElement.current.onended;
            audioElement.current.onended = (event) => {
              URL.revokeObjectURL(url);
              setIsSpeaking(false);
              
              // Call original handler if it exists
              if (originalOnEnded && typeof originalOnEnded === 'function') {
                originalOnEnded.call(audioElement.current, event);
              }
            };
            
            await audioElement.current.play();
            return;
          }
        }
      }
      
      // Fallback to browser speech synthesis if ElevenLabs fails or isn't available
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        
        // Get available voices
        const voices = window.speechSynthesis.getVoices();
        
        // Try to find a natural male voice
        const preferredVoice = voices.find(voice => 
          voice.name.includes('Google UK English Male') || 
          voice.name.includes('Daniel') ||
          voice.name.includes('Microsoft David')
        );
        
        if (preferredVoice) {
          utterance.voice = preferredVoice;
        }
        
        // Adjust for more natural speech
        utterance.rate = 0.9;  // Slightly slower
        utterance.pitch = 1.0; // Normal pitch
        
        // Set event handlers
        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);
        
        // Cancel any ongoing speech
        window.speechSynthesis.cancel();
        
        // Speak the text
        window.speechSynthesis.speak(utterance);
      }
    } catch (error) {
      console.error('Error in speakResponse:', error);
      setIsSpeaking(false);
    }
  }, [isSpeaking, stopSpeaking]);
  
  // Send a text message
  const sendTextMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;
    
    try {
      await processMessage(text, setMessages);
    } catch (error) {
      console.error('Error in sendTextMessage:', error);
    }
  }, [processMessage]);
  
  return {
    isConnected,
    isSpeaking,
    isListening,
    isProcessing,
    messages,
    transcript,
    interimTranscript,
    connectToAgent: () => setIsConnected(true),
    startListening,
    stopListening,
    stopSpeaking,
    toggleListening,
    sendTextMessage,
    setMessages,
    processVoiceInput,
    speakResponse
  };
};
