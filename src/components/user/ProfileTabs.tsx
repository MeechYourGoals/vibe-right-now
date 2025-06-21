
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Post, Location } from '@/types';
import ProfileTabContent from './ProfileTabContent';

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
  const [activeTab, setActiveTab] = useState('content');

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
        <TabsTrigger value="content">Content</TabsTrigger>
        <TabsTrigger value="places">Places</TabsTrigger>
        <TabsTrigger value="following">Following</TabsTrigger>
      </TabsList>
      
      <TabsContent value="content" className="mt-6">
        <ProfileTabContent 
          posts={posts}
          user={user}
          activeTab="content"
        />
      </TabsContent>
      
      <TabsContent value="places" className="mt-6">
        <ProfileTabContent 
          locations={visitedPlaces}
          user={user}
          activeTab="places"
        />
      </TabsContent>
      
      <TabsContent value="following" className="mt-6">
        <ProfileTabContent 
          locations={followedVenues}
          user={user}
          activeTab="following"
        />
      </TabsContent>
    </Tabs>
  );
};

export default ProfileTabs;
