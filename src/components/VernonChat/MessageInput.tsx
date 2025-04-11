
import React, { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  isTyping: boolean;
  disabled?: boolean;
  value: string;
  onChange: (value: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({
  onSendMessage,
  isTyping,
  disabled = false,
  value,
  onChange
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim() && !isTyping && !disabled) {
      onSendMessage(value);
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  // Auto focus the input when it becomes available
  useEffect(() => {
    if (inputRef.current && !disabled) {
      inputRef.current.focus();
    }
  }, [disabled]);

  return (
    <form onSubmit={handleSubmit} className="flex-1">
      <Input
        ref={inputRef}
        className="w-full h-10 bg-card/70 backdrop-blur-sm border-blue-200 dark:border-blue-800 focus-visible:ring-blue-500"
        placeholder={disabled ? "Processing..." : "Ask Vernon about places, events..."}
        value={value}
        onChange={handleChange}
        disabled={disabled}
      />
    </form>
  );
};

export default MessageInput;
