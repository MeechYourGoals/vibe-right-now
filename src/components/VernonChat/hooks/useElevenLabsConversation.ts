
import { useState, useEffect, useRef, useCallback } from 'react';
import { Message } from '../types';
import { ElevenLabsService } from '@/services/ElevenLabsService';
import { useInterruptionHandler } from './speechInteraction/useInterruptionHandler';

interface UseElevenLabsConversationProps {
  isVenueMode?: boolean;
}

export const useElevenLabsConversation = (isVenueMode: boolean = false) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  
  // Speech recognition
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioSourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const audioAnalyserRef = useRef<AnalyserNode | null>(null);
  
  // Speech synthesis
  const synthesisRef = useRef<SpeechSynthesisUtterance | null>(null);
  const elevenLabsAudioRef = useRef<HTMLAudioElement | null>(null);
  
  // Define the stopSpeaking function first to avoid build errors
  const stopSpeaking = useCallback(() => {
    console.log('Stopping speech...');
    
    if (elevenLabsAudioRef.current) {
      elevenLabsAudioRef.current.pause();
      elevenLabsAudioRef.current.currentTime = 0;
    }
    
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    
    setIsSpeaking(false);
  }, []);
  
  // Define speakResponse function to avoid build errors
  const speakResponse = useCallback((text: string) => {
    if (!text || text.trim() === '') return;
    
    console.log('Speaking response:', text);
    setIsSpeaking(true);
    
    // Check if ElevenLabs is available
    if (ElevenLabsService.hasApiKey()) {
      try {
        console.log('Using ElevenLabs for speech');
        
        // Create audio element if it doesn't exist
        if (!elevenLabsAudioRef.current) {
          elevenLabsAudioRef.current = new Audio();
          
          // Add event listeners
          elevenLabsAudioRef.current.addEventListener('ended', () => {
            console.log('ElevenLabs audio playback ended');
            setIsSpeaking(false);
          });
          
          elevenLabsAudioRef.current.addEventListener('error', (e) => {
            console.error('ElevenLabs audio error:', e);
            setIsSpeaking(false);
            
            // Fall back to browser speech synthesis
            useBrowserSpeechSynthesis(text);
          });
        }
        
        // Get speech from ElevenLabs
        ElevenLabsService.textToSpeech(text)
          .then(audioUrl => {
            if (elevenLabsAudioRef.current) {
              elevenLabsAudioRef.current.src = audioUrl;
              elevenLabsAudioRef.current.play().catch(error => {
                console.error('Error playing ElevenLabs audio:', error);
                setIsSpeaking(false);
              });
            }
          })
          .catch(error => {
            console.error('Error getting ElevenLabs speech:', error);
            setIsSpeaking(false);
            
            // Fall back to browser speech synthesis
            useBrowserSpeechSynthesis(text);
          });
      } catch (error) {
        console.error('Error using ElevenLabs:', error);
        
        // Fall back to browser speech synthesis
        useBrowserSpeechSynthesis(text);
      }
    } else {
      // Use browser speech synthesis if ElevenLabs is not available
      useBrowserSpeechSynthesis(text);
    }
  }, []);
  
  // Use our interruption handler hook
  useInterruptionHandler({
    isSpeaking,
    isListening,
    interimTranscript,
    stopSpeaking
  });
  
  // Function to use browser speech synthesis as fallback
  const useBrowserSpeechSynthesis = (text: string) => {
    if (!window.speechSynthesis) {
      console.error('Browser speech synthesis not available');
      setIsSpeaking(false);
      return;
    }
    
    try {
      console.log('Using browser speech synthesis');
      
      // Create utterance
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Get voices
      const voices = window.speechSynthesis.getVoices();
      
      // Find a good voice
      const preferredVoice = voices.find(
        (voice) => voice.name.includes('Google') || voice.name.includes('Natural') || voice.name.includes('Premium')
      );
      
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }
      
      // Set speech properties
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      
      // Set events
      utterance.onend = () => {
        console.log('Browser speech ended');
        setIsSpeaking(false);
      };
      
      utterance.onerror = (event) => {
        console.error('Browser speech error:', event);
        setIsSpeaking(false);
      };
      
      // Speak
      window.speechSynthesis.speak(utterance);
      
      // Save reference
      synthesisRef.current = utterance;
    } catch (error) {
      console.error('Error using browser speech synthesis:', error);
      setIsSpeaking(false);
    }
  };
  
  // Connect to agent
  const connectToAgent = useCallback(() => {
    console.log('Connecting to Vernon agent...');
    
    // Add initial message
    const initialMessages: Message[] = [
      {
        id: '1',
        role: 'assistant',
        text: isVenueMode 
          ? 'Hello! I\'m Vernon, your venue assistant. How can I help you with venue management, customer data analytics, or marketing strategies today?' 
          : 'Hi there! I\'m Vernon, your personal assistant. How can I help you find the perfect venue, event, or experience today?',
        timestamp: new Date().toISOString(),
      },
    ];
    
    setMessages(initialMessages);
    setIsConnected(true);
    
    return true;
  }, [isVenueMode]);
  
  // Toggle listening
  const toggleListening = useCallback(() => {
    if (isListening) {
      // Stop listening
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      
      setIsListening(false);
    } else {
      // Start listening
      if (!recognitionRef.current) {
        // Create recognition object
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
          console.error('Speech recognition not supported in this browser');
          return;
        }
        
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';
        
        recognition.onstart = () => {
          console.log('Speech recognition started');
          setIsListening(true);
        };
        
        recognition.onend = () => {
          console.log('Speech recognition ended');
          setIsListening(false);
        };
        
        recognition.onresult = (event) => {
          let interimTranscript = '';
          let finalTranscript = '';
          
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              finalTranscript += event.results[i][0].transcript;
            } else {
              interimTranscript += event.results[i][0].transcript;
            }
          }
          
          if (finalTranscript) {
            setTranscript(finalTranscript);
            // Process the finalized transcript
            processVoiceInput(finalTranscript);
          }
          
          setInterimTranscript(interimTranscript);
        };
        
        recognition.onerror = (event) => {
          console.error('Speech recognition error:', event.error);
          setIsListening(false);
        };
        
        recognitionRef.current = recognition;
      }
      
      // Start recognition
      try {
        recognitionRef.current.start();
      } catch (error) {
        console.error('Error starting speech recognition:', error);
      }
    }
  }, [isListening]);
  
  // Process voice input
  const processVoiceInput = useCallback((input: string) => {
    if (!input || input.trim() === '') return;
    
    console.log('Processing voice input:', input);
    setIsProcessing(true);
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date().toISOString(),
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    
    // Generate response (simulated)
    setTimeout(() => {
      const responseText = generateResponse(input, isVenueMode);
      
      // Add assistant message
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        text: responseText,
        timestamp: new Date().toISOString(),
      };
      
      setMessages(prevMessages => [...prevMessages, assistantMessage]);
      setIsProcessing(false);
      
      // Speak the response
      speakResponse(responseText);
    }, 1000);
  }, [isVenueMode, speakResponse]);
  
  // Send text message
  const sendTextMessage = useCallback((text: string) => {
    if (!text || text.trim() === '') return;
    
    console.log('Sending text message:', text);
    
    // Stop speaking if currently speaking
    if (isSpeaking) {
      stopSpeaking();
    }
    
    // Process the text input
    processVoiceInput(text);
  }, [isSpeaking, processVoiceInput, stopSpeaking]);
  
  // Generate response based on input
  const generateResponse = (input: string, isVenueMode: boolean): string => {
    const inputLower = input.toLowerCase();
    
    // Venue mode responses
    if (isVenueMode) {
      if (inputLower.includes('marketing') || inputLower.includes('advertis')) {
        return "Based on your customer data, I recommend focusing your marketing efforts on Instagram and TikTok, which show the highest engagement rates for your demographic. Consider running a promotional event on Thursdays, which is when your venue tends to see lower traffic.";
      } else if (inputLower.includes('customer') || inputLower.includes('data') || inputLower.includes('analytic')) {
        return "Your customer analytics show that 68% of your visitors are between 25-34 years old, with peak hours between 7-9PM on weekends. You've seen a 12% increase in first-time visitors this month compared to last. Would you like me to analyze any particular customer segment in more detail?";
      } else if (inputLower.includes('revenue') || inputLower.includes('sales') || inputLower.includes('profit')) {
        return "Your venue's revenue has increased by 15% this quarter. Your highest-selling items are specialty cocktails, accounting for 35% of bar sales. I notice that offering happy hour promotions has increased early evening traffic by 28%. Would you like to see a breakdown by day of week?";
      } else if (inputLower.includes('staff') || inputLower.includes('schedul') || inputLower.includes('employee')) {
        return "Based on your current traffic patterns, I recommend scheduling 3 additional staff members on Friday and Saturday evenings. Your current staff-to-customer ratio during peak hours is lower than the industry average. Would you like me to suggest an optimized staffing schedule?";
      }
    } 
    // User mode responses
    else {
      if (inputLower.includes('restaurant') || inputLower.includes('food') || inputLower.includes('eat')) {
        return "I found several highly-rated restaurants near you. Artisan Bistro has great reviews for their seasonal menu, and Sunset Lounge has a special happy hour today. Would you like me to help you make a reservation at either of these?";
      } else if (inputLower.includes('concert') || inputLower.includes('music') || inputLower.includes('show')) {
        return "There are 3 concerts happening this weekend in your area. The Summer Music Festival starts Friday at Riverfront Park, featuring indie and rock bands. There's also a jazz quartet playing at the Blue Note on Saturday. Would you like more details about any of these events?";
      } else if (inputLower.includes('club') || inputLower.includes('dance') || inputLower.includes('nightlife')) {
        return "For nightlife, I recommend checking out Skyline Rooftop Bar which has a DJ tonight, or Pulse Nightclub which is featuring a special guest appearance. Both venues have high ratings for atmosphere and are within 15 minutes of your location.";
      } else if (inputLower.includes('sport') || inputLower.includes('game') || inputLower.includes('team')) {
        return "There's a home game for the local basketball team this Thursday at 7PM. I also see that there's an amateur soccer tournament happening at Memorial Park this weekend. Would you like me to check ticket availability for any sporting events?";
      }
    }
    
    // Default response if no keywords match
    return isVenueMode
      ? "As your venue assistant, I can help you with marketing strategies, customer analytics, staff scheduling, and revenue optimization. What specific aspect of your venue would you like insights on?"
      : "I can help you find great venues, events, and experiences in your area. Whether you're looking for restaurants, concerts, nightlife, or sports events, just let me know what you're interested in!";
  };
  
  // Clean up resources on unmount
  useEffect(() => {
    return () => {
      // Stop speech synthesis
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      
      // Stop speech recognition
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      
      // Stop audio playback
      if (elevenLabsAudioRef.current) {
        elevenLabsAudioRef.current.pause();
        elevenLabsAudioRef.current.src = '';
      }
      
      // Close audio context
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
      }
    };
  }, []);
  
  return {
    isConnected,
    isSpeaking,
    isListening,
    isProcessing,
    messages,
    transcript,
    interimTranscript,
    connectToAgent,
    toggleListening,
    sendTextMessage,
    processVoiceInput,
    speakResponse,
    stopSpeaking
  };
};
