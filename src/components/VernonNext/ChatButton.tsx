
import React from 'react';
import { Bot } from 'lucide-react';
import SmartChatButton from '../mobile/SmartChatButton';

interface ChatButtonProps {
  onClick: () => void;
}

const ChatButton: React.FC<ChatButtonProps> = ({ onClick }) => {
  return <SmartChatButton onClick={onClick} />;
};

export default ChatButton;
