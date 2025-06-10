
import { useParams } from "react-router-dom";
import Layout from "@/components/Layout";
import Header from "@/components/Header";
import UserProfileHeader from "@/components/user/UserProfileHeader";
import ProfileTabs from "@/components/user/ProfileTabs";
import PrivateProfileContent from "@/components/user/PrivateProfileContent";
import { useUserProfile } from "@/hooks/useUserProfile";

const UserProfile = () => {
  const { username } = useParams<{ username: string }>();
  const {
    profile: user,
    stats,
    isLoading,
    error,
    toggleFollow,
    updateProfile,
    userPosts,
    followedVenues,
    visitedPlaces,
    wantToVisitPlaces,
    getPostComments,
    getUserBio,
    isPrivateProfile,
    getUserByUsername
  } = useUserProfile(username);

  if (isLoading) {
    return (
      <Layout>
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-32 bg-muted rounded-lg"></div>
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !user) {
    return (
      <Layout>
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <h1 className="text-2xl font-bold mb-4">User Not Found</h1>
            <p className="text-muted-foreground">
              {error || "The user you're looking for doesn't exist."}
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <UserProfileHeader 
          user={user} 
          stats={stats}
          onToggleFollow={toggleFollow}
          onUpdateProfile={updateProfile}
        />
        
        {isPrivateProfile ? (
          <PrivateProfileContent user={user} />
        ) : (
          <ProfileTabs 
            userPosts={userPosts}
            followedVenues={followedVenues}
            visitedPlaces={visitedPlaces}
            wantToVisitPlaces={wantToVisitPlaces}
            getComments={getPostComments}
            getUserBio={() => getUserBio(user.username)}
          />
        )}
      </div>
    </Layout>
  );
};

export default UserProfile;
