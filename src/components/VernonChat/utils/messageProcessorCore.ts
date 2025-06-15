
import { Message } from '../types';
import { createUserMessage, createErrorMessage } from './messageFactory';
import { extractPaginationParams } from './paginationUtils';
import { messageProcessorService } from './messageProcessor';
import { MessageContext } from './messageProcessor/types';

export interface ProcessMessageOptions {
  isVenueMode: boolean;
  isProPlan: boolean;
  updatePaginationState: (params: Record<string, number>) => Record<string, number>;
  setIsTyping: (isTyping: boolean) => void;
  setIsSearching: (isSearching: boolean) => void;
}

export class MessageProcessorCore {
  async processMessage(
    inputValue: string,
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
    options: ProcessMessageOptions
  ): Promise<void> {
    if (!inputValue || inputValue.trim() === '') {
      return;
    }
    
    console.log('Processing message:', inputValue);
    
    try {
      const userMessage = createUserMessage(inputValue);
      setMessages(prev => [...prev, userMessage as Message]);
      
      let messageHistory: Message[] = [];
      setMessages(prevMessages => {
        messageHistory = [...prevMessages];
        return prevMessages;
      });
      
      const paginationParams = extractPaginationParams(inputValue);
      const updatedPaginationState = options.updatePaginationState(paginationParams);
      
      const context: MessageContext = {
        query: inputValue,
        messages: messageHistory,
        isVenueMode: options.isVenueMode,
        isProPlan: options.isProPlan,
        paginationState: updatedPaginationState,
        setMessages,
        setIsTyping: options.setIsTyping,
        setIsSearching: options.setIsSearching
      };
      
      const result = await messageProcessorService.processMessage(context);
      
      if (!result.success || !result.handled) {
        const errorMessage = createErrorMessage();
        setMessages(prev => [...prev, errorMessage as Message]);
      }
    } catch (error) {
      console.error('Error processing message:', error);
      const errorMessage = createErrorMessage();
      setMessages(prev => [...prev, errorMessage as Message]);
    }
  }
}

const messageProcessor = new MessageProcessorCore();
export default messageProcessor;
