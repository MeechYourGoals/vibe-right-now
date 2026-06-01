/**
 * Data-access layer for Vibe Right Now.
 *
 * Every repository reads from the Supabase backend and transparently falls back to the
 * `src/mock/*` data when the query errors or returns nothing (gated by
 * VITE_USE_MOCK_FALLBACK). This is the seam that lets the app run fully whether or not
 * the database is populated / the user is signed in. Feature code should import repos
 * from here rather than touching `src/mock/*` or the supabase client directly.
 */
export { USE_MOCK_FALLBACK, withFallback, table, supabase } from "./config";
export { profilesRepo, mapProfileToUser } from "./profilesRepo";
export { postsRepo, mapRowToPost } from "./postsRepo";
export type { CreatePostInput } from "./postsRepo";
export { commentsRepo } from "./commentsRepo";
export { locationsRepo, mapRowToLocation } from "./locationsRepo";
export { tripsRepo } from "./tripsRepo";
export type { TripRecord } from "./tripsRepo";
