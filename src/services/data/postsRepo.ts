import type { Post } from "@/types";
import { mockPosts } from "@/mock/posts";
import { supabase, table, withFallback, USE_MOCK_FALLBACK } from "./config";
import { mapProfileToUser } from "./profilesRepo";

const POST_SELECT = "*, author:profiles!posts_author_id_fkey(*)";

/** Map a `posts` DB row (optionally with joined author) to the app's Post type. */
export function mapRowToPost(row: any): Post {
  const media = Array.isArray(row.media) ? row.media : [];
  return {
    id: row.id,
    userId: row.author_id,
    user: row.author ? mapProfileToUser(row.author) : undefined,
    content: row.content ?? "",
    media,
    vibes: row.vibe_tags ?? [],
    vibeTags: row.vibe_tags ?? [],
    timestamp: row.created_at,
    likes: row.likes_count ?? 0,
    comments: row.comments_count ?? 0,
    saved: false,
    isVenuePost: row.is_venue_post ?? false,
    isPinned: false,
    visibility: row.visibility ?? "public",
    location: row.location_id
      ? {
          id: row.location_id,
          name: row.location_name ?? "",
          city: row.location_city ?? "",
          state: row.location_state ?? "",
        }
      : undefined,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  } as Post;
}

export interface CreatePostInput {
  authorId: string;
  content: string;
  media?: unknown[];
  vibeTags?: string[];
  visibility?: "public" | "friends" | "private";
  location?: { id?: string; name?: string; city?: string; state?: string };
  isVenuePost?: boolean;
}

export const postsRepo = {
  async getFeed(limit = 50): Promise<Post[]> {
    return withFallback<Post[]>(
      "posts.getFeed",
      async () => {
        const { data, error } = await table("posts")
          .select(POST_SELECT)
          .eq("visibility", "public")
          .order("created_at", { ascending: false })
          .limit(limit);
        return { data: (data ?? []).map(mapRowToPost), error };
      },
      () => mockPosts,
    );
  },

  async getByUser(userId: string): Promise<Post[]> {
    return withFallback<Post[]>(
      "posts.getByUser",
      async () => {
        const { data, error } = await table("posts")
          .select(POST_SELECT)
          .eq("author_id", userId)
          .order("created_at", { ascending: false });
        return { data: (data ?? []).map(mapRowToPost), error };
      },
      () => mockPosts.filter((p) => p.userId === userId || p.user?.id === userId),
    );
  },

  async getByVenue(locationId: string): Promise<Post[]> {
    return withFallback<Post[]>(
      "posts.getByVenue",
      async () => {
        const { data, error } = await table("posts")
          .select(POST_SELECT)
          .eq("location_id", locationId)
          .order("created_at", { ascending: false });
        return { data: (data ?? []).map(mapRowToPost), error };
      },
      () => mockPosts.filter((p) => p.location?.id === locationId),
    );
  },

  async create(input: CreatePostInput): Promise<Post> {
    const { data, error } = await table("posts")
      .insert({
        author_id: input.authorId,
        content: input.content,
        media: input.media ?? [],
        vibe_tags: input.vibeTags ?? [],
        visibility: input.visibility ?? "public",
        is_venue_post: input.isVenuePost ?? false,
        location_id: input.location?.id ?? null,
        location_name: input.location?.name ?? null,
        location_city: input.location?.city ?? null,
        location_state: input.location?.state ?? null,
      })
      .select(POST_SELECT)
      .single();
    if (error) throw error;
    return mapRowToPost(data);
  },

  async remove(id: string): Promise<void> {
    const { error } = await table("posts").delete().eq("id", id);
    if (error) throw error;
  },

  async toggleLike(postId: string, userId: string, liked: boolean): Promise<void> {
    if (liked) {
      const { error } = await table("post_likes").insert({ post_id: postId, user_id: userId });
      if (error && error.code !== "23505") throw error; // ignore duplicate
    } else {
      const { error } = await table("post_likes")
        .delete()
        .eq("post_id", postId)
        .eq("user_id", userId);
      if (error) throw error;
    }
  },

  async toggleSave(postId: string, userId: string, saved: boolean): Promise<void> {
    if (saved) {
      const { error } = await table("saved_posts").insert({ post_id: postId, user_id: userId });
      if (error && error.code !== "23505") throw error;
    } else {
      const { error } = await table("saved_posts")
        .delete()
        .eq("post_id", postId)
        .eq("user_id", userId);
      if (error) throw error;
    }
  },

  async getSaved(userId: string): Promise<Post[]> {
    return withFallback<Post[]>(
      "posts.getSaved",
      async () => {
        const { data, error } = await table("saved_posts")
          .select(`post:posts(${POST_SELECT})`)
          .eq("user_id", userId);
        const posts = (data ?? []).map((r: any) => mapRowToPost(r.post)).filter(Boolean);
        return { data: posts, error };
      },
      () => mockPosts.filter((p) => p.saved),
    );
  },

  /** Upload post media to the `post-media` storage bucket and return public URLs. */
  async uploadMedia(userId: string, files: File[]): Promise<string[]> {
    const urls: string[] = [];
    for (const file of files) {
      const path = `${userId}/${Date.now()}-${file.name}`;
      const { error } = await supabase.storage.from("post-media").upload(path, file);
      if (error) {
        if (USE_MOCK_FALLBACK) {
          urls.push(URL.createObjectURL(file));
          continue;
        }
        throw error;
      }
      const { data } = supabase.storage.from("post-media").getPublicUrl(path);
      urls.push(data.publicUrl);
    }
    return urls;
  },
};
