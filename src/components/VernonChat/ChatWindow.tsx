
import React, { useEffect, useRef } from 'react';
import { X, Send, User, Bot, Trash2 } from 'lucide-react';
import { ChatWindowProps, Message } from './types';
import VoiceControls from './components/VoiceControls';

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
  transcript,
  // New voice synthesis props
  isSpeaking,
  isPaused,
  currentText,
  speak,
  stopSpeaking,
  togglePause,
  speechMethod,
  hasElevenLabsKey,
  setSpeechMethod,
  hasBrowserSupport
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (!isModelLoading) {
      inputRef.current?.focus();
    }
  }, [isModelLoading]);

  // Update input field with transcript
  useEffect(() => {
    if (transcript && setInput) {
      setInput(transcript);
    }
  }, [transcript, setInput]);

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
            className={`p-3 rounded-lg max-w-[80%] relative ${
              isIncoming
                ? 'bg-muted text-foreground'
                : 'bg-primary text-primary-foreground'
            }`}
          >
            <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
            
            {isIncoming && speak && (
              <button
                onClick={() => speak(message.content)}
                className="absolute -bottom-2 -right-2 w-6 h-6 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors"
                title="Speak this message"
                disabled={isSpeaking}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                </svg>
              </button>
            )}
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
      <div className="flex items-center justify-between p-3 border-b">
        <div className="flex items-center space-x-2">
          <Bot className="w-5 h-5 text-primary" />
          <span className="font-medium">Vernon - Enhanced Voice AI</span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={toggleMode}
            className="p-1 rounded-md hover:bg-muted text-xs"
            title={chatMode === 'user' ? 'Switch to venue mode' : 'Switch to user mode'}
          >
            {chatMode === 'user' ? 'User' : 'Venue'}
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

      {/* Voice Controls Panel */}
      <div className="p-3 border-b">
        <VoiceControls
          isListening={isListening}
          toggleListening={toggleListening}
          transcript={transcript}
          hasBrowserSupport={hasBrowserSupport || false}
          isSpeaking={isSpeaking || false}
          isPaused={isPaused || false}
          currentText={currentText || ''}
          stopSpeaking={stopSpeaking || (() => {})}
          togglePause={togglePause || (() => {})}
          speechMethod={speechMethod || 'browser'}
          hasElevenLabsKey={hasElevenLabsKey || false}
          setSpeechMethod={setSpeechMethod || (() => {})}
        />
      </div>

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

      <form onSubmit={handleSubmit} className="p-3 border-t flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          ref={inputRef}
          placeholder={isListening ? "Listening..." : "Type or speak your message..."}
          disabled={isProcessing || isModelLoading}
          className="flex-1 p-2 bg-background border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
        />

        <button
          type="submit"
          disabled={!input || isProcessing}
          className={`p-2 rounded-full ${
            !input || isProcessing
              ? 'bg-muted text-muted-foreground'
              : 'bg-primary text-primary-foreground hover:bg-primary/90'
          }`}
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
};

export default ChatWindow;
