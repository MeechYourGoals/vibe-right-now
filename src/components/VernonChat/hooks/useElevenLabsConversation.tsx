
import { useState, useEffect, useCallback } from 'react';
import { Message } from '../types';
import { toast } from 'sonner';
import { useSpeechSynthesis } from './useSpeechSynthesis';
import { useSpeechRecognition } from './speechRecognition';
import { VertexAIService } from '@/services/VertexAIService';
import { SearchService } from '@/services/search/SearchService';

// Create a welcome message based on the mode
const getWelcomeMessage = (isVenueMode: boolean): Message => ({
  id: '1',
  text: isVenueMode 
    ? "Hello! I'm Vernon for Venues, your AI business assistant. How can I help you with your venue today?" 
    : "Hi there! I'm Vernon, your AI assistant for the Vibe Right Now app. I can help you discover great places to go and things to do. Ask me about restaurants, events, activities, or anything else you're interested in!",
  sender: 'ai',
  timestamp: new Date()
});

export const useElevenLabsConversation = (isVenueMode: boolean = false) => {
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<Message[]>([getWelcomeMessage(isVenueMode)]);
  
  // Use our speech synthesis hook
  const { isSpeaking, speakResponse, stopSpeaking } = useSpeechSynthesis();
  
  // Use our speech recognition hook
  const {
    isListening,
    isProcessing,
    transcript,
    interimTranscript,
    startListening,
    stopListening,
    processTranscript
  } = useSpeechRecognition();

  // Connect to the conversation agent
  const connectToAgent = useCallback(async () => {
    try {
      // In a real implementation with ElevenLabs, we'd connect to their API here
      // For now, we'll just simulate a connection
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setIsConnected(true);
      console.log('Connected to conversation agent');
      return true;
    } catch (error) {
      console.error('Error connecting to agent:', error);
      toast.error('Error connecting to assistant');
      return false;
    }
  }, []);

  // Toggle listening state
  const toggleListening = useCallback(async () => {
    if (isListening) {
      stopListening();
    } else {
      try {
        await startListening();
      } catch (error) {
        console.error('Error starting speech recognition:', error);
        toast.error('Could not access microphone');
      }
    }
  }, [isListening, startListening, stopListening]);

  // Process voice input once transcript is available
  const processVoiceInput = useCallback(async (voiceText: string) => {
    if (!voiceText.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: voiceText,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    try {
      // First check if this is a search query
      if (/what|where|when|how|find|search|looking for|recommend|suggest/i.test(voiceText)) {
        // Get response using search service
        const searchResponse = await SearchService.search(voiceText);
        
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: searchResponse,
          sender: 'ai',
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, aiMessage]);
        return aiMessage.text;
      } else {
        // Format messages for Vertex AI
        const contextMessages = messages.slice(-6);
        
        // Generate response from Vertex AI
        const aiResponse = await VertexAIService.generateResponse(
          voiceText,
          isVenueMode ? 'venue' : 'default',
          contextMessages
        );
        
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: aiResponse,
          sender: 'ai',
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, aiMessage]);
        return aiMessage.text;
      }
    } catch (error) {
      console.error('Error processing voice input:', error);
      toast.error('Error getting response');
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm sorry, I encountered an error processing your request. Please try again.",
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
      return errorMessage.text;
    }
  }, [messages, isVenueMode]);

  // Function to send a text message
  const sendTextMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    try {
      // Check if this is a search query
      if (/what|where|when|how|find|search|looking for|recommend|suggest/i.test(text)) {
        // Get response using search service
        const searchResponse = await SearchService.search(text);
        
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: searchResponse,
          sender: 'ai',
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, aiMessage]);
        speakResponse(aiMessage.text);
      } else {
        // Format messages for Vertex AI
        const contextMessages = messages.slice(-6);
        
        // Generate response from Vertex AI
        const aiResponse = await VertexAIService.generateResponse(
          text,
          isVenueMode ? 'venue' : 'default',
          contextMessages
        );
        
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: aiResponse,
          sender: 'ai',
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, aiMessage]);
        speakResponse(aiMessage.text);
      }
    } catch (error) {
      console.error('Error sending text message:', error);
      toast.error('Error getting response');
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm sorry, I encountered an error processing your request. Please try again.",
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    }
  }, [messages, speakResponse, isVenueMode]);

  // Process transcript when it changes
  useEffect(() => {
    if (transcript && !isProcessing) {
      processVoiceInput(transcript);
    }
  }, [transcript, isProcessing, processVoiceInput]);

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
    speakResponse
  };
};
