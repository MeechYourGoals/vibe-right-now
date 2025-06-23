import { useState, useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { useMessageProcessor } from "./useMessageProcessor";
import { useOptimizedSpeechRecognition } from "./speechRecognition/useOptimizedSpeechRecognition";
import { useOptimizedSpeechSynthesis } from "./speechSynthesis/useOptimizedSpeechSynthesis";
import { Message, MessageDirection, ChatMode } from "../types";

export const useEnhancedVernonChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useLocalStorage<Message[]>(
    "vernon_messages",
    [],
  );
  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [chatMode, setChatMode] = useLocalStorage<ChatMode>(
    "vernon_chat_mode",
    "user",
  );
  const { processMessage } = useMessageProcessor();

  // Use optimized speech hooks
  const {
    speak,
    stop: stopSpeaking,
    isSpeaking,
  } = useOptimizedSpeechSynthesis();
  const {
    isListening,
    transcript,
    interimTranscript,
    toggleListening,
    clearTranscript,
    audioLevel,
  } = useOptimizedSpeechRecognition({
    continuous: true,
    interimResults: true,
    onStartListening: stopSpeaking,
  });

  const addMessage = useCallback(
    (content: string, direction: MessageDirection, aiResponse = false) => {
      const timestamp = new Date();

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: `msg-${Date.now()}`,
          content,
          direction,
          timestamp,
          aiResponse,
          text: content,
          sender: direction === "outgoing" ? "user" : "ai",
        },
      ]);
    },
    [setMessages],
  );

  const handleSendMessage = useCallback(
    async (text: string) => {
      if (!text.trim()) return;

      stopSpeaking();
      clearTranscript();

      setInput("");
      addMessage(text, "outgoing");
      setIsProcessing(true);

      try {
        const response = await processMessage(text, messages, chatMode);
        addMessage(response, "incoming", true);

        // Auto-speak response if listening mode is active
        if (isListening) {
          await speak(response);
        }
      } catch (error) {
        console.error("Error processing message:", error);
        const errorMsg =
          "Sorry, I encountered an error. Please try again later.";
        addMessage(errorMsg, "incoming");
        if (isListening) {
          await speak(errorMsg);
        }
      } finally {
        setIsProcessing(false);
      }
    },
    [
      addMessage,
      messages,
      processMessage,
      chatMode,
      speak,
      stopSpeaking,
      clearTranscript,
      isListening,
    ],
  );

  // Handle transcript completion (when user stops speaking)
  const onTranscriptComplete = useCallback(
    (finalTranscript: string) => {
      if (finalTranscript.trim()) {
        handleSendMessage(finalTranscript);
      }
    },
    [handleSendMessage],
  );

  // Handle transcript updates
  const handleTranscriptUpdate = useCallback(() => {
    if (transcript && !isListening) {
      // User has stopped speaking, process the transcript
      onTranscriptComplete(transcript);
    }
  }, [transcript, isListening, onTranscriptComplete]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const toggleMode = useCallback(() => {
    setChatMode((prev) => (prev === "user" ? "venue" : "user"));
  }, [setChatMode]);

  const clearMessages = useCallback(() => {
    setMessages([]);
    stopSpeaking();
  }, [setMessages, stopSpeaking]);

  const initializeWelcomeMessage = useCallback(() => {
    if (messages.length === 0) {
      const timestamp = new Date();
      const welcomeMsg =
        "Hello! I'm Vernon, your AI assistant powered by Perplexity. How can I help you discover venues and events today?";

      setMessages([
        {
          id: "welcome",
          content: welcomeMsg,
          direction: "incoming",
          timestamp,
          aiResponse: true,
          text: welcomeMsg,
          sender: "ai",
        },
      ]);
    }
  }, [messages.length, setMessages]);

  return {
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
    transcript: interimTranscript || transcript,
    audioLevel,
    isSpeaking,
    stopSpeaking,
    initializeWelcomeMessage,
    handleTranscriptUpdate,
  };
};
