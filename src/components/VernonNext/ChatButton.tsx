
import React from 'react';
import { Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChatButtonProps {
  onClick: () => void;
}

const ChatButton: React.FC<ChatButtonProps> = ({ onClick }) => {
  return (
    <Button
      onClick={onClick}
      className="fixed left-6 bottom-6 w-16 h-16 rounded-full shadow-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center p-0 z-50 hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
      aria-label="Open Vernon Chat"
    >
      <div className="absolute inset-0 rounded-full bg-blue-500 opacity-0 group-hover:opacity-20 transition-opacity" />
      <Bot className="h-7 w-7" />
      <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
    </Button>
  );
};

export default ChatButton;
