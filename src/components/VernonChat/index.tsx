
import { useState, useEffect } from 'react';
import ChatButton from './ChatButton';
import ChatWindow from './ChatWindow';
import { useTheme } from '@/components/ThemeProvider';
import { toast } from 'sonner';
import { ElevenLabsService } from '@/services/ElevenLabsService';
import VernonThemeToggle from './components/VernonThemeToggle';
import VernonModeButtons from './components/VernonModeButtons';
import { useElevenLabsConversation } from './hooks/useElevenLabsConversation';

const VernonChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isVenueMode, setIsVenueMode] = useState(false);
  const [isProPlan, setIsProPlan] = useState(false); // Simulate pro plan status
  const [introAttempted, setIntroAttempted] = useState(false);
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
  
  // Check for ElevenLabs API key and prompt if not available
  useEffect(() => {
    if (isOpen && !ElevenLabsService.hasApiKey()) {
      promptForElevenLabsKey();
    }
  }, [isOpen]);
  
  // Handle opening chat
  const handleOpenChat = (mode: boolean = false) => {
    setIsVenueMode(mode);
    setIsOpen(true);
    setIntroAttempted(false); // Reset intro state when opening
  };
  
  // Prompt for ElevenLabs API key
  const promptForElevenLabsKey = () => {
    const apiKey = prompt('Enter your Eleven Labs API key for improved voice quality:');
    if (apiKey) {
      ElevenLabsService.setApiKey(apiKey);
      toast.success('Voice settings updated. Reload to apply changes.');
    }
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
      promptForElevenLabsKey={promptForElevenLabsKey}
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
  promptForElevenLabsKey,
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
        useElevenLabs={true}
        promptForElevenLabsKey={promptForElevenLabsKey}
        isListening={isListening}
        toggleListening={toggleListening}
        isVenueMode={isVenueMode}
        toggleVenueMode={toggleVenueMode}
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
