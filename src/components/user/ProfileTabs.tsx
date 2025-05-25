
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Grid, List } from "lucide-react";
import { Post, Comment } from "@/types";

interface ProfileTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  viewMode: "list" | "grid";
  setViewMode: (mode: "list" | "grid") => void;
  userPosts: Post[];
  getComments: (postId: string) => Comment[];
}

const ProfileTabs: React.FC<ProfileTabsProps> = ({
  activeTab,
  setActiveTab,
  viewMode,
  setViewMode,
  userPosts,
  getComments
}) => {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <div className="flex justify-between items-center mb-4">
        <TabsList>
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="photos">Photos</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
        </TabsList>
        
        <div className="flex space-x-2">
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("list")}
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("grid")}
          >
            <Grid className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <TabsContent value="posts">
        <div className="text-center py-8 text-muted-foreground">
          <p>No posts yet</p>
        </div>
      </TabsContent>
      
      <TabsContent value="photos">
        <div className="text-center py-8 text-muted-foreground">
          <p>No photos yet</p>
        </div>
      </TabsContent>
      
      <TabsContent value="videos">
        <div className="text-center py-8 text-muted-foreground">
          <p>No videos yet</p>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default ProfileTabs;
