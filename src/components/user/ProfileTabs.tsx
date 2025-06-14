
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
  const [activeTab, setActiveTab] = useState('posts');

  if (isPrivate) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">This account is private</p>
      </div>
    );
  }

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="posts">Posts</TabsTrigger>
        <TabsTrigger value="venues">Venues</TabsTrigger>
        <TabsTrigger value="visited">Visited</TabsTrigger>
        <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
      </TabsList>
      
      <TabsContent value="posts" className="mt-6">
        <ProfileTabContent 
          posts={posts}
          user={user}
        />
      </TabsContent>
      
      <TabsContent value="venues" className="mt-6">
        <ProfileTabContent 
          locations={followedVenues}
          user={user}
        />
      </TabsContent>
      
      <TabsContent value="visited" className="mt-6">
        <ProfileTabContent 
          locations={visitedPlaces}
          user={user}
        />
      </TabsContent>
      
      <TabsContent value="wishlist" className="mt-6">
        <ProfileTabContent 
          locations={wantToVisitPlaces}
          user={user}
        />
      </TabsContent>
    </Tabs>
  );
};

export default ProfileTabs;
