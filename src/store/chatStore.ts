
import { StateCreator } from 'zustand';
import { AppStore, ChatSlice } from './types';
import { Message, ChatMode } from '@/components/VernonChat/types';
import { useAppStore } from './appStore';

export const createChatSlice: StateCreator<
  AppStore,
  [["zustand/immer", never]],
  [],
  ChatSlice
> = (set) => ({
  chatState: {
    messages: [],
    isTyping: false,
    isProcessing: false,
    chatMode: 'user',
    isOpen: false,
    isListening: false,
    transcript: '',
  },
  
  setChatOpen: (open: boolean) => {
    set((state) => {
      state.chatState.isOpen = open;
    });
  },
  
  setMessages: (messages: Message[]) => {
    set((state) => {
      state.chatState.messages = messages;
    });
  },
  
  addMessage: (message: Message) => {
    set((state) => {
      state.chatState.messages.push(message);
      // Keep only last 100 messages to prevent memory issues
      if (state.chatState.messages.length > 100) {
        state.chatState.messages = state.chatState.messages.slice(-100);
      }
    });
  },
  
  setTyping: (typing: boolean) => {
    set((state) => {
      state.chatState.isTyping = typing;
    });
  },
  
  setProcessing: (processing: boolean) => {
    set((state) => {
      state.chatState.isProcessing = processing;
    });
  },
  
  setChatMode: (mode: ChatMode) => {
    set((state) => {
      state.chatState.chatMode = mode;
    });
  },
  
  setListening: (listening: boolean) => {
    set((state) => {
      state.chatState.isListening = listening;
    });
  },
  
  setTranscript: (transcript: string) => {
    set((state) => {
      state.chatState.transcript = transcript;
    });
  },
  
  clearMessages: () => {
    set((state) => {
      state.chatState.messages = [];
    });
  },
});

// Export individual store hook
export const useChatStore = () => {
  const { 
    chatState,
    setChatOpen,
    setMessages,
    addMessage,
    setTyping,
    setProcessing,
    setChatMode,
    setListening,
    setTranscript,
    clearMessages
  } = useAppStore();
  
  return { 
    chatState,
    setChatOpen,
    setMessages,
    addMessage,
    setTyping,
    setProcessing,
    setChatMode,
    setListening,
    setTranscript,
    clearMessages
  };
};
