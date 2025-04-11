
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ChatButton from './ChatButton';
import ChatWindow from './ChatWindow';
import { useTheme } from '@/components/ThemeProvider';
import { toast } from 'sonner';
import VernonModeButtons from './components/VernonModeButtons';
import { useElevenLabsConversation } from './hooks/useElevenLabsConversation';
import { WhisperSpeechService } from '@/services/WhisperSpeechService';
import { CoquiTTSService } from '@/services/CoquiTTSService';

const VernonChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isVenueMode, setIsVenueMode] = useState(false);
  const [isProPlan, setIsProPlan] = useState(false); // Simulate pro plan status
  const [introAttempted, setIntroAttempted] = useState(false);
  const [isModelLoading, setIsModelLoading] = useState(false);
  const { theme, setTheme } = useTheme();
  
  // Use our conversation hook
  const {
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
  } = useElevenLabsConversation(isVenueMode);
  
  // Initialize speech services when the component mounts
  useEffect(() => {
    setIsModelLoading(true);
    
    // Initialize Whisper for speech recognition (still needed for STT)
    WhisperSpeechService.initSpeechRecognition()
      .then(() => {
        console.log('Whisper speech recognition model initialized successfully');
      })
      .catch(error => {
        console.error('Error initializing Whisper model:', error);
        toast.error('Could not load speech recognition model. Voice features may be limited.');
      });
    
    // Initialize Coqui TTS service
    CoquiTTSService.init()
      .then(available => {
        if (available) {
          console.log('Coqui TTS service is ready');
        } else {
          console.warn('Coqui TTS service unavailable, will use browser fallback');
        }
        setIsModelLoading(false);
      })
      .catch(error => {
        console.error('Error initializing Coqui TTS service:', error);
        toast.error('Could not connect to Coqui TTS server. Using browser speech instead.');
        setIsModelLoading(false);
      });
  }, []);
  
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
    // Reset chat when switching modes
    window.location.reload();
  };

  const toggleProPlan = () => {
    setIsProPlan(!isProPlan);
    toast.success(isProPlan ? 'Switched to Basic Plan' : 'Pro Plan Features Activated');
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
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
  }, [isOpen, isConnected, connectToAgent]);
  
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
  
  // Open chat if not already open and start listening
  const handleOpenAndListen = () => {
    if (!isOpen) {
      setIsOpen(true);
      // Wait for chat to fully open before starting listening
      setTimeout(() => {
        if (!isListening) {
          toggleListening();
        }
      }, 300);
    } else if (!isListening) {
      toggleListening();
    }
  };
  
  if (!isOpen) {
    return (
      <div className="fixed left-6 bottom-6 flex flex-col gap-2">
        <VernonModeButtons
          isProPlan={isProPlan}
          handleOpenChat={handleOpenChat}
        />
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChatButton onClick={() => handleOpenAndListen()} />
        </motion.div>
        
        {/* Theme toggle button removed from here */}
      </div>
    );
  }
  
  return (
    <motion.div 
      className={`fixed left-6 bottom-6 z-40 max-h-[85vh] w-80 sm:w-96 overflow-hidden shadow-2xl rounded-lg border ${
        isVenueMode 
          ? 'border-amber-300 shadow-amber-200/20 dark:shadow-amber-800/10' 
          : 'border-blue-300/30 shadow-blue-200/30 dark:shadow-blue-900/20'
      }`}
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.9 }}
      transition={{ duration: 0.2 }}
    >
      <div className="h-full flex flex-col max-h-[85vh]">
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
    </motion.div>
  );
};

// Import needed for VernonChatWindow
import ChatSettings from './components/ChatSettings';

export default VernonChat;
