
import { Message } from '../types';
import { ProcessMessageOptions } from './messageProcessorCore';
import messageProcessor from './messageProcessorCore';

export const processMessageInput = async (
  inputValue: string,
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
  options: ProcessMessageOptions
) => {
  return messageProcessor.processMessage(inputValue, setMessages, options);
};
