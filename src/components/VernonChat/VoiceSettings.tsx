
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings, Volume2, Gauge, Play } from 'lucide-react';
import { DeepgramService } from '@/services/DeepgramService';

interface VoiceSettingsProps {
  isOpen: boolean;
  onClose: () => void;
  currentVoice: string;
  onVoiceChange: (voice: string) => void;
  volume: number;
  onVolumeChange: (volume: number) => void;
  speechRate: number;
  onSpeechRateChange: (rate: number) => void;
}

const DEEPGRAM_VOICES = [
  { id: 'aura-asteria-en', name: 'Asteria', description: 'Warm and conversational' },
  { id: 'aura-luna-en', name: 'Luna', description: 'Clear and professional' },
  { id: 'aura-stella-en', name: 'Stella', description: 'Friendly and approachable' },
  { id: 'aura-athena-en', name: 'Athena', description: 'Confident and articulate' },
  { id: 'aura-hera-en', name: 'Hera', description: 'Sophisticated and elegant' },
  { id: 'aura-orion-en', name: 'Orion', description: 'Deep and authoritative' },
  { id: 'aura-arcas-en', name: 'Arcas', description: 'Smooth and engaging' },
  { id: 'aura-perseus-en', name: 'Perseus', description: 'Strong and reliable' },
  { id: 'aura-angus-en', name: 'Angus', description: 'Warm and friendly' },
  { id: 'aura-orpheus-en', name: 'Orpheus', description: 'Melodic and expressive' },
  { id: 'aura-helios-en', name: 'Helios', description: 'Bright and energetic' },
  { id: 'aura-zeus-en', name: 'Zeus', description: 'Commanding and powerful' }
];

const VoiceSettings: React.FC<VoiceSettingsProps> = ({
  isOpen,
  onClose,
  currentVoice,
  onVoiceChange,
  volume,
  onVolumeChange,
  speechRate,
  onSpeechRateChange
}) => {
  const [isTestingVoice, setIsTestingVoice] = useState(false);

  const testVoice = async (voiceId: string) => {
    if (isTestingVoice) return;
    
    setIsTestingVoice(true);
    try {
      const testText = "Hello! This is how I sound with this voice.";
      const audioData = await DeepgramService.textToSpeech(testText, voiceId);
      
      if (audioData) {
        const audio = new Audio();
        const blob = new Blob([audioData], { type: 'audio/wav' });
        const url = URL.createObjectURL(blob);
        audio.src = url;
        audio.volume = volume / 100;
        
        audio.onended = () => {
          URL.revokeObjectURL(url);
          setIsTestingVoice(false);
        };
        
        audio.onerror = () => {
          URL.revokeObjectURL(url);
          setIsTestingVoice(false);
        };
        
        await audio.play();
      }
    } catch (error) {
      console.error('Error testing voice:', error);
      setIsTestingVoice(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="absolute top-12 right-0 z-50 w-80 bg-background border rounded-lg shadow-lg">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm">
            <Settings className="w-4 h-4" />
            Voice Settings
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="ml-auto p-1"
            >
              ×
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Voice Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Voice</label>
            <Select value={currentVoice} onValueChange={onVoiceChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="max-h-48 overflow-y-auto bg-background border z-50">
                {DEEPGRAM_VOICES.map((voice) => (
                  <SelectItem key={voice.id} value={voice.id} className="flex flex-col items-start p-2">
                    <div className="flex justify-between items-center w-full">
                      <div>
                        <div className="font-medium">{voice.name}</div>
                        <div className="text-xs text-muted-foreground">{voice.description}</div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          testVoice(voice.id);
                        }}
                        disabled={isTestingVoice}
                        className="p-1"
                      >
                        <Play className="w-3 h-3" />
                      </Button>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Volume Control */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <Volume2 className="w-4 h-4" />
              Volume: {volume}%
            </label>
            <Slider
              value={[volume]}
              onValueChange={(values) => onVolumeChange(values[0])}
              max={100}
              min={0}
              step={5}
              className="w-full"
            />
          </div>

          {/* Speech Rate Control */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <Gauge className="w-4 h-4" />
              Speed: {speechRate}x
            </label>
            <Slider
              value={[speechRate]}
              onValueChange={(values) => onSpeechRateChange(values[0])}
              max={2}
              min={0.5}
              step={0.1}
              className="w-full"
            />
          </div>

          {/* Test Current Voice */}
          <Button
            onClick={() => testVoice(currentVoice)}
            disabled={isTestingVoice}
            className="w-full"
            size="sm"
          >
            <Play className="w-4 h-4 mr-2" />
            {isTestingVoice ? 'Testing...' : 'Test Current Voice'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default VoiceSettings;
