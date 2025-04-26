import { useState, useCallback } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { v4 as uuidv4 } from 'uuid';
import { Message } from '../types';

interface UseOpenAIChatProps {
  initialMessages?: Message[];
  onContentChange?: (content: string) => void;
}

export const useOpenAIChat = ({ initialMessages = [], onContentChange }: UseOpenAIChatProps = {}) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [completion, setCompletion] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const { toast } = useToast();

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim()) {
      toast({
        title: "Please enter a message",
      });
      return;
    }

    // Create a user message
    const userMessage: Message = {
      id: uuidv4(),
      role: 'user',
      content: text,
      timestamp: new Date().toISOString(),
      sender: 'user'
    };

    // Optimistically update messages with the user's input
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInput('');
    
    // Simulate API call
    setIsLoading(true);
    
    try {
      // In a real implementation, this would call your OpenAI API
      // For now, we'll simulate a response after a delay
      setTimeout(() => {
        const aiResponse: Message = {
          id: uuidv4(),
          role: 'assistant',
          content: `I received your message: "${text}". This is a simulated response since we're not connecting to the OpenAI API in this demo.`,
          timestamp: new Date().toISOString(),
          sender: 'ai'
        };
        
        setMessages(prevMessages => [...prevMessages, aiResponse]);
        setCompletion(aiResponse.content);
        if (onContentChange) {
          onContentChange(aiResponse.content);
        }
        setIsLoading(false);
      }, 1500);
      
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error sending message",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  }, [toast, onContentChange]);

  // Mocked functions for voice interactions
  const startListening = useCallback(async () => {
    setIsListening(true);
    setTranscript('');
    setInterimTranscript('Listening...');
    
    // Return a mock MediaRecorder
    return {
      start: () => console.log('Started recording'),
      stop: () => console.log('Stopped recording')
    };
  }, []);

  const stopListening = useCallback((recorder: any) => {
    if (recorder) {
      recorder.stop();
    }
    setIsListening(false);
    setInterimTranscript('');
    // Simulate getting a transcript
    setTranscript('This is a simulated transcript');
  }, []);

  const speakText = useCallback(async (text: string) => {
    if (isSpeaking) return;
    
    setIsSpeaking(true);
    
    // In a real implementation, this would use the Web Speech API or a TTS service
    console.log('Speaking:', text);
    
    // Simulate speech duration based on text length
    const duration = Math.min(2000 + text.length * 50, 10000);
    
    setTimeout(() => {
      setIsSpeaking(false);
    }, duration);
  }, [isSpeaking]);

  const toggleChat = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const toggleMinimize = useCallback(() => {
    setIsMinimized(prev => !prev);
  }, []);

  // Return the state and functions needed by components
  return {
    state: {
      messages,
      isLoading,
      isListening,
      isSpeaking,
      transcript,
      interimTranscript,
      isOpen,
      isMinimized,
    },
    sendMessage,
    startListening,
    stopListening,
    speakText,
    toggleChat,
    toggleMinimize,
    
    // Keep original properties for compatibility
    messages,
    input,
    completion,
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value),
    handleSubmit: async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      await sendMessage(input);
    },
    isLoading,
    stop: () => console.log('Stopping generation'),
    appendMessage: (message: Message) => {
      if (message.content && message.content.trim() !== "") {
        setMessages(prevMessages => [...prevMessages, message]);
      }
    },
    setInput,
    setCompletion
  };
};
