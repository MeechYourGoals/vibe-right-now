
import { useState } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import ChatHeader from './ChatHeader';
import ChatButton from './ChatButton';
import { useApiKey } from './hooks/useApiKey';
import { useChat } from './hooks/useChat';

const VernonChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  
  const {
    apiKey,
    isApiKeyPopoverOpen,
    setIsApiKeyPopoverOpen,
    apiKeyInput,
    setApiKeyInput,
    saveApiKey
  } = useApiKey();
  
  const {
    messages,
    isTyping,
    isSearching,
    handleSendMessage
  } = useChat();
  
  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };
  
  if (!isOpen) {
    return <ChatButton onClick={() => setIsOpen(true)} />;
  }
  
  return (
    <div 
      className={`fixed left-6 bottom-6 bg-card border rounded-lg shadow-lg transition-all duration-200 z-40
      ${isMinimized ? 'w-64 h-12' : 'w-80 h-96'}`}
    >
      <ChatHeader 
        isMinimized={isMinimized}
        toggleMinimize={toggleMinimize}
        closeChat={() => setIsOpen(false)}
        isApiKeyPopoverOpen={isApiKeyPopoverOpen}
        setIsApiKeyPopoverOpen={setIsApiKeyPopoverOpen}
        apiKeyInput={apiKeyInput}
        setApiKeyInput={setApiKeyInput}
        saveApiKey={saveApiKey}
      />
      
      {!isMinimized && (
        <>
          <MessageList 
            messages={messages} 
            isTyping={isTyping} 
            isSearching={isSearching} 
          />
          
          <MessageInput 
            onSendMessage={handleSendMessage} 
            isTyping={isTyping} 
          />
        </>
      )}
    </div>
  );
};

export default VernonChat;
