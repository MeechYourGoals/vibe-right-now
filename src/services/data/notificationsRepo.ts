import { table, withFallback } from "./config";

export interface AppNotification {
  id: string;
  type: string;
  title: string;
  body?: string;
  link?: string;
  read: boolean;
  createdAt: string;
}

function mapRow(row: any): AppNotification {
  return {
    id: row.id,
    type: row.type ?? "info",
    title: row.title,
    body: row.body ?? undefined,
    link: row.link ?? undefined,
    read: row.read ?? false,
    createdAt: row.created_at,
  };
}

export const notificationsRepo = {
  async list(userId: string): Promise<AppNotification[]> {
    return withFallback<AppNotification[]>(
      "notifications.list",
      async () => {
        const { data, error } = await table("notifications")
          .select("*")
          .eq("user_id", userId)
          .order("created_at", { ascending: false })
          .limit(50);
        return { data: (data ?? []).map(mapRow), error };
      },
      () => [],
    );
  },

  async markRead(id: string): Promise<void> {
    const { error } = await table("notifications").update({ read: true }).eq("id", id);
    if (error) throw error;
  },

  async markAllRead(userId: string): Promise<void> {
    const { error } = await table("notifications")
      .update({ read: true })
      .eq("user_id", userId)
      .eq("read", false);
    if (error) throw error;
  },
};
