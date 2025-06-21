
import React, { useEffect, useRef, useState } from 'react';
import { X, Send, Mic, MicOff, User, Bot, Trash2, Volume2, VolumeX, Settings, MessageCircle } from 'lucide-react';
import { ChatWindowProps, Message } from './types';
import VoiceSettings from './VoiceSettings';
import { useConversationManager } from './hooks/useConversationManager';

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
  isSpeaking,
  stopSpeaking,
  promptForElevenLabsKey
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Voice settings state
  const [showVoiceSettings, setShowVoiceSettings] = useState(false);
  const [currentVoice, setCurrentVoice] = useState('aura-asteria-en');
  const [volume, setVolume] = useState(80);
  const [speechRate, setSpeechRate] = useState(1.0);
  
  // Conversation manager
  const {
    conversationState,
    isConversationMode,
    audioLevel,
    isVoiceActive,
    startConversation,
    stopConversation,
    toggleConversation,
    speakResponse
  } = useConversationManager({
    onMessageSend: onSendMessage,
    autoStartListening: true,
    interruptionEnabled: true,
    voiceSettings: {
      voice: currentVoice,
      volume,
      speechRate
    }
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (!isModelLoading) {
      inputRef.current?.focus();
    }
  }, [isModelLoading]);

  // Auto-speak new AI responses when in conversation mode
  useEffect(() => {
    if (messages.length > 0 && isConversationMode) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.direction === 'incoming' && lastMessage.aiResponse) {
        speakResponse(lastMessage.content);
      }
    }
  }, [messages, isConversationMode, speakResponse]);

  // Update input field with transcript for visual feedback
  useEffect(() => {
    if (transcript && setInput) {
      setInput(transcript);
    }
  }, [transcript, setInput]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input && !isProcessing && !isListening) {
      onSendMessage(input);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Don't allow manual input while listening (voice mode)
    if (!isListening && setInput) {
      setInput(e.target.value);
    }
  };

  const handleMicClick = () => {
    // Clear input when starting to listen
    if (!isListening && setInput) {
      setInput('');
    }
    toggleListening();
  };

  const handleStopSpeaking = () => {
    if (stopSpeaking) {
      stopSpeaking();
    }
  };

  const handleElevenLabsSetup = () => {
    if (promptForElevenLabsKey) {
      promptForElevenLabsKey();
    }
  };

  const getConversationStateText = () => {
    switch (conversationState) {
      case 'listening': return 'Listening...';
      case 'processing': return 'Processing...';
      case 'speaking': return 'Speaking...';
      case 'interrupted': return 'Interrupted';
      default: return 'Ready';
    }
  };

  const getConversationStateColor = () => {
    switch (conversationState) {
      case 'listening': return 'text-blue-500';
      case 'processing': return 'text-yellow-500';
      case 'speaking': return 'text-green-500';
      case 'interrupted': return 'text-red-500';
      default: return 'text-gray-500';
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
            
            {isIncoming && (
              <button
                onClick={() => speakResponse(message.content)}
                className="absolute -bottom-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                title="Speak this message"
              >
                <Volume2 size={12} className="text-white" />
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
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b relative">
        <div className="flex items-center space-x-2">
          <Bot className="w-5 h-5 text-primary" />
          <span className="font-medium">Vernon - Enhanced Voice AI</span>
          
          {/* Conversation Mode Status */}
          {isConversationMode && (
            <div className="flex items-center space-x-1">
              <div className={`w-2 h-2 rounded-full animate-pulse ${
                conversationState === 'listening' ? 'bg-blue-500' :
                conversationState === 'processing' ? 'bg-yellow-500' :
                conversationState === 'speaking' ? 'bg-green-500' :
                conversationState === 'interrupted' ? 'bg-red-500' :
                'bg-gray-500'
              }`}></div>
              <span className={`text-xs ${getConversationStateColor()}`}>
                {getConversationStateText()}
              </span>
            </div>
          )}
          
          {/* Voice Activity Indicator */}
          {isVoiceActive && (
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <div 
                className="w-8 h-2 bg-gray-200 rounded-full overflow-hidden"
                title={`Voice level: ${Math.round(audioLevel * 100)}%`}
              >
                <div 
                  className="h-full bg-red-500 transition-all duration-100"
                  style={{ width: `${audioLevel * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Conversation Mode Toggle */}
          <button
            onClick={toggleConversation}
            className={`p-1 rounded-md hover:bg-muted ${
              isConversationMode ? 'bg-blue-100 text-blue-600' : ''
            }`}
            title={isConversationMode ? 'Stop conversation mode' : 'Start conversation mode'}
          >
            <MessageCircle className="w-4 h-4" />
          </button>
          
          {/* Stop Speaking Button */}
          {isSpeaking && (
            <button
              onClick={handleStopSpeaking}
              className="p-1 rounded-md hover:bg-muted text-red-500"
              title="Stop speaking"
            >
              <VolumeX className="w-4 h-4" />
            </button>
          )}
          
          {/* Voice Settings Button */}
          <button
            onClick={() => setShowVoiceSettings(!showVoiceSettings)}
            className="p-1 rounded-md hover:bg-muted"
            title="Voice settings"
          >
            <Settings className="w-4 h-4" />
          </button>
          
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
        
        {/* Voice Settings Panel */}
        <VoiceSettings
          isOpen={showVoiceSettings}
          onClose={() => setShowVoiceSettings(false)}
          currentVoice={currentVoice}
          onVoiceChange={setCurrentVoice}
          volume={volume}
          onVolumeChange={setVolume}
          speechRate={speechRate}
          onSpeechRateChange={setSpeechRate}
        />
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col">
        {messages.map(renderMessage)}
        {isProcessing && (
          <div className="self-start mb-3">
            <div className="flex items-center p-3 rounded-lg bg-muted text-foreground">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-200"></div>
              </div>
              <span className="ml-2 text-sm">Vernon is thinking...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Voice feedback */}
      {isListening && transcript && (
        <div className="px-3 py-2 bg-blue-50 dark:bg-blue-900/20 text-sm text-blue-700 dark:text-blue-300 italic border-t">
          {transcript.length > 50 ? "Processing speech..." : `Speaking: ${transcript}`}
        </div>
      )}

      {/* Speaking status */}
      {isSpeaking && (
        <div className="px-3 py-2 bg-green-50 dark:bg-green-900/20 text-sm text-green-700 dark:text-green-300 italic border-t flex items-center justify-between">
          <span>Vernon is speaking...</span>
          <button
            onClick={handleStopSpeaking}
            className="text-red-500 hover:text-red-700 text-xs"
          >
            Stop
          </button>
        </div>
      )}

      {/* Input form */}
      <form onSubmit={handleSubmit} className="p-3 border-t flex items-center gap-2">
        <button
          type="button"
          onClick={handleMicClick}
          className={`p-2 rounded-full transition-all ${
            isListening 
              ? 'bg-red-100 text-red-500 animate-pulse' 
              : 'bg-muted text-foreground hover:bg-blue-100 hover:text-blue-500'
          }`}
          title={isListening ? 'Stop listening (auto-sends when done)' : 'Start voice input'}
          disabled={isSpeaking}
        >
          {isListening ? <MicOff size={18} /> : <Mic size={18} />}
        </button>

        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          ref={inputRef}
          placeholder={
            isListening 
              ? "Listening... (will auto-send when you stop speaking)" 
              : isSpeaking
              ? "Please wait for Vernon to finish speaking..."
              : isConversationMode
              ? "Conversation mode active - use voice or type..."
              : "Type or speak your message..."
          }
          disabled={isProcessing || isModelLoading || isListening || isSpeaking}
          className={`flex-1 p-2 bg-background border rounded-md focus:outline-none focus:ring-1 focus:ring-primary ${
            isListening ? 'bg-blue-50 dark:bg-blue-900/20' : ''
          } ${
            isSpeaking ? 'bg-gray-50 dark:bg-gray-900/20' : ''
          } ${
            isConversationMode ? 'bg-green-50 dark:bg-green-900/20' : ''
          }`}
        />

        <button
          type="submit"
          disabled={!input || isProcessing || isListening || isSpeaking}
          className={`p-2 rounded-full ${
            !input || isProcessing || isListening || isSpeaking
              ? 'bg-muted text-muted-foreground'
              : 'bg-primary text-primary-foreground hover:bg-primary/90'
          }`}
          title={
            isListening ? 'Voice mode active - message will auto-send' 
            : isSpeaking ? 'Please wait for Vernon to finish speaking'
            : 'Send message'
          }
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
};

export default ChatWindow;
