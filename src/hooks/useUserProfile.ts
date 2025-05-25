
import { useState } from 'react';
import { User } from '@/types';

const useUserProfile = (userId: string) => {
  const [user, setUser] = useState<User>({
    id: userId,
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
  });

  const [following, setFollowing] = useState(false);

  const followUser = () => {
    setFollowing(true);
    setUser(prev => ({
      ...prev,
      followersCount: (prev.followersCount || 0) + 1
    }));
  };

  const unfollowUser = () => {
    setFollowing(false);
    setUser(prev => ({
      ...prev,
      followersCount: Math.max((prev.followersCount || 0) - 1, 0)
    }));
  };

  const getUserBio = () => {
    return user.bio || 'No bio available';
  };

  return {
    user,
    following,
    followUser,
    unfollowUser,
    getUserBio
  };
};

export default useUserProfile;
