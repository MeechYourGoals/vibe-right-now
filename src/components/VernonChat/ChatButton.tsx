
import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';

interface ChatButtonProps {
  onClick: () => void;
}

const ChatButton: React.FC<ChatButtonProps> = ({ onClick }) => {
  return (
    <Button 
      className="fixed left-6 bottom-6 h-12 w-12 rounded-full bg-amber-500 hover:bg-amber-600 text-white shadow-lg animate-pulse-slow"
      onClick={onClick}
    >
      <MessageSquare />
    </Button>
  );
};

export default ChatButton;
