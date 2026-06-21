import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Search, ThumbsUp, ThumbsDown, Heart } from "lucide-react";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import {
  listTripMessages,
  sendTripMessage,
  getCurrentUserId,
  TripMessageRecord,
} from "@/services/trips/tripCollabService";

type TripMessage = TripMessageRecord;

interface TripChatWindowProps {
  tripId: string;
  collaborators: Array<{
    id: string;
    name: string;
    avatar: string;
  }>;
  userColors: Array<{ id: string; color: string }>;
}

interface ChatMessage extends TripMessage {
  reactions?: Array<{
    id: string;
    reaction_type: string;
    user_name: string;
  }>;
}

const TripChatWindow: React.FC<TripChatWindowProps> = ({
  tripId,
  collaborators,
  userColors
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentUser = {
    id: collaborators[0]?.id || "current-user",
    name: collaborators[0]?.name || "You",
    avatar: collaborators[0]?.avatar || "/placeholder.svg"
  };

  useEffect(() => {
    fetchMessages();
    const unsubscribe = subscribeToMessages();
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tripId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchMessages = async () => {
    try {
      const rows = await listTripMessages(tripId);
      // Try to enrich with reactions, but don't fail the view if that table
      // isn't present.
      try {
        const { data, error } = await (supabase as any).from('trip_messages')
          .select(`
            *,
            trip_message_reactions (
              id,
              reaction_type,
              user_name
            )
          `)
          .eq('trip_id', tripId)
          .order('created_at', { ascending: true });
        if (!error && data && data.length > 0) {
          setMessages(data as ChatMessage[]);
          return;
        }
      } catch {
        // ignore reaction enrichment failure
      }
      setMessages(rows as ChatMessage[]);
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
              const incoming = payload.new as ChatMessage;
              if (prev.some(m => m.id === incoming.id)) return prev;
              return [...prev, incoming];
            });
          }
        )
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'trip_message_reactions'
          },
          () => {
            fetchMessages(); // Refresh to get updated reactions
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    } catch (err) {
      console.warn('[TripChatWindow] realtime subscribe failed:', err);
      return () => {};
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    const uid = await getCurrentUserId();
    if (!uid) {
      toast.error('Please sign in to send a message');
      return;
    }

    try {
      const created = await sendTripMessage({
        trip_id: tripId,
        content: newMessage,
        user_id: uid,
        user_name: currentUser.name,
        user_avatar: currentUser.avatar,
        message_type: 'text'
      });
      setNewMessage('');
      setMessages(prev =>
        prev.some(m => m.id === created.id) ? prev : [...prev, created as ChatMessage],
      );
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
    }
  };

  const addReaction = async (messageId: string, reactionType: string) => {
    const uid = await getCurrentUserId();
    if (!uid) {
      toast.error('Please sign in to react');
      return;
    }
    try {
      const { error } = await (supabase as any).from('trip_message_reactions')
        .insert({
          message_id: messageId,
          reaction_type: reactionType,
          user_id: uid,
          user_name: currentUser.name,
        });
      if (error) throw error;
      fetchMessages();
    } catch (error) {
      console.error('Error adding reaction:', error);
      toast.error('Failed to add reaction');
    }
  };

  const filteredMessages = messages.filter(message =>
    message.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.user_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getUserColor = (userId: string) => {
    const colorIndex = collaborators.findIndex(c => c.id === userId);
    return userColors[colorIndex % userColors.length]?.color || '#3b82f6';
  };

  if (isLoading) {
    return <div className="text-center py-4">Loading messages...</div>;
  }

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search messages..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Messages */}
      <div className="h-96 overflow-y-auto space-y-4 border rounded-lg p-4">
        {filteredMessages.map((message) => (
          <div key={message.id} className="flex space-x-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={message.user_avatar} alt={message.user_name} />
              <AvatarFallback style={{ backgroundColor: getUserColor(message.user_id) }}>
                {message.user_name[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <span className="font-medium text-sm">{message.user_name}</span>
                <span className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(message.created_at), { addSuffix: true })}
                </span>
              </div>
              <p className="text-sm">{message.content}</p>
              
              {/* Reactions */}
              <div className="flex items-center space-x-2 mt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => addReaction(message.id, 'thumbs_up')}
                  className="h-6 px-2"
                >
                  <ThumbsUp className="h-3 w-3" />
                  {message.reactions?.filter(r => r.reaction_type === 'thumbs_up').length || 0}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => addReaction(message.id, 'thumbs_down')}
                  className="h-6 px-2"
                >
                  <ThumbsDown className="h-3 w-3" />
                  {message.reactions?.filter(r => r.reaction_type === 'thumbs_down').length || 0}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => addReaction(message.id, 'heart')}
                  className="h-6 px-2"
                >
                  <Heart className="h-3 w-3" />
                  {message.reactions?.filter(r => r.reaction_type === 'heart').length || 0}
                </Button>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="flex space-x-2">
        <Input
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          className="flex-1"
        />
        <Button onClick={sendMessage} disabled={!newMessage.trim()}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default TripChatWindow;
