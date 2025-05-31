
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

interface ChatSettingsProps {
  isListening: boolean;
  isVenueMode: boolean;
  isModelLoading: boolean;
  toggleListening: () => void;
  toggleVenueMode: () => void;
}

const ChatSettings: React.FC<ChatSettingsProps> = ({
  isListening,
  isVenueMode,
  isModelLoading,
  toggleListening,
  toggleVenueMode,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-3 right-12 h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-700"
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
