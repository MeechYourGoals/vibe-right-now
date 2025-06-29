import { useState, useCallback } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { v4 as uuidv4 } from 'uuid';
import { Message } from '../types';
import { OpenAIService } from '@/services/OpenAIService';
import { VertexAIHub } from '@/services/VertexAI';
import { useDeepgramSpeechSynthesis } from '@/components/VernonChat/hooks/speechSynthesis/useDeepgramSpeechSynthesis';

interface UseOpenAIChatProps {
  initialMessages?: Message[];
  onContentChange?: (content: string) => void;
}

export const useOpenAIChat = ({ initialMessages = [], onContentChange }: UseOpenAIChatProps = {}) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const { speak: speakText, isSpeaking } = useDeepgramSpeechSynthesis();
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
    
    setIsLoading(true);
    
    try {
      // Create context from previous messages
      const context = messages.slice(-5).map(msg => ({
        sender: msg.sender || (msg.role === 'user' ? 'user' : 'ai'),
        text: msg.content
      }));
      
      // Call OpenAI for completion
      const response = await OpenAIService.generateResponse(text, context);
      
      // Create AI message
      const aiResponse: Message = {
        id: uuidv4(),
        role: 'assistant',
        content: response,
        timestamp: new Date().toISOString(),
        sender: 'ai'
      };
      
      setMessages(prevMessages => [...prevMessages, aiResponse]);
      setCompletion(aiResponse.content);
      
      if (onContentChange) {
        onContentChange(aiResponse.content);
      }
      
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Create error message
      const errorResponse: Message = {
        id: uuidv4(),
        role: 'error',
        content: "I'm having trouble connecting to my AI services. Please try again later.",
        timestamp: new Date().toISOString(),
        sender: 'ai'
      };
      
      setMessages(prevMessages => [...prevMessages, errorResponse]);
      
      toast({
        title: "Error sending message",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast, onContentChange, messages]);

  // Voice interaction functions
  const startListening = useCallback(async () => {
    setIsListening(true);
    setTranscript('');
    setInterimTranscript('Listening...');
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      const audioChunks: Blob[] = [];
      
      mediaRecorder.addEventListener("dataavailable", event => {
        audioChunks.push(event.data);
      });
      
      mediaRecorder.addEventListener("stop", async () => {
        setIsListening(false);
        setInterimTranscript('Processing...');
        
        try {
          // Convert blob to base64
          const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
          const reader = new FileReader();
          reader.readAsDataURL(audioBlob);
          
          reader.onloadend = async () => {
            const base64Audio = (reader.result as string).split(',')[1];
            
            try {
              // Use Vertex AI speech-to-text
              const transcriptionResult = await VertexAIHub.speechToText(base64Audio);
              
              if (transcriptionResult) {
                setTranscript(transcriptionResult);
                sendMessage(transcriptionResult);
              }
            } catch (error) {
              console.error('Speech recognition error:', error);
              setInterimTranscript('');
              toast({
                title: "Speech recognition error",
                description: "Could not process audio. Please try again.",
                variant: "destructive",
              });
            }
          };
        } catch (error) {
          console.error('Error processing audio:', error);
          setInterimTranscript('');
        }
      });
      
      mediaRecorder.start();
      return mediaRecorder;
    } catch (error) {
      console.error('Microphone access error:', error);
      setIsListening(false);
      setInterimTranscript('');
      toast({
        title: "Microphone access denied",
        description: "Please allow microphone access to use voice features.",
        variant: "destructive",
      });
      return null;
    }
  }, [sendMessage, toast]);

  const stopListening = useCallback((recorder: MediaRecorder | null) => {
    if (recorder && recorder.state !== 'inactive') {
      recorder.stop();
    }
    setInterimTranscript('');
  }, []);


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
