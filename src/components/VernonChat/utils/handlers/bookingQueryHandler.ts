
import { createAssistantMessage as createAIMessage } from '../messageFactory';

/**
 * Handle booking-related queries
 */
export const handleBookingQuery = async (
  inputValue: string, 
  isProPlan: boolean
): Promise<{ responseText: string, paginationData: any | null }> => {
  return {
    responseText: `I'll help you book "${inputValue}" ${isProPlan ? 'with premium features' : 'with standard features'}.`,
    paginationData: null
  };
};
