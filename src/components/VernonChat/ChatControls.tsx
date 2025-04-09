
import React, { useState } from 'react';
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
      toggleListening(); // This will stop listening
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
