
import React from 'react';
import { Message } from './types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface MessageItemProps {
  message: Message;
}

const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  return (
    <div 
      className={`mb-3 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
    >
      {message.sender === 'ai' && (
        <Avatar className="h-8 w-8 mr-2 mt-1 bg-amber-500/20">
          <AvatarImage src="/placeholder.svg" />
          <AvatarFallback className="bg-amber-500 text-white">V</AvatarFallback>
        </Avatar>
      )}
      <div 
        className={`px-3 py-2 rounded-lg max-w-[75%] ${
          message.sender === 'user' 
            ? 'bg-primary text-primary-foreground' 
            : 'bg-muted'
        }`}
      >
        {message.text}
      </div>
    </div>
  );
};

export default MessageItem;
