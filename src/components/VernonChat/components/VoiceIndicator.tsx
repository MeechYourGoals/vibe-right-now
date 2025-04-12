
import React from 'react';
import { Mic, MicOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
  return (
    <div className="absolute left-3 top-3 z-10">
      <div className="flex items-center gap-1.5">
        <Button
          variant="ghost"
          size="icon"
          className={`h-7 w-7 rounded-full ${isListening ? 'bg-red-100 hover:bg-red-200' : isSpeaking ? 'bg-blue-100 hover:bg-blue-200' : 'bg-transparent'}`}
          onClick={toggleListening}
          title={isListening ? "Stop Listening" : "Start Voice Input"}
        >
          {isListening ? (
            <MicOff className="h-3.5 w-3.5 text-red-600" />
          ) : (
            <Mic className={`h-3.5 w-3.5 ${isSpeaking ? 'text-blue-600' : 'text-muted-foreground'}`} />
          )}
        </Button>
        {(isListening || isSpeaking) && (
          <span className="text-xs font-medium">
            {isListening ? 'Listening...' : isSpeaking ? 'Speaking...' : ''}
          </span>
        )}
      </div>
    </div>
  );
};

export default VoiceIndicator;
