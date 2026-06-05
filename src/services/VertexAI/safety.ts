
/**
 * Content safety services routed through the `content-safety` edge function.
 */
import { invokeEdgeWithFallback } from '@/services/edge/invokeEdge';

/**
 * Evaluate if content is safe. Defaults to safe when the edge function is
 * unavailable so the chat is never blocked.
 */
export async function checkContentSafety(
  content: string
): Promise<{ safe: boolean; reasons?: string[] }> {
  const data = await invokeEdgeWithFallback<{ safe: boolean; reasons?: string[] }>(
    'content-safety',
    { content },
    () => ({ safe: true })
  );

  if (data && typeof data === 'object' && typeof data.safe === 'boolean') {
    return data;
  }
  return { safe: true };
}
