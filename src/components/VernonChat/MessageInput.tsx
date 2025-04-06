
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  isTyping: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage, isTyping }) => {
  const [inputValue, setInputValue] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    onSendMessage(inputValue);
    setInputValue('');
  };
  
  return (
    <form 
      onSubmit={handleSubmit}
      className="border-t p-3 flex items-center"
    >
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Ask me anything..."
        className="flex-1 mr-2"
      />
      <Button 
        type="submit" 
        size="icon" 
        disabled={!inputValue.trim() || isTyping}
        className="bg-amber-500 hover:bg-amber-600 text-white"
      >
        <Send className="h-4 w-4" />
      </Button>
    </form>
  );
};

export default MessageInput;
