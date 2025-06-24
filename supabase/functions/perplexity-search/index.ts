
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { withErrorHandling } from "../_shared/request-handler.ts";
import { createSuccessResponse, createValidationErrorResponse } from "../_shared/response.ts";
import { validateRequired } from "../_shared/validation.ts";
import { getApiKey, createAuthHeaders } from "../_shared/auth.ts";
import { logInfo, logError } from "../_shared/logging.ts";

const PERPLEXITY_API_KEY = Deno.env.get('PERPLEXITY_API_KEY');
const PERPLEXITY_API_URL = Deno.env.get('PERPLEXITY_API_URL') || 'https://api.perplexity.ai/chat/completions';

const handler = withErrorHandling(async (req: Request): Promise<Response> => {
  if (!PERPLEXITY_API_KEY) {
    return createValidationErrorResponse('Perplexity API key not configured');
  }

  const { query } = await req.json();
  validateRequired(query, 'query');

  logInfo(`Searching with Perplexity`, { queryLength: query.length });

  const authHeaders = createAuthHeaders(PERPLEXITY_API_KEY);
  const perplexityResponse = await fetch(PERPLEXITY_API_URL, {
    method: 'POST',
    headers: {
      ...authHeaders,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'llama-3.1-sonar-small-128k-online',
      messages: [
        {
          role: 'system',
          content: 'You are VeRNon, a local venue discovery assistant. Be precise and concise when providing information about venues, events, and local attractions.'
        },
        {
          role: 'user',
          content: query
        }
      ],
      temperature: 0.2,
      top_p: 0.9,
      max_tokens: 1000,
      return_images: false,
      return_related_questions: true,
      search_domain_filter: [],
      search_recency_filter: 'month',
      frequency_penalty: 1,
      presence_penalty: 0
    }),
  });

  if (!perplexityResponse.ok) {
    const errorText = await perplexityResponse.text();
    logError(`Perplexity API error: ${errorText}`, { status: perplexityResponse.status });
    throw new Error('Error calling Perplexity API');
  }

  const responseData = await perplexityResponse.json();
  
  return createSuccessResponse({
    text: responseData.choices[0].message.content,
    relatedQuestions: responseData.related_questions || [],
  });
}, 'perplexity-search');

serve(handler);
