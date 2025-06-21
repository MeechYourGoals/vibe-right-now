
import React, { useEffect } from "react";
import ChatWindow from "./ChatWindow";
import ChatButton from "./ChatButton";
import { useEnhancedVernonChat } from "./hooks/useEnhancedVernonChat";

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
    audioLevel,
    initializeWelcomeMessage,
  } = useEnhancedVernonChat();

  // Initialize welcome message on mount
  useEffect(() => {
    console.log('Vernon Chat initialized on web');
    initializeWelcomeMessage();
  }, [initializeWelcomeMessage]);

  // Add web-specific initialization for speech features
  useEffect(() => {
    // Check for web speech API support and log capabilities
    const checkWebSpeechAPI = () => {
      console.log('Checking Web Speech API support...');
      console.log('SpeechRecognition supported:', !!(window.SpeechRecognition || (window as any).webkitSpeechRecognition));
      console.log('SpeechSynthesis supported:', !!window.speechSynthesis);
      
      if (window.speechSynthesis) {
        // Load voices for web
        const loadVoices = () => {
          const voices = window.speechSynthesis.getVoices();
          console.log('Available speech synthesis voices:', voices.length);
        };
        
        // Chrome loads voices asynchronously
        if (window.speechSynthesis.getVoices().length === 0) {
          window.speechSynthesis.onvoiceschanged = loadVoices;
        } else {
          loadVoices();
        }
      }
    };
    
    checkWebSpeechAPI();
  }, []);

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
          stopSpeaking={stopSpeaking}
          isSpeaking={isSpeaking}
          audioLevel={audioLevel}
          isModelLoading={false}
          transcript={transcript}
        />
      ) : (
        <ChatButton onClick={toggleChat} />
      )}
    </>
  );
};

export default VernonChat;
