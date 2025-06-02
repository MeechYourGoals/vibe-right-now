
import React, { useState } from 'react';
import { MessageCircle, Lightbulb, Users } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TripChatWindow } from './TripChatWindow';
import { TripIdeasSection } from './TripIdeasSection';
import { TripCommentsList } from './TripCommentsList';
import { TripCommentInput } from './TripCommentInput';
import { useTripComments } from './hooks/useTripComments';

interface TripCommunicationHubProps {
  tripId: string | undefined;
  collaborators: Array<{ id: string; name: string; avatar: string }>;
  userColors: Array<{ id: string; color: string }>;
}

export const TripCommunicationHub: React.FC<TripCommunicationHubProps> = ({ 
  tripId, 
  collaborators, 
  userColors 
}) => {
  const [activeTab, setActiveTab] = useState('chat');
  
  const {
    comments,
    newComment,
    setNewComment,
    isSubmitting,
    handleSubmitComment
  } = useTripComments({ tripId, collaborators, userColors });

  return (
    <div className="mt-8 bg-muted/30 p-4 rounded-lg">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="chat" className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            Chat
          </TabsTrigger>
          <TabsTrigger value="ideas" className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4" />
            Ideas
          </TabsTrigger>
          <TabsTrigger value="wall" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Wall
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="chat" className="mt-4">
          <TripChatWindow 
            tripId={tripId}
            collaborators={collaborators}
            userColors={userColors}
          />
        </TabsContent>
        
        <TabsContent value="ideas" className="mt-4">
          <TripIdeasSection 
            tripId={tripId}
            collaborators={collaborators}
            userColors={userColors}
          />
        </TabsContent>
        
        <TabsContent value="wall" className="mt-4">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Trip Wall</h3>
            <TripCommentsList comments={comments} />
            <TripCommentInput
              avatarUrl={collaborators[0]?.avatar || "https://randomuser.me/api/portraits/men/1.jpg"}
              value={newComment}
              onChange={setNewComment}
              onSubmit={handleSubmitComment}
              isSubmitting={isSubmitting}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
