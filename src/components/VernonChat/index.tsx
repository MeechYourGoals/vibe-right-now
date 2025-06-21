
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
    voiceModel,
    setVoiceModel,
    volume,
    setVolume,
    speed,
    setSpeed,
    transcript,
    isSpeaking,
    audioLevel,
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
          isSpeaking={isSpeaking}
          audioLevel={audioLevel}
          isModelLoading={false}
          transcript={transcript}
          voiceModel={voiceModel}
          setVoiceModel={setVoiceModel}
          volume={volume}
          setVolume={setVolume}
          speed={speed}
          setSpeed={setSpeed}
        />
      ) : (
        <ChatButton onClick={toggleChat} />
      )}
    </>
  );
};

export default VernonChat;
