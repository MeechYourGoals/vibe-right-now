import React, { useState, useCallback } from 'react';
import { Mic, MicOff, Send } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface ChatControlsProps {
  isListening: boolean;
  isProcessing: boolean;
  transcript: string;
  interimTranscript: string;
  startListening: () => void;
  stopListening: () => void;
  toggleListening: () => void;
  onSendMessage: (message: string) => void;
  isTyping: boolean;
  handlePushToTalkStart?: () => void;
  handlePushToTalkEnd?: () => void;
}

const ChatControls: React.FC<ChatControlsProps> = ({
  isListening,
  isProcessing,
  transcript,
  interimTranscript,
  startListening,
  stopListening,
  toggleListening,
  onSendMessage,
  isTyping,
  handlePushToTalkStart,
  handlePushToTalkEnd
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (inputValue.trim()) {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };

  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      if (inputValue.trim()) {
        onSendMessage(inputValue);
        setInputValue('');
      }
    }
  }, [inputValue, onSendMessage]);
  
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col border-t p-3 bg-muted"
    >
      {(isListening || isProcessing || transcript || interimTranscript) && (
        <div className="flex items-center mb-2 p-2 rounded bg-card border border-border text-sm text-foreground">
          <Mic className={`h-4 w-4 mr-2 ${isListening ? 'text-red-500' : 'text-muted-foreground'}`} />
          <p>
            {isListening 
              ? interimTranscript || "Listening..." 
              : isProcessing 
                ? "Processing..." 
                : transcript}
          </p>
        </div>
      )}
      
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant={isListening ? "destructive" : "outline"}
          size="icon"
          className={`h-10 w-10 rounded-full flex-shrink-0 ${
            isListening ? "bg-red-500 text-white" : "bg-background text-foreground border-input"
          }`}
          onClick={toggleListening}
          onTouchStart={handlePushToTalkStart}
          onTouchEnd={handlePushToTalkEnd}
          onMouseDown={handlePushToTalkStart}
          onMouseUp={handlePushToTalkEnd}
          onMouseLeave={handlePushToTalkEnd}
          disabled={isTyping}
        >
          {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
        </Button>
        
        <div className="relative flex-1">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Message Vernon..."
            className="pr-10 border-input bg-background text-foreground"
            disabled={isTyping || isListening}
          />
          {inputValue.trim() && (
            <Button
              type="submit"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full"
              disabled={isTyping || !inputValue.trim()}
            >
              <Send className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>
    </form>
  );
};

export default ChatControls;
