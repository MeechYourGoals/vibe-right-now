
import { MessageProcessorService, messageProcessorService } from './messageProcessor';
import { Message } from '../types';
import { MessageContext } from './messageProcessor/types';
import { createUserMessage, createErrorMessage } from './messageFactory';

export interface ProcessMessageOptions {
  isVenueMode: boolean;
  isProPlan: boolean;
  updatePaginationState: (params: Record<string, number>) => Record<string, number>;
  setIsTyping: (isTyping: boolean) => void;
  setIsSearching: (isSearching: boolean) => void;
}

// Helper function to extract pagination parameters from query
function extractPaginationParams(query: string): Record<string, number> {
  const params: Record<string, number> = {};
  
  // Look for pagination indicators in the query
  const pageMatch = query.match(/page\s*(\d+)/i);
  const limitMatch = query.match(/(?:show|limit|display)\s*(\d+)/i);
  
  if (pageMatch) params.page = parseInt(pageMatch[1]);
  if (limitMatch) params.limit = parseInt(limitMatch[1]);
  
  return params;
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

export { MessageProcessorService, messageProcessorService };
export type { Message };
