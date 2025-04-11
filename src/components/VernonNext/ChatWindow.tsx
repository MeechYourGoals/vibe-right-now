
import React, { RefObject } from 'react';
import { motion } from 'framer-motion';
import { X, Minimize2, Maximize2, Mic, MicOff, ArrowRight, CheckCircle2 } from 'lucide-react';
import { ChatState, Message } from './types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ChatWindowProps {
  state: ChatState;
  onSendMessage: (text: string) => void;
  onClose: () => void;
  onMinimize: () => void;
  onToggleListening: () => void;
  messagesEndRef: RefObject<HTMLDivElement>;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  state,
  onSendMessage,
  onClose,
  onMinimize,
  onToggleListening,
  messagesEndRef
}) => {
  const [inputValue, setInputValue] = React.useState('');
  
  // If minimized, show a collapsed header
  if (state.isMinimized) {
    return (
      <Card className="w-80 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 overflow-hidden border-blue-200 dark:border-blue-800">
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
    const isUser = message.sender === 'user';
    return (
      <div
        key={message.id}
        className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
      >
        {!isUser && (
          <Avatar className="h-8 w-8 mr-2 flex-shrink-0">
            <AvatarImage src="/vernon-avatar.png" alt="Vernon" />
            <AvatarFallback className="bg-indigo-500 text-white">V</AvatarFallback>
          </Avatar>
        )}
        <div className={`max-w-[80%] ${isUser ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-800'} rounded-2xl px-4 py-2 shadow-sm`}>
          <div className="flex items-start">
            {message.verified && !isUser && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <CheckCircle2 className="h-4 w-4 text-blue-500 mr-1 flex-shrink-0 mt-1" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Verified response</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            <div className={`${isUser ? 'text-white' : 'text-gray-900 dark:text-gray-100'}`}>
              {message.text.split('\n').map((line, i) => (
                <p key={i} className={i > 0 ? 'mt-2' : ''}>{line}</p>
              ))}
            </div>
          </div>
          {message.location && (
            <div className="mt-2">
              <a 
                href={`https://maps.google.com/?q=${message.location.lat},${message.location.lng}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center text-xs text-blue-500 hover:underline"
              >
                View on Map
                <ArrowRight className="h-3 w-3 ml-1" />
              </a>
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
        <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl px-4 py-3 shadow-sm">
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
    <Card className="w-80 md:w-96 h-[600px] max-h-[80vh] shadow-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 overflow-hidden border-blue-200 dark:border-blue-800 flex flex-col">
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
                AI
              </Badge>
            </h2>
            <p className="text-blue-100 text-xs">Powered by Google Vertex AI</p>
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
      
      <CardContent className="flex-1 overflow-y-auto p-4 pb-0">
        {state.messages.map(renderMessage)}
        {state.isLoading && renderTypingIndicator()}
        <div ref={messagesEndRef} />
      </CardContent>
      
      {(state.transcript || state.interimTranscript) && (
        <div className="mx-4 my-2 px-3 py-2 bg-blue-100 dark:bg-blue-900 rounded-md">
          <p className="text-xs font-medium text-blue-700 dark:text-blue-300">
            {state.isListening ? 'Listening...' : 'Transcript:'}
          </p>
          <p className="text-sm text-blue-800 dark:text-blue-200">
            {state.interimTranscript || state.transcript}
          </p>
        </div>
      )}
      
      <CardFooter className="p-4 pt-2 border-t border-gray-200 dark:border-gray-800 shrink-0">
        <form onSubmit={handleSubmit} className="flex w-full space-x-2">
          <Button
            type="button"
            variant={state.isListening ? "destructive" : "outline"}
            size="icon"
            className={`shrink-0 ${state.isListening ? "bg-red-500 text-white" : ""}`}
            onClick={onToggleListening}
          >
            {state.isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </Button>
          
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask Vernon anything..."
            className="flex-1 border-blue-200 dark:border-blue-800 bg-white dark:bg-gray-950"
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
