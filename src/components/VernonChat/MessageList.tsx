
import React, { useEffect, RefObject } from 'react';
import MessageItem from './MessageItem';
import TypingIndicator from './TypingIndicator';
import { Message } from './types';

interface MessageListProps {
  messages: Message[];
  isTyping: boolean;
  isSearching: boolean;
  messagesEndRef?: RefObject<HTMLDivElement>;
}

const MessageList: React.FC<MessageListProps> = ({ 
  messages, 
  isTyping, 
  isSearching,
  messagesEndRef
}) => {
  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, messagesEndRef]);

  return (
    <div className="flex-1 overflow-y-auto p-3 space-y-4">
      {messages.map((message) => (
        <MessageItem key={message.id} message={message} />
      ))}
      
      {isTyping && <TypingIndicator isSearching={isSearching} />}
      
      {/* This div serves as a marker for scrolling to the bottom */}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
