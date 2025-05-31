
import React, { useRef, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ChatButton from './ChatButton';
import ChatWindow from './ChatWindow';
import { useOpenAIChat } from './hooks/useOpenAIChat';
import { toast } from 'sonner';

const VernonNext: React.FC = () => {
  const mediaRecorderRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  
  const {
    state,
    sendMessage,
    startListening,
    stopListening,
    speakText,
    toggleChat,
    toggleMinimize
  } = useOpenAIChat();

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current && state.isOpen) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [state.messages, state.isOpen]);

  // Handle listening toggle
  const handleToggleListening = async () => {
    if (state.isListening) {
      stopListening(mediaRecorderRef.current);
    } else {
      try {
        mediaRecorderRef.current = await startListening();
        if (!mediaRecorderRef.current) {
          toast.error('Could not access microphone. Please check permissions.');
        }
      } catch (error) {
        console.error('Error with speech recognition:', error);
        toast.error('There was an error with speech recognition');
      }
    }
  };

  // Handle sending a message
  const handleSendMessage = async (text: string) => {
    if (!text.trim() || state.isLoading) return;
    await sendMessage(text);
  };

  // Handle speaking a message
  const handleSpeakMessage = async (text: string) => {
    if (state.isSpeaking) return;
    await speakText(text);
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          >
            <ChatButton onClick={() => setIsOpen(true)} />
          </motion.div>
        ) : (
          <motion.div
            className="fixed bottom-6 left-6 z-50"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          >
            <ChatWindow
              state={state}
              onSendMessage={handleSendMessage}
              onClose={() => setIsOpen(false)}
              onMinimize={toggleMinimize}
              onToggleListening={handleToggleListening}
              onSpeak={handleSpeakMessage}
              messagesEndRef={messagesEndRef}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default VernonNext;
