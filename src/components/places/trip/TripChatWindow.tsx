
import React, { useState, useRef, useEffect } from 'react';
import { Send, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';

interface TripChatMessage {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  timestamp: Date;
  type: 'message' | 'system' | 'decision';
  reactions?: Array<{ emoji: string; users: string[] }>;
}

interface TripChatWindowProps {
  tripId: string | undefined;
  collaborators: Array<{ id: string; name: string; avatar: string }>;
  userColors: Array<{ id: string; color: string }>;
}

export const TripChatWindow: React.FC<TripChatWindowProps> = ({
  tripId,
  collaborators,
  userColors
}) => {
  const [messages, setMessages] = useState<TripChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!tripId) return;
    
    // Load or generate example chat messages
    const exampleMessages = generateExampleChatMessages(tripId, collaborators);
    setMessages(exampleMessages);
  }, [tripId, collaborators]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !tripId) return;
    
    const currentUser = collaborators[0];
    const newMsg: TripChatMessage = {
      id: `msg_${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.name,
      userAvatar: currentUser.avatar,
      content: newMessage,
      timestamp: new Date(),
      type: 'message'
    };
    
    setMessages(prev => [...prev, newMsg]);
    setNewMessage('');
    
    // Save to localStorage
    localStorage.setItem(`trip_chat_${tripId}`, JSON.stringify([...messages, newMsg]));
  };

  const filteredMessages = searchQuery 
    ? messages.filter(msg => 
        msg.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        msg.userName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : messages;

  return (
    <div className="flex flex-col h-[400px] bg-background border rounded-lg">
      {/* Search header */}
      <div className="p-3 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search messages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
      
      {/* Messages area */}
      <ScrollArea className="flex-1 p-3">
        <div className="space-y-3">
          {filteredMessages.map((message) => (
            <div key={message.id} className="flex items-start gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={message.userAvatar} />
                <AvatarFallback>{message.userName[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium">{message.userName}</span>
                  <span className="text-xs text-muted-foreground">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                <div className="bg-muted p-2 rounded-lg text-sm">
                  {message.content}
                </div>
                {message.reactions && message.reactions.length > 0 && (
                  <div className="flex gap-1 mt-1">
                    {message.reactions.map((reaction, idx) => (
                      <span key={idx} className="text-xs bg-muted-foreground/10 px-1 rounded">
                        {reaction.emoji} {reaction.users.length}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      
      {/* Input area */}
      <div className="p-3 border-t">
        <div className="flex gap-2">
          <Input
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1"
          />
          <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

// Helper function to generate example chat messages
const generateExampleChatMessages = (
  tripId: string,
  collaborators: Array<{ id: string; name: string; avatar: string }>
): TripChatMessage[] => {
  const baseMessages = [
    {
      content: "Hey everyone! So excited for this trip. When should we book flights?",
      userId: collaborators[0]?.id || "1",
      userName: collaborators[0]?.name || "You"
    },
    {
      content: "I'm free to book anytime this week. Should we coordinate times?",
      userId: collaborators[1]?.id || "2", 
      userName: collaborators[1]?.name || "Friend"
    },
    {
      content: "Let me know what dates work best. I can be flexible with the schedule.",
      userId: collaborators[2]?.id || "3",
      userName: collaborators[2]?.name || "Collaborator"
    }
  ];

  return baseMessages.map((msg, index) => ({
    id: `msg_${index}`,
    userId: msg.userId,
    userName: msg.userName,
    userAvatar: collaborators.find(c => c.id === msg.userId)?.avatar || "https://randomuser.me/api/portraits/men/1.jpg",
    content: msg.content,
    timestamp: new Date(Date.now() - (baseMessages.length - index) * 1000 * 60 * 15),
    type: 'message' as const
  }));
};
