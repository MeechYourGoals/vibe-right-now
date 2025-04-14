
import React, { useState, useEffect, useRef } from 'react';
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
  const micButtonRef = useRef<HTMLButtonElement>(null);
  const [isPushToTalkActive, setIsPushToTalkActive] = useState(false);

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
      toggleListening(); // This will stop listening
    }
  };

  // Setup push-to-talk handlers
  useEffect(() => {
    const startPushToTalk = (e: MouseEvent) => {
      if (!isPushToTalkActive && !isProcessing) {
        setIsPushToTalkActive(true);
        toggleListening(); // Start listening
      }
    };

    const stopPushToTalk = (e: MouseEvent) => {
      if (isPushToTalkActive && !isProcessing) {
        setIsPushToTalkActive(false);
        toggleListening(); // Stop listening and process
      }
    };

    // Add event listeners for push-to-talk
    const micButton = micButtonRef.current;
    if (micButton) {
      micButton.addEventListener('mousedown', startPushToTalk);
      micButton.addEventListener('mouseup', stopPushToTalk);
      micButton.addEventListener('mouseleave', stopPushToTalk);
      
      // Touch events for mobile
      micButton.addEventListener('touchstart', startPushToTalk);
      micButton.addEventListener('touchend', stopPushToTalk);
    }

    return () => {
      // Clean up event listeners
      if (micButton) {
        micButton.removeEventListener('mousedown', startPushToTalk);
        micButton.removeEventListener('mouseup', stopPushToTalk);
        micButton.removeEventListener('mouseleave', stopPushToTalk);
        micButton.removeEventListener('touchstart', startPushToTalk);
        micButton.removeEventListener('touchend', stopPushToTalk);
      }
    };
  }, [isPushToTalkActive, isProcessing, toggleListening]);

  // Clear input value when transcript is processed
  useEffect(() => {
    if (isProcessing && transcript) {
      setInputValue('');
    }
  }, [isProcessing, transcript]);

  return (
    <div className="border-t p-3">
      <ChatTranscript 
        transcript={displayTranscript} 
        isVisible={isListening || interimTranscript.length > 0}
        isListening={isListening} 
      />
      
      <div className="flex items-center">
        <Button
          ref={micButtonRef}
          variant={isListening ? "destructive" : "outline"}
          size="icon"
          className="mr-2 h-9 w-9 rounded-full select-none"
          disabled={isProcessing}
          title={isListening ? "Release to stop listening" : "Push and hold to talk"}
          type="button"
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
          disabled={isProcessing}
          value={inputValue}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default ChatControls;
