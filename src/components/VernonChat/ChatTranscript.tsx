
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ChatTranscriptProps {
  transcript: string;
  isVisible: boolean;
  isListening: boolean;
}

const ChatTranscript: React.FC<ChatTranscriptProps> = ({ 
  transcript, 
  isVisible,
  isListening
}) => {
  if (!isVisible) return null;
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ opacity: 0, y: 20, height: 0 }}
          animate={{ opacity: 1, y: 0, height: 'auto' }}
          exit={{ opacity: 0, y: 20, height: 0 }}
          transition={{ duration: 0.2 }}
          className="mb-3"
        >
          <div className={`px-4 py-3 rounded-lg text-sm ${
            isListening 
              ? 'bg-red-500/5 border border-red-500/20 dark:bg-red-900/10' 
              : 'bg-blue-500/5 border border-blue-500/20 dark:bg-blue-900/10'
          }`}>
            <div className={`font-medium mb-1 text-xs ${
              isListening ? 'text-red-500 dark:text-red-400' : 'text-blue-500 dark:text-blue-400'
            }`}>
              {isListening ? 'Listening...' : 'Transcript'}
            </div>
            <p className="text-foreground/80">
              {transcript || (isListening ? 'Waiting for speech...' : '')}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ChatTranscript;
