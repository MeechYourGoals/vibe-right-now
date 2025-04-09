
import React from 'react';
import { Message } from './types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface MessageItemProps {
  message: Message;
}

// Function to convert markdown links to HTML
const renderLinks = (text: string) => {
  // Regex to match markdown links [text](url)
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  
  // Split text by markdown links
  const parts = text.split(linkRegex);
  
  if (parts.length === 1) {
    // No links found, return the original text with line breaks converted to <br>
    return text.split('\n').map((line, i) => (
      <React.Fragment key={i}>
        {line}
        {i < text.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));
  }
  
  // Process parts and create elements
  const elements: React.ReactNode[] = [];
  let currentIndex = 0;
  
  for (let i = 0; i < parts.length; i++) {
    if (i % 3 === 0) {
      // This is text before/after/between links
      if (parts[i]) {
        const textParts = parts[i].split('\n');
        textParts.forEach((part, j) => {
          if (part) elements.push(part);
          if (j < textParts.length - 1) elements.push(<br key={`br-${currentIndex}-${j}`} />);
        });
      }
    } else if (i % 3 === 1) {
      // This is the link text
      const linkText = parts[i];
      const linkUrl = parts[i + 1];
      
      if (linkText && linkUrl) {
        elements.push(
          <a 
            key={`link-${currentIndex}`}
            href={linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-600 hover:text-amber-700 hover:underline"
          >
            {linkText}
          </a>
        );
      }
      
      currentIndex++;
      i++; // Skip the next part as we've already used it for the URL
    }
  }
  
  return elements;
};

// Function to process the message text and convert it to React elements
const processMessageText = (text: string) => {
  // Process links and other text formatting
  return renderLinks(text);
};

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
        {message.sender === 'ai' ? (
          <div className="prose prose-sm dark:prose-invert">
            {processMessageText(message.text)}
          </div>
        ) : (
          message.text
        )}
      </div>
    </div>
  );
};

export default MessageItem;
