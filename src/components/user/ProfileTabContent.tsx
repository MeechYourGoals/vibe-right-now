
import { Post, Comment } from "@/types";
import PostCard from "@/components/PostCard";
import PostGridItem from "@/components/user/PostGridItem";

interface ProfileTabContentProps {
  activeTab: string;
  viewMode: "list" | "grid";
  userPosts: Post[];
  getComments: (postId: string) => Comment[];
}

const ProfileTabContent = ({ activeTab, viewMode, userPosts, getComments }: ProfileTabContentProps) => {
  if (activeTab === "posts") {
    if (userPosts.length > 0) {
      return viewMode === "list" ? (
        <PostCard 
          posts={userPosts} 
          locationPostCount={userPosts.length}
          getComments={getComments} 
        />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {userPosts.map((post) => (
            <PostGridItem key={post.id} post={post} />
          ))}
        </div>
      );
    } else {
      return (
        <div className="text-center py-10">
          <h3 className="text-xl font-semibold mb-2">No posts yet</h3>
          <p className="text-muted-foreground">This user hasn't posted any vibes yet.</p>
        </div>
      );
    }
  } else if (activeTab === "liked") {
    return (
      <div className="text-center py-10">
        <h3 className="text-xl font-semibold mb-2">Liked vibes</h3>
        <p className="text-muted-foreground">Posts this user has liked will appear here.</p>
      </div>
    );
  } else if (activeTab === "saved") {
    return (
      <div className="text-center py-10">
        <h3 className="text-xl font-semibold mb-2">Popular posts</h3>
        <p className="text-muted-foreground">This user's most popular posts will appear here.</p>
      </div>
    );
  }
  
  return null;
};

export default ProfileTabContent;
