
import React from 'react';
import { Settings, Mic, MicOff, Building, User } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';

interface ChatSettingsProps {
  isListening: boolean;
  isVenueMode: boolean;
  isModelLoading: boolean;
  toggleListening: () => void;
  toggleVenueMode: () => void;
  voiceModel: string;
  onVoiceChange: (v: string) => void;
  volume: number;
  onVolumeChange: (v: number) => void;
  speed: number;
  onSpeedChange: (v: number) => void;
}

const ChatSettings: React.FC<ChatSettingsProps> = ({
  isListening,
  isVenueMode,
  isModelLoading,
  toggleListening,
  toggleVenueMode,
  voiceModel,
  onVoiceChange,
  volume,
  onVolumeChange,
  speed,
  onSpeedChange,
}) => {
  const voiceOptions = [
    'aura-angus-en',
    'aura-arcas-en',
    'aura-asteria-en',
    'aura-athena-en',
    'aura-helios-en',
    'aura-hera-en',
    'aura-luna-en',
    'aura-orion-en',
    'aura-orpheus-en',
    'aura-perseus-en',
    'aura-stella-en',
    'aura-zeus-en'
  ];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-700"
        >
          <Settings className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-gray-800 text-white border-gray-700">
        <DropdownMenuLabel>Assistant Settings</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-gray-700" />
        
        <div className="p-2">
          <div className="flex items-center mb-4">
            <div className="flex-1">
              <div className="flex items-center">
                {isVenueMode ? <Building className="mr-2 h-4 w-4" /> : <User className="mr-2 h-4 w-4" />}
                <span className="text-sm">Mode: {isVenueMode ? 'Venue' : 'User'}</span>
              </div>
              <p className="text-xs text-gray-400">
                {isVenueMode
                  ? 'Optimized for business insights'
                  : 'Tailored for personal recommendations'}
              </p>
            </div>
            <Switch
              checked={isVenueMode}
              onCheckedChange={toggleVenueMode}
              className="bg-gray-600 data-[state=checked]:bg-amber-500"
            />
          </div>
          
          <div className="flex items-center">
            <div className="flex-1">
              <div className="flex items-center">
                {isListening ? <MicOff className="mr-2 h-4 w-4" /> : <Mic className="mr-2 h-4 w-4" />}
                <span className="text-sm">Voice Activation</span>
              </div>
              <p className="text-xs text-gray-400">
                {isListening ? 'Turn off microphone' : 'Turn on microphone'}
              </p>
            </div>
            <Switch
              checked={isListening}
              onCheckedChange={toggleListening}
              className="bg-gray-600 data-[state=checked]:bg-red-500"
            />
          </div>

          <div className="mt-4 space-y-3">
            <div>
              <Label className="text-xs">Voice</Label>
              <Select value={voiceModel} onValueChange={onVoiceChange}>
                <SelectTrigger className="mt-1 h-8">
                  <SelectValue placeholder="Select voice" />
                </SelectTrigger>
                <SelectContent>
                  {voiceOptions.map(v => (
                    <SelectItem key={v} value={v}>{v}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs">Volume</Label>
              <Slider min={0} max={1} step={0.1} value={[volume]} onValueChange={(val) => onVolumeChange(val[0])} className="mt-1" />
            </div>
            <div>
              <Label className="text-xs">Speed</Label>
              <Slider min={0.5} max={2} step={0.1} value={[speed]} onValueChange={(val) => onSpeedChange(val[0])} className="mt-1" />
            </div>
          </div>
          
          {isModelLoading && (
            <div className="mt-4 p-2 bg-gray-700 rounded text-xs text-center">
              Loading AI model components...
            </div>
          )}
        </div>
        
        <DropdownMenuSeparator className="bg-gray-700" />
        <DropdownMenuItem className="text-xs text-center justify-center text-gray-400">
          Powered by Gemini
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ChatSettings;
