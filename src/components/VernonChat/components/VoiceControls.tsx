
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Pause, 
  Play, 
  Square,
  Settings 
} from 'lucide-react';

interface VoiceControlsProps {
  // Speech Recognition
  isListening: boolean;
  toggleListening: () => void;
  transcript: string;
  hasBrowserSupport: boolean;
  
  // Speech Synthesis
  isSpeaking: boolean;
  isPaused: boolean;
  currentText: string;
  stopSpeaking: () => void;
  togglePause: () => void;
  speechMethod: 'browser' | 'elevenlabs';
  hasElevenLabsKey: boolean;
  setSpeechMethod: (method: 'browser' | 'elevenlabs') => void;
}

const VoiceControls: React.FC<VoiceControlsProps> = ({
  isListening,
  toggleListening,
  transcript,
  hasBrowserSupport,
  isSpeaking,
  isPaused,
  currentText,
  stopSpeaking,
  togglePause,
  speechMethod,
  hasElevenLabsKey,
  setSpeechMethod
}) => {
  return (
    <TooltipProvider>
      <div className="flex items-center gap-2 p-2 bg-muted/20 rounded-lg border">
        {/* Speech Recognition Controls */}
        <div className="flex items-center gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={isListening ? "destructive" : "outline"}
                size="sm"
                onClick={toggleListening}
                disabled={!hasBrowserSupport}
                className={isListening ? "animate-pulse" : ""}
              >
                {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {isListening ? 'Stop listening' : 'Start voice input'}
            </TooltipContent>
          </Tooltip>
          
          {isListening && (
            <Badge variant="destructive" className="text-xs px-2">
              Listening...
            </Badge>
          )}
        </div>

        {/* Speech Synthesis Controls */}
        <div className="flex items-center gap-1">
          {isSpeaking && (
            <>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={togglePause}
                  >
                    {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  {isPaused ? 'Resume speech' : 'Pause speech'}
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={stopSpeaking}
                  >
                    <Square className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Stop speech</TooltipContent>
              </Tooltip>

              <Badge variant="outline" className="text-xs px-2">
                {isPaused ? 'Paused' : 'Speaking'}
              </Badge>
            </>
          )}
        </div>

        {/* Voice Method Indicator */}
        <div className="flex items-center gap-1 ml-auto">
          <Tooltip>
            <TooltipTrigger asChild>
              <Badge 
                variant={speechMethod === 'elevenlabs' ? 'default' : 'outline'}
                className="text-xs cursor-pointer"
                onClick={() => setSpeechMethod(speechMethod === 'elevenlabs' ? 'browser' : 'elevenlabs')}
              >
                {speechMethod === 'elevenlabs' ? (
                  <>
                    <Volume2 className="h-3 w-3 mr-1" />
                    ElevenLabs
                  </>
                ) : (
                  <>
                    <VolumeX className="h-3 w-3 mr-1" />
                    Browser
                  </>
                )}
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              {speechMethod === 'elevenlabs' 
                ? 'Using ElevenLabs voice (click to switch)' 
                : 'Using browser voice (click to switch)'}
            </TooltipContent>
          </Tooltip>

          {!hasElevenLabsKey && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge variant="destructive" className="text-xs">
                  <Settings className="h-3 w-3 mr-1" />
                  No API Key
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                ElevenLabs API key required for premium voices
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      </div>

      {/* Transcript Preview */}
      {transcript && (
        <div className="mt-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-md border border-blue-200 dark:border-blue-800">
          <p className="text-xs font-medium text-blue-700 dark:text-blue-300 mb-1">
            Voice Input:
          </p>
          <p className="text-sm text-blue-600 dark:text-blue-200">
            {transcript}
          </p>
        </div>
      )}

      {/* Current Speech Preview */}
      {isSpeaking && currentText && (
        <div className="mt-2 p-2 bg-green-50 dark:bg-green-900/20 rounded-md border border-green-200 dark:border-green-800">
          <p className="text-xs font-medium text-green-700 dark:text-green-300 mb-1">
            Speaking ({speechMethod}):
          </p>
          <p className="text-sm text-green-600 dark:text-green-200 line-clamp-2">
            {currentText}
          </p>
        </div>
      )}
    </TooltipProvider>
  );
};

export default VoiceControls;
