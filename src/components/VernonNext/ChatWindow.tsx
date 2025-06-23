
import React, { RefObject, useState } from 'react';
import { X, Minimize2, Maximize2, Mic, MicOff, ArrowRight, VolumeX, Volume2 } from 'lucide-react';
import { ChatState, ChatMessage, Message } from '@/components/VernonNext/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { formatDistanceToNow } from 'date-fns';

interface ChatWindowProps {
  state: ChatState;
  onSendMessage: (text: string) => void;
  onClose: () => void;
  onMinimize: () => void;
  onToggleListening: () => void;
  onSpeak: (text: string) => void;
  messagesEndRef: RefObject<HTMLDivElement>;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  state,
  onSendMessage,
  onClose,
  onMinimize,
  onToggleListening,
  onSpeak,
  messagesEndRef
}) => {
  const [inputValue, setInputValue] = useState('');
  
  // If minimized, show a collapsed header
  if (state.isMinimized) {
    return (
      <Card className="w-80 shadow-lg bg-gradient-to-br from-gray-800 to-gray-900 dark:from-gray-800 dark:to-gray-900 overflow-hidden border-gray-700 dark:border-gray-700">
        <CardHeader className="py-2 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 flex flex-row justify-between items-center">
          <div className="flex items-center space-x-2">
            <Avatar className="h-6 w-6 border-2 border-white">
              <AvatarImage src="/vernon-avatar.png" alt="Vernon" />
              <AvatarFallback className="bg-indigo-500 text-white">V</AvatarFallback>
            </Avatar>
            <span className="text-white font-medium text-sm">Vernon</span>
          </div>
          <div className="flex items-center space-x-1">
            <Button variant="ghost" size="icon" className="h-6 w-6 text-white hover:bg-blue-500" onClick={onMinimize}>
              <Maximize2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-6 w-6 text-white hover:bg-blue-500" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
      </Card>
    );
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !state.isLoading) {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };
  
  const renderMessage = (message: Message) => {
    const isUser = message.role === 'user' || message.sender === 'user';
    const timestamp = formatDistanceToNow(new Date(message.timestamp), { addSuffix: true });
    const messageContent = message.content || message.text || '';
    
    return (
      <div
        key={message.id}
        className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
      >
        {!isUser && (
          <Avatar className="h-8 w-8 mr-2 flex-shrink-0 mt-1">
            <AvatarImage src="/vernon-avatar.png" alt="Vernon" />
            <AvatarFallback className="bg-indigo-500 text-white">V</AvatarFallback>
          </Avatar>
        )}
        <div 
          className={`max-w-[85%] ${
            isUser 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-700 dark:bg-gray-700 text-white'
          } rounded-2xl px-4 py-2 shadow-sm`}
        >
          <div className="text-xs text-gray-400 dark:text-gray-400 mb-1">
            {timestamp}
          </div>
          
          <div className={`${isUser ? 'text-white' : 'text-white'}`}>
            {messageContent.split('\n').map((line, i) => (
              <p key={i} className={i > 0 ? 'mt-2' : ''}>{line}</p>
            ))}
          </div>
          
          {!isUser && (
            <div className="mt-2 flex justify-end">
              <Button 
                variant="ghost" 
                size="sm" 
                className="p-1 h-7 text-xs text-blue-300 hover:bg-blue-800 dark:hover:bg-blue-900 flex items-center gap-1"
                onClick={() => onSpeak(messageContent)}
                disabled={state.isSpeaking}
              >
                {state.isSpeaking ? <VolumeX className="h-3 w-3" /> : <Volume2 className="h-3 w-3" />}
                {state.isSpeaking ? 'Stop' : 'Speak'}
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  };
  
  const renderTypingIndicator = () => {
    return (
      <div className="flex justify-start mb-4">
        <Avatar className="h-8 w-8 mr-2">
          <AvatarImage src="/vernon-avatar.png" alt="Vernon" />
          <AvatarFallback className="bg-indigo-500 text-white">V</AvatarFallback>
        </Avatar>
        <div className="bg-gray-700 dark:bg-gray-700 rounded-2xl px-4 py-3 shadow-sm">
          <div className="flex space-x-2">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" />
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce delay-100" />
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce delay-200" />
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <Card className="w-80 md:w-96 h-[600px] max-h-[80vh] shadow-xl bg-gradient-to-br from-gray-800 to-gray-900 dark:from-gray-800 dark:to-gray-900 overflow-hidden border-gray-700 dark:border-gray-700 flex flex-col">
      <CardHeader className="py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 flex flex-row justify-between items-center border-b border-blue-700 shrink-0">
        <div className="flex items-center">
          <Avatar className="h-8 w-8 border-2 border-white mr-3">
            <AvatarImage src="/vernon-avatar.png" alt="Vernon" />
            <AvatarFallback className="bg-indigo-500 text-white">V</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-white font-medium flex items-center">
              Vernon
              <Badge variant="outline" className="ml-2 bg-blue-700 text-white border-blue-500 text-xs px-1.5">
                Perplexity
              </Badge>
            </h2>
            <p className="text-blue-100 text-xs">AI Assistant</p>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <Button variant="ghost" size="icon" className="h-7 w-7 text-white hover:bg-blue-500" onClick={onMinimize}>
            <Minimize2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7 text-white hover:bg-blue-500" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-y-auto p-4 pb-0 text-white">
        {state.messages.map(renderMessage)}
        {state.isLoading && renderTypingIndicator()}
        <div ref={messagesEndRef} />
      </CardContent>
      
      {(state.transcript || state.interimTranscript) && (
        <div className="mx-4 my-2 px-3 py-2 bg-blue-900 dark:bg-blue-900 rounded-md">
          <p className="text-xs font-medium text-blue-300 dark:text-blue-300">
            {state.isListening ? 'Listening...' : 'Transcript:'}
          </p>
          <p className="text-sm text-blue-200 dark:text-blue-200">
            {state.interimTranscript || state.transcript}
          </p>
        </div>
      )}
      
      <CardFooter className="p-4 pt-2 border-t border-gray-700 dark:border-gray-700 shrink-0">
        <form onSubmit={handleSubmit} className="flex w-full space-x-2">
          <Button
            type="button"
            variant={state.isListening ? "destructive" : "outline"}
            size="icon"
            className={`shrink-0 ${state.isListening ? "bg-red-500 text-white" : "bg-gray-700 text-white border-gray-600"}`}
            onClick={onToggleListening}
            disabled={state.isLoading}
          >
            {state.isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </Button>
          
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask Vernon anything..."
            className="flex-1 border-gray-600 dark:border-gray-600 bg-gray-700 dark:bg-gray-700 text-white placeholder:text-gray-400"
            disabled={state.isLoading}
          />
          
          <Button 
            type="submit" 
            className="shrink-0 bg-blue-600 hover:bg-blue-700" 
            disabled={state.isLoading || !inputValue.trim()}
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};

export default ChatWindow;
