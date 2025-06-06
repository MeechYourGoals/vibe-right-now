
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useUserProfile } from "@/hooks/useUserProfile";
import { mockComments } from "@/mock/data";
import Header from "@/components/Header";
import UserProfileHeader from "@/components/user/UserProfileHeader";
import ProfileTabs from "@/components/user/ProfileTabs";
import ProfileTabContent from "@/components/user/ProfileTabContent";
import PrivateProfileContent from "@/components/user/PrivateProfileContent";

const UserProfile = () => {
  const { userId } = useParams();
  const [activeTab, setActiveTab] = useState("posts");
  
  const {
    profile,
    stats,
    isLoading,
    error,
    toggleFollow,
    getUserPosts,
    canViewProfile,
    getRecentActivity,
    getMutualConnections
  } = useUserProfile(userId || "");

  // Get user posts
  const userPosts = getUserPosts();
  
  // Get followed venues (mock data for now)
  const followedVenues = [];
  
  // Get visited places (mock data for now)
  const visitedPlaces = [];
  
  // Get want to visit places (mock data for now)
  const wantToVisitPlaces = [];
  
  // Get post comments
  const getPostComments = (postId: string) => {
    return mockComments.filter(comment => comment.postId === postId);
  };
  
  // Get user bio
  const getUserBio = () => {
    return profile?.bio || "";
  };
  
  // Check if profile is private
  const isPrivateProfile = !canViewProfile();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-8">
          <div className="text-center">Loading profile...</div>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-8">
          <div className="text-center">User not found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8">
        <UserProfileHeader
          user={profile}
          onFollowToggle={toggleFollow}
          isOwnProfile={false}
          recentActivity={getRecentActivity()}
          mutualConnections={getMutualConnections()}
        />
        
        {isPrivateProfile ? (
          <PrivateProfileContent 
            username={profile.username}
            isFollowing={profile.isFollowing || false}
            onFollow={toggleFollow}
          />
        ) : (
          <>
            <ProfileTabs 
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
            <ProfileTabContent
              userPosts={userPosts}
              followedVenues={followedVenues}
              visitedPlaces={visitedPlaces}
              wantToVisitPlaces={wantToVisitPlaces}
              getComments={getPostComments}
              getUserBio={getUserBio}
            />
          </>
        )}
      </main>
    </div>
  );
};

export default UserProfile;
