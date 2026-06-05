import type { Post } from "@/types";
import { postsRepo, table, type CreatePostInput } from "@/services/data";
import { getCurrentUserId } from "./currentUser";

export interface NewPostParams {
  content: string;
  files?: File[];
  /** Pre-uploaded media URLs (e.g. captured camera webPaths). */
  mediaUrls?: string[];
  vibeTags?: string[];
  visibility?: "public" | "friends" | "private";
  location?: { id?: string; name?: string; city?: string; state?: string };
  isVenuePost?: boolean;
}

export interface CheckInParams extends NewPostParams {
  /** Optional free-form note saved on the check_ins row. */
  note?: string;
}

/** Result returned when no user is signed in, so callers can prompt sign-in. */
export class NotSignedInError extends Error {
  constructor() {
    super("not-signed-in");
    this.name = "NotSignedInError";
  }
}

/**
 * Upload any provided files and create a post via the data layer.
 * Throws {@link NotSignedInError} when nobody is signed in.
 */
export async function createPost(params: NewPostParams): Promise<Post> {
  const userId = await getCurrentUserId();
  if (!userId) throw new NotSignedInError();

  const media: string[] = [...(params.mediaUrls ?? [])];
  if (params.files && params.files.length > 0) {
    const uploaded = await postsRepo.uploadMedia(userId, params.files);
    media.push(...uploaded);
  }

  const input: CreatePostInput = {
    authorId: userId,
    content: params.content,
    media,
    vibeTags: params.vibeTags,
    visibility: params.visibility ?? "public",
    location: params.location,
    isVenuePost: params.isVenuePost,
  };

  return postsRepo.create(input);
}

/**
 * Perform a check-in: optionally upload a photo, write a `check_ins` row, and create a
 * post referencing the venue. Returns the created post.
 *
 * Throws {@link NotSignedInError} when nobody is signed in. The `check_ins` insert is
 * best-effort — if it fails (e.g. RLS / missing table in demo mode) we still create the
 * post so the demo flow completes.
 */
export async function checkInAndPost(params: CheckInParams): Promise<Post> {
  const userId = await getCurrentUserId();
  if (!userId) throw new NotSignedInError();

  // Upload photo(s) first so the URL can be stored on both the check-in and the post.
  const media: string[] = [...(params.mediaUrls ?? [])];
  if (params.files && params.files.length > 0) {
    const uploaded = await postsRepo.uploadMedia(userId, params.files);
    media.push(...uploaded);
  }

  // Write the check_ins row (best-effort).
  try {
    const { error } = await table("check_ins").insert({
      user_id: userId,
      location_id: params.location?.id ?? null,
      location_name: params.location?.name ?? null,
      photo_url: media[0] ?? null,
      note: params.note ?? params.content ?? null,
    });
    if (error) console.warn("[check_ins] insert failed (continuing):", error);
  } catch (err) {
    console.warn("[check_ins] insert threw (continuing):", err);
  }

  // Create the post for the check-in.
  return postsRepo.create({
    authorId: userId,
    content: params.content,
    media,
    vibeTags: params.vibeTags,
    visibility: params.visibility ?? "public",
    location: params.location,
    isVenuePost: params.isVenuePost ?? true,
  });
}
