
import { Comment } from "@/types";
import { mockComments } from "@/mock/data";
import { useUserProfileData } from "./user/useUserProfileData";
import { useUserPosts } from "./user/useUserPosts";
import { useUserVenues } from "./user/useUserVenues";

export const useUserProfile = (username: string | undefined) => {
  const { user, getUserBio, isPrivateProfile } = useUserProfileData(username);
  const { userPosts } = useUserPosts(user);
  const { followedVenues, visitedPlaces, wantToVisitPlaces } = useUserVenues(user);

  const getPostComments = (postId: string): Comment[] => {
    return mockComments.filter(comment => comment.postId === postId);
  };
  
  return {
    user,
    userPosts,
    followedVenues,
    visitedPlaces,
    wantToVisitPlaces,
    getPostComments,
    getUserBio,
    isPrivateProfile
  };
};
