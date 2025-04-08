
import { useState } from 'react';
import ChatButton from './ChatButton';
import ChatWindow from './ChatWindow';
import { useChat } from './hooks/useChat';
import { Button } from '@/components/ui/button';
import { Settings, Building2 } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

const VernonChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isVenueMode, setIsVenueMode] = useState(false);
  const [isProPlan, setIsProPlan] = useState(false); // Simulate pro plan status
  
  const {
    messages,
    isTyping,
    isSearching,
    handleSendMessage
  } = useChat(isProPlan, isVenueMode);
  
  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };
  
  const closeChat = () => {
    setIsOpen(false);
  };

  const switchToVenueMode = () => {
    setIsVenueMode(true);
    // Reset chat when switching modes
    window.location.reload();
  };

  const switchToUserMode = () => {
    setIsVenueMode(false);
    // Reset chat when switching modes
    window.location.reload();
  };

  const toggleProPlan = () => {
    setIsProPlan(!isProPlan);
    toast.success(isProPlan ? 'Switched to Basic Plan' : 'Pro Plan Features Activated');
  };
  
  if (!isOpen) {
    return (
      <div className="fixed left-6 bottom-6 flex flex-col gap-2">
        {isProPlan && (
          <Button
            variant="outline"
            className="h-12 w-12 rounded-full bg-amber-100 hover:bg-amber-200 border-amber-300"
            onClick={() => {
              setIsVenueMode(true);
              setIsOpen(true);
            }}
            title="Vernon for Venues"
          >
            <Building2 className="h-6 w-6 text-amber-800" />
          </Button>
        )}
        <ChatButton onClick={() => {
          setIsVenueMode(false);
          setIsOpen(true);
        }} />
      </div>
    );
  }
  
  return (
    <div 
      className={`fixed left-6 bottom-6 bg-card border rounded-lg shadow-lg transition-all duration-200 z-40
      ${isMinimized ? 'w-64 h-12' : 'w-80 h-96'}
      ${isVenueMode ? 'border-amber-300' : 'border-primary-100'}`}
    >
      {/* Settings button */}
      <div className="absolute right-14 top-3 z-50">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <Settings className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {isProPlan && (
              <>
                <DropdownMenuItem onClick={switchToUserMode} disabled={!isVenueMode}>
                  Switch to User Mode
                </DropdownMenuItem>
                <DropdownMenuItem onClick={switchToVenueMode} disabled={isVenueMode}>
                  Switch to Venue Mode
                </DropdownMenuItem>
              </>
            )}
            <DropdownMenuItem onClick={toggleProPlan}>
              {isProPlan ? 'Disable Pro Features' : 'Enable Pro Features'}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <ChatWindow
        isOpen={isOpen}
        isMinimized={isMinimized}
        toggleMinimize={toggleMinimize}
        closeChat={closeChat}
        messages={messages}
        isTyping={isTyping}
        isSearching={isSearching}
        onSendMessage={handleSendMessage}
        isVenueMode={isVenueMode}
      />
    </div>
  );
};

import { toast } from 'sonner';

export default VernonChat;
