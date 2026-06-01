
/**
 * Entity & category analysis. NLP-heavy calls (entities/sentiment) route
 * through the `google-nlp` edge function and DEGRADE to deterministic local
 * rule-based passes so results are always available with zero keys.
 */
import { invokeEdgeWithFallback } from '@/services/edge/invokeEdge';

/**
 * Local rule-based entity extraction used as the offline fallback.
 */
const localExtractEntities = (text: string): string[] => {
  const entities: string[] = [];
  const cityRegex =
    /\b(?:chicago|new york|los angeles|san francisco|miami|austin|seattle|boston|portland|nashville|denver|dallas|atlanta)\b/gi;
  const cityMatches = text.match(cityRegex);
  if (cityMatches) cityMatches.forEach((city) => entities.push(city));

  const venueRegex =
    /\b(?:club|theater|venue|bar|restaurant|cafe|stadium|arena|gallery|museum)\b/gi;
  const venueMatches = text.match(venueRegex);
  if (venueMatches) venueMatches.forEach((venue) => entities.push(venue));

  return entities;
};

/**
 * Extract categories from text. Rule-based and deterministic (no network call
 * needed), kept as the source of truth for category routing.
 */
export const extractCategories = async (text: string): Promise<string[]> => {
  try {
    // For now, we'll use a simple rule-based approach without calling the actual API
    const categories: string[] = [];
    
    // Food and dining
    if (/restaurant|food|dining|eat|cuisine|breakfast|lunch|dinner|cafe|bar|pub|coffee|drink/i.test(text)) {
      categories.push('Food & Dining');
    }
    
    // Entertainment
    if (/movie|theater|cinema|show|concert|music|performance|play|entertainment|museum|gallery|art|exhibit/i.test(text)) {
      categories.push('Entertainment');
    }
    
    // Nightlife
    if (/club|nightlife|bar|pub|lounge|party|dance|dj|nightclub/i.test(text)) {
      categories.push('Nightlife');
    }
    
    // Sports
    if (/sport|game|match|basketball|football|soccer|baseball|hockey|tennis|golf|stadium|arena|athletic/i.test(text)) {
      categories.push('Sports');
    }
    
    // Comedy
    if (/comedy|comedian|standup|stand-up|improv|laugh|joke|funny/i.test(text)) {
      categories.push('Comedy');
    }
    
    console.log('Extracted categories:', categories);
    return categories;
  } catch (error) {
    console.error('Error extracting categories:', error);
    return [];
  }
};

/**
 * Analyze text (sentiment + entities + categories) via the `google-nlp` edge
 * function, falling back to local heuristics.
 */
export const analyzeText = async (text: string): Promise<any> => {
  const fallback = async () => ({
    sentiment: 0,
    entities: localExtractEntities(text),
    categories: await extractCategories(text),
  });

  const data = await invokeEdgeWithFallback<any>('google-nlp', { text }, fallback);

  if (data && typeof data === 'object') {
    return {
      sentiment: data.sentiment ?? data.score ?? 0,
      entities: Array.isArray(data.entities)
        ? data.entities.map((e: any) => (typeof e === 'string' ? e : e?.name)).filter(Boolean)
        : localExtractEntities(text),
      categories:
        Array.isArray(data.categories) && data.categories.length
          ? data.categories
          : await extractCategories(text),
    };
  }
  return fallback();
};

/**
 * Extract named entities via `google-nlp`, falling back to local regex.
 */
export const extractEntities = async (text: string): Promise<string[]> => {
  const data = await invokeEdgeWithFallback<any>('google-nlp', { text }, () =>
    localExtractEntities(text)
  );

  if (Array.isArray(data)) {
    return data.map((e) => (typeof e === 'string' ? e : e?.name)).filter(Boolean);
  }
  if (data && typeof data === 'object' && Array.isArray(data.entities)) {
    const names = data.entities
      .map((e: any) => (typeof e === 'string' ? e : e?.name))
      .filter(Boolean);
    return names.length ? names : localExtractEntities(text);
  }
  return localExtractEntities(text);
};
