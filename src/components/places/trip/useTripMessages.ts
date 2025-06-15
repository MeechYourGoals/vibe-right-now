
import { useState, useEffect } from 'react';
import { db } from '@/services/database';
import { TripMessage } from '@/services/database/repositories/TripRepository';
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const useTripMessages = (tripId: string) => {
  const [messages, setMessages] = useState<TripMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
    subscribeToMessages();
  }, [tripId]);

  const fetchMessages = async () => {
    try {
      const result = await db.trips.getMessages(tripId);
      if (result.success && result.data) {
        setMessages(result.data);
      } else if (result.error) {
        console.error('Error fetching messages:', result.error);
        toast.error('Failed to load messages');
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast.error('Failed to load messages');
    } finally {
      setIsLoading(false);
    }
  };

  const subscribeToMessages = () => {
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
          setMessages(prev => [...prev, payload.new as TripMessage]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const sendMessage = async (content: string, userId: string, userName: string, userAvatar: string) => {
    try {
      const result = await db.trips.sendMessage({
        trip_id: tripId,
        content,
        user_id: userId,
        user_name: userName,
        user_avatar: userAvatar,
        message_type: 'text'
      });

      if (!result.success) {
        throw result.error || new Error('Failed to send message');
      }
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
