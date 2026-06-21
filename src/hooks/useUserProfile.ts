
import { useState, useEffect, useCallback } from 'react';
import { UserProfileStats, User, Post, Location, Comment } from '@/types';
import { mockUsers, getUserById, getUserByUsername } from '@/mock/users';
import { mockComments } from '@/mock/comments';
import { mockLocations } from '@/mock/locations';
import { profilesRepo, postsRepo } from '@/services/data';
import { followService } from '@/services/social/followService';
import { useUserStore } from '@/store';

/**
 * Loads a user's public profile (by username, falling back to id) and their posts
 * through the data layer (Supabase with mock fallback). Follow/unfollow writes go
 * through followService and require an authenticated session; when signed out they
 * resolve false so callers can prompt sign-in.
 */
export const useUserProfile = (userIdOrUsername?: string) => {
  const { user: currentUser, isAuthenticated } = useUserStore();
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [followedVenues, setFollowedVenues] = useState<Location[]>([]);
  const [visitedPlaces, setVisitedPlaces] = useState<Location[]>([]);
  const [wantToVisitPlaces, setWantToVisitPlaces] = useState<Location[]>([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [stats, setStats] = useState<UserProfileStats>({
    posts: 0,
    followers: 0,
    following: 0,
    likes: 0
  });

  useEffect(() => {
    if (!userIdOrUsername) return;
    let active = true;

    const load = async () => {
      setLoading(true);
      try {
        // Resolve by username first, then by id.
        let user = await profilesRepo.getByUsername(userIdOrUsername);
        if (!user) {
          user = await profilesRepo.getById(userIdOrUsername);
        }

        if (!active) return;

        if (user) {
          setProfile(user);
          const posts = await postsRepo.getByUser(user.id);
          if (!active) return;
          setUserPosts(posts);

          const [followers, following] = await Promise.all([
            followService.followerCount(user.id),
            followService.followingCount(user.id),
          ]);
          if (!active) return;

          setStats({
            posts: posts.length,
            followers: followers || user.followers || 0,
            following: following || user.following || 0,
            likes: posts.reduce((sum, post) => sum + (post.likes || 0), 0),
          });

          // Places sections remain mock-backed (owned by other streams).
          setFollowedVenues(mockLocations.slice(0, 3));
          setVisitedPlaces(mockLocations.slice(0, 5));
          setWantToVisitPlaces(mockLocations.slice(5, 8));
          setError(null);

          if (currentUser?.id && currentUser.id !== user.id) {
            const following = await followService.isFollowing(currentUser.id, user.id);
            if (active) setIsFollowing(following);
          }
        } else {
          setError('User not found');
          setProfile(null);
        }
      } catch (err) {
        if (active) {
          console.warn('[useUserProfile] load failed:', err);
          setError('User not found');
          setProfile(null);
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    load();
    return () => {
      active = false;
    };
  }, [userIdOrUsername, currentUser?.id]);

  const followUser = useCallback(
    async (): Promise<boolean> => {
      if (!isAuthenticated || !currentUser?.id || !profile?.id) return false;
      try {
        await followService.follow(currentUser.id, profile.id);
        setIsFollowing(true);
        setStats((s) => ({ ...s, followers: s.followers + 1 }));
        return true;
      } catch (err) {
        console.warn('[useUserProfile] follow failed:', err);
        return false;
      }
    },
    [isAuthenticated, currentUser?.id, profile?.id],
  );

  const unfollowUser = useCallback(
    async (): Promise<boolean> => {
      if (!isAuthenticated || !currentUser?.id || !profile?.id) return false;
      try {
        await followService.unfollow(currentUser.id, profile.id);
        setIsFollowing(false);
        setStats((s) => ({ ...s, followers: Math.max(0, s.followers - 1) }));
        return true;
      } catch (err) {
        console.warn('[useUserProfile] unfollow failed:', err);
        return false;
      }
    },
    [isAuthenticated, currentUser?.id, profile?.id],
  );

  const getFollowStatus = (): boolean => isFollowing;

  const getMutualFollowers = (): User[] => mockUsers.slice(0, 2) as unknown as User[];

  const getUserStats = (): UserProfileStats => stats;

  const getPostComments = (postId: string): Comment[] =>
    mockComments.filter((c) => c.postId === postId);

  const updateBio = async (bio: string): Promise<boolean> => {
    if (!isAuthenticated || !currentUser?.id || currentUser.id !== profile?.id) return false;
    try {
      await profilesRepo.update(currentUser.id, { bio });
      setProfile((p) => (p ? { ...p, bio } : p));
      return true;
    } catch (err) {
      console.warn('[useUserProfile] updateBio failed:', err);
      return false;
    }
  };

  const blockUser = async (): Promise<boolean> => true;
  const reportUser = async (): Promise<boolean> => true;

  const getUserBio = (): string => profile?.bio || '';

  return {
    profile,
    loading,
    error,
    userPosts,
    followedVenues,
    visitedPlaces,
    wantToVisitPlaces,
    stats,
    isFollowing,
    followUser,
    unfollowUser,
    getFollowStatus,
    getMutualFollowers,
    getUserStats,
    getPostComments,
    setStats,
    updateBio,
    blockUser,
    reportUser,
    getUserBio,
    isPrivateProfile: profile?.isPrivate || false,
  };
};
