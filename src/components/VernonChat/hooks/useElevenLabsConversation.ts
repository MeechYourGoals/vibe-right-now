
import { useState, useCallback, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { VertexAIService } from '@/services/VertexAIService';
import { VoiceService } from '@/services/VoiceService';
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
  
  const connectToAgent = useCallback(async () => {
    if (isConnected) return;
    
    try {
      setIsConnected(true);
      
      const welcomeMessage: Message = {
        id: uuidv4(),
        content: isVenueMode 
          ? "Hello! I'm Vernon for Venues, your AI business assistant powered by Google Vertex AI. How can I help you today?"
          : "Hi there! I'm Vernon, your AI assistant powered by Google Vertex AI. How can I assist you today?",
        direction: 'incoming',
        timestamp: new Date(),
        text: isVenueMode 
          ? "Hello! I'm Vernon for Venues, your AI business assistant powered by Google Vertex AI. How can I help you today?"
          : "Hi there! I'm Vernon, your AI assistant powered by Google Vertex AI. How can I assist you today?",
        sender: 'ai',
        verified: true
      };
      
      setMessages([welcomeMessage]);
    } catch (error) {
      console.error('Error connecting to agent:', error);
      setIsConnected(false);
    }
  }, [isConnected, isVenueMode]);
  
  const toggleListening = useCallback(() => {
    setIsListening(prev => !prev);
    
    if (isListening) {
      setIsListening(false);
    } else {
      setIsListening(true);
      setTranscript('');
      setInterimTranscript('');
    }
  }, [isListening]);
  
  const processVoiceInput = useCallback(async (text: string) => {
    if (!text.trim()) return;
    
    const userMessage: Message = {
      id: uuidv4(),
      content: text,
      direction: 'outgoing',
      timestamp: new Date(),
      text,
      sender: 'user'
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsProcessing(true);
    
    try {
      const contextMessages = messages.slice(-6);
      
      const response = await VertexAIService.generateResponse(
        text,
        isVenueMode ? 'venue' : 'default',
        contextMessages
      );
      
      const assistantMessage: Message = {
        id: uuidv4(),
        content: response,
        direction: 'incoming',
        timestamp: new Date(),
        text: response,
        sender: 'ai',
        verified: true
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      
      // Automatically speak the response
      speakResponse(response);
      
      return response;
    } catch (error) {
      console.error('Error processing voice input:', error);
      
      const errorMessage: Message = {
        id: uuidv4(),
        content: "I'm sorry, I encountered an error while processing your request. Please try again.",
        direction: 'incoming',
        timestamp: new Date(),
        text: "I'm sorry, I encountered an error while processing your request. Please try again.",
        sender: 'ai',
        verified: false
      };
      
      setMessages(prev => [...prev, errorMessage]);
      return errorMessage.content;
    } finally {
      setIsProcessing(false);
      setTranscript('');
      setInterimTranscript('');
    }
  }, [messages, isVenueMode]);
  
  const sendTextMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;
    
    const userMessage: Message = {
      id: uuidv4(),
      content: text,
      direction: 'outgoing',
      timestamp: new Date(),
      text,
      sender: 'user'
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    try {
      const contextMessages = messages.slice(-6);
      
      const response = await VertexAIService.generateResponse(
        text,
        isVenueMode ? 'venue' : 'default',
        contextMessages
      );
      
      const assistantMessage: Message = {
        id: uuidv4(),
        content: response,
        direction: 'incoming',
        timestamp: new Date(),
        text: response,
        sender: 'ai',
        verified: true
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      return response;
    } catch (error) {
      console.error('Error sending text message:', error);
      
      const errorMessage: Message = {
        id: uuidv4(),
        content: "I'm sorry, I encountered an error while processing your request. Please try again.",
        direction: 'incoming',
        timestamp: new Date(),
        text: "I'm sorry, I encountered an error while processing your request. Please try again.",
        sender: 'ai',
        verified: false
      };
      
      setMessages(prev => [...prev, errorMessage]);
      return errorMessage.content;
    }
  }, [messages, isVenueMode]);
  
  const speakResponse = useCallback(async (text: string) => {
    if (isSpeaking || !text.trim()) return;
    
    try {
      setIsSpeaking(true);
      
      const audioBase64 = await VoiceService.textToSpeech(text);
      
      if (!audioRef.current) {
        audioRef.current = new Audio();
      }
      
      if (audioBase64) {
        audioRef.current.src = `data:audio/mp3;base64,${audioBase64}`;
        
        audioRef.current.onended = () => {
          setIsSpeaking(false);
        };
        
        audioRef.current.onerror = () => {
          console.error('Audio playback error');
          setIsSpeaking(false);
        };
        
        await audioRef.current.play();
      } else {
        setIsSpeaking(false);
      }
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
