
import { useState, useEffect } from 'react';
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import {
  listTripMessages,
  sendTripMessage,
  getCurrentUserId,
  TripMessageRecord,
} from "@/services/trips/tripCollabService";

export type TripMessage = TripMessageRecord;

export const useTripMessages = (tripId: string) => {
  const [messages, setMessages] = useState<TripMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
    const unsubscribe = subscribeToMessages();
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tripId]);

  const fetchMessages = async () => {
    try {
      const rows = await listTripMessages(tripId);
      setMessages(rows);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const subscribeToMessages = () => {
    try {
      const channel = supabase
        .channel(`trip-messages-${tripId}`)
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'trip_messages',
            filter: `trip_id=eq.${tripId}`
          },
          (payload) => {
            setMessages(prev => {
              const incoming = payload.new as TripMessage;
              if (prev.some(m => m.id === incoming.id)) return prev;
              return [...prev, incoming];
            });
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    } catch (err) {
      // Realtime is optional; keep the chat working without it.
      console.warn('[useTripMessages] realtime subscribe failed:', err);
      return () => {};
    }
  };

  const sendMessage = async (
    content: string,
    userId: string,
    userName: string,
    userAvatar: string,
  ) => {
    const uid = (await getCurrentUserId()) || userId;
    if (!uid || uid === "current-user") {
      toast.error('Please sign in to send a message');
      return;
    }
    try {
      const created = await sendTripMessage({
        trip_id: tripId,
        content,
        user_id: uid,
        user_name: userName,
        user_avatar: userAvatar,
        message_type: 'text',
      });
      // Optimistically append in case realtime is unavailable.
      setMessages(prev =>
        prev.some(m => m.id === created.id) ? prev : [...prev, created],
      );
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
    }
  };

  return {
    messages,
    isLoading,
    sendMessage,
    fetchMessages
  };
};
