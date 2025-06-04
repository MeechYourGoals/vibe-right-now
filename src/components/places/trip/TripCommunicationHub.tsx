
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import TripChatWindow from './TripChatWindow';
import TripIdeasSection from './TripIdeasSection';
import { TripCommentsWall } from './TripCommentsWall';

interface TripCommunicationHubProps {
  tripId: string | undefined;
  collaborators: Array<{
    id: string;
    name: string;
    avatar: string;
  }>;
  userColors: Array<{ id: string; color: string }>;
}

const TripCommunicationHub: React.FC<TripCommunicationHubProps> = ({
  tripId,
  collaborators,
  userColors
}) => {
  const [activeTab, setActiveTab] = useState("chat");

  if (!tripId) {
    return null;
  }

  return (
    <Card className="mt-8">
      <CardContent className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="chat">Trip Chat</TabsTrigger>
            <TabsTrigger value="ideas">Venue Ideas</TabsTrigger>
            <TabsTrigger value="wall">Comments Wall</TabsTrigger>
          </TabsList>
          
          <TabsContent value="chat" className="mt-6">
            <TripChatWindow 
              tripId={tripId}
              collaborators={collaborators}
              userColors={userColors}
            />
          </TabsContent>
          
          <TabsContent value="ideas" className="mt-6">
            <TripIdeasSection 
              tripId={tripId}
              collaborators={collaborators}
              userColors={userColors}
            />
          </TabsContent>
          
          <TabsContent value="wall" className="mt-6">
            <TripCommentsWall 
              tripId={tripId}
              collaborators={collaborators}
              userColors={userColors}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TripCommunicationHub;
