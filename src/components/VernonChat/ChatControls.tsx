
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Send, Mic, Loader2 } from 'lucide-react';
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

  // Combine transcript and interim transcript for display
  const displayTranscript = (interimTranscript && isListening) 
    ? interimTranscript 
    : transcript;

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

  // Handle sending voice transcript
  const handleSendVoiceTranscript = () => {
    if (transcript.trim() && !isProcessing) {
      onSendMessage(transcript);
      setInputValue('');
    }
  };

  // Clear input value when transcript is processed
  useEffect(() => {
    if (isProcessing && transcript) {
      setInputValue('');
    }
  }, [isProcessing, transcript]);

  // Auto-send transcript when stopping listening if there's content
  useEffect(() => {
    if (!isListening && transcript && !isProcessing) {
      const timer = setTimeout(() => {
        handleSendVoiceTranscript();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isListening, transcript, isProcessing]);

  return (
    <div className="border-t p-3 bg-gradient-to-r from-background/80 to-background">
      <ChatTranscript 
        transcript={displayTranscript} 
        isVisible={isListening || interimTranscript.length > 0 || transcript.length > 0}
        isListening={isListening} 
      />
      
      <div className="flex items-center gap-2">
        <MessageInput 
          onSendMessage={handleSendMessage} 
          isTyping={isTyping}
          disabled={isProcessing}
          value={inputValue}
          onChange={handleInputChange}
        />
        
        <Button
          variant={isListening ? "destructive" : "default"}
          size="icon"
          className={`h-10 w-10 rounded-full flex-shrink-0 transition-all duration-300 ${isListening ? 'shadow-md shadow-red-400/30 ring-1 ring-red-400' : 'shadow-md shadow-primary/20 bg-gradient-to-r from-blue-600 to-indigo-600'}`}
          onClick={toggleListening}
          disabled={isProcessing}
          title={isListening ? "Stop Listening" : "Start Talking"}
        >
          {isProcessing ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Mic className={`h-5 w-5 ${isListening ? 'animate-pulse' : ''}`} />
          )}
        </Button>
        
        {inputValue.trim() && (
          <Button
            variant="default"
            size="icon"
            className="h-10 w-10 rounded-full flex-shrink-0 bg-gradient-to-r from-blue-600 to-indigo-600"
            onClick={() => handleSendMessage(inputValue)}
            disabled={isTyping || !inputValue.trim()}
          >
            <Send className="h-5 w-5" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default ChatControls;
