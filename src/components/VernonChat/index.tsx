
import React, { useEffect } from 'react';
import ChatWindow from './ChatWindow';
import ChatButton from './ChatButton';
import { useEnhancedVernonChat } from './hooks/useEnhancedVernonChat';

const VernonChat: React.FC = () => {
  const {
    isOpen,
    toggleChat,
    messages,
    input,
    setInput,
    handleSendMessage,
    isProcessing,
    chatMode,
    toggleMode,
    clearMessages,
    isListening,
    toggleListening,
    transcript,
    isSpeaking,
    stopSpeaking,
    promptForDeepgramKey,
    initializeWelcomeMessage
  } = useEnhancedVernonChat();

  // Initialize welcome message
  useEffect(() => {
    initializeWelcomeMessage();
  }, [initializeWelcomeMessage]);

  return (
    <>
      {isOpen ? (
        <ChatWindow
          messages={messages}
          input={input}
          setInput={setInput}
          onSendMessage={handleSendMessage}
          onClose={toggleChat}
          isProcessing={isProcessing}
          chatMode={chatMode}
          toggleMode={toggleMode}
          clearMessages={clearMessages}
          isListening={isListening}
          toggleListening={toggleListening}
          isModelLoading={false}
          transcript={transcript}
          isSpeaking={isSpeaking}
          stopSpeaking={stopSpeaking}
          promptForDeepgramKey={promptForDeepgramKey}
        />
      ) : (
        <ChatButton onClick={toggleChat} />
      )}
    </>
  );
};

export default VernonChat;
