
import React from 'react';
import { Button } from '@/components/ui/button';
import { X, Minimize, Maximize } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ChatHeaderProps {
  isMinimized: boolean;
  toggleMinimize: () => void;
  closeChat: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  isMinimized,
  toggleMinimize,
  closeChat,
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
