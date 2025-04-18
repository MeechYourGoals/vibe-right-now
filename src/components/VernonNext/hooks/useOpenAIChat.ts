
import { useState, useCallback, useRef } from 'react';
import { OpenAIService } from '@/services/OpenAIService';
import { ChatMessage, ChatState } from '@/types';

// Default messages to initialize the chat
const defaultWelcomeMessage: ChatMessage = {
  id: '1',
  content: "Hi there! I'm Vernon, your AI assistant powered by GPT-4o. I can help you discover amazing places to go and things to do based on your interests. Try asking about restaurants, events, attractions, or specific activities you're interested in. What are you looking for today?",
  role: 'system',
  timestamp: new Date(),
  text: "Hi there! I'm Vernon, your AI assistant powered by GPT-4o. I can help you discover amazing places to go and things to do based on your interests. Try asking about restaurants, events, attractions, or specific activities you're interested in. What are you looking for today?",
  sender: 'ai'
};

const venueWelcomeMessage: ChatMessage = {
  id: '1',
  content: "Hello! I'm Vernon for Venues, your AI business assistant powered by GPT-4o. I can help you analyze your venue data, understand customer trends, and optimize your business performance. What would you like to know about your venue today?",
  role: 'system',
  timestamp: new Date(),
  text: "Hello! I'm Vernon for Venues, your AI business assistant powered by GPT-4o. I can help you analyze your venue data, understand customer trends, and optimize your business performance. What would you like to know about your venue today?",
  sender: 'ai'
};

export const useOpenAIChat = (isVenueMode: boolean = false) => {
  // Initialize chat state
  const [state, setState] = useState<ChatState>({
    isOpen: false,
    isMinimized: false,
    loading: false,
    isListening: false,
    isSpeaking: false,
    messages: [isVenueMode ? venueWelcomeMessage : defaultWelcomeMessage],
    searchResults: [],
    transcript: '',
    interimTranscript: '',
    error: null
  });
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Helper function to create a user message
  const createUserMessage = (content: string): ChatMessage => ({
    id: Date.now().toString(),
    content,
    role: 'user',
    timestamp: new Date(),
    text: content,
    sender: 'user'
  });
  
  // Helper function to create an assistant message
  const createAssistantMessage = (content: string): ChatMessage => ({
    id: Date.now().toString(),
    content,
    role: 'assistant',
    timestamp: new Date(),
    text: content,
    sender: 'ai'
  });
  
  // Send a text message to the chat
  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;
    
    // Add user message to chat
    const userMessage = createUserMessage(content);
    setState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      loading: true
    }));
    
    try {
      // Format messages for OpenAI API
      const chatMessages = state.messages
        .filter(msg => msg.role !== 'system') // Filter out system messages
        .map(msg => ({
          role: msg.role === 'user' ? 'user' : 'assistant',
          content: msg.content
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
        loading: false
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
        loading: false,
        error: error instanceof Error ? error.message : 'Unknown error'
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
                loading: true,
                interimTranscript: 'Processing your audio...'
              }));
              
              // Send to speech-to-text API
              const transcript = await OpenAIService.speechToText(base64Audio);
              
              // Update state with transcript
              setState(prev => ({ 
                ...prev, 
                transcript,
                interimTranscript: '',
                loading: false
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
              loading: false,
              interimTranscript: 'Error processing audio. Please try again.',
              error: error instanceof Error ? error.message : 'Error processing audio'
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
        interimTranscript: 'Could not access microphone. Please check permissions.',
        error: error instanceof Error ? error.message : 'Error accessing microphone'
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
        setState(prev => ({ 
          ...prev, 
          isSpeaking: false,
          error: 'Audio playback error'
        }));
      };
      
      await audioRef.current.play();
    } catch (error) {
      console.error('Error speaking text:', error);
      setState(prev => ({ 
        ...prev, 
        isSpeaking: false,
        error: error instanceof Error ? error.message : 'Error speaking text'
      }));
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
