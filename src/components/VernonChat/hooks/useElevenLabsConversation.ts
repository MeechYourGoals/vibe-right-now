
import { useState, useEffect, useRef, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';
import { Message } from '../types';
import { createUserMessage, createAIMessage, INITIAL_MESSAGE } from '../utils/messageFactory';

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
  
  const audioContext = useRef<AudioContext | null>(null);
  const audioQueue = useRef<ArrayBuffer[]>([]);
  const audioElement = useRef<HTMLAudioElement | null>(null);
  const isPlaying = useRef<boolean>(false);
  const recognition = useRef<SpeechRecognition | null>(null);
  
  // Initialize Speech Recognition
  const initSpeechRecognition = useCallback(() => {
    if (!recognition.current && window.SpeechRecognition || window.webkitSpeechRecognition) {
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
          }
          
          if (finalTranscript) {
            setTranscript(finalTranscript);
            
            // Process complete transcript
            if (isListening) {
              processVoiceInput(finalTranscript);
            }
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
  }, [isListening]);
  
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
  const processVoiceInput = useCallback((transcript: string) => {
    if (!transcript.trim()) return;
    
    // Add user message
    const userMessage = createUserMessage(transcript);
    setMessages(prev => [...prev, userMessage]);
    
    // Generate AI response (in a real app, this would call an API)
    setTimeout(() => {
      // Sample responses - in a real app, these would come from your AI service
      let aiResponse = "";
      
      if (transcript.toLowerCase().includes("hello") || transcript.toLowerCase().includes("hi")) {
        aiResponse = "Hello! How can I help you today?";
      } else if (transcript.toLowerCase().includes("venues")) {
        aiResponse = "I can recommend several popular venues in your area. What type of venue are you looking for?";
      } else if (transcript.toLowerCase().includes("restaurant")) {
        aiResponse = "There are several great restaurants nearby. Would you like me to list some options?";
      } else if (transcript.toLowerCase().includes("event")) {
        aiResponse = "I found some exciting events happening soon. Would you like me to share the details?";
      } else {
        aiResponse = "That's interesting! Can you tell me more about what you're looking for?";
      }
      
      const aiMessage = createAIMessage(aiResponse);
      setMessages(prev => [...prev, aiMessage]);
      
      // In a real implementation, this would use ElevenLabs API to convert text to speech
      // For now, we'll use the Web Speech API for demonstration
      speakResponse(aiResponse);
    }, 1000);
  }, []);
  
  // Start listening to user
  const startListening = useCallback(() => {
    if (!recognition.current) {
      initSpeechRecognition();
    }
    
    try {
      recognition.current?.start();
      setIsListening(true);
      setIsConnected(true);
      console.log('Started listening');
    } catch (error) {
      console.error('Error starting to listen:', error);
      setIsListening(false);
    }
  }, [initSpeechRecognition]);
  
  // Stop listening to user
  const stopListening = useCallback(() => {
    try {
      recognition.current?.stop();
    } catch (error) {
      console.error('Error stopping recognition:', error);
    }
    
    setIsListening(false);
    setInterimTranscript('');
  }, []);
  
  // Toggle listening state
  const toggleListening = useCallback(() => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  }, [isListening, startListening, stopListening]);
  
  // Speak response using Web Speech API
  const speakResponse = useCallback((text: string) => {
    if (!text) return;
    
    // If browser supports Speech Synthesis
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
  }, []);
  
  // Send a text message
  const sendTextMessage = useCallback((text: string) => {
    if (!text.trim()) return;
    
    // Add user message
    const userMessage = createUserMessage(text);
    setMessages(prev => [...prev, userMessage]);
    
    // Process the message (similar to voice input processing)
    setTimeout(() => {
      // Sample responses - in a real app, these would come from your AI service
      let aiResponse = "";
      
      if (text.toLowerCase().includes("hello") || text.toLowerCase().includes("hi")) {
        aiResponse = "Hello! How can I help you today?";
      } else if (text.toLowerCase().includes("venues")) {
        aiResponse = "I can recommend several popular venues in your area. What type of venue are you looking for?";
      } else if (text.toLowerCase().includes("restaurant")) {
        aiResponse = "There are several great restaurants nearby. Would you like me to list some options?";
      } else if (text.toLowerCase().includes("event")) {
        aiResponse = "I found some exciting events happening soon. Would you like me to share the details?";
      } else {
        aiResponse = "That's interesting! Can you tell me more about what you're looking for?";
      }
      
      const aiMessage = createAIMessage(aiResponse);
      setMessages(prev => [...prev, aiMessage]);
      
      // Speak the response
      speakResponse(aiResponse);
    }, 1000);
  }, [speakResponse]);
  
  return {
    isConnected,
    isSpeaking,
    isListening,
    isProcessing,
    messages,
    transcript,
    interimTranscript,
    connectToAgent: () => setIsConnected(true), // Simplified for demo
    startListening,
    stopListening,
    toggleListening,
    sendTextMessage,
    setMessages
  };
};
