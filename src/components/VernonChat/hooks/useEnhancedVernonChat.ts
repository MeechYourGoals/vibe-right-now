import { useState, useCallback } from 'react';
import { Message } from '../types';
import { useConversationalMicrophone } from './useConversationalMicrophone';
import { useEnhancedSpeechSynthesis } from './useEnhancedSpeechSynthesis';
import { VertexAIService } from '@/services/VertexAIService';
import { SearchService } from '@/services/search/SearchService';

export const useEnhancedVernonChat = (isVenueMode: boolean = false) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Enhanced speech synthesis with ElevenLabs
  const { speakResponse, cancelSpeech, isSpeaking } = useEnhancedSpeechSynthesis();
  
  // Process completed transcript
  const handleTranscriptComplete = useCallback(async (transcript: string) => {
    if (!transcript.trim()) return;
    
    console.log('Processing completed transcript:', transcript);
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: transcript,
      direction: 'outgoing',
      timestamp: new Date(),
      text: transcript,
      sender: 'user'
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsProcessing(true);
    
    // Cancel any ongoing speech when user speaks
    if (isSpeaking) {
      cancelSpeech();
    }
    
    try {
      let aiResponse: string;
      
      // Check if this is a search query
      if (/what|where|when|how|find|search|looking for|recommend|suggest/i.test(transcript)) {
        console.log('Processing as search query');
        aiResponse = await SearchService.search(transcript);
      } else {
        console.log('Processing with Vertex AI');
        // Format messages for Vertex AI (keep recent context)
        const contextMessages = messages.slice(-6);
        aiResponse = await VertexAIService.generateResponse(
          transcript,
          isVenueMode ? 'venue' : 'default',
          contextMessages
        );
      }
      
      // Add AI response
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        direction: 'incoming',
        timestamp: new Date(),
        text: aiResponse,
        sender: 'ai'
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      
      // Speak the response using ElevenLabs Brian voice (with fallback)
      await speakResponse(aiResponse);
      
    } catch (error) {
      console.error('Error processing transcript:', error);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm sorry, I encountered an error processing your request. Please try again.",
        direction: 'incoming',
        timestamp: new Date(),
        text: "I'm sorry, I encountered an error processing your request. Please try again.",
        sender: 'ai'
      };
      
      setMessages(prev => [...prev, errorMessage]);
      await speakResponse(errorMessage.content);
    } finally {
      setIsProcessing(false);
    }
  }, [messages, isVenueMode, speakResponse, cancelSpeech, isSpeaking]);
  
  // Conversational microphone with smart listening
  const { 
    isListening, 
    transcript, 
    toggleListening, 
    stopListening 
  } = useConversationalMicrophone({
    onTranscriptComplete: handleTranscriptComplete,
    isProcessing
  });
  
  // Send text message (for typing)
  const sendTextMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;
    
    await handleTranscriptComplete(text);
  }, [handleTranscriptComplete]);
  
  // Initialize with welcome message
  useState(() => {
    if (messages.length === 0) {
      const welcomeMessage: Message = {
        id: 'welcome',
        content: isVenueMode 
          ? "Hello! I'm Vernon for Venues, your AI business assistant. I'm using my natural Brian voice. How can I help you with your venue today?"
          : "Hi there! I'm Vernon, your AI assistant with a natural human voice. I can help you discover great places and things to do. Just speak naturally - I'll listen until you're finished!",
        direction: 'incoming',
        timestamp: new Date(),
        text: isVenueMode 
          ? "Hello! I'm Vernon for Venues, your AI business assistant. I'm using my natural Brian voice. How can I help you with your venue today?"
          : "Hi there! I'm Vernon, your AI assistant with a natural human voice. I can help you discover great places and things to do. Just speak naturally - I'll listen until you're finished!",
        sender: 'ai'
      };
      
      setMessages([welcomeMessage]);
    }
  });
  
  return {
    messages,
    isListening,
    isProcessing,
    isSpeaking,
    transcript,
    toggleListening,
    stopListening,
    sendTextMessage,
    speakResponse,
    cancelSpeech
  };
};
