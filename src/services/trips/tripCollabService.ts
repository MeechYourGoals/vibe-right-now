/**
 * Trip collaboration + "My Places" persistence helpers (Stream E).
 *
 * These wrap the Supabase tables that don't have a first-class repo in
 * `@/services/data` yet (trip_members, trip_venue_ideas, trip_venue_votes,
 * trip_messages, user_places). They use the untyped `table()` accessor and the
 * `withFallback` semantics from the data layer so the UI keeps rendering from
 * mock/local data when the DB is empty, unreachable, or the user is signed out.
 *
 * Writes require a session. `getCurrentUserId()` resolves the signed-in user id
 * (Supabase auth first, then the Zustand store as a fallback for the demo). When
 * no session exists, callers should surface a sign-in prompt instead of writing.
 */
import { supabase, table, USE_MOCK_FALLBACK } from "@/services/data";

export interface TripCollaborator {
  id: string;
  name: string;
  avatar: string;
}

export interface VenueVote {
  id: string;
  vote_type: "up" | "down";
  user_name: string;
  user_avatar: string;
}

export interface VenueIdeaRecord {
  id: string;
  venue_id: string;
  venue_name: string;
  venue_address: string | null;
  venue_city: string | null;
  venue_rating: number | null;
  venue_image_url: string | null;
  proposed_by_id: string;
  proposed_by_name: string;
  proposed_by_avatar: string;
  notes: string | null;
  status: string;
  created_at: string;
  trip_id: string;
  trip_venue_votes?: VenueVote[];
}

export interface TripMessageRecord {
  id: string;
  trip_id: string;
  content: string;
  user_id: string;
  user_name: string;
  user_avatar: string;
  message_type: string;
  created_at: string;
}

/**
 * Resolve the current signed-in user id. Returns null when signed out so callers
 * can show a sign-in prompt rather than throwing on a write.
 */
export async function getCurrentUserId(): Promise<string | null> {
  try {
    const { data } = await supabase.auth.getUser();
    if (data?.user?.id) return data.user.id;
  } catch (err) {
    console.warn("[tripCollab] auth.getUser failed:", err);
  }
  return null;
}

// ---------------------------------------------------------------------------
// trip_members
// ---------------------------------------------------------------------------

export async function listTripMembers(tripId: string): Promise<TripCollaborator[]> {
  try {
    const { data, error } = await table("trip_members")
      .select("user_id, role")
      .eq("trip_id", tripId);
    if (error) throw error;
    const rows = (data ?? []) as Array<{ user_id: string; role: string }>;
    if (rows.length === 0) return [];

    // Resolve profiles in a second query (avoids relying on a named FK embed for
    // a table that isn't in the generated Supabase types yet).
    const userIds = rows.map((r) => r.user_id);
    const { data: profiles } = await table("profiles")
      .select("id, username, display_name, avatar_url")
      .in("id", userIds);
    const profileById = new Map(
      ((profiles ?? []) as any[]).map((p) => [p.id, p]),
    );

    return rows.map((row) => {
      const profile = profileById.get(row.user_id) ?? {};
      return {
        id: row.user_id,
        name: profile.display_name || profile.username || "Traveler",
        avatar: profile.avatar_url || "/placeholder.svg",
      } as TripCollaborator;
    });
  } catch (err) {
    if (USE_MOCK_FALLBACK) {
      console.warn("[tripCollab] listTripMembers fallback:", err);
      return [];
    }
    throw err;
  }
}

// ---------------------------------------------------------------------------
// trip_venue_ideas / trip_venue_votes
// ---------------------------------------------------------------------------

export async function listVenueIdeas(tripId: string): Promise<VenueIdeaRecord[]> {
  try {
    const { data, error } = await table("trip_venue_ideas")
      .select(
        `*, trip_venue_votes ( id, vote_type, user_name, user_avatar )`,
      )
      .eq("trip_id", tripId)
      .order("created_at", { ascending: false });
    if (error) throw error;
    return (data ?? []) as VenueIdeaRecord[];
  } catch (err) {
    if (USE_MOCK_FALLBACK) {
      console.warn("[tripCollab] listVenueIdeas fallback:", err);
      return [];
    }
    throw err;
  }
}

export async function proposeVenueIdea(idea: {
  trip_id: string;
  venue_id: string;
  venue_name: string;
  venue_address?: string | null;
  venue_city?: string | null;
  venue_rating?: number | null;
  venue_image_url?: string | null;
  proposed_by_id: string;
  proposed_by_name: string;
  proposed_by_avatar: string;
  notes?: string | null;
  status?: string;
}): Promise<VenueIdeaRecord> {
  const { data, error } = await table("trip_venue_ideas")
    .insert({
      trip_id: idea.trip_id,
      venue_id: idea.venue_id,
      venue_name: idea.venue_name,
      venue_address: idea.venue_address ?? null,
      venue_city: idea.venue_city ?? null,
      venue_rating: idea.venue_rating ?? null,
      venue_image_url: idea.venue_image_url ?? null,
      proposed_by_id: idea.proposed_by_id,
      proposed_by_name: idea.proposed_by_name,
      proposed_by_avatar: idea.proposed_by_avatar,
      notes: idea.notes ?? null,
      status: idea.status ?? "pending",
    })
    .select("*")
    .single();
  if (error) throw error;
  return data as VenueIdeaRecord;
}

export async function voteOnVenueIdea(vote: {
  venue_idea_id: string;
  vote_type: "up" | "down";
  user_id: string;
  user_name: string;
  user_avatar: string;
}): Promise<void> {
  const { error } = await table("trip_venue_votes").insert({
    venue_idea_id: vote.venue_idea_id,
    vote_type: vote.vote_type,
    user_id: vote.user_id,
    user_name: vote.user_name,
    user_avatar: vote.user_avatar,
  });
  if (error) throw error;
}

// ---------------------------------------------------------------------------
// trip_messages
// ---------------------------------------------------------------------------

export async function listTripMessages(tripId: string): Promise<TripMessageRecord[]> {
  try {
    const { data, error } = await table("trip_messages")
      .select("*")
      .eq("trip_id", tripId)
      .order("created_at", { ascending: true });
    if (error) throw error;
    return (data ?? []) as TripMessageRecord[];
  } catch (err) {
    if (USE_MOCK_FALLBACK) {
      console.warn("[tripCollab] listTripMessages fallback:", err);
      return [];
    }
    throw err;
  }
}

export async function sendTripMessage(message: {
  trip_id: string;
  content: string;
  user_id: string;
  user_name: string;
  user_avatar: string;
  message_type?: string;
}): Promise<TripMessageRecord> {
  const { data, error } = await table("trip_messages")
    .insert({
      trip_id: message.trip_id,
      content: message.content,
      user_id: message.user_id,
      user_name: message.user_name,
      user_avatar: message.user_avatar,
      message_type: message.message_type ?? "text",
    })
    .select("*")
    .single();
  if (error) throw error;
  return data as TripMessageRecord;
}

// ---------------------------------------------------------------------------
// user_places (My Places)
// ---------------------------------------------------------------------------

export type UserPlaceStatus = "visited" | "want_to_visit";

export interface UserPlaceRecord {
  id: string;
  user_id: string;
  location_id: string;
  location_name: string | null;
  location_city: string | null;
  status: UserPlaceStatus;
  created_at: string;
}

export async function listUserPlaces(
  userId: string,
  status: UserPlaceStatus,
): Promise<UserPlaceRecord[]> {
  try {
    const { data, error } = await table("user_places")
      .select("*")
      .eq("user_id", userId)
      .eq("status", status)
      .order("created_at", { ascending: false });
    if (error) throw error;
    return (data ?? []) as UserPlaceRecord[];
  } catch (err) {
    if (USE_MOCK_FALLBACK) {
      console.warn("[tripCollab] listUserPlaces fallback:", err);
      return [];
    }
    throw err;
  }
}

export async function addUserPlace(place: {
  user_id: string;
  location_id: string;
  location_name?: string | null;
  location_city?: string | null;
  status: UserPlaceStatus;
}): Promise<void> {
  const { error } = await table("user_places").insert({
    user_id: place.user_id,
    location_id: place.location_id,
    location_name: place.location_name ?? null,
    location_city: place.location_city ?? null,
    status: place.status,
  });
  // 23505 = unique violation (already saved with this status) — treat as success.
  if (error && (error as any).code !== "23505") throw error;
}

export async function removeUserPlace(
  userId: string,
  locationId: string,
  status: UserPlaceStatus,
): Promise<void> {
  const { error } = await table("user_places")
    .delete()
    .eq("user_id", userId)
    .eq("location_id", locationId)
    .eq("status", status);
  if (error) throw error;
}
