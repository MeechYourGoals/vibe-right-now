
import { useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';

export const useSpeechInteraction = () => {
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  const speechRecognition = useRef<SpeechRecognition | null>(null);
  const speechSynthesis = useRef<SpeechSynthesis | null>(null);
  const currentUtterance = useRef<SpeechSynthesisUtterance | null>(null);
  
  // Initialize speech recognition and synthesis
  useEffect(() => {
    // Check if browser supports speech recognition
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      speechRecognition.current = new SpeechRecognition();
      speechRecognition.current.continuous = true;
      speechRecognition.current.interimResults = true;
      
      speechRecognition.current.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('');
        
        setTranscript(transcript);
      };
      
      speechRecognition.current.onend = () => {
        if (isListening) {
          speechRecognition.current?.start();
        }
      };
      
      speechRecognition.current.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
        toast.error(`Microphone error: ${event.error}`);
      };
    } else {
      console.error('Speech recognition not supported');
    }
    
    // Initialize speech synthesis
    if ('speechSynthesis' in window) {
      speechSynthesis.current = window.speechSynthesis;
    } else {
      console.error('Speech synthesis not supported');
    }
    
    // Clean up
    return () => {
      stopListening();
      stopSpeaking();
    };
  }, []);
  
  // Effect to maintain listening state
  useEffect(() => {
    if (isListening && speechRecognition.current) {
      try {
        speechRecognition.current.start();
      } catch (error) {
        console.error('Error restarting speech recognition:', error);
      }
    }
  }, [isListening]);
  
  const toggleListening = () => {
    if (!speechRecognition.current) {
      toast.error('Speech recognition is not supported in your browser');
      return;
    }
    
    if (isListening) {
      stopListening();
      stopSpeaking();
    } else {
      startListening();
    }
  };
  
  const startListening = () => {
    try {
      speechRecognition.current?.start();
      setIsListening(true);
      setTranscript('');
      toast.success('Voice mode activated. Start speaking...');
    } catch (error) {
      console.error('Error starting speech recognition:', error);
      toast.error('Failed to start voice recognition');
    }
  };
  
  const stopListening = () => {
    if (speechRecognition.current) {
      try {
        speechRecognition.current.stop();
      } catch (error) {
        console.error('Error stopping speech recognition:', error);
      }
    }
    setIsListening(false);
  };
  
  const stopSpeaking = () => {
    if (speechSynthesis.current) {
      speechSynthesis.current.cancel();
      setIsSpeaking(false);
      if (currentUtterance.current) {
        currentUtterance.current = null;
      }
    }
  };
  
  const speakResponse = (text: string) => {
    if (!speechSynthesis.current) {
      console.error('Speech synthesis not available');
      return;
    }
    
    // Cancel any ongoing speech
    stopSpeaking();
    
    const utterance = new SpeechSynthesisUtterance(text);
    currentUtterance.current = utterance;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      setIsSpeaking(false);
    }
    
    // Get available voices
    const voices = speechSynthesis.current.getVoices();
    
    // Try to find a good male English voice
    const maleVoice = voices.find(
      voice => voice.lang.includes('en') && 
               (voice.name.includes('Male') || 
                voice.name.includes('Daniel') || 
                voice.name.includes('David') || 
                voice.name.includes('James') || 
                voice.name.includes('George'))
    );
    
    // If no specific male voice found, fallback to any English voice
    const englishVoice = voices.find(
      voice => voice.lang.includes('en')
    );
    
    if (maleVoice) {
      utterance.voice = maleVoice;
    } else if (englishVoice) {
      utterance.voice = englishVoice;
    }
    
    // Optimize for more natural sounding speech
    utterance.rate = 0.95; // Slightly slower than default
    utterance.pitch = 0.95; // Slightly deeper voice
    utterance.volume = 1.0;
    
    speechSynthesis.current.speak(utterance);
  };
  
  const processTranscript = () => {
    if (transcript.trim()) {
      setIsProcessing(true);
      
      // Return the transcript for further processing
      const currentTranscript = transcript;
      setTranscript('');
      
      return currentTranscript;
    }
    return '';
  };
  
  return {
    isListening,
    isProcessing,
    setIsProcessing,
    transcript,
    isSpeaking,
    toggleListening,
    stopListening,
    stopSpeaking,
    speakResponse,
    processTranscript
  };
};
