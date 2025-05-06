
import React from 'react';
import { Mic, Volume } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VoiceIndicatorProps {
  isListening: boolean;
  isSpeaking: boolean;
  toggleListening?: () => void;
}

const VoiceIndicator: React.FC<VoiceIndicatorProps> = ({
  isListening,
  isSpeaking,
  toggleListening
}) => {
  if (!isListening && !isSpeaking) return null;
  
  return (
    <div className={`
      flex items-center justify-between 
      px-3 py-1.5 
      ${isListening ? 'bg-red-600/20' : 'bg-blue-600/20'}
      border-b border-gray-700
    `}>
      <div className="flex items-center">
        {isListening ? (
          <>
            <Mic className="h-4 w-4 text-red-500 mr-2 animate-pulse" />
            <span className="text-xs font-medium text-red-300">Listening...</span>
          </>
        ) : isSpeaking ? (
          <>
            <Volume className="h-4 w-4 text-blue-500 mr-2 animate-pulse" />
            <span className="text-xs font-medium text-blue-300">Speaking...</span>
          </>
        ) : null}
      </div>
      
      {isListening && toggleListening && (
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-6 px-2 py-0 text-xs text-red-300 hover:bg-red-900/30 hover:text-red-200"
          onClick={toggleListening}
        >
          Stop
        </Button>
      )}
    </div>
  );
};

export default VoiceIndicator;
