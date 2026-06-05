import type { Comment } from "@/types";
import { mockComments } from "@/mock/comments";
import { table, withFallback } from "./config";
import { mapProfileToUser } from "./profilesRepo";

const COMMENT_SELECT = "*, author:profiles!comments_author_id_fkey(*)";

function mapRowToComment(row: any): Comment {
  const user = row.author ? mapProfileToUser(row.author) : undefined;
  return {
    id: row.id,
    postId: row.post_id,
    contentId: row.post_id,
    userId: row.author_id,
    user,
    author: user,
    content: row.content,
    body: row.content,
    timestamp: row.created_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    likes: row.likes_count ?? 0,
    parentId: row.parent_id ?? undefined,
    status: "published",
    engagement: { likes: row.likes_count ?? 0, replies: 0, reactions: [] },
    moderation: { status: "approved", flags: [] },
  } as Comment;
}

export const commentsRepo = {
  async getForPost(postId: string): Promise<Comment[]> {
    return withFallback<Comment[]>(
      "comments.getForPost",
      async () => {
        const { data, error } = await table("comments")
          .select(COMMENT_SELECT)
          .eq("post_id", postId)
          .order("created_at", { ascending: true });
        return { data: (data ?? []).map(mapRowToComment), error };
      },
      () => mockComments.filter((c) => c.postId === postId),
    );
  },

  async create(input: {
    postId: string;
    authorId: string;
    content: string;
    parentId?: string;
  }): Promise<Comment> {
    const { data, error } = await table("comments")
      .insert({
        post_id: input.postId,
        author_id: input.authorId,
        content: input.content,
        parent_id: input.parentId ?? null,
      })
      .select(COMMENT_SELECT)
      .single();
    if (error) throw error;
    return mapRowToComment(data);
  },

  async remove(id: string): Promise<void> {
    const { error } = await table("comments").delete().eq("id", id);
    if (error) throw error;
  },
};
