import { supabase } from "@/integrations/supabase/client";

/**
 * Thin, typed wrapper around `supabase.functions.invoke` for the project's edge
 * functions (vertex-ai, openai-chat, perplexity-search, google-places, yelp-fusion,
 * ticketmaster, eleven-labs-tts, google-stt, review-sentiment-analyzer, etc.).
 *
 * Every integration in the app should call edge functions through this helper so we
 * get one consistent place for error handling and the mock-fallback convention used
 * across the data layer (see src/services/data/config.ts).
 *
 * When no API keys are provisioned the edge function will error; callers should pass a
 * `fallback` (or use `invokeEdgeWithFallback`) so the demo degrades gracefully to mock
 * behaviour instead of throwing.
 */
export type EdgeFunctionName =
  | "vertex-ai"
  | "openai-chat"
  | "openai-speech"
  | "gemini-ai"
  | "gemini-imagen"
  | "perplexity-search"
  | "google-places"
  | "google-nlp"
  | "google-stt"
  | "google-tts"
  | "get-maps-key"
  | "yelp-fusion"
  | "ticketmaster"
  | "square-ai"
  | "eleven-labs-tts"
  | "generate-audio"
  | "generate-audio-summary"
  | "parse-venue-reviews"
  | "review-sentiment-analyzer"
  | "content-safety"
  | "vector-search"
  | "agent-protocol";

export interface InvokeEdgeResult<T> {
  data: T | null;
  error: Error | null;
}

export async function invokeEdge<T = unknown>(
  name: EdgeFunctionName,
  body?: Record<string, unknown>,
): Promise<InvokeEdgeResult<T>> {
  try {
    const { data, error } = await supabase.functions.invoke(name, {
      body: body ?? {},
    });
    if (error) {
      return { data: null, error: error as Error };
    }
    return { data: data as T, error: null };
  } catch (err) {
    return { data: null, error: err as Error };
  }
}

/**
 * Invoke an edge function and fall back to a local value when it errors (e.g. missing
 * API key). Keeps the demo working with zero secrets configured.
 */
export async function invokeEdgeWithFallback<T>(
  name: EdgeFunctionName,
  body: Record<string, unknown> | undefined,
  fallback: () => T | Promise<T>,
): Promise<T> {
  const { data, error } = await invokeEdge<T>(name, body);
  if (error || data == null) {
    if (error) {
      console.warn(`[invokeEdge] "${name}" unavailable, using fallback:`, error.message);
    }
    return await fallback();
  }
  return data;
}
