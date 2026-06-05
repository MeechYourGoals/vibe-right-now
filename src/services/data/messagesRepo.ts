import { mockVenueConversations } from "@/components/messaging/mockVenueData";
import { table, supabase, withFallback } from "./config";

/** Normalized conversation/message shapes (compatible with the venue messaging UI). */
export interface ChatMessage {
  id: string;
  content: string;
  timestamp: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  senderType: "user" | "venue";
  messageType?: string;
}

export interface ChatConversation {
  id: string;
  venueId: string;
  venueName: string;
  venueAvatar: string;
  venueType?: string;
  unreadCount: number;
  isActive: boolean;
  responseTime?: string;
  messages: ChatMessage[];
  lastMessage?: ChatMessage;
}

function mapRowToMessage(row: any): ChatMessage {
  return {
    id: row.id,
    content: row.content,
    timestamp: row.created_at,
    senderId: row.sender_id ?? "",
    senderName: row.sender_type === "venue" ? "Venue" : "You",
    senderAvatar: "",
    senderType: row.sender_type ?? "user",
    messageType: row.message_type,
  };
}

export const messagesRepo = {
  async listConversations(userId: string): Promise<ChatConversation[]> {
    return withFallback<ChatConversation[]>(
      "messages.listConversations",
      async () => {
        const { data, error } = await table("conversations")
          .select("*, messages(*)")
          .eq("created_by", userId)
          .order("updated_at", { ascending: false });
        const convs: ChatConversation[] = (data ?? []).map((c: any) => {
          const messages = (c.messages ?? [])
            .map(mapRowToMessage)
            .sort((a: ChatMessage, b: ChatMessage) => a.timestamp.localeCompare(b.timestamp));
          return {
            id: c.id,
            venueId: c.venue_id ?? c.thread_key,
            venueName: c.venue_name ?? c.title ?? "Conversation",
            venueAvatar: c.venue_avatar ?? "",
            venueType: undefined,
            unreadCount: (c.messages ?? []).filter(
              (m: any) => m.sender_type === "venue" && !m.read,
            ).length,
            isActive: true,
            responseTime: undefined,
            messages,
            lastMessage: messages[messages.length - 1],
          };
        });
        return { data: convs, error };
      },
      () => mockVenueConversations as unknown as ChatConversation[],
    );
  },

  async sendMessage(input: {
    conversationId: string;
    senderId: string;
    content: string;
    senderType?: "user" | "venue";
    messageType?: string;
  }): Promise<ChatMessage> {
    const { data, error } = await table("messages")
      .insert({
        conversation_id: input.conversationId,
        sender_id: input.senderId,
        sender_type: input.senderType ?? "user",
        message_type: input.messageType ?? "general",
        content: input.content,
      })
      .select("*")
      .single();
    if (error) throw error;
    return mapRowToMessage(data);
  },

  /** Find-or-create a conversation thread (e.g. for a venue) for the given user. */
  async ensureConversation(input: {
    userId: string;
    threadKey: string;
    venueId?: string;
    venueName?: string;
    venueAvatar?: string;
  }): Promise<string> {
    const existing = await table("conversations")
      .select("id")
      .eq("created_by", input.userId)
      .eq("thread_key", input.threadKey)
      .maybeSingle();
    if (existing?.data?.id) return existing.data.id;
    const { data, error } = await table("conversations")
      .insert({
        created_by: input.userId,
        thread_key: input.threadKey,
        venue_id: input.venueId ?? null,
        venue_name: input.venueName ?? null,
        venue_avatar: input.venueAvatar ?? null,
      })
      .select("id")
      .single();
    if (error) throw error;
    return data.id;
  },

  /** Subscribe to new messages in a conversation via Supabase Realtime. */
  subscribe(conversationId: string, onMessage: (m: ChatMessage) => void) {
    const channel = supabase
      .channel(`messages:${conversationId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload: any) => onMessage(mapRowToMessage(payload.new)),
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  },
};
