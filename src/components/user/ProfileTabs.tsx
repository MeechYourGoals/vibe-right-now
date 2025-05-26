
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Comment } from "@/types";
import ProfileHeader from './ProfileHeader';

const mockUser = {
  id: '1',
  username: 'johndoe',
  name: 'John Doe',
  avatar: '/placeholder.svg',
  bio: 'Living life to the fullest!',
  isVerified: true,
  followersCount: 1250,
  followingCount: 380,
  postsCount: 125
};

const mockComments: Comment[] = [
  {
    id: '1',
    postId: 'post1',
    userId: '1',
    user: { id: '1', username: 'alice', name: 'Alice', avatar: '/placeholder.svg' },
    content: 'Great post!',
    timestamp: new Date().toISOString(),
    vibedHere: true,
    likes: 5
  },
  {
    id: '2',
    postId: 'post2',
    userId: '2',
    user: { id: '2', username: 'bob', name: 'Bob', avatar: '/placeholder.svg' },
    content: 'Amazing place!',
    timestamp: new Date().toISOString(),
    vibedHere: false,
    likes: 3
  }
];

const ProfileTabs = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <ProfileHeader user={mockUser} />
      
      <Tabs defaultValue="posts" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="vibes">Vibes</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
        </TabsList>
        
        <TabsContent value="posts" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Posts content */}
            <p className="text-muted-foreground">No posts yet.</p>
          </div>
        </TabsContent>
        
        <TabsContent value="vibes" className="mt-6">
          <div className="space-y-4">
            {mockComments.map((comment) => (
              <div key={comment.id} className="p-4 border rounded-lg">
                <p>{comment.content}</p>
                <div className="flex items-center space-x-2 mt-2 text-sm text-muted-foreground">
                  <span>@{comment.user.username}</span>
                  {comment.vibedHere && <span className="text-primary">• Vibed Here</span>}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="about" className="mt-6">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">About</h3>
              <p className="text-muted-foreground">{mockUser.bio}</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfileTabs;
