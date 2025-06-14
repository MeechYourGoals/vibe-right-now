
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Send, Settings, Search } from "lucide-react";
import { useUserSubscription } from '@/hooks/useUserSubscription';

interface Message {
  id: string;
  content: string;
  timestamp: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  senderType: 'user' | 'venue';
}

interface Conversation {
  id: string;
  venueId: string;
  venueName: string;
  venueAvatar: string;
  lastMessage?: Message;
  unreadCount: number;
  isActive: boolean;
}

const VenueMessaging: React.FC = () => {
  const { hasFeature } = useUserSubscription();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [messagingEnabled, setMessagingEnabled] = useState(true);

  const canUseVenueMessaging = hasFeature('venueMessaging');

  useEffect(() => {
    if (canUseVenueMessaging) {
      loadConversations();
    }
  }, [canUseVenueMessaging]);

  const loadConversations = () => {
    // Mock data - in real app this would come from API
    const mockConversations: Conversation[] = [
      {
        id: '1',
        venueId: 'venue-1',
        venueName: 'The Rooftop Bar',
        venueAvatar: '/placeholder.svg',
        lastMessage: {
          id: '1',
          content: 'Thanks for your inquiry! We have availability for tonight.',
          timestamp: new Date().toISOString(),
          senderId: 'venue-1',
          senderName: 'The Rooftop Bar',
          senderAvatar: '/placeholder.svg',
          senderType: 'venue'
        },
        unreadCount: 1,
        isActive: true
      }
    ];
    setConversations(mockConversations);
  };

  const sendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;

    const message: Message = {
      id: Date.now().toString(),
      content: newMessage,
      timestamp: new Date().toISOString(),
      senderId: 'current-user',
      senderName: 'You',
      senderAvatar: '/placeholder.svg',
      senderType: 'user'
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  const toggleMessaging = () => {
    setMessagingEnabled(!messagingEnabled);
  };

  if (!canUseVenueMessaging) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="text-center py-8">
          <h3 className="text-lg font-semibold mb-2">Venue Messaging</h3>
          <p className="text-muted-foreground mb-4">
            Upgrade to Plus or higher to message venues directly
          </p>
          <Button>Upgrade Plan</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-6xl mx-auto h-[600px] flex gap-4">
      {/* Conversations List */}
      <Card className="w-1/3">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Messages</CardTitle>
            <Button variant="ghost" size="sm" onClick={toggleMessaging}>
              <Settings className="h-4 w-4" />
            </Button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search venues..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`p-4 border-b cursor-pointer hover:bg-muted/50 ${
                selectedConversation === conversation.id ? 'bg-muted' : ''
              }`}
              onClick={() => setSelectedConversation(conversation.id)}
            >
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={conversation.venueAvatar} alt={conversation.venueName} />
                  <AvatarFallback>{conversation.venueName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium truncate">{conversation.venueName}</h4>
                    {conversation.unreadCount > 0 && (
                      <Badge variant="destructive" className="h-5 w-5 p-0 text-xs">
                        {conversation.unreadCount}
                      </Badge>
                    )}
                  </div>
                  {conversation.lastMessage && (
                    <p className="text-sm text-muted-foreground truncate">
                      {conversation.lastMessage.content}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Chat Window */}
      <Card className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            <CardHeader className="border-b">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder.svg" alt="Venue" />
                  <AvatarFallback>V</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">The Rooftop Bar</h3>
                  <p className="text-sm text-muted-foreground">Usually responds within an hour</p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.senderType === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs px-3 py-2 rounded-lg ${
                        message.senderType === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-foreground'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  disabled={!messagingEnabled}
                />
                <Button onClick={sendMessage} disabled={!messagingEnabled}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              {!messagingEnabled && (
                <p className="text-xs text-muted-foreground mt-2">
                  You have opted out of venue messaging. Enable it in settings to continue.
                </p>
              )}
            </div>
          </>
        ) : (
          <CardContent className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Select a conversation</h3>
              <p className="text-muted-foreground">
                Choose a venue from the list to start messaging
              </p>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default VenueMessaging;
