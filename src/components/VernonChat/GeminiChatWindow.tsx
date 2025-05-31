
import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { supabase } from '@/integrations/supabase/client';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

interface GeminiChatWindowProps {
  onClose: () => void;
}

const GeminiChatWindow: React.FC<GeminiChatWindowProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello, Christian! I\'m Gemini, your AI assistant. How can I help you today?',
      sender: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: text,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Call Vertex AI via Supabase edge function
      const { data, error } = await supabase.functions.invoke('vertex-ai', {
        body: {
          prompt: text,
          mode: 'default',
          context: messages.slice(-5).map(msg => ({
            sender: msg.sender === 'user' ? 'user' : 'ai',
            text: msg.content
          }))
        }
      });

      if (error) throw error;

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.text || 'I apologize, but I encountered an error processing your request.',
        sender: 'assistant',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);

      // Auto-speak the response
      if (data.text) {
        speakText(data.text);
      }
    } catch (error) {
      console.error('Error calling Gemini:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'I\'m having trouble connecting right now. Please try again.',
        sender: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const speakText = async (text: string) => {
    if (isSpeaking) return;
    
    setIsSpeaking(true);
    try {
      const { data } = await supabase.functions.invoke('vertex-ai', {
        body: {
          action: 'text-to-speech',
          text: text
        }
      });

      if (data.audioContent) {
        const audioBlob = new Blob([
          Uint8Array.from(atob(data.audioContent), c => c.charCodeAt(0))
        ], { type: 'audio/mpeg' });
        
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        
        audio.onended = () => {
          setIsSpeaking(false);
          URL.revokeObjectURL(audioUrl);
        };
        
        await audio.play();
      }
    } catch (error) {
      console.error('Error with text-to-speech:', error);
      setIsSpeaking(false);
    }
  };

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window)) return;
    
    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      sendMessage(transcript);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <Card className="fixed right-6 bottom-6 w-96 h-[600px] flex flex-col bg-[#1a1a1a] text-white border-gray-700 z-50">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
            <span className="text-white font-semibold text-sm">G</span>
          </div>
          <div>
            <h3 className="font-medium text-white">Gemini Pro</h3>
            <p className="text-xs text-gray-400">2.5 Pro (preview)</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 rounded-full border-2 border-blue-500 flex items-center justify-center">
            <span className="text-blue-500 text-xs font-bold">C</span>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-400 hover:text-white">
            ×
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#1a1a1a]">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.sender === 'assistant' && (
              <Avatar className="h-8 w-8 mr-3 mt-1">
                <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs">
                  G
                </AvatarFallback>
              </Avatar>
            )}
            <div
              className={`max-w-[80%] p-3 rounded-2xl ${
                message.sender === 'user'
                  ? 'bg-blue-600 text-white ml-auto'
                  : 'bg-gray-800 text-white'
              }`}
            >
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              {message.sender === 'assistant' && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => speakText(message.content)}
                  className="mt-2 p-1 h-6 text-gray-400 hover:text-white"
                  disabled={isSpeaking}
                >
                  {isSpeaking ? <VolumeX className="h-3 w-3" /> : <Volume2 className="h-3 w-3" />}
                </Button>
              )}
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <Avatar className="h-8 w-8 mr-3 mt-1">
              <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs">
                G
              </AvatarFallback>
            </Avatar>
            <div className="bg-gray-800 text-white p-3 rounded-2xl">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-700">
        <div className="flex items-center space-x-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={isListening ? stopListening : startListening}
            className={`${isListening ? 'text-red-400' : 'text-gray-400'} hover:text-white`}
          >
            {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </Button>
          
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Gemini"
            className="flex-1 bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
            disabled={isLoading}
          />
          
          <Button
            type="submit"
            size="sm"
            disabled={!input.trim() || isLoading}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default GeminiChatWindow;
