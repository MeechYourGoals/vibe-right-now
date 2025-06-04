
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface TripMessage {
  id: string;
  content: string;
  user_name: string;
  user_avatar: string;
  user_id: string;
  created_at: string;
  message_type: string;
  trip_id: string;
}

export const useTripMessages = (tripId: string) => {
  const [messages, setMessages] = useState<TripMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
    subscribeToMessages();
  }, [tripId]);

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('trip_messages')
        .select('*')
        .eq('trip_id', tripId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setMessages(data || []);
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
      const { error } = await supabase
        .from('trip_messages')
        .insert({
          trip_id: tripId,
          content,
          user_id: userId,
          user_name: userName,
          user_avatar: userAvatar,
          message_type: 'text'
        });

      if (error) throw error;
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
