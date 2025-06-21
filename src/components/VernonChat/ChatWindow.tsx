
import React, { useEffect, useRef } from 'react';
import { X, Send, Mic, MicOff, User, Bot, Trash2, Volume2, VolumeX } from 'lucide-react';
import { ChatWindowProps, Message } from './types';
import ChatSettings from './components/ChatSettings';
import VoiceActivityBar from '../VoiceActivityBar';

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
  stopSpeaking,
  isSpeaking,
  audioLevel,
  isModelLoading,
  transcript,
  voiceModel,
  setVoiceModel,
  volume,
  setVolume,
  speed,
  setSpeed
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

  const handleMicClick = () => {
    // Clear input when starting to listen
    if (!isListening && setInput) {
      setInput('');
    }
    stopSpeaking();
    toggleListening();
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
            
            {isIncoming && (
              <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <Volume2 size={12} className="text-white" />
              </div>
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
          <div className="flex items-center space-x-1">
            {isListening ? (
              <>
                <Mic className="w-3 h-3 text-red-500 animate-pulse" />
                <span className="text-xs text-red-500">Listening</span>
              </>
            ) : isSpeaking ? (
              <>
                <Volume2 className="w-3 h-3 text-green-500" />
                <span className="text-xs text-green-500">Speaking</span>
              </>
            ) : (
              <>
                <MicOff className="w-3 h-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Muted</span>
              </>
            )}
            {isListening && <VoiceActivityBar level={audioLevel} isActive={isListening} />}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={toggleMode}
            className="p-1 rounded-md hover:bg-muted text-xs"
            title={chatMode === 'user' ? 'Switch to venue mode' : 'Switch to user mode'}
          >
            {chatMode === 'user' ? 'User' : 'Venue'}
          </button>
          <ChatSettings
            isListening={isListening}
            isVenueMode={chatMode === 'venue'}
            isModelLoading={isModelLoading}
            toggleListening={toggleListening}
            toggleVenueMode={toggleMode}
            voiceModel={voiceModel}
            onVoiceChange={setVoiceModel}
            volume={volume}
            onVolumeChange={setVolume}
            speed={speed}
            onSpeedChange={setSpeed}
          />
          <button
            onClick={clearMessages}
            className="p-1 rounded-md hover:bg-muted"
            title="Clear conversation"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <button
            onClick={stopSpeaking}
            className="p-1 rounded-md hover:bg-muted"
            title="Stop speaking"
          >
            <VolumeX className="w-4 h-4" />
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

      {isListening && transcript && (
        <div className="px-3 py-2 bg-blue-50 dark:bg-blue-900/20 text-sm text-blue-700 dark:text-blue-300 italic border-t">
          Speaking: {transcript}
        </div>
      )}

      <form onSubmit={handleSubmit} className="p-3 border-t flex items-center gap-2">
        <button
          type="button"
          onClick={handleMicClick}
          className={`p-2 rounded-full transition-all ${
            isListening
              ? 'bg-red-100 text-red-500 animate-pulse'
              : 'bg-muted text-foreground hover:bg-blue-100 hover:text-blue-500'
          }`}
          title={isListening ? 'Stop listening' : 'Start voice input'}
        >
          {isListening ? <MicOff size={18} /> : <Mic size={18} />}
        </button>
        {isListening && <VoiceActivityBar level={audioLevel} isActive={isListening} />}

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
