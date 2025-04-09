
import React, { useEffect } from 'react';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import ChatControls from './ChatControls';
import { useSpeechInteraction } from './hooks/useSpeechInteraction';
import { Message } from './types';
import { Button } from '@/components/ui/button';
import { Mic, Settings } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

interface ChatWindowProps {
  isOpen: boolean;
  isMinimized: boolean;
  toggleMinimize: () => void;
  closeChat: () => void;
  messages: Message[];
  isTyping: boolean;
  isSearching: boolean;
  onSendMessage: (message: string) => void;
  isVenueMode?: boolean;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  isOpen,
  isMinimized,
  toggleMinimize,
  closeChat,
  messages,
  isTyping,
  isSearching,
  onSendMessage,
  isVenueMode = false
}) => {
  const {
    isListening,
    isProcessing,
    setIsProcessing,
    transcript,
    interimTranscript,
    isSpeaking,
    toggleListening,
    stopListening,
    stopSpeaking,
    speakResponse,
    processTranscript,
    useElevenLabs,
    promptForElevenLabsKey
  } = useSpeechInteraction();

  // Effect to read AI responses in voice mode
  useEffect(() => {
    if (messages.length > 0 && !isTyping && (isListening || isSpeaking)) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.sender === 'ai') {
        speakResponse(lastMessage.text);
      }
    }
  }, [messages, isTyping, isListening, isSpeaking, speakResponse]);

  // Effect to stop speaking when chat is closed
  useEffect(() => {
    if (!isOpen) {
      stopSpeaking();
    }
  }, [isOpen, stopSpeaking]);

  // Handle sending voice transcript as a message
  useEffect(() => {
    if (!isListening && isProcessing) {
      const transcriptText = processTranscript();
      if (transcriptText) {
        // Small delay to show processing state
        setTimeout(() => {
          onSendMessage(transcriptText);
          setIsProcessing(false);
        }, 300);
      } else {
        setIsProcessing(false);
      }
    }
  }, [isListening, isProcessing, processTranscript, onSendMessage, setIsProcessing]);

  if (isMinimized) {
    return (
      <ChatHeader
        isMinimized={isMinimized}
        toggleMinimize={toggleMinimize}
        closeChat={closeChat}
      />
    );
  }

  return (
    <>
      <ChatHeader
        isMinimized={isMinimized}
        toggleMinimize={toggleMinimize}
        closeChat={closeChat}
      />
      
      {/* Voice Settings Button */}
      <div className="absolute right-3 top-3 z-10">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <Settings className="h-3.5 w-3.5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={promptForElevenLabsKey}>
              {useElevenLabs ? "Update Eleven Labs API Key" : "Set Eleven Labs API Key"}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={toggleListening}>
              {isListening ? "Stop Listening" : "Start Voice Input"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      {/* Voice Active Indicator */}
      {(isListening || isSpeaking) && (
        <div className="absolute left-3 top-3 z-10">
          <div className="flex items-center gap-1.5">
            <Mic className={`h-3.5 w-3.5 ${isListening ? 'text-red-500 animate-pulse' : isSpeaking ? 'text-blue-500' : 'text-muted-foreground'}`} />
            <span className="text-xs font-medium">
              {isListening ? 'Listening...' : isSpeaking ? 'Speaking...' : ''}
            </span>
          </div>
        </div>
      )}
      
      <MessageList
        messages={messages}
        isTyping={isTyping}
        isSearching={isSearching}
      />
      <ChatControls
        isListening={isListening}
        isProcessing={isProcessing}
        transcript={transcript}
        interimTranscript={interimTranscript}
        toggleListening={toggleListening}
        onSendMessage={onSendMessage}
        isTyping={isTyping}
      />
    </>
  );
};

export default ChatWindow;
