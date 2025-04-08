
import React from 'react';

interface ChatTranscriptProps {
  transcript: string;
  isVisible: boolean;
}

const ChatTranscript: React.FC<ChatTranscriptProps> = ({ transcript, isVisible }) => {
  if (!isVisible || !transcript) return null;
  
  return (
    <div className="mb-2 text-sm italic text-muted-foreground">
      {transcript}
    </div>
  );
};

export default ChatTranscript;
