
import React, { useState, FormEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  isTyping: boolean;
  disabled?: boolean;
  value?: string;
  onChange?: (value: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ 
  onSendMessage, 
  isTyping,
  disabled = false,
  value = '',
  onChange
}) => {
  const [internalValue, setInternalValue] = useState('');
  
  // Use either controlled or uncontrolled pattern based on props
  const inputValue = onChange ? value : internalValue;
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value);
    } else {
      setInternalValue(e.target.value);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !isTyping && !disabled) {
      onSendMessage(inputValue);
      if (!onChange) {
        setInternalValue('');
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Allow sending message with Enter key
    if (e.key === 'Enter' && !e.shiftKey && inputValue.trim() && !isTyping && !disabled) {
      e.preventDefault();
      onSendMessage(inputValue);
      if (!onChange) {
        setInternalValue('');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex-1 flex">
      <Input
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Ask Vernon anything..."
        className="flex-1 mr-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
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
