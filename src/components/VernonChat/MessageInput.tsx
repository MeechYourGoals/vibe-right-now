
import React, { useState, FormEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  isTyping: boolean;
  disabled?: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({ 
  onSendMessage, 
  isTyping,
  disabled = false
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !isTyping) {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex-1 flex">
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Ask Vernon anything..."
        className="flex-1 mr-2"
        disabled={isTyping || disabled}
      />
      <Button 
        type="submit" 
        size="icon" 
        disabled={!inputValue.trim() || isTyping || disabled}
      >
        <Send className="h-4 w-4" />
      </Button>
    </form>
  );
};

export default MessageInput;
