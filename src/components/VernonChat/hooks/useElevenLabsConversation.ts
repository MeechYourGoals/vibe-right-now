
import { useState, useCallback, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { OpenAIService } from '@/services/OpenAIService';
import { Message } from '../types';

export const useElevenLabsConversation = (isVenueMode = false) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Connect to the agent and set up initial message
  const connectToAgent = useCallback(async () => {
    if (isConnected) return;
    
    try {
      setIsConnected(true);
      
      // Set initial welcome message based on mode
      const welcomeMessage: Message = {
        id: uuidv4(),
        text: isVenueMode 
          ? "Hello! I'm Vernon for Venues, your AI business assistant. I can help you analyze your venue data, understand customer trends, and optimize your business performance. What would you like to know about your venue today?"
          : "Hi there! I'm Vernon, your AI assistant. I can help you discover amazing places to go and things to do based on your interests. How can I assist you today?",
        sender: 'ai',
        timestamp: new Date(),
        verified: true
      };
      
      setMessages([welcomeMessage]);
    } catch (error) {
      console.error('Error connecting to agent:', error);
      setIsConnected(false);
    }
  }, [isConnected, isVenueMode]);
  
  // Toggle listening state
  const toggleListening = useCallback(() => {
    setIsListening(prev => !prev);
    
    if (isListening) {
      // Stop listening
      setIsListening(false);
    } else {
      // Start listening
      setIsListening(true);
      setTranscript('');
      setInterimTranscript('');
    }
  }, [isListening]);
  
  // Process voice input
  const processVoiceInput = useCallback(async (text: string) => {
    if (!text.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: uuidv4(),
      text,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsProcessing(true);
    
    try {
      // Format messages for OpenAI API
      const formattedMessages = messages.map(msg => ({
        role: msg.sender === 'ai' ? 'assistant' : 'user',
        content: msg.text
      }));
      
      // Add the new user message
      formattedMessages.push({
        role: 'user',
        content: text
      });
      
      // Get response from OpenAI
      const response = await OpenAIService.sendChatRequest(
        formattedMessages,
        { context: isVenueMode ? 'venue' : 'user' }
      );
      
      // Add assistant response
      const assistantMessage: Message = {
        id: uuidv4(),
        text: response,
        sender: 'ai',
        timestamp: new Date(),
        verified: true
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      
      // Automatically speak the response
      speakResponse(response);
    } catch (error) {
      console.error('Error processing voice input:', error);
      
      // Add error message
      const errorMessage: Message = {
        id: uuidv4(),
        text: "I'm sorry, I encountered an error while processing your request. Please try again.",
        sender: 'ai',
        timestamp: new Date(),
        verified: false
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsProcessing(false);
      setTranscript('');
      setInterimTranscript('');
    }
  }, [messages, isVenueMode]);
  
  // Send text message
  const sendTextMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: uuidv4(),
      text,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    try {
      // Format messages for OpenAI API
      const formattedMessages = messages.map(msg => ({
        role: msg.sender === 'ai' ? 'assistant' : 'user',
        content: msg.text
      }));
      
      // Add the new user message
      formattedMessages.push({
        role: 'user',
        content: text
      });
      
      // Get response from OpenAI
      const response = await OpenAIService.sendChatRequest(
        formattedMessages,
        { context: isVenueMode ? 'venue' : 'user' }
      );
      
      // Add assistant response
      const assistantMessage: Message = {
        id: uuidv4(),
        text: response,
        sender: 'ai',
        timestamp: new Date(),
        verified: true
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending text message:', error);
      
      // Add error message
      const errorMessage: Message = {
        id: uuidv4(),
        text: "I'm sorry, I encountered an error while processing your request. Please try again.",
        sender: 'ai',
        timestamp: new Date(),
        verified: false
      };
      
      setMessages(prev => [...prev, errorMessage]);
    }
  }, [messages, isVenueMode]);
  
  // Speak text response
  const speakResponse = useCallback(async (text: string) => {
    if (isSpeaking || !text.trim()) return;
    
    try {
      setIsSpeaking(true);
      
      // Get audio from OpenAI TTS
      const audioBase64 = await OpenAIService.textToSpeech(text);
      
      // Create audio element if it doesn't exist
      if (!audioRef.current) {
        audioRef.current = new Audio();
      }
      
      // Set audio source and play
      audioRef.current.src = `data:audio/mp3;base64,${audioBase64}`;
      
      audioRef.current.onended = () => {
        setIsSpeaking(false);
      };
      
      audioRef.current.onerror = () => {
        console.error('Audio playback error');
        setIsSpeaking(false);
      };
      
      await audioRef.current.play();
    } catch (error) {
      console.error('Error speaking response:', error);
      setIsSpeaking(false);
    }
  }, [isSpeaking]);
  
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
