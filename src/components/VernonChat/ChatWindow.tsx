
import React, { useEffect, useRef } from 'react';
import { X, Send, Mic, MicOff, User, Bot, Trash2 } from 'lucide-react';
import { ChatWindowProps, Message } from './types';

const ChatWindow: React.FC<ChatWindowProps> = ({
  messages,
  input,
  setInput,
  onSendMessage,
  onClose,
  isProcessing,
  chatMode,
  toggleMode,
  clearMessages,
  isListening,
  toggleListening,
  isModelLoading,
  transcript
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input field when component mounts
  useEffect(() => {
    if (!isModelLoading) {
      inputRef.current?.focus();
    }
  }, [isModelLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input && !isProcessing) {
      onSendMessage(input);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (setInput) {
      setInput(e.target.value);
    }
  };

  const renderMessage = (message: Message) => {
    const isIncoming = message.direction === 'incoming';

    return (
      <div
        key={message.id}
        className={`mb-3 ${isIncoming ? 'self-start' : 'self-end'}`}
      >
        <div className="flex items-start gap-2">
          {isIncoming && (
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
              <Bot size={16} />
            </div>
          )}

          <div
            className={`p-3 rounded-lg max-w-[80%] ${
              isIncoming
                ? 'bg-muted text-foreground'
                : 'bg-primary text-primary-foreground'
            }`}
          >
            <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
          </div>

          {!isIncoming && (
            <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center">
              <User size={16} />
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="fixed right-6 bottom-6 w-96 h-[600px] max-h-[80vh] bg-background border rounded-lg shadow-lg flex flex-col z-50">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b">
        <div className="flex items-center space-x-2">
          <Bot className="w-5 h-5 text-primary" />
          <span className="font-medium">Vernon - Google AI Assistant</span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={toggleMode}
            className="p-1 rounded-md hover:bg-muted"
            title={chatMode === 'user' ? 'Switch to venue mode' : 'Switch to user mode'}
          >
            {chatMode === 'user' ? 'User Mode' : 'Venue Mode'}
          </button>
          <button
            onClick={clearMessages}
            className="p-1 rounded-md hover:bg-muted"
            title="Clear conversation"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="p-1 rounded-md hover:bg-muted"
            title="Close chat"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col">
        {messages.map(renderMessage)}
        {isProcessing && (
          <div className="self-start mb-3">
            <div className="flex items-center p-3 rounded-lg bg-muted text-foreground">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Transcript display */}
      {isListening && transcript && (
        <div className="px-3 py-2 bg-muted/50 text-sm text-foreground/80 italic border-t">
          {transcript}
        </div>
      )}

      {/* Input area */}
      <form onSubmit={handleSubmit} className="p-3 border-t flex items-center gap-2">
        <button
          type="button"
          onClick={toggleListening}
          className={`p-2 rounded-full ${
            isListening ? 'bg-red-100 text-red-500' : 'bg-muted text-foreground'
          }`}
          title={isListening ? 'Stop listening' : 'Start listening'}
        >
          {isListening ? <MicOff size={18} /> : <Mic size={18} />}
        </button>

        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          ref={inputRef}
          placeholder="Type your message..."
          disabled={isProcessing || isModelLoading}
          className="flex-1 p-2 bg-background border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
        />

        <button
          type="submit"
          disabled={!input || isProcessing}
          className={`p-2 rounded-full ${
            !input || isProcessing
              ? 'bg-muted text-muted-foreground'
              : 'bg-primary text-primary-foreground'
          }`}
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
};

export default ChatWindow;
