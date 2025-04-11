
import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ChatButton from './ChatButton';
import ChatWindow from './ChatWindow';
import { useTheme } from '@/components/ThemeProvider';
import { toast } from 'sonner';
import { Message, ChatState } from './types';
import { INITIAL_MESSAGE, createUserMessage, createAIMessage, createErrorMessage } from '../VernonChat/utils/messageFactory';
import { useSpeechRecognition } from './hooks/useSpeechRecognition';
import { useSpeechSynthesis } from './hooks/useSpeechSynthesis';
import { useNLPService } from './hooks/useNLPService';
import { useGooglePlacesService } from './hooks/useGooglePlacesService';
import { supabase } from '@/integrations/supabase/client';

const VernonNext: React.FC = () => {
  const [state, setState] = useState<ChatState>({
    isOpen: false,
    isMinimized: false,
    isLoading: false,
    isListening: false,
    isSpeaking: false,
    messages: [INITIAL_MESSAGE],
    searchResults: [],
    transcript: '',
    interimTranscript: ''
  });
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { theme } = useTheme();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Custom hooks for speech and AI services
  const { 
    transcript, 
    interimTranscript,
    isListening, 
    startListening, 
    stopListening 
  } = useSpeechRecognition();
  
  const { 
    speak, 
    cancel: cancelSpeech, 
    isSpeaking 
  } = useSpeechSynthesis({ voice: 'male' });
  
  const { analyzeIntent } = useNLPService();
  const { searchPlaces } = useGooglePlacesService();
  
  // Update component state from hooks
  useEffect(() => {
    setState(prev => ({
      ...prev,
      transcript,
      interimTranscript,
      isListening,
      isSpeaking
    }));
  }, [transcript, interimTranscript, isListening, isSpeaking]);
  
  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current && state.isOpen) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [state.messages, state.isOpen]);
  
  // Removed auto-speaking of intro message to only speak when user initiates
  
  const toggleChat = () => {
    setState(prev => ({ 
      ...prev, 
      isOpen: !prev.isOpen, 
      isMinimized: false 
    }));
  };
  
  const toggleMinimize = () => {
    setState(prev => ({ ...prev, isMinimized: !prev.isMinimized }));
  };
  
  const toggleListening = () => {
    if (state.isListening) {
      stopListening();
    } else {
      startListening();
    }
  };
  
  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;
    
    // Add user message
    const userMessage = createUserMessage(text);
    setState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isLoading: true,
      transcript: '',
      interimTranscript: ''
    }));
    
    try {
      // Process with NLP to extract intent
      const intent = await analyzeIntent(text);
      console.log('Extracted intent:', intent);
      
      // Search for places based on intent
      let response = '';
      if (intent.type === 'search' && intent.location) {
        console.log('Searching for places with intent', intent);
        const results = await searchPlaces(text, intent);
        console.log('Search results:', results);
        
        setState(prev => ({ ...prev, searchResults: results }));
        
        if (results.length > 0) {
          response = `I found these places that might interest you:\n\n${
            results.map((r, i) => `${i+1}. **${r.name}** - ${r.address}${r.rating ? ` (Rating: ${r.rating}/5)` : ''}`).join('\n')
          }\n\nWould you like more information about any of these places?`;
        } else {
          response = `I couldn't find any places matching your request. Could you try being more specific or try a different location?`;
        }
      } else {
        // Use Vertex AI for general responses
        console.log('Getting Vertex AI response for intent:', intent);
        response = await getVertexAIResponse(text, intent);
      }
      
      // Add AI response
      const aiMessage = createAIMessage(response);
      setState(prev => ({
        ...prev,
        messages: [...prev.messages, aiMessage],
        isLoading: false
      }));
      
      // No automatic speaking - will now only speak when user requests it
      
    } catch (error) {
      console.error('Error processing message:', error);
      const errorMessage = createErrorMessage();
      setState(prev => ({
        ...prev,
        messages: [...prev.messages, errorMessage],
        isLoading: false
      }));
    }
  };
  
  // Helper function to get response from Vertex AI
  const getVertexAIResponse = async (text: string, intent: any) => {
    try {
      console.log('Calling Vertex AI with:', { text, intent });
      
      const { data, error } = await supabase.functions.invoke('vertex-ai', {
        body: { 
          prompt: text,
          mode: 'default',
          searchMode: intent.type === 'search',
          categories: intent.categories || []
        }
      });
      
      if (error) {
        console.error('Supabase function error:', error);
        throw new Error(error.message);
      }
      
      if (!data || !data.text) {
        console.error('No data returned from Vertex AI');
        throw new Error('No data returned from Vertex AI');
      }
      
      console.log('Vertex AI response:', data.text);
      return data.text;
    } catch (error) {
      console.error('Error calling Vertex AI:', error);
      return "I'm having trouble processing your request right now. Could you try again?";
    }
  };
  
  // Render chat button when closed, chat window when open
  return (
    <>
      <AnimatePresence>
        {!state.isOpen ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          >
            <ChatButton onClick={toggleChat} />
          </motion.div>
        ) : (
          <motion.div
            className="fixed bottom-6 left-6 z-50"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          >
            <ChatWindow
              state={state}
              onSendMessage={handleSendMessage}
              onClose={toggleChat}
              onMinimize={toggleMinimize}
              onToggleListening={toggleListening}
              onSpeak={speak}
              messagesEndRef={messagesEndRef}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default VernonNext;
