import React, { useEffect, useRef, useState } from 'react';
import { X, Send, Mic, MicOff, User, Bot, Trash2, Volume2, VolumeX } from 'lucide-react';
import { ChatWindowProps, Message } from './types';
import { supabase } from '@/integrations/supabase/client';

const GeminiChatWindow: React.FC<ChatWindowProps> = ({
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
  const [isSpeaking, setIsSpeaking] = useState(false);

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

  const handleSpeak = async (text: string) => {
    if (isSpeaking) {
      // Stop speaking
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    setIsSpeaking(true);
    try {
      // Use Vertex AI TTS if available, otherwise fall back to browser
      const { data, error } = await supabase.functions.invoke('vertex-ai', {
        body: { 
          action: 'text-to-speech',
          text: text,
          options: {
            voice: 'en-US-Neural2-D',
            speakingRate: 1.0,
            pitch: 0
          }
        }
      });

      if (!error && data?.audioContent) {
        const audio = new Audio(`data:audio/mp3;base64,${data.audioContent}`);
        audio.onended = () => setIsSpeaking(false);
        audio.onerror = () => {
          setIsSpeaking(false);
          // Fallback to browser TTS
          fallbackToSpeechSynthesis(text);
        };
        await audio.play();
      } else {
        // Fallback to browser TTS
        fallbackToSpeechSynthesis(text);
      }
    } catch (error) {
      console.error('TTS error:', error);
      // Fallback to browser TTS
      fallbackToSpeechSynthesis(text);
    }
  };

  const fallbackToSpeechSynthesis = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const renderMessage = (message: Message) => {
    const isIncoming = message.direction === 'incoming';

    return (
      <div
        key={message.id}
        className={`mb-6 ${isIncoming ? 'mr-12' : 'ml-12'}`}
      >
        <div className={`flex items-start gap-3 ${isIncoming ? '' : 'flex-row-reverse'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            isIncoming 
              ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white' 
              : 'bg-gradient-to-br from-gray-100 to-gray-200 text-gray-700'
          }`}>
            {isIncoming ? <Bot size={16} /> : <User size={16} />}
          </div>

          <div className={`flex-1 ${isIncoming ? '' : 'text-right'}`}>
            <div className={`inline-block max-w-full ${
              isIncoming
                ? 'bg-gradient-to-br from-gray-50 to-white border border-gray-200 text-gray-900'
                : 'bg-gradient-to-br from-blue-500 to-blue-600 text-white'
            } rounded-2xl px-4 py-3 shadow-sm`}>
              <div className="whitespace-pre-wrap break-words text-sm leading-relaxed">
                {message.content}
              </div>
            </div>
            
            {isIncoming && (
              <button
                onClick={() => handleSpeak(message.content)}
                className="mt-2 p-1 rounded-full hover:bg-gray-100 transition-colors"
                title={isSpeaking ? 'Stop speaking' : 'Read aloud'}
              >
                {isSpeaking ? <VolumeX size={14} /> : <Volume2 size={14} />}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed right-6 bottom-6 w-[420px] h-[700px] max-h-[85vh] bg-white border border-gray-200 rounded-3xl shadow-2xl flex flex-col z-50 overflow-hidden">
      {/* Header with Gemini-style gradient */}
      <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-4">
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Vernon</h3>
              <p className="text-xs opacity-90">
                {chatMode === 'venue' ? 'Venue Assistant' : 'AI Assistant'} • Powered by Gemini
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleMode}
              className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-medium hover:bg-white/30 transition-colors"
              title={chatMode === 'user' ? 'Switch to venue mode' : 'Switch to user mode'}
            >
              {chatMode === 'user' ? 'User' : 'Venue'}
            </button>
            <button
              onClick={clearMessages}
              className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
              title="Clear conversation"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
              title="Close chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Messages area with custom scrollbar */}
      <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-gray-50/50 to-white" style={{
        scrollbarWidth: 'thin',
        scrollbarColor: '#CBD5E1 transparent'
      }}>
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-center">
            <div className="max-w-sm">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                <Bot className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Welcome to Vernon</h3>
              <p className="text-sm text-gray-600">
                Your AI assistant powered by Google Gemini. Ask me anything about venues, events, or get help with your business insights.
              </p>
            </div>
          </div>
        ) : (
          <>
            {messages.map(renderMessage)}
            {isProcessing && (
              <div className="mr-12 mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center">
                    <Bot size={16} />
                  </div>
                  <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce"></div>
                        <div className="w-2 h-2 rounded-full bg-purple-400 animate-bounce delay-75"></div>
                        <div className="w-2 h-2 rounded-full bg-pink-400 animate-bounce delay-150"></div>
                      </div>
                      <span className="text-sm text-gray-600">Vernon is thinking...</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Voice transcript display */}
      {isListening && transcript && (
        <div className="px-4 py-2 bg-blue-50 border-t border-blue-100">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
            <span className="text-sm text-blue-700 italic">{transcript}</span>
          </div>
        </div>
      )}

      {/* Input area with Gemini-style design */}
      <div className="p-4 border-t border-gray-100 bg-white">
        <form onSubmit={handleSubmit} className="flex items-end space-x-3">
          <button
            type="button"
            onClick={toggleListening}
            className={`p-3 rounded-full transition-all duration-200 ${
              isListening 
                ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            title={isListening ? 'Stop listening' : 'Start voice input'}
          >
            {isListening ? <MicOff size={20} /> : <Mic size={20} />}
          </button>

          <div className="flex-1 relative">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              ref={inputRef}
              placeholder="Message Vernon..."
              disabled={isProcessing || isModelLoading}
              className="w-full py-3 px-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm transition-all duration-200"
            />
          </div>

          <button
            type="submit"
            disabled={!input || isProcessing}
            className={`p-3 rounded-full transition-all duration-200 ${
              !input || isProcessing
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl'
            }`}
            title="Send message"
          >
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default GeminiChatWindow;
