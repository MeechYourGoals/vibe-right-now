
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import UserProfileHeader from '@/components/user/UserProfileHeader';
import PrivateProfileContent from '@/components/user/PrivateProfileContent';
import ProfileTabs from '@/components/user/ProfileTabs';
import { useUserProfile } from '@/hooks/useUserProfile';

const UserProfile = () => {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();
  
  const {
    profile,
    loading,
    error,
    userPosts,
    followedVenues,
    visitedPlaces,
    wantToVisitPlaces,
    followUser,
    unfollowUser,
    updateBio,
    blockUser,
    reportUser,
    getUserBio,
    isPrivateProfile
  } = useUserProfile(username || '');

  useEffect(() => {
    if (!username) {
      navigate('/');
    }
  }, [username, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex justify-center items-center py-12">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite] mb-4"></div>
            <p className="text-muted-foreground">Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">User Not Found</h1>
            <p className="text-muted-foreground mb-4">
              {error || 'The user you are looking for does not exist.'}
            </p>
            <button 
              onClick={() => navigate('/')}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
            >
              Go Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-6">
        {profile.isPrivate ? (
          <PrivateProfileContent user={profile} />
        ) : (
          <>
            <UserProfileHeader 
              user={profile}
              onFollow={followUser}
              onUnfollow={unfollowUser}
              onUpdateBio={updateBio}
              onBlock={blockUser}
              onReport={reportUser}
              isPrivate={isPrivateProfile}
              getUserBio={() => getUserBio(profile.id)}
            />
            
            <ProfileTabs
              user={profile}
              posts={userPosts}
              followedVenues={followedVenues}
              visitedPlaces={visitedPlaces}
              wantToVisitPlaces={wantToVisitPlaces}
              isPrivate={isPrivateProfile}
            />
          </>
        )}
      </main>
    </div>
  );
};

export default UserProfile;
