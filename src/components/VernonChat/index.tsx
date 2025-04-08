
import { useState } from 'react';
import ChatButton from './ChatButton';
import ChatWindow from './ChatWindow';
import { useChat } from './hooks/useChat';

const VernonChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  
  const {
    messages,
    isTyping,
    isSearching,
    handleSendMessage
  } = useChat();
  
  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };
  
  const closeChat = () => {
    setIsOpen(false);
  };
  
  if (!isOpen) {
    return <ChatButton onClick={() => setIsOpen(true)} />;
  }
  
  return (
    <div 
      className={`fixed left-6 bottom-6 bg-card border rounded-lg shadow-lg transition-all duration-200 z-40
      ${isMinimized ? 'w-64 h-12' : 'w-80 h-96'}`}
    >
      <ChatWindow
        isOpen={isOpen}
        isMinimized={isMinimized}
        toggleMinimize={toggleMinimize}
        closeChat={closeChat}
        messages={messages}
        isTyping={isTyping}
        isSearching={isSearching}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
};

export default VernonChat;
