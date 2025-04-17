import { useState, useCallback, useRef } from 'react';
import { OpenAIService } from '@/services/OpenAIService';
import { ChatState, Message } from '@/components/VernonNext/types';

// Default messages to initialize the chat
const defaultWelcomeMessage: Message = {
  id: '1',
  text: "Hi there! I'm Vernon, your AI assistant powered by GPT-4o. I can help you discover amazing places to go and things to do based on your interests. Try asking about restaurants, events, attractions, or specific activities you're interested in. What are you looking for today?",
  sender: 'ai',
  timestamp: new Date(),
  verified: true
};

const venueWelcomeMessage: Message = {
  id: '1',
  text: "Hello! I'm Vernon for Venues, your AI business assistant powered by GPT-4o. I can help you analyze your venue data, understand customer trends, and optimize your business performance. What would you like to know about your venue today?",
  sender: 'ai',
  timestamp: new Date(),
  verified: true
};

export const useOpenAIChat = (isVenueMode: boolean = false) => {
  // Initialize chat state
  const [state, setState] = useState<ChatState>({
    isOpen: false,
    isMinimized: false,
    isLoading: false,
    isListening: false,
    isSpeaking: false,
    messages: [isVenueMode ? venueWelcomeMessage : defaultWelcomeMessage],
    searchResults: [],
    transcript: '',
    interimTranscript: ''
  });
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Helper function to create a user message
  const createUserMessage = (content: string): Message => ({
    id: Date.now().toString(),
    text: content,
    sender: 'user',
    timestamp: new Date()
  });
  
  // Helper function to create an assistant message
  const createAssistantMessage = (content: string): Message => ({
    id: Date.now().toString(),
    text: content,
    sender: 'ai',
    timestamp: new Date(),
    verified: true
  });
  
  // Send a text message to the chat
  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;
    
    // Add user message to chat
    const userMessage = createUserMessage(content);
    setState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isLoading: true
    }));
    
    try {
      // Format messages for OpenAI API
      const chatMessages = state.messages
        .filter(msg => msg.sender !== 'system') // Filter out system messages
        .map(msg => ({
          role: msg.sender === 'user' ? 'user' : 'assistant',
          content: msg.text
        }));
      
      // Add the new user message
      chatMessages.push({
        role: 'user',
        content
      });
      
      // Send chat request to OpenAI
      const response = await OpenAIService.sendChatRequest(
        chatMessages,
        { context: isVenueMode ? 'venue' : 'user', model: 'gpt-4o-mini' }
      );
      
      // Add assistant response to chat
      const assistantMessage = createAssistantMessage(response);
      setState(prev => ({
        ...prev,
        messages: [...prev.messages, assistantMessage],
        isLoading: false
      }));
      
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Add error message
      const errorMessage = createAssistantMessage(
        "I'm sorry, I encountered an error processing your request. Please try again."
      );
      setState(prev => ({
        ...prev,
        messages: [...prev.messages, errorMessage],
        isLoading: false
      }));
    }
  }, [state.messages, isVenueMode]);
  
  // Start voice recording and speech recognition
  const startListening = useCallback(async () => {
    setState(prev => ({ ...prev, isListening: true, transcript: '', interimTranscript: '' }));
    
    try {
      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Create MediaRecorder for audio capture
      const mediaRecorder = new MediaRecorder(stream);
      const audioChunks: Blob[] = [];
      
      mediaRecorder.addEventListener('dataavailable', (event) => {
        if (event.data.size > 0) {
          audioChunks.push(event.data);
        }
      });
      
      mediaRecorder.addEventListener('stop', async () => {
        // Combine audio chunks and convert to base64
        const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
        const reader = new FileReader();
        
        reader.onloadend = async () => {
          try {
            // Get base64 data from reader result
            const base64Audio = reader.result?.toString().split(',')[1];
            
            if (base64Audio) {
              // Set loading state
              setState(prev => ({ 
                ...prev, 
                isListening: false,
                isLoading: true,
                interimTranscript: 'Processing your audio...'
              }));
              
              // Send to speech-to-text API
              const transcript = await OpenAIService.speechToText(base64Audio);
              
              // Update state with transcript
              setState(prev => ({ 
                ...prev, 
                transcript,
                interimTranscript: '',
                isLoading: false
              }));
              
              // If we got a transcript, send it as a message
              if (transcript.trim()) {
                sendMessage(transcript);
              }
            }
          } catch (error) {
            console.error('Error processing audio:', error);
            setState(prev => ({ 
              ...prev, 
              isListening: false, 
              isLoading: false,
              interimTranscript: 'Error processing audio. Please try again.'
            }));
          }
        };
        
        reader.readAsDataURL(audioBlob);
      });
      
      // Start recording
      mediaRecorder.start();
      
      // Stop recording after 10 seconds
      setTimeout(() => {
        if (mediaRecorder.state !== 'inactive') {
          mediaRecorder.stop();
          stream.getTracks().forEach(track => track.stop());
        }
      }, 10000);
      
      // Store the mediaRecorder in a ref for later use
      const mediaRecorderRef = { current: mediaRecorder, stream };
      
      return mediaRecorderRef;
    } catch (error) {
      console.error('Error starting audio recording:', error);
      setState(prev => ({ 
        ...prev, 
        isListening: false,
        interimTranscript: 'Could not access microphone. Please check permissions.'
      }));
      return null;
    }
  }, [sendMessage]);
  
  // Stop voice recording
  const stopListening = useCallback((mediaRecorderRef: any) => {
    if (mediaRecorderRef && mediaRecorderRef.current) {
      if (mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
      }
      
      if (mediaRecorderRef.stream) {
        mediaRecorderRef.stream.getTracks().forEach((track: MediaStreamTrack) => track.stop());
      }
    }
    
    setState(prev => ({ ...prev, isListening: false }));
  }, []);
  
  // Speak text using the OpenAI TTS API
  const speakText = useCallback(async (text: string) => {
    if (!text.trim()) return;
    
    try {
      setState(prev => ({ ...prev, isSpeaking: true }));
      
      // Get audio from TTS API
      const audioBase64 = await OpenAIService.textToSpeech(text);
      
      // Create audio element if it doesn't exist
      if (!audioRef.current) {
        audioRef.current = new Audio();
      }
      
      // Set audio source and play
      audioRef.current.src = `data:audio/mp3;base64,${audioBase64}`;
      
      audioRef.current.onended = () => {
        setState(prev => ({ ...prev, isSpeaking: false }));
      };
      
      audioRef.current.onerror = () => {
        console.error('Audio playback error');
        setState(prev => ({ ...prev, isSpeaking: false }));
      };
      
      await audioRef.current.play();
    } catch (error) {
      console.error('Error speaking text:', error);
      setState(prev => ({ ...prev, isSpeaking: false }));
    }
  }, []);
  
  // Toggle the chat open/closed state
  const toggleChat = useCallback(() => {
    setState(prev => ({ 
      ...prev, 
      isOpen: !prev.isOpen, 
      isMinimized: false 
    }));
  }, []);
  
  // Toggle the minimized state
  const toggleMinimize = useCallback(() => {
    setState(prev => ({ 
      ...prev, 
      isMinimized: !prev.isMinimized 
    }));
  }, []);
  
  return {
    state,
    sendMessage,
    startListening,
    stopListening,
    speakText,
    toggleChat,
    toggleMinimize,
    setState
  };
};
