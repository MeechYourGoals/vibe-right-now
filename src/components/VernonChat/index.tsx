
import { useState, useEffect } from 'react';
import ChatButton from './ChatButton';
import ChatWindow from './ChatWindow';
import { Button } from '@/components/ui/button';
import { Building2, Moon, Sun } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useTheme } from '@/components/ThemeProvider';
import { toast } from 'sonner';
import { ElevenLabsService } from '@/services/ElevenLabs';
import ChatSettings from './components/ChatSettings';
import { useElevenLabsConversation } from './hooks/useElevenLabsConversation';

const VernonChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isVenueMode, setIsVenueMode] = useState(false);
  const [isProPlan, setIsProPlan] = useState(false); // Simulate pro plan status
  const { theme, setTheme } = useTheme();
  
  // Use our new conversation hook
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
    sendTextMessage
  } = useElevenLabsConversation(isVenueMode);
  
  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };
  
  const closeChat = () => {
    setIsOpen(false);
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
  
  // Ensure ElevenLabs API key is set on component mount
  useEffect(() => {
    // Check if ElevenLabs API key is available
    if (!ElevenLabsService.hasApiKey()) {
      console.log('Setting default Eleven Labs API key');
      // Set default API key if not available
      ElevenLabsService.setApiKey('sk_236c24971a353bfa897b2c150b2d256ae65e352b405e3e4f');
    }
  }, []);
  
  // When user opens chat, connect to agent if not already connected
  useEffect(() => {
    if (isOpen && !isConnected) {
      connectToAgent();
    }
  }, [isOpen, isConnected, connectToAgent]);
  
  // Handle opening chat
  const handleOpenChat = (mode: boolean = false) => {
    setIsVenueMode(mode);
    setIsOpen(true);
  };
  
  if (!isOpen) {
    return (
      <div className="fixed left-6 bottom-6 flex flex-col gap-2">
        {isProPlan && (
          <Button
            variant="outline"
            className="h-12 w-12 rounded-full bg-amber-100 hover:bg-amber-200 border-amber-300"
            onClick={() => handleOpenChat(true)}
            title="Vernon for Venues"
          >
            <Building2 className="h-6 w-6 text-amber-800" />
          </Button>
        )}
        <ChatButton onClick={() => handleOpenChat(false)} />
        <Button 
          variant="outline" 
          className="h-12 w-12 rounded-full" 
          onClick={toggleTheme}
          title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
        >
          {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </Button>
      </div>
    );
  }
  
  return (
    <div 
      className={`fixed left-6 bottom-32 bg-card border rounded-lg shadow-lg transition-all duration-200 z-40
      ${isMinimized ? 'w-64 h-12' : 'w-80 h-96'}
      ${isVenueMode ? 'border-amber-300' : 'border-primary-100'}`}
    >
      {/* Settings component */}
      <ChatSettings 
        useElevenLabs={true}
        promptForElevenLabsKey={() => {
          const apiKey = prompt('Enter your Eleven Labs API key for improved voice quality:');
          if (apiKey) {
            ElevenLabsService.setApiKey(apiKey);
            toast.success('Eleven Labs API key saved. Voice quality will be improved.');
            window.location.reload(); // Reload to apply new key
          }
        }}
        isListening={isListening}
        toggleListening={toggleListening}
        isVenueMode={isVenueMode}
        toggleVenueMode={toggleVenueMode}
      />
      
      <ChatWindow
        isOpen={isOpen}
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

export default VernonChat;
