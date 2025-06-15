
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Send, Settings, Bell } from "lucide-react";
import { useUserSubscription } from '@/hooks/useUserSubscription';
import { mockVenueConversations, MockVenueConversation, VenueMessage } from './mockVenueData';
import MessageTypeBadge from './MessageTypeBadge';
import VenueMessagingSettings from './VenueMessagingSettings';

const VenueMessaging: React.FC = () => {
  const { hasFeature } = useUserSubscription();
  const [conversations, setConversations] = useState<MockVenueConversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messages, setMessages] = useState<VenueMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [messagingEnabled, setMessagingEnabled] = useState(true);

  const canUseVenueMessaging = hasFeature('venueMessaging');

  useEffect(() => {
    if (canUseVenueMessaging) {
      loadConversations();
    }
  }, [canUseVenueMessaging]);

  useEffect(() => {
    if (selectedConversation) {
      const conversation = conversations.find(c => c.id === selectedConversation);
      if (conversation) {
        setMessages(conversation.messages);
        // Mark as read
        setConversations(prev => prev.map(c =>
          c.id === selectedConversation ? { ...c, unreadCount: 0 } : c
        ));
      }
    }
  }, [selectedConversation, conversations]);

  const loadConversations = () => {
    setConversations(mockVenueConversations);
    if (mockVenueConversations.length > 0) {
      setSelectedConversation(mockVenueConversations[0].id);
    }
  };

  const sendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;

    const message: VenueMessage = {
      id: Date.now().toString(),
      content: newMessage,
      timestamp: new Date().toISOString(),
      senderId: 'current-user',
      senderName: 'You',
      senderAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&auto=format',
      senderType: 'user'
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');

    // Update the conversation's last message
    setConversations(prev => prev.map(c =>
      c.id === selectedConversation
        ? { ...c, lastMessage: message, messages: [...c.messages, message] }
        : c
    ));
  };

  const filteredConversations = conversations.filter(conversation =>
    conversation.venueName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedConv = conversations.find(c => c.id === selectedConversation);

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
            <div className="flex items-center gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Bell className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Notification Settings</DialogTitle>
                  </DialogHeader>
                  <div className="mt-4">
                    <VenueMessagingSettings />
                  </div>
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Messaging Settings</DialogTitle>
                  </DialogHeader>
                  <div className="mt-4">
                    <VenueMessagingSettings />
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <div className="relative">
            <Input
              placeholder="Search venues..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {filteredConversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`p-4 border-b cursor-pointer hover:bg-muted/50 ${
                selectedConversation === conversation.id ? 'bg-muted' : ''
              }`}
              onClick={() => setSelectedConversation(conversation.id)}
            >
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={conversation.venueAvatar} alt={conversation.venueName} />
                  <AvatarFallback>{conversation.venueName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium truncate">{conversation.venueName}</h4>
                      {conversation.unreadCount > 0 && (
                        <Badge variant="destructive" className="h-5 w-5 p-0 text-xs flex items-center justify-center">
                          {conversation.unreadCount}
                        </Badge>
                      )}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {conversation.venueType}
                    </Badge>
                  </div>
                  {conversation.lastMessage && (
                    <div className="flex items-center gap-2 mt-1">
                      <MessageTypeBadge type={conversation.lastMessage.messageType} />
                      <p className="text-sm text-muted-foreground truncate flex-1">
                        {conversation.lastMessage.content}
                      </p>
                    </div>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">
                    {conversation.responseTime}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Chat Window */}
      <Card className="flex-1 flex flex-col">
        {selectedConv ? (
          <>
            <CardHeader className="border-b">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={selectedConv.venueAvatar} alt={selectedConv.venueName} />
                  <AvatarFallback>{selectedConv.venueName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{selectedConv.venueName}</h3>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {selectedConv.venueType}
                    </Badge>
                    <p className="text-sm text-muted-foreground">{selectedConv.responseTime}</p>
                  </div>
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
                    <div className="flex items-start gap-2 max-w-[80%]">
                      {message.senderType === 'venue' && (
                        <Avatar className="h-8 w-8 mt-1">
                          <AvatarImage src={message.senderAvatar} alt={message.senderName} />
                          <AvatarFallback>{message.senderName.charAt(0)}</AvatarFallback>
                        </Avatar>
                      )}
                      <div
                        className={`px-3 py-2 rounded-lg ${
                          message.senderType === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-foreground'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          {message.messageType && (
                            <MessageTypeBadge type={message.messageType} />
                          )}
                        </div>
                        <p className="text-sm">{message.content}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {new Date(message.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                      {message.senderType === 'user' && (
                        <Avatar className="h-8 w-8 mt-1">
                          <AvatarImage src={message.senderAvatar} alt={message.senderName} />
                          <AvatarFallback>{message.senderName.charAt(0)}</AvatarFallback>
                        </Avatar>
                      )}
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
