
import React from 'react';

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
  if (!isVisible || !transcript) {
    return null;
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-2 mb-3 text-gray-800 dark:text-gray-200">
      <div className="flex items-center mb-1">
        <div className={`h-2 w-2 rounded-full ${isListening ? 'bg-red-500 animate-pulse' : 'bg-gray-400'} mr-2`}></div>
        <span className="text-xs font-medium">
          {isListening ? 'Listening...' : 'Transcript:'}
        </span>
      </div>
      <p className="text-sm">{transcript}</p>
    </div>
  );
};

export default ChatTranscript;
