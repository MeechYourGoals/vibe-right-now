
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Post, Location } from '@/types';
import ProfileTabContent from './ProfileTabContent';
import UserPlacesContent from './UserPlacesContent';

interface ProfileTabsProps {
  user: User;
  posts?: Post[];
  followedVenues?: Location[];
  visitedPlaces?: Location[];
  wantToVisitPlaces?: Location[];
  isPrivate?: boolean;
}

const ProfileTabs: React.FC<ProfileTabsProps> = ({
  user,
  posts = [],
  followedVenues = [],
  visitedPlaces = [],
  wantToVisitPlaces = [],
  isPrivate = false
}) => {
  const [activeTab, setActiveTab] = useState('posts');
  const [activePlacesTab, setActivePlacesTab] = useState('visited');

  if (isPrivate) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">This account is private</p>
      </div>
    );
  }

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="posts">Posts</TabsTrigger>
        <TabsTrigger value="places">My Places</TabsTrigger>
        <TabsTrigger value="venues">Following</TabsTrigger>
      </TabsList>
      
      <TabsContent value="posts" className="mt-6">
        <div className="space-y-4">
          <p className="text-muted-foreground mb-4">Posts and venue pins from this user.</p>
          <ProfileTabContent 
            posts={posts}
            user={user}
          />
        </div>
      </TabsContent>
      
      <TabsContent value="places" className="mt-6">
        <UserPlacesContent
          visitedPlaces={visitedPlaces}
          wantToVisitPlaces={wantToVisitPlaces}
          activeTab={activePlacesTab}
          setActiveTab={setActivePlacesTab}
        />
      </TabsContent>
      
      <TabsContent value="venues" className="mt-6">
        <div className="space-y-4">
          <p className="text-muted-foreground mb-4">Venues and events this user is following.</p>
          <ProfileTabContent 
            locations={followedVenues}
            user={user}
          />
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default ProfileTabs;
