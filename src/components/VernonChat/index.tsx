
import React, { useState, useEffect, useCallback } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import GeminiChatWindow from './GeminiChatWindow';
import ChatButton from './ChatButton';
import { Message, MessageDirection, ChatMode } from './types';
import { useMessageProcessor } from './hooks/useMessageProcessor';

const VernonChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useLocalStorage<Message[]>('vernon_messages', []);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [chatMode, setChatMode] = useLocalStorage<ChatMode>('vernon_chat_mode', 'user');
  const [isModelLoading, setIsModelLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const { processMessage } = useMessageProcessor();

  // Listen for custom events to open chat in venue mode
  useEffect(() => {
    const handleOpenChat = (event: CustomEvent) => {
      if (event.detail?.mode === 'venue') {
        setChatMode('venue');
      }
      setIsOpen(true);
    };

    window.addEventListener('open-vernon-chat', handleOpenChat as EventListener);
    return () => {
      window.removeEventListener('open-vernon-chat', handleOpenChat as EventListener);
    };
  }, [setChatMode]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const toggleMode = useCallback(() => {
    setChatMode(prev => prev === 'user' ? 'venue' : 'user');
  }, [setChatMode]);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, [setMessages]);

  const addMessage = useCallback((content: string, direction: MessageDirection, aiResponse = false) => {
    const timestamp = new Date();
    
    setMessages(prevMessages => [
      ...prevMessages, 
      { 
        id: `msg-${Date.now()}`, 
        content, 
        direction, 
        timestamp,
        aiResponse,
        text: content,
        sender: direction === 'outgoing' ? 'user' : 'ai'
      }
    ]);
  }, [setMessages]);

  const handleSendMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;
    
    setInput('');
    addMessage(text, 'outgoing');
    setIsProcessing(true);

    try {
      const response = await processMessage(text, messages, chatMode);
      addMessage(response, 'incoming', true);
    } catch (error) {
      console.error('Error processing message:', error);
      addMessage('I apologize, but I encountered an error while processing your request. Please try again.', 'incoming');
    } finally {
      setIsProcessing(false);
    }
  }, [addMessage, messages, processMessage, chatMode]);

  // Voice recognition functionality
  const toggleListening = useCallback(() => {
    if (isListening) {
      setIsListening(false);
      setTranscript('');
      // Stop speech recognition if available
      const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition && (window as any).currentRecognition) {
        (window as any).currentRecognition.stop();
      }
    } else {
      setIsListening(true);
      setTranscript('Listening...');
      
      // Start speech recognition if available
      const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = 'en-US';
        
        recognition.onresult = (event: any) => {
          const current = event.resultIndex;
          const transcript = event.results[current][0].transcript;
          setTranscript(transcript);
          
          if (event.results[current].isFinal) {
            setInput(transcript);
            setIsListening(false);
            setTranscript('');
          }
        };
        
        recognition.onerror = () => {
          setIsListening(false);
          setTranscript('');
        };
        
        recognition.onend = () => {
          setIsListening(false);
          setTranscript('');
        };
        
        recognition.start();
        (window as any).currentRecognition = recognition;
      } else {
        console.warn('Speech recognition not supported');
        setIsListening(false);
        setTranscript('');
      }
    }
  }, [isListening]);

  // Add welcome message on first load if no messages exist
  useEffect(() => {
    if (messages.length === 0) {
      const timestamp = new Date();
      setMessages([
        {
          id: 'welcome',
          content: `Hello! I'm Vernon, your AI assistant powered by Google Gemini. I can help you discover venues, events, and provide business insights. ${chatMode === 'venue' ? 'I see you\'re in venue mode - I\'m ready to help with your business analytics and marketing strategies!' : 'How can I help you today?'}`,
          direction: 'incoming',
          timestamp,
          aiResponse: true,
          text: `Hello! I'm Vernon, your AI assistant powered by Google Gemini. I can help you discover venues, events, and provide business insights. ${chatMode === 'venue' ? 'I see you\'re in venue mode - I\'m ready to help with your business analytics and marketing strategies!' : 'How can I help you today?'}`,
          sender: 'ai'
        }
      ]);
    }
  }, [messages.length, setMessages, chatMode]);

  return (
    <>
      {isOpen ? (
        <GeminiChatWindow
          messages={messages}
          input={input}
          setInput={setInput}
          onSendMessage={handleSendMessage}
          onClose={toggleChat}
          isProcessing={isProcessing}
          chatMode={chatMode}
          toggleMode={toggleMode}
          clearMessages={clearMessages}
          isListening={isListening}
          toggleListening={toggleListening}
          isModelLoading={isModelLoading}
          transcript={transcript}
        />
      ) : (
        <ChatButton onClick={toggleChat} />
      )}
    </>
  );
};

export default VernonChat;
