
import React, { useState, useEffect } from 'react';
import { Post, Comment } from "@/types";
import { Button } from "@/components/ui/button";
import { ImageIcon, List } from "lucide-react";
import { Card } from "@/components/ui/card";
import { PostCard } from "@/components/post";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { deletePost } from "@/services/PostService";

interface VenuePostsProps {
  posts: Post[];
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
  canDelete?: boolean;
  getPostComments: (postId: string) => Promise<Comment[]>;
}

const VenuePosts: React.FC<VenuePostsProps> = ({ 
  posts, 
  viewMode, 
  setViewMode, 
  canDelete = false,
  getPostComments 
}) => {
  const [localPosts, setLocalPosts] = useState<Post[]>(posts);
  const [commentsCache, setCommentsCache] = useState<Record<string, Comment[]>>({});
  
  useEffect(() => {
    setLocalPosts(posts);
  }, [posts]);
  
  const handleDeletePost = async (postId: string) => {
    try {
      await deletePost(postId);
      setLocalPosts(prev => prev.filter(post => post.id !== postId));
      toast.success("Post deleted successfully");
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error("Failed to delete post");
    }
  };
  
  // Handle getting comments for a post
  const fetchComments = async (postId: string): Promise<Comment[]> => {
    if (commentsCache[postId]) {
      return commentsCache[postId];
    }
    
    try {
      const comments = await getPostComments(postId);
      setCommentsCache(prev => ({ ...prev, [postId]: comments }));
      return comments;
    } catch (error) {
      console.error("Error fetching comments:", error);
      return [];
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Posts</h2>
        <div className="flex items-center space-x-2">
          <Button 
            variant={viewMode === 'grid' ? "secondary" : "outline"} 
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            <ImageIcon className="h-4 w-4" />
          </Button>
          <Button 
            variant={viewMode === 'list' ? "secondary" : "outline"} 
            size="sm"
            onClick={() => setViewMode('list')}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {localPosts.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground mb-4">No posts yet</p>
          <Button>Create First Post</Button>
        </Card>
      ) : (
        <div className={`${viewMode === 'grid' ? 'grid grid-cols-2 gap-4' : 'space-y-4'}`}>
          {localPosts.map(post => (
            <div key={post.id} className="relative">
              <PostCard 
                post={post} 
                showComments={viewMode === 'list'}
                getComments={() => fetchComments(post.id)}
              />
              
              {canDelete && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      className="absolute top-2 right-2 opacity-80 hover:opacity-100"
                    >
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete this post and remove it from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDeletePost(post.id)}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VenuePosts;
