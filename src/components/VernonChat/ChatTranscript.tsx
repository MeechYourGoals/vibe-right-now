
import React from 'react';

interface ChatTranscriptProps {
  transcript: string;
  isVisible: boolean;
  isListening?: boolean;
}

const ChatTranscript: React.FC<ChatTranscriptProps> = ({ 
  transcript, 
  isVisible,
  isListening = false
}) => {
  if (!isVisible) return null;

  return (
    <div className="mb-2 px-2 py-1.5 rounded-md bg-muted/50 text-sm max-h-20 overflow-y-auto">
      <div className="flex items-center gap-1.5 mb-1">
        <div className={`w-2 h-2 rounded-full ${isListening ? 'bg-red-500 animate-pulse' : 'bg-gray-400'}`} />
        <span className="text-xs font-medium text-muted-foreground">
          {isListening ? 'Listening...' : 'Transcript:'}
        </span>
      </div>
      <p className="text-sm">
        {transcript || (isListening ? 'Speak now...' : 'No speech detected')}
      </p>
    </div>
  );
};

export default ChatTranscript;
