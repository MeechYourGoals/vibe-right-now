
/**
 * Extract categories from text using Google Cloud Natural Language API
 */
export const extractCategories = async (text: string): Promise<string[]> => {
  try {
    // Call our edge function for Google NLP
    const response = await fetch('https://yiitqkjrbskxumriujrh.functions.supabase.co/functions/v1/google-nlp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text })
    });
    
    if (!response.ok) {
      throw new Error(`Google NLP API error: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.categories || [];
  } catch (error) {
    console.error('Error extracting categories with Google NLP:', error);
    return [];
  }
};

/**
 * Analyze sentiment of text using Gemini AI
 */
export const analyzeSentiment = async (text: string): Promise<{label: string, score: number}> => {
  try {
    // Use our GeminiService for sentiment analysis
    const response = await fetch('https://yiitqkjrbskxumriujrh.functions.supabase.co/functions/v1/gemini-ai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [
          { 
            role: 'user', 
            parts: [{ 
              text: `Analyze the sentiment of the following text and respond with ONLY a JSON object with 'label' (one of: positive, negative, neutral) and 'score' (number between 0 and 1): "${text}"` 
            }] 
          }
        ],
        model: 'gemini-1.5-flash'
      })
    });
    
    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.statusText}`);
    }
    
    const data = await response.json();
    try {
      // Try to parse the response as JSON
      const parsedResponse = JSON.parse(data.text);
      return {
        label: parsedResponse.label || 'neutral',
        score: parsedResponse.score || 0.5
      };
    } catch (e) {
      // If parsing fails, use a default response
      return {
        label: 'neutral',
        score: 0.5
      };
    }
  } catch (error) {
    console.error('Error analyzing sentiment with Gemini:', error);
    return {
      label: 'neutral',
      score: 0.5
    };
  }
};
