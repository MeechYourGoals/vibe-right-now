import React, { useState, useCallback } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Post, Comment } from "@/types";
import ProfileHeader from "./ProfileHeader";
import ProfileTabContent from "./ProfileTabContent";

interface ProfileTabsProps {
  user: User;
  posts: Post[];
}

const ProfileTabs = ({ user, posts: userPosts }: ProfileTabsProps) => {
  const [activeTab, setActiveTab] = useState("posts");

  const getComments = useCallback((postId: string): Comment[] => {
    // Mock comments - replace with actual data fetching
    return [
      {
        id: "comment1",
        postId: postId,
        userId: "user1",
        user: {
          id: "user1",
          username: "johndoe",
          name: "John Doe",
          avatar: "/placeholder.svg",
        },
        content: "Great post!",
        timestamp: "2 hours ago",
        likes: 3,
      },
      {
        id: "comment2",
        postId: postId,
        userId: "user2",
        user: {
          id: "user2",
          username: "sarahsmith",
          name: "Sarah Smith",
          avatar: "/placeholder.svg",
        },
        content: "I agree!",
        timestamp: "1 hour ago",
        likes: 1,
      },
    ];
  }, []);

  return (
    <div className="space-y-6">
      <ProfileHeader user={user} />
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="saved">Saved</TabsTrigger>
          <TabsTrigger value="tagged">Tagged</TabsTrigger>
        </TabsList>

        <TabsContent value="posts" className="mt-6">
          <ProfileTabContent
            posts={userPosts}
            locationPostCount={userPosts.filter(post => post.location).length}
            getComments={getComments}
          />
        </TabsContent>
        
        <TabsContent value="saved" className="mt-6">
          <ProfileTabContent
            posts={[]}
            locationPostCount={0}
            getComments={getComments}
          />
        </TabsContent>
        
        <TabsContent value="tagged" className="mt-6">
          <ProfileTabContent
            posts={[]}
            locationPostCount={0}
            getComments={getComments}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfileTabs;
