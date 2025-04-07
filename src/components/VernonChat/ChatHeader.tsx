
import React from 'react';
import { Button } from '@/components/ui/button';
import { X, Minimize, Maximize, Key } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from '@/components/ui/input';

interface ChatHeaderProps {
  isMinimized: boolean;
  toggleMinimize: () => void;
  closeChat: () => void;
  isApiKeyPopoverOpen: boolean;
  setIsApiKeyPopoverOpen: (isOpen: boolean) => void;
  apiKeyInput?: string;
  setApiKeyInput?: (apiKey: string) => void;
  saveApiKey?: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  isMinimized,
  toggleMinimize,
  closeChat,
  isApiKeyPopoverOpen,
  setIsApiKeyPopoverOpen,
  apiKeyInput = '',
  setApiKeyInput = () => {},
  saveApiKey = () => {}
}) => {
  return (
    <div className="flex items-center justify-between p-3 border-b bg-amber-500/10">
      <div className="flex items-center">
        <Avatar className="h-6 w-6 mr-2 bg-amber-500/20">
          <AvatarImage src="/placeholder.svg" />
          <AvatarFallback className="bg-amber-500 text-white">V</AvatarFallback>
        </Avatar>
        <h3 className="text-sm font-medium">VeRNon (Vibe Assistant)</h3>
      </div>
      <div className="flex gap-1">
        <Popover open={isApiKeyPopoverOpen} onOpenChange={setIsApiKeyPopoverOpen}>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <Key className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-2">
              <h4 className="font-medium text-sm">HuggingFace API Key</h4>
              <p className="text-xs text-muted-foreground">
                Enter your HuggingFace API key to enable VeRNon to search for real-time information.
              </p>
              <div className="flex gap-2">
                <Input
                  type="password"
                  placeholder="Enter API key"
                  value={apiKeyInput}
                  onChange={(e) => setApiKeyInput(e.target.value)}
                  className="flex-1"
                />
                <Button size="sm" onClick={saveApiKey}>Save</Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Your API key is stored locally and only used for HuggingFace API calls.
              </p>
            </div>
          </PopoverContent>
        </Popover>
        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={toggleMinimize}>
          {isMinimized ? <Maximize className="h-4 w-4" /> : <Minimize className="h-4 w-4" />}
        </Button>
        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={closeChat}>
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ChatHeader;
