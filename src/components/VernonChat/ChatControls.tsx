
import React, { useState } from 'react';
import { Mic, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MessageInput from './MessageInput';
import ChatTranscript from './ChatTranscript';

interface ChatControlsProps {
  onSendMessage: (message: string) => void;
  isTyping: boolean;
  isListening: boolean;
  transcript: string;
  interimTranscript: string;
  startListening: () => void;
  stopListening: () => void;
  handlePushToTalkStart?: () => void;
  handlePushToTalkEnd?: () => void;
  isProcessing: boolean;
  disabled?: boolean;
}

const ChatControls: React.FC<ChatControlsProps> = ({
  onSendMessage,
  isTyping,
  isListening,
  transcript,
  interimTranscript,
  startListening,
  stopListening,
  handlePushToTalkStart,
  handlePushToTalkEnd,
  isProcessing,
  disabled = false
}) => {
  const [showTranscript, setShowTranscript] = useState(true);
  
  // Combine transcript and interim transcript for display
  const displayTranscript = transcript || interimTranscript;
  
  return (
    <div className="flex flex-col w-full">
      <ChatTranscript 
        transcript={displayTranscript}
        isVisible={showTranscript && (isListening || !!displayTranscript)} 
        isListening={isListening}
      />

      <div className="flex items-center">
        <Button
          type="button"
          size="icon"
          variant={isListening ? "destructive" : "outline"}
          className="mr-2 relative overflow-hidden"
          disabled={disabled || isProcessing}
          aria-label={isListening ? "Stop listening" : "Start listening"}
          onClick={isListening ? stopListening : startListening}
          onMouseDown={handlePushToTalkStart}
          onMouseUp={handlePushToTalkEnd}
          onMouseLeave={isListening && handlePushToTalkEnd ? handlePushToTalkEnd : undefined}
          onTouchStart={handlePushToTalkStart}
          onTouchEnd={handlePushToTalkEnd}
        >
          {isListening ? (
            <Square className="h-4 w-4" />
          ) : (
            <Mic className="h-4 w-4" />
          )}
          {isListening && (
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-red-400 opacity-75"></span>
            </span>
          )}
        </Button>
        
        <MessageInput 
          onSendMessage={onSendMessage}
          isTyping={isTyping}
          disabled={disabled || isProcessing}
        />
      </div>
    </div>
  );
};

export default ChatControls;
