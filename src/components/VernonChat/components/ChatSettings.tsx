
import React from 'react';
import { Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

interface ChatSettingsProps {
  useElevenLabs: boolean;
  promptForElevenLabsKey: () => void;
  isListening: boolean;
  toggleListening: () => void;
}

const ChatSettings: React.FC<ChatSettingsProps> = ({
  useElevenLabs,
  promptForElevenLabsKey,
  isListening,
  toggleListening
}) => {
  return (
    <div className="absolute right-3 top-3 z-10">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <Settings className="h-3.5 w-3.5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={promptForElevenLabsKey}>
            {useElevenLabs ? "Update Eleven Labs API Key" : "Set Eleven Labs API Key"}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={toggleListening}>
            {isListening ? "Stop Voice Input" : "Start Voice Input"}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ChatSettings;
