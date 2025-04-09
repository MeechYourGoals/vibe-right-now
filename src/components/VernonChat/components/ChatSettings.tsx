
import React from 'react';
import { Settings, Building2, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from '@/components/ui/dropdown-menu';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface ChatSettingsProps {
  isListening: boolean;
  toggleListening: () => void;
  isVenueMode?: boolean;
  toggleVenueMode?: () => void;
  isModelLoading?: boolean;
}

const ChatSettings: React.FC<ChatSettingsProps> = ({
  isListening,
  toggleListening,
  isVenueMode = false,
  toggleVenueMode,
  isModelLoading = false
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
          <DropdownMenuLabel>Voice Settings</DropdownMenuLabel>
          <DropdownMenuItem 
            onClick={toggleListening}
            disabled={isModelLoading}
          >
            {isModelLoading 
              ? "Loading speech recognition model..." 
              : isListening 
                ? "Stop Voice Input" 
                : "Start Voice Input"
            }
          </DropdownMenuItem>
          
          {toggleVenueMode && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Mode</DropdownMenuLabel>
              <DropdownMenuItem>
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    {isVenueMode ? (
                      <>
                        <Building2 className="h-4 w-4 mr-1 text-primary" />
                        <span>Venue Mode</span>
                      </>
                    ) : (
                      <>
                        <User className="h-4 w-4 mr-1 text-primary" />
                        <span>User Mode</span>
                      </>
                    )}
                  </div>
                  <Switch 
                    checked={isVenueMode}
                    onCheckedChange={toggleVenueMode}
                  />
                </div>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ChatSettings;
