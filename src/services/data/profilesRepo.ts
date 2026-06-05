import type { User } from "@/types";
import { mockUsers, getUserById, getUserByUsername } from "@/mock/users";
import { table, withFallback } from "./config";

/** Map a `profiles` DB row to the app's rich User type. */
export function mapProfileToUser(row: any): User {
  return {
    id: row.id,
    username: row.username ?? "",
    displayName: row.display_name ?? row.name ?? row.username,
    name: row.name ?? row.display_name ?? row.username ?? "",
    email: row.email ?? undefined,
    avatar: row.avatar_url ?? undefined,
    bio: row.bio ?? undefined,
    verified: row.verified ?? false,
    isPrivate: row.is_private ?? false,
    createdAt: row.created_at ?? undefined,
    updatedAt: row.updated_at ?? undefined,
  };
}

function mockUserToUser(u: any): User {
  return {
    id: u.id,
    username: u.username,
    displayName: u.name ?? u.username,
    name: u.name ?? u.username,
    avatar: u.avatar,
    bio: u.bio,
    verified: u.verified,
    followers: u.followers,
    following: u.following,
    posts: u.posts,
  };
}

export const profilesRepo = {
  async getById(id: string): Promise<User | null> {
    return withFallback<User | null>(
      "profiles.getById",
      async () => {
        const { data, error } = await table("profiles").select("*").eq("id", id).maybeSingle();
        return { data: data ? mapProfileToUser(data) : null, error };
      },
      () => {
        const u = getUserById(id);
        return u ? mockUserToUser(u) : null;
      },
      false,
    );
  },

  async getByUsername(username: string): Promise<User | null> {
    return withFallback<User | null>(
      "profiles.getByUsername",
      async () => {
        const { data, error } = await table("profiles")
          .select("*")
          .eq("username", username)
          .maybeSingle();
        return { data: data ? mapProfileToUser(data) : null, error };
      },
      () => {
        const u = getUserByUsername(username);
        return u ? mockUserToUser(u) : null;
      },
      false,
    );
  },

  /** Persist profile edits (ProfileBio save). Requires an authenticated session. */
  async update(id: string, updates: Partial<User>): Promise<User | null> {
    const payload: Record<string, unknown> = {};
    if (updates.displayName !== undefined) payload.display_name = updates.displayName;
    if (updates.name !== undefined) payload.name = updates.name;
    if (updates.bio !== undefined) payload.bio = updates.bio;
    if (updates.avatar !== undefined) payload.avatar_url = updates.avatar;
    if (updates.isPrivate !== undefined) payload.is_private = updates.isPrivate;

    const { data, error } = await table("profiles")
      .update(payload)
      .eq("id", id)
      .select("*")
      .maybeSingle();
    if (error) throw error;
    return data ? mapProfileToUser(data) : null;
  },

  async listSuggested(limit = 10): Promise<User[]> {
    return withFallback<User[]>(
      "profiles.listSuggested",
      async () => {
        const { data, error } = await table("profiles").select("*").limit(limit);
        return { data: (data ?? []).map(mapProfileToUser), error };
      },
      () => mockUsers.slice(0, limit).map(mockUserToUser),
    );
  },
};
