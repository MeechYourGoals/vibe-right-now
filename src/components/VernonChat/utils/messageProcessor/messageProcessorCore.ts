import { Message } from '../../types';
import { MessageContext, ProcessMessageOptions } from './types';
import { searchVenues } from './searchVenues';
import { searchEvents } from './searchEvents';
import { searchUsers } from './searchUsers';
import { generateMockResponse } from './mockResponse';

export async function processMessage(
  query: string,
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
  options: ProcessMessageOptions,
  paginationState: any,
  messages: Message[]
): Promise<boolean> {
  console.log('Processing message:', query);
  
  const context: MessageContext = {
    query,
    timestamp: new Date(),
    messages,
    paginationState,
    options
  };

  options.setIsTyping(true);
  options.setIsSearching(true);

  try {
    let processed = false;

    // 1. Venue Search
    if (searchVenues.canProcess(context)) {
      processed = await searchVenues.process(context, setMessages);
    }

    // 2. Event Search
    if (!processed && searchEvents.canProcess(context)) {
      processed = await searchEvents.process(context, setMessages);
    }

    // 3. User Search
    if (!processed && searchUsers.canProcess(context)) {
      processed = await searchUsers.process(context, setMessages);
    }

    // 4. Default Response (Mock)
    if (!processed) {
      processed = await generateMockResponse(context, setMessages);
    }

    return processed;
  } finally {
    options.setIsTyping(false);
    options.setIsSearching(false);
  }
}
