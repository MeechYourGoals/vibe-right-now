
import { useState } from 'react';
import { User, Post, Location } from '@/types';
import { getUserByUsername } from '@/mock/users';

// Vibe tags for export
export const vibeTags = [
  'Cozy', 'Energetic', 'Romantic', 'Family Friendly', 'Late Night',
  'Live Music', 'Good Vibes', 'Trendy', 'Casual', 'Upscale'
];

const useUserProfile = (username?: string) => {
  const [user, setUser] = useState<User | null>(() => {
    if (username) {
      return getUserByUsername(username) || null;
    }
    return {
      id: 'default',
      name: 'John Doe',
      username: 'johndoe',
      avatar: '/placeholder.svg',
      bio: 'Love exploring new places!',
      isVerified: false,
      followersCount: 1250,
      followingCount: 890,
      postsCount: 45,
      isCelebrity: false,
      isPrivate: false
    };
  });

  const [following, setFollowing] = useState(false);
  const [userPosts] = useState<Post[]>([]);
  const [followedVenues] = useState<Location[]>([]);
  const [visitedPlaces] = useState<Location[]>([]);
  const [wantToVisitPlaces] = useState<Location[]>([]);

  const followUser = () => {
    setFollowing(true);
    setUser(prev => prev ? ({
      ...prev,
      followersCount: (prev.followersCount || 0) + 1
    }) : null);
  };

  const unfollowUser = () => {
    setFollowing(false);
    setUser(prev => prev ? ({
      ...prev,
      followersCount: Math.max((prev.followersCount || 0) - 1, 0)
    }) : null);
  };

  const getUserBio = () => {
    return user?.bio || 'No bio available';
  };

  const getPostComments = (postId: string) => {
    return [];
  };

  const isPrivateProfile = user?.isPrivate || false;

  return {
    user,
    following,
    followUser,
    unfollowUser,
    getUserBio,
    userPosts,
    followedVenues,
    visitedPlaces,
    wantToVisitPlaces,
    getPostComments,
    isPrivateProfile
  };
};

// Named export for compatibility
export { useUserProfile };
export default useUserProfile;
