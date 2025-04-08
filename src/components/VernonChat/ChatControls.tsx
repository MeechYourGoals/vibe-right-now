
import React from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Loader2 } from 'lucide-react';
import MessageInput from './MessageInput';
import ChatTranscript from './ChatTranscript';

interface ChatControlsProps {
  isListening: boolean;
  isProcessing: boolean;
  transcript: string;
  toggleListening: () => void;
  onSendMessage: (message: string) => void;
  isTyping: boolean;
}

const ChatControls: React.FC<ChatControlsProps> = ({
  isListening,
  isProcessing,
  transcript,
  toggleListening,
  onSendMessage,
  isTyping
}) => {
  return (
    <div className="border-t p-3">
      <ChatTranscript transcript={transcript} isVisible={isListening} />
      
      <div className="flex items-center">
        <Button
          variant={isListening ? "destructive" : "outline"}
          size="icon"
          className="mr-2 h-9 w-9 rounded-full"
          onClick={toggleListening}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : isListening ? (
            <MicOff className="h-4 w-4" />
          ) : (
            <Mic className="h-4 w-4" />
          )}
        </Button>
        
        <MessageInput 
          onSendMessage={onSendMessage} 
          isTyping={isTyping}
          disabled={isListening}
        />
      </div>
    </div>
  );
};

export default ChatControls;
