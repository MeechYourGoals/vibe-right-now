
import React, { useEffect, useState } from 'react';
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
  const [inputValue, setInputValue] = useState('');
  const [autoSubmitTimeout, setAutoSubmitTimeout] = useState<NodeJS.Timeout | null>(null);

  // Effect to handle auto-submission of transcript
  useEffect(() => {
    if (transcript) {
      // Set the input value to the transcript
      setInputValue(transcript);
      
      // Clear any existing timeout
      if (autoSubmitTimeout) {
        clearTimeout(autoSubmitTimeout);
      }
      
      // Set a timeout to auto-submit after a short delay
      const timeout = setTimeout(() => {
        if (transcript.trim() && !isTyping) {
          onSendMessage(transcript);
          // Clear input after sending
          setInputValue('');
        }
      }, 200);
      
      setAutoSubmitTimeout(timeout);
    }
    
    // Clean up timeout on unmount
    return () => {
      if (autoSubmitTimeout) {
        clearTimeout(autoSubmitTimeout);
      }
    };
  }, [transcript, isTyping, onSendMessage]);

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

  // Handle input change from keyboard typing
  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  // Handle manual send from the input field
  const handleSendMessage = (message: string) => {
    if (message.trim() && !isTyping) {
      onSendMessage(message);
      setInputValue('');
    }
  };

  return (
    <div className="border-t p-3">
      <ChatTranscript 
        transcript={displayTranscript} 
        isVisible={isListening || interimTranscript.length > 0}
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
          onSendMessage={handleSendMessage} 
          isTyping={isTyping}
          disabled={isListening && isProcessing}
          value={inputValue}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default ChatControls;
