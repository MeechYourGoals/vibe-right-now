import { supabase, table } from "@/services/data";

/**
 * Follow graph helpers built on the `follows` table (follower_id, followee_id).
 *
 * Reads are tolerant: when the query errors or the table is empty they return
 * safe defaults so signed-out / mock mode keeps rendering. Writes require an
 * authenticated session (RLS enforces follower_id = auth.uid()); callers should
 * gate them on the current store user and surface a sign-in prompt otherwise.
 */
export const followService = {
  /** Is `followerId` currently following `followeeId`? */
  async isFollowing(followerId: string, followeeId: string): Promise<boolean> {
    if (!followerId || !followeeId) return false;
    try {
      const { data, error } = await table("follows")
        .select("follower_id")
        .eq("follower_id", followerId)
        .eq("followee_id", followeeId)
        .maybeSingle();
      if (error) throw error;
      return !!data;
    } catch (err) {
      console.warn("[follows.isFollowing] fallback:", err);
      return false;
    }
  },

  /** Follow a user. Idempotent: duplicate rows are ignored. */
  async follow(followerId: string, followeeId: string): Promise<void> {
    const { error } = await table("follows").insert({
      follower_id: followerId,
      followee_id: followeeId,
    });
    if (error && (error as { code?: string }).code !== "23505") throw error;
  },

  /** Unfollow a user. */
  async unfollow(followerId: string, followeeId: string): Promise<void> {
    const { error } = await table("follows")
      .delete()
      .eq("follower_id", followerId)
      .eq("followee_id", followeeId);
    if (error) throw error;
  },

  /** Number of followers for a user. */
  async followerCount(userId: string): Promise<number> {
    try {
      const { count, error } = await table("follows")
        .select("follower_id", { count: "exact", head: true })
        .eq("followee_id", userId);
      if (error) throw error;
      return count ?? 0;
    } catch (err) {
      console.warn("[follows.followerCount] fallback:", err);
      return 0;
    }
  },

  /** Number of accounts a user follows. */
  async followingCount(userId: string): Promise<number> {
    try {
      const { count, error } = await table("follows")
        .select("followee_id", { count: "exact", head: true })
        .eq("follower_id", userId);
      if (error) throw error;
      return count ?? 0;
    } catch (err) {
      console.warn("[follows.followingCount] fallback:", err);
      return 0;
    }
  },
};

export { supabase };
export default followService;
