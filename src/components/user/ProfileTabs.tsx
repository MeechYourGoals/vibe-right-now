
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User } from "@/types";

interface ProfileTabsProps {
  user: User;
}

const ProfileTabs: React.FC<ProfileTabsProps> = ({ user }) => {
  // Mock data with proper User interface compliance
  const mockFollowers: User[] = [
    {
      id: '1',
      username: 'sarah_explorer',
      displayName: 'Sarah Chen',
      profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      bio: 'Food enthusiast',
      followersCount: 1248,
      followingCount: 892,
      isVerified: false,
      isPrivate: false,
      joinedDate: '2023-03-15',
      name: 'Sarah Chen',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
    },
    {
      id: '2',
      username: 'mike_nightlife',
      displayName: 'Mike Rodriguez',
      profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
      bio: 'Living for the weekend vibes',
      followersCount: 892,
      followingCount: 634,
      isVerified: false,
      isPrivate: false,
      joinedDate: '2023-02-20',
      name: 'Mike Rodriguez',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike'
    }
  ];

  const mockFollowing: User[] = [
    {
      id: '3',
      username: 'jenny_foodie',
      displayName: 'Jenny Park',
      profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jenny',
      bio: 'Always hunting for the best brunch spots',
      followersCount: 2156,
      followingCount: 1243,
      isVerified: true,
      isPrivate: false,
      joinedDate: '2022-11-08',
      postsCount: 89,
      name: 'Jenny Park',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jenny'
    }
  ];

  return (
    <Tabs defaultValue="posts" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="posts">Posts</TabsTrigger>
        <TabsTrigger value="followers">Followers</TabsTrigger>
        <TabsTrigger value="following">Following</TabsTrigger>
      </TabsList>
      
      <TabsContent value="posts" className="space-y-4">
        <div className="text-center py-8">
          <p className="text-muted-foreground">No posts yet</p>
        </div>
      </TabsContent>
      
      <TabsContent value="followers" className="space-y-4">
        <div className="space-y-2">
          {mockFollowers.map((follower) => (
            <div key={follower.id} className="flex items-center space-x-3 p-2">
              <img 
                src={follower.profileImage || follower.avatar} 
                alt={follower.displayName || follower.name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-medium">{follower.displayName || follower.name}</p>
                <p className="text-sm text-muted-foreground">@{follower.username}</p>
              </div>
            </div>
          ))}
        </div>
      </TabsContent>
      
      <TabsContent value="following" className="space-y-4">
        <div className="space-y-2">
          {mockFollowing.map((following) => (
            <div key={following.id} className="flex items-center space-x-3 p-2">
              <img 
                src={following.profileImage || following.avatar} 
                alt={following.displayName || following.name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-medium">{following.displayName || following.name}</p>
                <p className="text-sm text-muted-foreground">@{following.username}</p>
              </div>
            </div>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default ProfileTabs;
