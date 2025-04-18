
import { ChatMessage } from '@/types';
import { ProcessMessageOptions } from './messageProcessor/types';
import messageProcessor from './messageProcessor/messageProcessorCore';

export const processMessageInput = async (
  inputValue: string,
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>,
  options: ProcessMessageOptions
) => {
  return messageProcessor.processMessage(inputValue, setMessages, options);
};
