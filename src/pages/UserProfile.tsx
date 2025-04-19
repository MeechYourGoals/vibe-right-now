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
import { fuzzyMatch } from "@/utils/searchUtils";

const UserProfile = () => {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("posts");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [placesTabValue, setPlacesTabValue] = useState("visited");
  
  // Map of display names to usernames for our featured users
  const featuredUserMap: Record<string, string> = {
    // Standard username variants
    'sarah_vibes': 'sarah_vibes',
    'jay_experiences': 'jay_experiences',
    'adventure_alex': 'adventure_alex',
    'marco_travels': 'marco_travels',
    'local_explorer': 'local_explorer',
    
    // Common name variations (case insensitive)
    'sarah': 'sarah_vibes',
    'jay': 'jay_experiences',
    'alex': 'adventure_alex',
    'marco': 'marco_travels',
    'jamie': 'local_explorer',
    
    // Full names
    'sarah miller': 'sarah_vibes',
    'jay johnson': 'jay_experiences',
    'alex kim': 'adventure_alex',
    'marco williams': 'marco_travels',
    'jamie chen': 'local_explorer',
    
    // Formal variants
    'sarah_miller': 'sarah_vibes',
    'jay_johnson': 'jay_experiences',
    'alex_kim': 'adventure_alex',
    'marco_williams': 'marco_travels',
    'jamie_chen': 'local_explorer'
  };
  
  // Redirect to best matching profile if exact match not found
  useEffect(() => {
    if (!username) return;
    
    const normalizedInput = username.toLowerCase().trim();
    let targetUsername = normalizedInput;
    
    // Check for best match among featured users first
    const featuredMatch = mockUsers.find(user => 
      fuzzyMatch(normalizedInput, user.username) > 0.3 ||
      fuzzyMatch(normalizedInput, user.name) > 0.3
    );
    
    if (featuredMatch) {
      targetUsername = featuredMatch.username;
    } else {
      // Check mock users for best match
      const userMatch = mockUsers.find(user => 
        fuzzyMatch(normalizedInput, user.username) > 0.3 ||
        fuzzyMatch(normalizedInput, user.name) > 0.3
      );
      
      if (userMatch) {
        targetUsername = userMatch.username;
      } else {
        // Default to sarah_vibes as fallback
        targetUsername = 'sarah_vibes';
      }
    }
    
    // Only redirect if we're not already at the target username
    if (targetUsername !== username) {
      navigate(`/user/${targetUsername}`, { replace: true });
    }
  }, [username, navigate]);

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
