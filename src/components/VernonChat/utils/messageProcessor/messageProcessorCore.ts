
import { Message } from '../../types';
import { createUserMessage, createErrorMessage } from '../messageFactory';
import { extractPaginationParams } from '../pagination';
import { MessageContext, MessageProcessor, ProcessMessageOptions } from './types';
import { BookingProcessor } from './processors/bookingProcessor';
import { AgentProcessor } from './processors/agentProcessor';
import { LocationProcessor } from './processors/locationProcessor';
import { AIServiceProcessor } from './processors/aiServiceProcessor';

export class MessageProcessorCore {
  private processors: MessageProcessor[] = [];

  constructor() {
    // Register processors in order of priority
    this.processors.push(new BookingProcessor());
    this.processors.push(new AgentProcessor());
    this.processors.push(new LocationProcessor());
    this.processors.push(new AIServiceProcessor()); // Fallback processor
  }

  async processMessage(
    inputValue: string,
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
    options: ProcessMessageOptions
  ): Promise<void> {
    // Skip processing if the input is empty
    if (!inputValue || inputValue.trim() === '') {
      return;
    }
    
    console.log('Processing message:', inputValue);
    
    // Set typing and searching states to show loading indicators
    options.setIsTyping(true);
    options.setIsSearching(true);
    
    try {
      // Create and add the user message
      const userMessage = createUserMessage(inputValue);
      setMessages(prev => [...prev, userMessage]);
      
      // Get current messages for context
      let messageHistory: Message[] = [];
      setMessages(prevMessages => {
        messageHistory = [...prevMessages];
        return prevMessages;
      });
      
      // Extract pagination parameters from the query
      const paginationParams = extractPaginationParams(inputValue);
      
      // Update pagination state
      const updatedPaginationState = options.updatePaginationState(paginationParams);
      
      // Create context for processors
      const context: MessageContext = {
        messages: messageHistory,
        query: inputValue,
        paginationState: updatedPaginationState,
        options
      };
      
      // Try each processor in order until one handles the message
      let handled = false;
      for (const processor of this.processors) {
        if (processor.canProcess(context)) {
          handled = await processor.process(context, setMessages);
          if (handled) break;
        }
      }
      
      // If no processor handled the message, show an error
      if (!handled) {
        const errorMessage = createErrorMessage();
        setMessages(prev => [...prev, errorMessage]);
      }
    } catch (error) {
      console.error('Error processing message:', error);
      const errorMessage = createErrorMessage();
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      options.setIsTyping(false);
      options.setIsSearching(false);
    }
  }
}

// Singleton instance
const messageProcessor = new MessageProcessorCore();
export default messageProcessor;
