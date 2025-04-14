
// OpenRouterService.ts - Handles API calls to OpenRouter

interface CompletionOptions {
  prompt: string;
  model?: string;
  max_tokens?: number;
  temperature?: number;
  top_p?: number;
  frequency_penalty?: number;
  presence_penalty?: number;
}

export const OpenRouterService = {
  apiKey: "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",
  baseUrl: "https://openrouter.ai/api/v1",

  async getCompletion({
    prompt,
    model = "anthropic/claude-3-haiku",
    max_tokens = 1000,
    temperature = 0.7,
    top_p = 1,
    frequency_penalty = 0,
    presence_penalty = 0
  }: CompletionOptions): Promise<string> {
    try {
      console.log(`Making OpenRouter completion request to model: ${model}`);
      
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
          'HTTP-Referer': window.location.origin,
          'X-Title': 'VibesApp'
        },
        body: JSON.stringify({
          model,
          messages: [{ role: "user", content: prompt }],
          max_tokens,
          temperature,
          top_p,
          frequency_penalty,
          presence_penalty
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('OpenRouter API error:', errorData);
        throw new Error(`OpenRouter API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('OpenRouter response data:', data);
      
      if (data.choices && data.choices.length > 0 && data.choices[0].message) {
        return data.choices[0].message.content;
      } else {
        console.error('Unexpected response format from OpenRouter:', data);
        throw new Error('Unexpected response format from OpenRouter');
      }
    } catch (error) {
      console.error('Error in OpenRouterService.getCompletion:', error);
      throw error;
    }
  }
};
