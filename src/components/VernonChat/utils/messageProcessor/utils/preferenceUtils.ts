
import { Message } from '../../../types';
import { LocalAIService } from '@/services/LocalAIService';

// Function to check if preferences are mentioned in the query
export const checkPreferenceMentioned = async (
  query: string,
  userPreferences: string[]
): Promise<boolean> => {
  if (!query || !userPreferences || userPreferences.length === 0) {
    return false;
  }
  
  try {
    // Extract keywords from the query
    const queryKeywords = await LocalAIService.extractKeywords(query);
    
    // Check if any preferences are mentioned
    for (const preference of userPreferences) {
      if (query.toLowerCase().includes(preference.toLowerCase())) {
        return true;
      }
      
      // Check similarity between preference and query keywords
      for (const keyword of queryKeywords) {
        const similarity = LocalAIService.calculateTextSimilarity(preference, keyword);
        if (similarity > 0.7) { // High similarity threshold
          return true;
        }
      }
    }
    
    return false;
  } catch (error) {
    console.error('Error checking preferences in query:', error);
    return false;
  }
};

// Function to enhance query with user preferences
export const enhanceQueryWithPreferences = (
  query: string,
  userPreferences: string[]
): string => {
  if (!userPreferences || userPreferences.length === 0) {
    return query;
  }
  
  // Select up to 3 most relevant preferences to add to the query
  const selectedPreferences = userPreferences.slice(0, 3);
  
  return `${query} (User interests: ${selectedPreferences.join(', ')})`;
};

// Extract possible preferences from message history
export const extractPreferencesFromHistory = async (
  messages: Message[]
): Promise<string[]> => {
  const userMessages = messages
    .filter(message => message.sender === 'user')
    .map(message => message.content || message.text || '')
    .join(' ');
  
  if (!userMessages) {
    return [];
  }
  
  try {
    // Use keyword extraction to find potential preferences
    const keywords = await LocalAIService.extractKeywords(userMessages);
    return keywords;
  } catch (error) {
    console.error('Error extracting preferences from history:', error);
    return [];
  }
};
