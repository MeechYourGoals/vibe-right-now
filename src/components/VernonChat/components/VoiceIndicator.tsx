
import React from 'react';
import { Mic, VolumeX } from 'lucide-react';

interface VoiceIndicatorProps {
  isListening: boolean;
  isSpeaking: boolean;
  toggleListening: () => void;
}

const VoiceIndicator: React.FC<VoiceIndicatorProps> = ({
  isListening,
  isSpeaking,
  toggleListening
}) => {
  if (!isListening && !isSpeaking) return null;
  
  return (
    <div 
      className={`absolute top-14 left-1/2 transform -translate-x-1/2 z-20 px-3 py-1 rounded-full flex items-center gap-2 text-xs font-medium transition-all duration-300 ${
        isListening 
          ? 'bg-red-500/10 text-red-500 border border-red-500/20' 
          : 'bg-blue-500/10 text-blue-500 border border-blue-500/20'
      }`}
    >
      {isListening ? (
        <>
          <Mic className="h-3 w-3 animate-pulse" />
          Listening...
        </>
      ) : isSpeaking ? (
        <>
          <div className="h-3 w-3 relative">
            <div className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-75"></div>
            <div className="relative rounded-full h-full w-full bg-blue-500"></div>
          </div>
          Speaking...
        </>
      ) : (
        <>
          <VolumeX className="h-3 w-3" />
          Muted
        </>
      )}
    </div>
  );
};

export default VoiceIndicator;
