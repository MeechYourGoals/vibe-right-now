
import React from 'react';
import { Sparkles } from 'lucide-react';
import { ChatButtonProps } from './types';

const ChatButton: React.FC<ChatButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="chatButton fixed right-6 bottom-6 w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full shadow-2xl flex items-center justify-center hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 group"
      aria-label="Open Vernon AI Chat"
    >
      <Sparkles size={28} className="group-hover:rotate-12 transition-transform duration-300" />
      <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
    </button>
  );
};

export default ChatButton;
