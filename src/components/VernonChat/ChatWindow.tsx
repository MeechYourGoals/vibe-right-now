
import React, { useEffect, useRef } from 'react';
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
    const content = message.content || message.text || "";

    return (
      <div
        key={message.id}
        className={`flex ${isIncoming ? 'justify-start' : 'justify-end'} mb-6 group`}
      >
        {isIncoming && (
          <div className="flex-shrink-0 mr-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
              <Sparkles size={16} className="text-white" />
            </div>
          </div>
        )}

        <div className={`max-w-[85%] ${isIncoming ? 'mr-12' : 'ml-12'}`}>
          <div
            className={`px-4 py-3 rounded-2xl shadow-sm ${
              isIncoming
                ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-bl-sm'
                : 'bg-blue-600 text-white rounded-br-sm'
            } transition-all duration-200 hover:shadow-md`}
          >
            <div className="text-sm leading-relaxed whitespace-pre-wrap">
              {content.split('\n').map((line, i) => (
                <p key={i} className={i > 0 ? 'mt-2' : ''}>{line}</p>
              ))}
            </div>
          </div>
          
          <div className={`text-xs text-gray-500 mt-1 px-1 ${
            isIncoming ? 'text-left' : 'text-right'
          }`}>
            {new Date(message.timestamp).toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </div>
        </div>

        {!isIncoming && (
          <div className="flex-shrink-0 ml-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center shadow-lg">
              <User size={16} className="text-white" />
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderTypingIndicator = () => (
    <div className="flex justify-start mb-6">
      <div className="flex-shrink-0 mr-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
          <Sparkles size={16} className="text-white" />
        </div>
      </div>
      <div className="bg-gray-100 dark:bg-gray-800 px-4 py-3 rounded-2xl rounded-bl-sm shadow-sm">
        <div className="flex space-x-1">
          <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
          <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed right-6 bottom-6 w-96 h-[600px] max-h-[80vh] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-800">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
            <Sparkles size={16} className="text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Vernon</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">AI Assistant by Gemini</p>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <button
            onClick={clearMessages}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            title="Clear conversation"
          >
            <Trash2 className="w-4 h-4 text-gray-500" />
          </button>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            title="Close chat"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-gray-50/50 to-white dark:from-gray-900 dark:to-gray-900">
        {messages.length === 0 && (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Sparkles size={24} className="text-white" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Hello! I'm Vernon</h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm px-4">
              I'm your AI assistant powered by Google Gemini. I can help you with information, questions, and conversations. How can I assist you today?
            </p>
          </div>
        )}
        
        {messages.map(renderMessage)}
        {isProcessing && renderTypingIndicator()}
        <div ref={messagesEndRef} />
      </div>

      {/* Transcript display */}
      {isListening && transcript && (
        <div className="px-4 py-2 bg-blue-50 dark:bg-blue-900/20 border-t border-blue-200 dark:border-blue-800">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
            <span className="text-xs font-medium text-blue-700 dark:text-blue-300">Listening...</span>
          </div>
          <p className="text-sm text-blue-800 dark:text-blue-200 mt-1">{transcript}</p>
        </div>
      )}

      {/* Input area */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        <form onSubmit={handleSubmit} className="flex items-end space-x-3">
          <button
            type="button"
            onClick={toggleListening}
            className={`flex-shrink-0 p-3 rounded-full transition-all duration-200 ${
              isListening 
                ? 'bg-red-500 text-white shadow-lg scale-110' 
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
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
              className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 border-0 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200"
            />
          </div>

          <button
            type="submit"
            disabled={!input?.trim() || isProcessing}
            className={`flex-shrink-0 p-3 rounded-full transition-all duration-200 ${
              input?.trim() && !isProcessing
                ? 'bg-blue-600 text-white shadow-lg hover:bg-blue-700 hover:scale-105'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;
