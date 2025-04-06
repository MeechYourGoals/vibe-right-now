
import { Loader } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface TypingIndicatorProps {
  isSearching: boolean;
}

const TypingIndicator: React.FC<TypingIndicatorProps> = ({ isSearching }) => {
  return (
    <div className="flex justify-start mb-3">
      <Avatar className="h-8 w-8 mr-2 bg-amber-500/20">
        <AvatarImage src="/placeholder.svg" />
        <AvatarFallback className="bg-amber-500 text-white">V</AvatarFallback>
      </Avatar>
      <div className="px-3 py-2 rounded-lg bg-muted flex items-center">
        {isSearching ? (
          <div className="flex items-center">
            <span className="text-xs mr-2">Searching web</span>
            <Loader className="h-3 w-3 animate-spin" />
          </div>
        ) : (
          <div className="flex space-x-1">
            <div className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce"></div>
            <div className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce delay-75"></div>
            <div className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce delay-150"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TypingIndicator;
