import { useEffect } from "react";
import { Message } from "../../types";

// Extending the Message type with the spoken property
interface MessageWithSpoken extends Message {
  spoken?: boolean;
}

type UseVoiceEffectsProps = {
  messages: MessageWithSpoken[];
  isTyping: boolean;
  isSpeaking: boolean;
  isListening: boolean;
  isProcessing: boolean;
  setIsProcessing: (isProcessing: boolean) => void;
  isFirstInteraction: boolean;
  introMessageSpoken: boolean;
  setIntroMessageSpoken: (spoken: boolean) => void;
  speakIntroOnce: (introMessage: string) => Promise<boolean>;
  markIntroAsSpoken: () => void;
  speakResponse: (text: string) => Promise<void>;
  stopSpeaking: () => void;
  stopListening: () => void;
  processTranscript: () => void;
  onSendMessage: (message: string) => void;
  isOpen: boolean;
};

export const useVoiceEffects = ({
  messages,
  isTyping,
  isSpeaking,
  isListening,
  isProcessing,
  setIsProcessing,
  isFirstInteraction,
  introMessageSpoken,
  setIntroMessageSpoken,
  speakIntroOnce,
  markIntroAsSpoken,
  speakResponse,
  stopSpeaking,
  stopListening,
  processTranscript,
  onSendMessage,
  isOpen,
}: UseVoiceEffectsProps) => {
  // Speak intro message when chat is first opened
  useEffect(() => {
    const speakIntro = async () => {
      if (
        isOpen &&
        isFirstInteraction &&
        !introMessageSpoken &&
        messages.length > 0
      ) {
        const messageText = messages[0].content || messages[0].text || "";
        console.log("Attempting to speak intro message:", messageText);
        try {
          const success = await speakIntroOnce(messageText);
          if (success) {
            setIntroMessageSpoken(true);
            markIntroAsSpoken();
          }
        } catch (error) {
          console.error("Error speaking intro:", error);
        }
      }
    };

    speakIntro();
  }, [
    isOpen,
    isFirstInteraction,
    introMessageSpoken,
    messages,
    speakIntroOnce,
    setIntroMessageSpoken,
    markIntroAsSpoken,
  ]);

  // Speak new AI messages
  useEffect(() => {
    const speakLastMessage = async () => {
      // Skip if intro hasn't been spoken yet to avoid conflict
      if (!introMessageSpoken) return;

      // Only speak if messages exist, not typing, not processing, and not already speaking
      if (messages.length > 0 && !isTyping && !isProcessing && !isSpeaking) {
        const lastMessage = messages[messages.length - 1] as MessageWithSpoken;
        const isAiMessage =
          lastMessage.direction === "incoming" || lastMessage.sender === "ai";

        // Only speak AI messages, not user ones
        if (isAiMessage && !lastMessage.spoken) {
          console.log("Speaking last AI message");

          // Mark this message as spoken to avoid repeating
          const updatedMessages = [...messages];
          (updatedMessages[updatedMessages.length - 1] as MessageWithSpoken) = {
            ...lastMessage,
            spoken: true,
          };

          try {
            const messageText = lastMessage.content || lastMessage.text || "";
            await speakResponse(messageText);
          } catch (error) {
            console.error("Error speaking message:", error);
          }
        }
      }
    };

    speakLastMessage();
  }, [
    messages,
    isTyping,
    isProcessing,
    isSpeaking,
    introMessageSpoken,
    speakResponse,
  ]);

  // Process transcript when listening stops
  useEffect(() => {
    if (!isListening && isProcessing) {
      console.log("Processing transcript after listening stopped");
      stopSpeaking();
      processTranscript();
      setIsProcessing(false);
    }
  }, [
    isListening,
    isProcessing,
    processTranscript,
    setIsProcessing,
    stopSpeaking,
  ]);

  // Clear up when component unmounts
  useEffect(() => {
    return () => {
      stopSpeaking();
      stopListening();
    };
  }, [stopSpeaking, stopListening]);
};
