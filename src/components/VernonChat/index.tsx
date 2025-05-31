
import React, { useState } from 'react';
import ChatButton from './ChatButton';
import GeminiChatWindow from './GeminiChatWindow';

const VernonChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {isOpen ? (
        <GeminiChatWindow onClose={() => setIsOpen(false)} />
      ) : (
        <ChatButton onClick={toggleChat} />
      )}
    </>
  );
};

export default VernonChat;
