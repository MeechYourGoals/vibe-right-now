
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Heart, Award, Grid2X2, ListIcon } from "lucide-react";
import ProfileTabContent from "@/components/user/ProfileTabContent";
import { Post, Comment } from "@/types";

interface ProfileTabsProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
  viewMode: "list" | "grid";
  setViewMode: (mode: "list" | "grid") => void;
  userPosts: Post[];
  getComments: (postId: string) => Comment[];
}

const ProfileTabs = ({ 
  activeTab, 
  setActiveTab, 
  viewMode, 
  setViewMode, 
  userPosts, 
  getComments 
}: ProfileTabsProps) => {
  return (
    <Tabs 
      defaultValue="posts" 
      value={activeTab} 
      onValueChange={setActiveTab} 
      className="mb-6"
    >
      <div className="flex justify-between items-center mb-2">
        <TabsList className="grid grid-cols-3 w-full max-w-md">
          <TabsTrigger value="posts">
            <div className="flex items-center">
              <MessageSquare className="h-4 w-4 mr-2" />
              <span>Posts</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="liked">
            <div className="flex items-center">
              <Heart className="h-4 w-4 mr-2" />
              <span>Liked</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="saved">
            <div className="flex items-center">
              <Award className="h-4 w-4 mr-2" />
              <span>Popular</span>
            </div>
          </TabsTrigger>
        </TabsList>
        
        <div className="flex gap-2">
          <Button 
            variant={viewMode === "list" ? "default" : "outline"} 
            size="sm"
            onClick={() => setViewMode("list")}
          >
            <ListIcon className="h-4 w-4" />
          </Button>
          <Button 
            variant={viewMode === "grid" ? "default" : "outline"} 
            size="sm"
            onClick={() => setViewMode("grid")}
          >
            <Grid2X2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <TabsContent value="posts" className="mt-4 space-y-4">
        <ProfileTabContent 
          activeTab="posts"
          viewMode={viewMode}
          userPosts={userPosts}
          getComments={getComments}
        />
      </TabsContent>
      
      <TabsContent value="liked" className="mt-4 space-y-4">
        <ProfileTabContent 
          activeTab="liked"
          viewMode={viewMode}
          userPosts={[]}
          getComments={getComments}
        />
      </TabsContent>
      
      <TabsContent value="saved" className="mt-4 space-y-4">
        <ProfileTabContent 
          activeTab="saved"
          viewMode={viewMode}
          userPosts={[]}
          getComments={getComments}
        />
      </TabsContent>
    </Tabs>
  );
};

export default ProfileTabs;
