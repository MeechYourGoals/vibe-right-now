import { locationsRepo } from '@/services/data';
import { Location } from '@/types';

/**
 * Vernon venue-recommendation helper.
 *
 * Detects "recommend / X near me / places in <city>" style intents and returns
 * a markdown answer that links to REAL venues from `locationsRepo` (which is
 * itself backed by Supabase with a mock-data fallback). Returns `null` when the
 * query isn't a venue-recommendation request so the caller can fall through to
 * the normal AI/search pipeline.
 */

const RECOMMEND_INTENT =
  /\b(recommend|suggest|find me|looking for|where can i|places? to|things to do|good|best|near me|nearby|around here|in town)\b/i;

const VENUE_NOUNS =
  /\b(restaurant|restaurants|bar|bars|club|clubs|cafe|cafes|coffee|venue|venues|spot|spots|place|places|eat|drink|dinner|lunch|brunch|nightlife|museum|park|lounge|pub|food)\b/i;

const CITY_PHRASE = /\b(?:in|near|around|at)\s+([A-Z][a-zA-Z]+(?:\s+[A-Z][a-zA-Z]+)*)/;

export interface VenueRecommendationResult {
  text: string;
  venues: Location[];
}

/**
 * Returns true when the query looks like a request for venue recommendations.
 */
export function isVenueRecommendationQuery(query: string): boolean {
  if (!query) return false;
  return RECOMMEND_INTENT.test(query) && VENUE_NOUNS.test(query);
}

function venueLink(loc: Location): string {
  const label = loc.name;
  const href = `/venue/${encodeURIComponent(loc.id)}`;
  const detail = [loc.type, loc.city].filter(Boolean).join(' • ');
  const rating = loc.rating ? ` (${loc.rating}★)` : '';
  return `- [${label}](${href})${rating}${detail ? ` — ${detail}` : ''}`;
}

/**
 * Build a venue-recommendation answer with real venue links. Resolves to
 * `null` if the query isn't a recommendation request.
 */
export async function getVenueRecommendations(
  query: string,
  coords?: { lat: number; lng: number }
): Promise<VenueRecommendationResult | null> {
  if (!isVenueRecommendationQuery(query)) return null;

  let venues: Location[] = [];

  try {
    const cityMatch = query.match(CITY_PHRASE);
    const wantsNearMe = /\bnear me\b|\bnearby\b|\baround here\b/i.test(query);

    if (wantsNearMe && coords) {
      venues = await locationsRepo.nearby(coords.lat, coords.lng, 6);
    } else if (cityMatch && cityMatch[1]) {
      venues = await locationsRepo.byCity(cityMatch[1].trim(), 6);
      if (venues.length === 0) {
        venues = await locationsRepo.search(query, 6);
      }
    } else {
      venues = await locationsRepo.search(query, 6);
    }
  } catch (error) {
    console.error('[getVenueRecommendations] error:', error);
    return null;
  }

  if (venues.length === 0) return null;

  const explore = `/explore?q=${encodeURIComponent(query)}`;
  const text = [
    "Here are some spots I think you'll love:",
    '',
    ...venues.map(venueLink),
    '',
    `[See more on the Explore page](${explore})`,
  ].join('\n');

  return { text, venues };
}
