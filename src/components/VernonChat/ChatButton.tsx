
import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';

interface ChatButtonProps {
  onClick: () => void;
}

const ChatButton: React.FC<ChatButtonProps> = ({ onClick }) => {
  return (
    <Button 
      onClick={onClick}
      className="fixed left-6 bottom-6 w-12 h-12 rounded-full shadow-lg bg-amber-500 hover:bg-amber-600 text-white flex items-center justify-center p-0 z-10"
    >
      <MessageSquare className="h-5 w-5" />
    </Button>
  );
};

export default ChatButton;
