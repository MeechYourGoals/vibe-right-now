
import React, { useEffect, useRef, useState } from 'react';
import { X, Send, Mic, MicOff, User, Bot, Trash2, Sparkles } from 'lucide-react';
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
  const [isExpanded, setIsExpanded] = useState(false);

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
    const isUser = !isIncoming;

    return (
      <div
        key={message.id}
        className={`mb-6 ${isUser ? 'flex justify-end' : 'flex justify-start'}`}
      >
        <div className={`flex items-start gap-3 max-w-[85%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
          {/* Avatar */}
          <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
            isUser 
              ? 'bg-blue-500 text-white' 
              : 'bg-gradient-to-r from-blue-400 to-purple-500 text-white'
          }`}>
            {isUser ? <User size={16} /> : <Sparkles size={16} />}
          </div>

          {/* Message Content */}
          <div className={`rounded-2xl p-4 ${
            isUser
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
          }`}>
            <div className="text-sm font-medium mb-1">
              {isUser ? 'You' : 'Gemini'}
            </div>
            <div className="text-sm leading-relaxed whitespace-pre-wrap break-words">
              {message.content}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed right-6 bottom-6 w-96 h-[600px] max-h-[80vh] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <span className="font-semibold text-gray-900 dark:text-white">Vernon AI</span>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Powered by Google Gemini
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={toggleMode}
            className="p-1.5 rounded-lg hover:bg-white/50 dark:hover:bg-gray-700 transition-colors text-xs font-medium"
            title={chatMode === 'user' ? 'Switch to venue mode' : 'Switch to user mode'}
          >
            {chatMode === 'user' ? 'User' : 'Venue'}
          </button>
          <button
            onClick={clearMessages}
            className="p-1.5 rounded-lg hover:bg-white/50 dark:hover:bg-gray-700 transition-colors"
            title="Clear conversation"
          >
            <Trash2 className="w-4 h-4 text-gray-600 dark:text-gray-300" />
          </button>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/50 dark:hover:bg-gray-700 transition-colors"
            title="Close chat"
          >
            <X className="w-4 h-4 text-gray-600 dark:text-gray-300" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-white dark:bg-gray-900">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center p-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center mb-4">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Hi, I'm Vernon
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Your AI assistant powered by Google Gemini. Ask me anything about venues, events, or general questions!
            </p>
          </div>
        )}
        
        {messages.map(renderMessage)}
        
        {isProcessing && (
          <div className="flex justify-start mb-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
                <Sparkles size={16} className="text-white" />
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-4">
                <div className="text-sm font-medium mb-1 text-gray-900 dark:text-gray-100">
                  Gemini
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce"></div>
                  <div className="w-2 h-2 rounded-full bg-purple-400 animate-bounce delay-75"></div>
                  <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce delay-150"></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Transcript display */}
      {isListening && transcript && (
        <div className="px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-sm text-blue-600 dark:text-blue-400 italic border-t border-blue-200 dark:border-blue-800">
          🎤 {transcript}
        </div>
      )}

      {/* Input area */}
      <div className="p-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <form onSubmit={handleSubmit} className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleListening}
            className={`p-2.5 rounded-full transition-all duration-200 ${
              isListening 
                ? 'bg-red-500 text-white shadow-lg' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
            title={isListening ? 'Stop listening' : 'Start voice input'}
          >
            {isListening ? <MicOff size={18} /> : <Mic size={18} />}
          </button>

          <div className="flex-1 relative">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              ref={inputRef}
              placeholder="Message Vernon..."
              disabled={isProcessing || isModelLoading}
              className="w-full p-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white pr-12"
            />
            <button
              type="submit"
              disabled={!input.trim() || isProcessing}
              className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 rounded-full transition-all duration-200 ${
                input.trim() && !isProcessing
                  ? 'bg-blue-500 text-white hover:bg-blue-600 shadow-md'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
              }`}
            >
              <Send size={16} />
            </button>
          </div>
        </form>
        
        <div className="mt-2 text-xs text-gray-400 dark:text-gray-500 text-center">
          Vernon may display inaccurate info, including about people, so double-check its responses.
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
