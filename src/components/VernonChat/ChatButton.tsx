
import React from 'react';
import { MessageSquare } from 'lucide-react';
import { ChatButtonProps } from './types';

const ChatButton: React.FC<ChatButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="chatButton fixed right-6 bottom-6 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg flex items-center justify-center hover:bg-primary/90 transition-colors"
      aria-label="Open chat"
    >
      <MessageSquare size={24} />
    </button>
  );
};

export default ChatButton;
