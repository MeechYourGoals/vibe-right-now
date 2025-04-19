
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
  
  // Ensure we have a valid username for our featured users
  useEffect(() => {
    if (username) {
      // List of our featured users for easy checking
      const featuredUsernames = ['sarah_vibes', 'jay_experiences', 'adventure_alex', 'marco_travels', 'local_explorer'];
      
      // Check if the username is close to one of our featured users (case insensitive comparison)
      const normalizedUsername = username.toLowerCase();
      for (const featuredUsername of featuredUsernames) {
        // If there's a direct match or a close match, redirect to the correct username
        if (normalizedUsername === featuredUsername.toLowerCase() && normalizedUsername !== featuredUsername) {
          navigate(`/user/${featuredUsername}`, { replace: true });
          break;
        }
      }
      
      // Handle common name variations that might be typed
      const nameMapping: Record<string, string> = {
        'sarah': 'sarah_vibes',
        'jay': 'jay_experiences',
        'alex': 'adventure_alex',
        'marco': 'marco_travels',
        'jamie': 'local_explorer',
        'sarah_miller': 'sarah_vibes',
        'jay_johnson': 'jay_experiences',
        'alex_kim': 'adventure_alex',
        'marco_williams': 'marco_travels',
        'jamie_chen': 'local_explorer'
      };
      
      if (nameMapping[normalizedUsername]) {
        navigate(`/user/${nameMapping[normalizedUsername]}`, { replace: true });
      }
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

  // Find user in mock data if not found in regular data
  useEffect(() => {
    if (!user && username) {
      console.log("Attempting to find mock user for:", username);
      
      // Check for exact match first
      let mockUser = mockUsers.find(u => u.username === username);
      
      // If no exact match, try case-insensitive match
      if (!mockUser) {
        mockUser = mockUsers.find(u => u.username && u.username.toLowerCase() === username.toLowerCase());
      }
      
      // If still no match, check if username matches any part of a mockUser's name (for search-friendly URLs)
      if (!mockUser) {
        const lowerUsername = username.toLowerCase();
        
        // Check if username contains part of a real name
        mockUser = mockUsers.find(u => 
          u.name && u.name.toLowerCase().includes(lowerUsername) ||
          u.username && u.username.toLowerCase().includes(lowerUsername)
        );
      }
      
      if (mockUser) {
        console.log("Found mock user, redirecting to:", mockUser.username);
        // Set user data from mock
        setTimeout(() => {
          navigate(`/user/${mockUser.username}`, { replace: true });
        }, 0);
      } else {
        console.log("No mock user found for:", username);
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
