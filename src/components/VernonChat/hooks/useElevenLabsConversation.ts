
import { useState, useEffect, useRef, useCallback } from 'react';
import { ElevenLabsService } from '@/services/ElevenLabs';
import { toast } from 'sonner';
import { Message } from '../types';
import { createUserMessage, createAIMessage } from '../utils/messageFactory';

// Default agent ID for Vernon - replace with your actual agent ID
const DEFAULT_AGENT_ID = 'gbn7fVf2h51EFh4Cx9mb';

export const useElevenLabsConversation = (isVenueMode = false) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  
  const webSocket = useRef<WebSocket | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioContext = useRef<AudioContext | null>(null);
  const audioQueue = useRef<ArrayBuffer[]>([]);
  const audioElement = useRef<HTMLAudioElement | null>(null);
  const isPlaying = useRef<boolean>(false);
  
  // Initialize audio context and element
  useEffect(() => {
    // Create audio element for playback
    if (!audioElement.current) {
      audioElement.current = new Audio();
      audioElement.current.onended = () => {
        isPlaying.current = false;
        setIsSpeaking(false);
        playNextAudio();
      };
      audioElement.current.onerror = (e) => {
        console.error('Audio playback error:', e);
        isPlaying.current = false;
        setIsSpeaking(false);
      };
    }
    
    // Create audio context
    if (!audioContext.current && typeof window !== 'undefined') {
      try {
        audioContext.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      } catch (error) {
        console.error('Failed to create audio context:', error);
      }
    }
    
    return () => {
      // Cleanup
      disconnectFromAgent();
      
      if (audioElement.current) {
        audioElement.current.pause();
        audioElement.current.src = '';
      }
    };
  }, []);
  
  // Play the next audio in queue
  const playNextAudio = useCallback(() => {
    if (audioQueue.current.length === 0 || isPlaying.current || !audioElement.current) {
      return;
    }
    
    const audioData = audioQueue.current.shift();
    if (!audioData) return;
    
    const blob = new Blob([audioData], { type: 'audio/mp3' });
    const url = URL.createObjectURL(blob);
    
    audioElement.current.src = url;
    
    isPlaying.current = true;
    setIsSpeaking(true);
    
    audioElement.current.play().catch((error) => {
      console.error('Failed to play audio:', error);
      isPlaying.current = false;
      setIsSpeaking(false);
      URL.revokeObjectURL(url);
      playNextAudio();
    });
  }, []);
  
  // Connect to ElevenLabs agent
  const connectToAgent = useCallback(async (agentId: string = DEFAULT_AGENT_ID) => {
    if (isConnected || isConnecting) {
      console.log('Already connected or connecting');
      return;
    }
    
    setIsConnecting(true);
    
    try {
      // Get signed URL for the agent
      const signedUrl = await ElevenLabsService.getSignedUrl(agentId);
      
      if (!signedUrl) {
        throw new Error('Failed to get signed URL for agent');
      }
      
      // Create WebSocket connection
      webSocket.current = new WebSocket(signedUrl);
      
      webSocket.current.onopen = () => {
        console.log('Connected to ElevenLabs agent');
        setIsConnected(true);
        setIsConnecting(false);
        
        // Get microphone access
        navigator.mediaDevices.getUserMedia({ audio: true })
          .then(stream => {
            // Setup media recorder
            mediaRecorder.current = new MediaRecorder(stream, {
              mimeType: 'audio/webm'
            });
            
            mediaRecorder.current.ondataavailable = event => {
              if (event.data.size > 0 && webSocket.current?.readyState === WebSocket.OPEN) {
                webSocket.current.send(event.data);
              }
            };
            
            // Ready to start conversation
            console.log('Microphone access granted, ready for conversation');
          })
          .catch(error => {
            console.error('Error accessing microphone:', error);
            toast.error('Could not access microphone. Please check permissions.');
          });
      };
      
      webSocket.current.onmessage = (event) => {
        // Handle incoming message
        const data = event.data;
        
        if (data instanceof Blob) {
          // Audio data
          data.arrayBuffer().then(buffer => {
            audioQueue.current.push(buffer);
            if (!isPlaying.current) {
              playNextAudio();
            }
          });
        } else {
          // Text message
          try {
            const message = JSON.parse(data);
            
            if (message.conversation_id && !conversationId) {
              setConversationId(message.conversation_id);
            }
            
            if (message.text) {
              // Add AI message to chat
              setMessages(prevMessages => [
                ...prevMessages,
                createAIMessage(message.text)
              ]);
            }
            
            if (message.transcription) {
              if (message.is_final) {
                setTranscript(message.transcription);
                setInterimTranscript('');
                
                // Add user message to chat
                setMessages(prevMessages => [
                  ...prevMessages,
                  createUserMessage(message.transcription)
                ]);
              } else {
                setInterimTranscript(message.transcription);
              }
            }
          } catch (error) {
            console.error('Error parsing WebSocket message:', error, data);
          }
        }
      };
      
      webSocket.current.onclose = () => {
        console.log('Disconnected from ElevenLabs agent');
        setIsConnected(false);
        setIsConnecting(false);
        stopListening();
      };
      
      webSocket.current.onerror = (error) => {
        console.error('WebSocket error:', error);
        toast.error('Connection error. Please try again.');
        setIsConnected(false);
        setIsConnecting(false);
      };
    } catch (error) {
      console.error('Error connecting to ElevenLabs agent:', error);
      toast.error('Failed to connect to voice service. Please try again.');
      setIsConnecting(false);
    }
  }, [isConnected, isConnecting, playNextAudio]);
  
  // Disconnect from ElevenLabs agent
  const disconnectFromAgent = useCallback(() => {
    stopListening();
    
    if (webSocket.current) {
      if (webSocket.current.readyState === WebSocket.OPEN) {
        webSocket.current.close();
      }
      webSocket.current = null;
    }
    
    setIsConnected(false);
    setConversationId(null);
  }, []);
  
  // Start listening to user
  const startListening = useCallback(() => {
    if (!isConnected || !mediaRecorder.current) {
      console.log('Cannot start listening: not connected or media recorder not ready');
      return;
    }
    
    try {
      setIsListening(true);
      
      // Start recording in chunks to send real-time audio
      mediaRecorder.current.start(250);
      
      console.log('Started listening');
    } catch (error) {
      console.error('Error starting to listen:', error);
      setIsListening(false);
    }
  }, [isConnected]);
  
  // Stop listening to user
  const stopListening = useCallback(() => {
    if (mediaRecorder.current && mediaRecorder.current.state === 'recording') {
      mediaRecorder.current.stop();
    }
    
    setIsListening(false);
    console.log('Stopped listening');
  }, []);
  
  // Toggle listening state
  const toggleListening = useCallback(() => {
    if (isListening) {
      stopListening();
    } else {
      if (!isConnected) {
        // Auto-connect if not already connected
        connectToAgent().then(() => {
          // Start listening after a small delay to ensure connection is established
          setTimeout(() => startListening(), 500);
        });
      } else {
        startListening();
      }
    }
  }, [isListening, isConnected, connectToAgent, startListening, stopListening]);
  
  // Send a text message to the agent
  const sendTextMessage = useCallback((text: string) => {
    if (!isConnected || !webSocket.current || webSocket.current.readyState !== WebSocket.OPEN) {
      console.log('Cannot send message: not connected');
      
      // Auto-connect and send after connected
      connectToAgent().then(() => {
        // Add slight delay to ensure connection is established
        setTimeout(() => {
          if (webSocket.current?.readyState === WebSocket.OPEN) {
            const textMessage = {
              type: 'text',
              text
            };
            webSocket.current.send(JSON.stringify(textMessage));
            
            // Add user message to chat immediately
            setMessages(prevMessages => [
              ...prevMessages,
              createUserMessage(text)
            ]);
          }
        }, 500);
      });
      return;
    }
    
    const textMessage = {
      type: 'text',
      text
    };
    
    webSocket.current.send(JSON.stringify(textMessage));
    
    // Add user message to chat immediately
    setMessages(prevMessages => [
      ...prevMessages,
      createUserMessage(text)
    ]);
  }, [isConnected, connectToAgent]);
  
  // Initialize with intro message
  useEffect(() => {
    // Set initial welcome message
    setMessages([
      createAIMessage(isVenueMode
        ? "Hi there! I'm VeRNon for Venues, your business insights assistant. I can help you understand your venue metrics, customer trends, and marketing performance. What would you like to know about your venue's performance?"
        : "Hi there! I'm VeRNon, your Vibe guide. I can help you discover cool places, events happening tonight, or answer questions about specific venues. What are you looking for?")
    ]);
  }, [isVenueMode]);
  
  return {
    isConnecting,
    isConnected,
    isSpeaking,
    isListening,
    isProcessing,
    messages,
    transcript,
    interimTranscript,
    conversationId,
    connectToAgent,
    disconnectFromAgent,
    startListening,
    stopListening,
    toggleListening,
    sendTextMessage,
    setMessages
  };
};
