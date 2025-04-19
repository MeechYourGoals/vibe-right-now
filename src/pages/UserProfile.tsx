
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import UserProfileHeader from "@/components/user/UserProfileHeader";
import ProfileTabs from "@/components/user/ProfileTabs";
import { useUserProfile } from "@/hooks/useUserProfile";
import PrivateProfileContent from "@/components/user/PrivateProfileContent";
import UserPlacesContent from "@/components/user/UserPlacesContent";
import FollowedVenuesSection from "@/components/user/FollowedVenuesSection";
import { mockUsers } from "@/mock/users";

const UserProfile = () => {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("posts");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [placesTabValue, setPlacesTabValue] = useState("visited");
  
  const { 
    user, 
    userPosts,
    followedVenues,
    visitedPlaces,
    wantToVisitPlaces,
    getPostComments,
    getUserBio,
    isPrivateProfile
  } = useUserProfile(username);

  // Find user in mock data if not found in regular data
  useEffect(() => {
    if (!user && username) {
      const mockUser = mockUsers.find(u => u.username === username);
      if (mockUser) {
        // Set user data from mock
        setTimeout(() => {
          navigate(`/user/${username}`, { replace: true });
        }, 0);
      }
    }
  }, [username, user, navigate]);

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">User not found</h1>
          <p className="text-muted-foreground">This user doesn't exist or has been removed.</p>
          <Button className="mt-6" onClick={() => window.history.back()}>Go Back</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-6">
        <div className="max-w-4xl mx-auto">
          <UserProfileHeader user={user} getUserBio={getUserBio} />
          
          {isPrivateProfile ? (
            <PrivateProfileContent user={user} />
          ) : (
            <div>
              <Tabs defaultValue="content" className="mt-6">
                <TabsList className="w-full max-w-md mx-auto">
                  <TabsTrigger value="content">Content</TabsTrigger>
                  <TabsTrigger value="places">Places</TabsTrigger>
                  <TabsTrigger value="following">Following</TabsTrigger>
                </TabsList>
                
                <TabsContent value="content" className="mt-4">
                  <ProfileTabs 
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    viewMode={viewMode}
                    setViewMode={setViewMode}
                    userPosts={userPosts}
                    getComments={getPostComments}
                  />
                </TabsContent>
                
                <TabsContent value="places" className="mt-4">
                  <UserPlacesContent 
                    visitedPlaces={visitedPlaces} 
                    wantToVisitPlaces={wantToVisitPlaces}
                    activeTab={placesTabValue}
                    setActiveTab={setPlacesTabValue}
                  />
                </TabsContent>
                
                <TabsContent value="following" className="mt-4">
                  <FollowedVenuesSection venues={followedVenues} />
                </TabsContent>
              </Tabs>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default UserProfile;
