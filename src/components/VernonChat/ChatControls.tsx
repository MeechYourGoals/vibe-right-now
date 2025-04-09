
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Loader2, Send } from 'lucide-react';
import MessageInput from './MessageInput';
import ChatTranscript from './ChatTranscript';

interface ChatControlsProps {
  isListening: boolean;
  isProcessing: boolean;
  transcript: string;
  interimTranscript?: string;
  toggleListening: () => void;
  onSendMessage: (message: string) => void;
  isTyping: boolean;
}

const ChatControls: React.FC<ChatControlsProps> = ({
  isListening,
  isProcessing,
  transcript,
  interimTranscript = '',
  toggleListening,
  onSendMessage,
  isTyping
}) => {
  // Add effect for handling Enter key to submit voice transcript
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && isListening && transcript.trim() && !isProcessing && !isTyping) {
        e.preventDefault();
        toggleListening(); // This will stop listening and trigger processing
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isListening, transcript, isProcessing, toggleListening, isTyping]);

  // Function to handle manual send of voice transcript
  const handleSendVoiceTranscript = () => {
    if (isListening && transcript.trim() && !isProcessing) {
      toggleListening(); // This will stop listening and trigger processing
    }
  };

  // Combine transcript and interim transcript for display
  const displayTranscript = transcript + (isListening ? ' ' + interimTranscript : '');

  return (
    <div className="border-t p-3">
      <ChatTranscript 
        transcript={displayTranscript} 
        isVisible={isListening || transcript.length > 0}
        isListening={isListening} 
      />
      
      <div className="flex items-center">
        <Button
          variant={isListening ? "destructive" : "outline"}
          size="icon"
          className="mr-2 h-9 w-9 rounded-full"
          onClick={toggleListening}
          disabled={isProcessing}
          title={isListening ? "Stop Listening" : "Start Listening"}
        >
          {isProcessing ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : isListening ? (
            <MicOff className="h-4 w-4" />
          ) : (
            <Mic className="h-4 w-4" />
          )}
        </Button>
        
        {(isListening && transcript.trim()) && (
          <Button
            variant="default"
            size="icon"
            className="mr-2 h-9 w-9 rounded-full"
            onClick={handleSendVoiceTranscript}
            disabled={isProcessing}
            title="Send Voice Message"
          >
            <Send className="h-4 w-4" />
          </Button>
        )}
        
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
