
import { useState, useEffect, useRef } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import ChatHeader from './ChatHeader';
import ChatButton from './ChatButton';
import { useChat } from './hooks/useChat';
import { Mic, MicOff, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const VernonChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  const speechRecognition = useRef<SpeechRecognition | null>(null);
  const speechSynthesis = useRef<SpeechSynthesis | null>(null);
  const currentUtterance = useRef<SpeechSynthesisUtterance | null>(null);
  
  const {
    messages,
    isTyping,
    isSearching,
    handleSendMessage
  } = useChat();
  
  // Initialize speech recognition and synthesis
  useEffect(() => {
    // Check if browser supports speech recognition
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      speechRecognition.current = new SpeechRecognition();
      speechRecognition.current.continuous = true;
      speechRecognition.current.interimResults = true;
      
      speechRecognition.current.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('');
        
        setTranscript(transcript);
      };
      
      speechRecognition.current.onend = () => {
        if (isListening) {
          speechRecognition.current?.start();
        }
      };
      
      speechRecognition.current.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
        toast.error(`Microphone error: ${event.error}`);
      };
    } else {
      console.error('Speech recognition not supported');
    }
    
    // Initialize speech synthesis
    if ('speechSynthesis' in window) {
      speechSynthesis.current = window.speechSynthesis;
    } else {
      console.error('Speech synthesis not supported');
    }
    
    // Clean up
    return () => {
      stopListening();
      stopSpeaking();
    };
  }, []);
  
  // Monitor messages for voice response
  useEffect(() => {
    if (messages.length > 0 && !isTyping && isListening) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.sender === 'ai') {
        speakResponse(lastMessage.text);
      }
    }
  }, [messages, isTyping, isListening]);
  
  // Effect to stop speaking when chat is closed
  useEffect(() => {
    if (!isOpen) {
      stopSpeaking();
    }
  }, [isOpen]);
  
  const toggleListening = () => {
    if (!speechRecognition.current) {
      toast.error('Speech recognition is not supported in your browser');
      return;
    }
    
    if (isListening) {
      stopListening();
      stopSpeaking();
    } else {
      startListening();
    }
  };
  
  const startListening = () => {
    try {
      speechRecognition.current?.start();
      setIsListening(true);
      setTranscript('');
      toast.success('Voice mode activated. Start speaking...');
    } catch (error) {
      console.error('Error starting speech recognition:', error);
      toast.error('Failed to start voice recognition');
    }
  };
  
  const stopListening = () => {
    if (speechRecognition.current) {
      try {
        speechRecognition.current.stop();
      } catch (error) {
        console.error('Error stopping speech recognition:', error);
      }
    }
    setIsListening(false);
    
    if (transcript.trim()) {
      setIsProcessing(true);
      
      // Small delay to show processing state
      setTimeout(() => {
        handleSendMessage(transcript);
        setTranscript('');
        setIsProcessing(false);
      }, 300);
    }
  };
  
  const stopSpeaking = () => {
    if (speechSynthesis.current) {
      speechSynthesis.current.cancel();
      setIsSpeaking(false);
      if (currentUtterance.current) {
        currentUtterance.current = null;
      }
    }
  };
  
  const speakResponse = (text: string) => {
    if (!speechSynthesis.current) {
      console.error('Speech synthesis not available');
      return;
    }
    
    // Cancel any ongoing speech
    stopSpeaking();
    
    const utterance = new SpeechSynthesisUtterance(text);
    currentUtterance.current = utterance;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      setIsSpeaking(false);
    }
    
    // Get available voices
    const voices = speechSynthesis.current.getVoices();
    
    // Try to find a good male English voice
    const maleVoice = voices.find(
      voice => voice.lang.includes('en') && 
               (voice.name.includes('Male') || 
                voice.name.includes('Daniel') || 
                voice.name.includes('David') || 
                voice.name.includes('James') || 
                voice.name.includes('George'))
    );
    
    // If no specific male voice found, fallback to any English voice
    const englishVoice = voices.find(
      voice => voice.lang.includes('en')
    );
    
    if (maleVoice) {
      utterance.voice = maleVoice;
    } else if (englishVoice) {
      utterance.voice = englishVoice;
    }
    
    // Optimize for more natural sounding speech
    utterance.rate = 0.95; // Slightly slower than default
    utterance.pitch = 0.95; // Slightly deeper voice
    utterance.volume = 1.0;
    
    speechSynthesis.current.speak(utterance);
  };
  
  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };
  
  const closeChat = () => {
    setIsOpen(false);
    stopListening();
    stopSpeaking();
  };
  
  if (!isOpen) {
    return <ChatButton onClick={() => setIsOpen(true)} />;
  }
  
  return (
    <div 
      className={`fixed left-6 bottom-6 bg-card border rounded-lg shadow-lg transition-all duration-200 z-40
      ${isMinimized ? 'w-64 h-12' : 'w-80 h-96'}`}
    >
      <ChatHeader 
        isMinimized={isMinimized}
        toggleMinimize={toggleMinimize}
        closeChat={closeChat}
      />
      
      {!isMinimized && (
        <>
          <MessageList 
            messages={messages} 
            isTyping={isTyping} 
            isSearching={isSearching} 
          />
          
          <div className="border-t p-3">
            {isListening && transcript && (
              <div className="mb-2 text-sm italic text-muted-foreground">
                {transcript}
              </div>
            )}
            
            <div className="flex items-center">
              <Button
                variant={isListening ? "destructive" : "outline"}
                size="icon"
                className="mr-2 h-9 w-9 rounded-full"
                onClick={toggleListening}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : isListening ? (
                  <MicOff className="h-4 w-4" />
                ) : (
                  <Mic className="h-4 w-4" />
                )}
              </Button>
              
              <MessageInput 
                onSendMessage={handleSendMessage} 
                isTyping={isTyping}
                disabled={isListening}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default VernonChat;
