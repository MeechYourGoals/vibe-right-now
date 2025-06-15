
import { Message } from '../types';
import { createUserMessage, createErrorMessage } from './messageFactory';
import { extractPaginationParams } from './paginationUtils';

export interface ProcessMessageOptions {
  isVenueMode: boolean;
  isProPlan: boolean;
  updatePaginationState: (params: Record<string, number>) => Record<string, number>;
  setIsTyping: (isTyping: boolean) => void;
  setIsSearching: (isSearching: boolean) => void;
}

export interface MessageContext {
  messages: Message[];
  query: string;
  paginationState: Record<string, number>;
  options: ProcessMessageOptions;
}

export interface MessageProcessor {
  canProcess: (context: MessageContext) => boolean;
  process: (context: MessageContext, setMessages: React.Dispatch<React.SetStateAction<Message[]>>) => Promise<boolean>;
}

export class MessageProcessorCore {
  private processors: MessageProcessor[] = [];

  constructor() {
    // Register processors in order of priority
    this.registerProcessors();
  }

  private registerProcessors() {
    // Dynamic import to avoid circular dependencies
    import('./processors').then(({ BookingProcessor, AgentProcessor, LocationProcessor, AIServiceProcessor }) => {
      this.processors.push(new BookingProcessor());
      this.processors.push(new AgentProcessor());
      this.processors.push(new LocationProcessor());
      this.processors.push(new AIServiceProcessor());
    });
  }

  async processMessage(
    inputValue: string,
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
    options: ProcessMessageOptions
  ): Promise<void> {
    if (!inputValue || inputValue.trim() === '') {
      return;
    }
    
    console.log('Processing message:', inputValue);
    
    options.setIsTyping(true);
    options.setIsSearching(true);
    
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
        messages: messageHistory,
        query: inputValue,
        paginationState: updatedPaginationState,
        options
      };
      
      let handled = false;
      for (const processor of this.processors) {
        if (processor.canProcess(context)) {
          handled = await processor.process(context, setMessages);
          if (handled) break;
        }
      }
      
      if (!handled) {
        const errorMessage = createErrorMessage();
        setMessages(prev => [...prev, errorMessage as Message]);
      }
    } catch (error) {
      console.error('Error processing message:', error);
      const errorMessage = createErrorMessage();
      setMessages(prev => [...prev, errorMessage as Message]);
    } finally {
      options.setIsTyping(false);
      options.setIsSearching(false);
    }
  }
}

const messageProcessor = new MessageProcessorCore();
export default messageProcessor;
