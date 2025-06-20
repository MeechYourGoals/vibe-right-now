import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, CheckCircle, Lock, Plus, UserPlus, UserMinus } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Post } from '@/types';
import { mockPosts } from '@/mock/posts';
import Masonry from 'react-masonry-css';
import { cn } from '@/lib/utils';
import { Skeleton } from "@/components/ui/skeleton"
import { UserProfileHeader } from '@/components/user-profile/UserProfileHeader';
import { User } from '@/types';
import { mockUsers } from '@/mock/users';

const UserProfile = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const currentUserId = "user1"; // Mock current user ID
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock fetching user data
    const fetchedUser = mockUsers.find(u => u.id === userId) || null;
    setUser(fetchedUser);

    // Mock fetching user's posts
    const fetchedPosts = mockPosts.filter(post => post.user.id === userId);
    setPosts(fetchedPosts);

    setIsLoading(false);
  }, [userId]);

  const handleFollow = () => {
    // Mock follow logic
    alert(`Following user ${user?.username}`);
  };

  const handleUnfollow = () => {
    // Mock unfollow logic
    alert(`Unfollowing user ${user?.username}`);
  };

  const breakpointColumnsObj = {
    default: 3,
    1100: 3,
    700: 2,
    500: 1
  };

  if (isLoading) {
    return (
      <div className="container py-10">
        <Card className="w-[800px] max-w-full mx-auto">
          <CardContent className="p-8 grid gap-4">
            <div className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
            <Skeleton className="h-4 w-[400px]" />
            <Skeleton className="h-4 w-[300px]" />
            <Skeleton className="h-4 w-[150px]" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!user) {
    return <div className="container py-10">User not found</div>;
  }

  return (
    <div className="container py-10">
      <Card className="w-[800px] max-w-full mx-auto">
        <CardContent className="p-8 grid gap-4">
          

          
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <UserProfileHeader
                user={user}
                isCurrentUser={user.id === currentUserId}
                isFollowing={false}
                isPrivate={user.isPrivate || false}
                onFollow={handleFollow}
                onUnfollow={handleUnfollow}
              />
            </div>

            <div>
              <p className="text-muted-foreground">{user.bio || 'No bio available'}</p>
            </div>
            <div className="flex justify-center gap-4">
              <div>
                <div className="font-bold">{posts.length}</div>
                <div className="text-sm text-muted-foreground">Posts</div>
              </div>
              <div>
                <div className="font-bold">{user.followers || 0}</div>
                <div className="text-sm text-muted-foreground">Followers</div>
              </div>
              <div>
                <div className="font-bold">{user.following || 0}</div>
                <div className="text-sm text-muted-foreground">Following</div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Posts</h2>
            {posts.length > 0 ? (
              <Masonry
                breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
              >
                {posts.map((post) => (
                  <div key={post.id} className="mb-4">
                    <img
                      src={post.media?.[0]?.url || "https://via.placeholder.com/300"}
                      alt={post.content}
                      className="rounded-lg w-full object-cover"
                      style={{ height: '250px' }}
                      onClick={() => navigate(`/venue/${post.location.id}`)}
                    />
                  </div>
                ))}
              </Masonry>
            ) : (
              <div className="text-muted-foreground">No posts available</div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;
