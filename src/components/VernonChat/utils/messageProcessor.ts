
import { Message } from '../types';
import { ProcessMessageOptions, MessageContext } from './messageProcessor/types';
import { processMessage } from './messageProcessor/messageProcessorCore';

export const processMessageInput = async (
  inputValue: string,
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
  options: ProcessMessageOptions
) => {
  const context: MessageContext = {
    query: inputValue,
    timestamp: new Date(),
    messages: options.messages,
    options: options
  };
  
  return processMessage(context, setMessages);
};
