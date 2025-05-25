
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import PostFeed from "@/components/PostFeed";
import CameraButton from "@/components/CameraButton";
import VernonNext from "@/components/VernonNext";
import { useIsMobile } from "@/hooks/use-mobile";
import { mockUsers } from "@/mock/users";

const Index = () => {
  const isMobile = useIsMobile();
  const location = useLocation();
  const navigate = useNavigate();

  // Check if the URL has a user query parameter
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const userQuery = params.get('user');
    
    if (userQuery) {
      // Check if this is a valid username
      const cleanUsername = userQuery.replace('@', '');
      const userExists = mockUsers.some(user => user.username === cleanUsername);
      
      if (userExists) {
        // Navigate to user profile
        navigate(`/user/${cleanUsername}`);
      } else {
        // Navigate to explore page with user search
        navigate(`/explore?q=${cleanUsername}&category=users`);
      }
    }
  }, [location.search, navigate]);

  return (
    <Layout>
      <main className="container py-6">
        <div className="flex flex-col gap-6">
          {/* Main content area */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between mb-2">
              <h1 className={`${isMobile ? 'text-xl' : 'text-3xl'} font-bold vibe-gradient-text`}>
                Discover the Vibe Right Now
              </h1>
            </div>

            {/* Posts feed layout */}
            <div className="w-full">
              <PostFeed />
            </div>
          </div>
        </div>
      </main>
      
      <CameraButton />
      <VernonNext />
    </Layout>
  );
};

export default Index;
