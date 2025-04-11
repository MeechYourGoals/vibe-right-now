
import React from 'react';
import { Button } from '@/components/ui/button';
import { X, Minimize2, Maximize2, Bot } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface ChatHeaderProps {
  isMinimized: boolean;
  toggleMinimize: () => void;
  closeChat: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  isMinimized,
  toggleMinimize,
  closeChat
}) => {
  return (
    <div className={cn(
      "relative px-4 py-3 flex items-center justify-between",
      "bg-gradient-to-r from-blue-600 to-indigo-600",
      "text-white border-b border-blue-700/50"
    )}>
      <div className="flex items-center gap-2">
        <Avatar className="h-8 w-8 border-2 border-white/30">
          <AvatarImage src="/vernon-avatar.png" alt="Vernon" />
          <AvatarFallback className="bg-indigo-500">
            <Bot className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
        
        <div>
          <h2 className="text-sm font-medium flex items-center gap-2">
            Vernon
            <Badge variant="outline" className="text-[10px] h-4 px-1 ml-1 bg-blue-500/20 border-blue-400/30 text-blue-50">
              AI
            </Badge>
          </h2>
          <p className="text-[10px] opacity-80">Powered by Vertex AI</p>
        </div>
      </div>
      
      <div className="flex items-center gap-1">
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-7 w-7 text-white/90 hover:text-white hover:bg-white/10"
          onClick={toggleMinimize}
        >
          {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-7 w-7 text-white/90 hover:text-white hover:bg-white/10"
          onClick={closeChat}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ChatHeader;
