
import { useState, useEffect } from 'react';
import ChatButton from './ChatButton';
import ChatWindow from './ChatWindow';
import { useTheme } from '@/components/ThemeProvider';
import { toast } from 'sonner';
import VernonThemeToggle from './components/VernonThemeToggle';
import VernonModeButtons from './components/VernonModeButtons';
import { useSpeechSynthesis } from './hooks/useSpeechSynthesis';
import { WhisperSpeechService } from '@/services/WhisperSpeechService';
import { CoquiTTSService } from '@/services/CoquiTTSService';
import { Message } from './types';

// Utility function to create initial message
const createInitialMessages = (isVenueMode: boolean): Message[] => {
  return [
    {
      id: '1',
      role: 'assistant',
      sender: 'ai',
      text: isVenueMode
        ? 'Hello! I\'m Vernon, your venue assistant. Ask me about business analytics or how to improve your venue\'s performance!'
        : 'Hi there! I\'m Vernon, your personal guide to finding the best spots and events. How can I help you discover something great today?',
      timestamp: new Date().toISOString()
    }
  ];
};

const VernonChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isVenueMode, setIsVenueMode] = useState(false);
  const [isProPlan, setIsProPlan] = useState(false); // Simulate pro plan status
  const [introAttempted, setIntroAttempted] = useState(false);
  const [isModelLoading, setIsModelLoading] = useState(false);
  const { theme, setTheme } = useTheme();
  
  // State for messages and speech handling
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  
  // Use our speech synthesis hook
  const {
    isSpeaking,
    speakResponse,
    stopSpeaking
  } = useSpeechSynthesis();
  
  // Initialize speech services when the component mounts
  useEffect(() => {
    setIsModelLoading(true);
    
    // Initialize speech recognition
    WhisperSpeechService.initSpeechRecognition()
      .then(() => {
        console.log('Speech recognition initialized successfully');
      })
      .catch(error => {
        console.error('Error initializing speech recognition:', error);
        toast.error('Could not load speech recognition. Voice features may be limited.');
      });
    
    // Initialize TTS service
    CoquiTTSService.init()
      .then(available => {
        if (available) {
          console.log('TTS service is ready');
        } else {
          console.warn('TTS service unavailable, will use browser fallback');
        }
        setIsModelLoading(false);
      })
      .catch(error => {
        console.error('Error initializing TTS service:', error);
        toast.error('Could not connect to TTS server. Using browser speech instead.');
        setIsModelLoading(false);
      });
  }, []);
  
  // Set initial messages when venue mode changes
  useEffect(() => {
    setMessages(createInitialMessages(isVenueMode));
  }, [isVenueMode]);
  
  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };
  
  const closeChat = () => {
    setIsOpen(false);
    setIntroAttempted(false); // Reset intro state when closing
  };

  const toggleVenueMode = () => {
    setIsVenueMode(!isVenueMode);
    toast.success(!isVenueMode ? 'Switched to Venue Mode' : 'Switched to User Mode');
    // Reset messages for the new mode
    setMessages(createInitialMessages(!isVenueMode));
  };

  const toggleProPlan = () => {
    setIsProPlan(!isProPlan);
    toast.success(isProPlan ? 'Switched to Basic Plan' : 'Pro Plan Features Activated');
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  
  // Connect to agent (simulate)
  const connectToAgent = () => {
    setIsConnected(true);
    setMessages(createInitialMessages(isVenueMode));
  };
  
  // Listen for open-vernon-chat events
  useEffect(() => {
    const handleOpenChat = (event: CustomEvent) => {
      const isVenue = event.detail?.mode === 'venue';
      setIsVenueMode(isVenue);
      setIsOpen(true);
    };
    
    window.addEventListener('open-vernon-chat', handleOpenChat as EventListener);
    
    return () => {
      window.removeEventListener('open-vernon-chat', handleOpenChat as EventListener);
    };
  }, []);
  
  // When user opens chat, connect to agent if not already connected
  useEffect(() => {
    if (isOpen && !isConnected) {
      connectToAgent();
    }
  }, [isOpen, isConnected]);
  
  // Play intro message when chat is opened
  useEffect(() => {
    const playIntroMessage = async () => {
      if (isOpen && messages.length > 0 && !introAttempted) {
        setIntroAttempted(true);
        const introMessage = messages[0];
        console.log('Attempting to play intro message:', introMessage.text);
        
        // Wait a moment for everything to be ready
        setTimeout(() => {
          speakResponse(introMessage.text);
        }, 500);
      }
    };
    
    playIntroMessage();
  }, [isOpen, messages, introAttempted, speakResponse]);
  
  // Handle opening chat
  const handleOpenChat = (mode: boolean = false) => {
    setIsVenueMode(mode);
    setIsOpen(true);
    setIntroAttempted(false); // Reset intro state when opening
  };
  
  // Toggle listening state
  const toggleListening = () => {
    if (isListening) {
      setIsListening(false);
      setInterimTranscript('');
    } else {
      setIsListening(true);
      setInterimTranscript('Listening...');
      // In a real implementation, we would start recording here
    }
  };
  
  // Process voice input (simulate)
  const processVoiceInput = async (): Promise<string> => {
    setIsProcessing(true);
    
    try {
      // Simulate voice processing
      await new Promise(resolve => setTimeout(resolve, 1000));
      const processedText = transcript || 'I heard you say something';
      
      setIsProcessing(false);
      setTranscript('');
      
      return processedText;
    } catch (error) {
      console.error('Error processing voice input:', error);
      setIsProcessing(false);
      return '';
    }
  };
  
  // Send text message
  const sendTextMessage = async (text: string) => {
    if (!text.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      sender: 'user',
      text,
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        sender: 'ai',
        text: `I received your message: "${text}". This is a simulated response as we're using a hybrid approach with various services.`,
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, aiResponse]);
    }, 1500);
  };
  
  if (!isOpen) {
    return (
      <div className="fixed left-6 bottom-6 flex flex-col gap-2">
        <VernonModeButtons
          isProPlan={isProPlan}
          handleOpenChat={handleOpenChat}
        />
        <ChatButton onClick={() => handleOpenChat(false)} />
        <VernonThemeToggle theme={theme} toggleTheme={toggleTheme} />
      </div>
    );
  }
  
  return (
    <VernonChatWindow
      isMinimized={isMinimized}
      isVenueMode={isVenueMode}
      toggleMinimize={toggleMinimize}
      closeChat={closeChat}
      toggleVenueMode={toggleVenueMode}
      isModelLoading={isModelLoading}
      messages={messages}
      isSpeaking={isSpeaking}
      isListening={isListening}
      isProcessing={isProcessing}
      transcript={transcript}
      interimTranscript={interimTranscript}
      toggleListening={toggleListening}
      sendTextMessage={sendTextMessage}
    />
  );
};

// Extracted VernonChatWindow component
const VernonChatWindow = ({
  isMinimized,
  isVenueMode,
  toggleMinimize,
  closeChat,
  toggleVenueMode,
  isModelLoading,
  messages,
  isSpeaking,
  isListening,
  isProcessing,
  transcript,
  interimTranscript,
  toggleListening,
  sendTextMessage
}) => {
  return (
    <div 
      className={`fixed left-6 bottom-32 bg-card border rounded-lg shadow-lg transition-all duration-200 z-40
      ${isMinimized ? 'w-64 h-12' : 'w-80 h-96'}
      ${isVenueMode ? 'border-amber-300' : 'border-primary-100'}`}
    >
      {/* Settings component */}
      <ChatSettings 
        isListening={isListening}
        toggleListening={toggleListening}
        isVenueMode={isVenueMode}
        toggleVenueMode={toggleVenueMode}
        isModelLoading={isModelLoading}
      />
      
      <ChatWindow
        isOpen={true}
        isMinimized={isMinimized}
        toggleMinimize={toggleMinimize}
        closeChat={closeChat}
        messages={messages}
        isTyping={isSpeaking}
        isSearching={false}
        onSendMessage={sendTextMessage}
        isVenueMode={isVenueMode}
        isListening={isListening}
        isProcessing={isProcessing}
        transcript={transcript}
        interimTranscript={interimTranscript}
        toggleListening={toggleListening}
        isSpeaking={isSpeaking}
      />
    </div>
  );
};

// Import needed for VernonChatWindow
import ChatSettings from './components/ChatSettings';

export default VernonChat;
