
import React, { useRef, useEffect } from 'react';
import { Message } from './types';
import MessageItem from './MessageItem';
import TypingIndicator from './TypingIndicator';

interface MessageListProps {
  messages: Message[];
  isTyping: boolean;
  isSearching: boolean;
}

const MessageList: React.FC<MessageListProps> = ({ messages, isTyping, isSearching }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  return (
    <div className="p-3 overflow-y-auto h-[calc(100%-6rem)]">
      {messages.map((message) => (
        <MessageItem key={message.id} message={message} />
      ))}
      
      {isTyping && <TypingIndicator isSearching={isSearching} />}
      
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
