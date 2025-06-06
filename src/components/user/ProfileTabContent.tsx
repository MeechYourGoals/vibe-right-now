
import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import { PostCard } from "@/components/post";
import UserPlacesContent from "./UserPlacesContent";
import FollowedVenuesSection from "./FollowedVenuesSection";
import { Post, Comment, Location } from "@/types";

interface ProfileTabContentProps {
  userPosts: Post[];
  followedVenues: Location[];
  visitedPlaces: Location[];
  wantToVisitPlaces: Location[];
  getComments: (postId: string) => Comment[];
  getUserBio: () => string;
}

const ProfileTabContent = ({
  userPosts,
  followedVenues,
  visitedPlaces,
  wantToVisitPlaces,
  getComments,
  getUserBio
}: ProfileTabContentProps) => {
  return (
    <>
      <TabsContent value="posts" className="mt-6">
        <div className="space-y-4">
          {userPosts.length > 0 ? (
            userPosts.map(post => (
              <PostCard 
                key={post.id} 
                post={post}
              />
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No posts yet</p>
            </div>
          )}
        </div>
      </TabsContent>

      <TabsContent value="places" className="mt-6">
        <UserPlacesContent
          visitedPlaces={visitedPlaces}
          wantToVisitPlaces={wantToVisitPlaces}
        />
      </TabsContent>

      <TabsContent value="venues" className="mt-6">
        <FollowedVenuesSection venues={followedVenues} />
      </TabsContent>

      <TabsContent value="about" className="mt-6">
        <div className="bg-card rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">About</h3>
          <p className="text-muted-foreground">
            {getUserBio() || "No bio available"}
          </p>
        </div>
      </TabsContent>
    </>
  );
};

export default ProfileTabContent;
