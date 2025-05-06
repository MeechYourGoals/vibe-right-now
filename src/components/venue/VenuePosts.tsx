
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PostService } from "@/services/PostService";
import { Comment, Post } from "@/types";
import VenuePost from "@/components/VenuePost";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface VenuePostsProps {
  venueId: string;
}

export default function VenuePosts({ venueId }: VenuePostsProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("recent");
  const [commentText, setCommentText] = useState("");
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoadingComments, setIsLoadingComments] = useState(false);

  useEffect(() => {
    const loadPosts = async () => {
      setIsLoading(true);
      try {
        const venuePosts = await PostService.getPostsForLocation(venueId);
        setPosts(venuePosts);
      } catch (error) {
        console.error("Error loading posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPosts();
  }, [venueId]);

  const handleSelectPost = async (post: Post) => {
    setSelectedPost(post);
    setIsLoadingComments(true);
    try {
      const postComments = await PostService.getCommentsForPost(post.id);
      setComments(postComments);
    } catch (error) {
      console.error("Error loading comments:", error);
    } finally {
      setIsLoadingComments(false);
    }
  };

  const handleAddComment = async () => {
    if (!commentText.trim() || !selectedPost) return;

    try {
      const newComment = await PostService.addComment({
        postId: selectedPost.id,
        content: commentText,
        userId: "current-user", // Should come from auth context
      });

      setComments(prev => [...prev, newComment]);
      setCommentText("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const getSortedPosts = () => {
    if (activeTab === "recent") {
      return [...posts].sort((a, b) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
    } else {
      return [...posts].sort((a, b) => b.likes - a.likes);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="border rounded-md p-4 space-y-3 animate-pulse">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gray-200"></div>
              <div className="h-4 bg-gray-200 w-24"></div>
            </div>
            <div className="h-3 bg-gray-200 w-full"></div>
            <div className="h-3 bg-gray-200 w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  const loadComments = async (postId: string) => {
    try {
      const fetchedComments = await PostService.getCommentsForPost(postId);
      return fetchedComments;
    } catch (error) {
      console.error("Error loading comments:", error);
      return [];
    }
  };

  return (
    <div className="space-y-4">
      <Tabs defaultValue="recent" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="w-full">
          <TabsTrigger value="recent" className="flex-1">Recent</TabsTrigger>
          <TabsTrigger value="popular" className="flex-1">Popular</TabsTrigger>
        </TabsList>
        <TabsContent value="recent" className="space-y-4 mt-4">
          {getSortedPosts().map(post => (
            <VenuePost 
              key={post.id} 
              post={post} 
              onClick={() => handleSelectPost(post)} 
              loadComments={loadComments}
            />
          ))}
        </TabsContent>
        <TabsContent value="popular" className="space-y-4 mt-4">
          {getSortedPosts().map(post => (
            <VenuePost 
              key={post.id} 
              post={post} 
              onClick={() => handleSelectPost(post)} 
              loadComments={loadComments}
            />
          ))}
        </TabsContent>
      </Tabs>

      {selectedPost && (
        <div className="border rounded-md p-4 mt-4">
          <h3 className="font-semibold">Comments</h3>
          <div className="mt-2 space-y-2">
            {isLoadingComments ? (
              <div>Loading comments...</div>
            ) : comments.length > 0 ? (
              comments.map(comment => (
                <div key={comment.id} className="border-b pb-2">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={comment.user?.avatar} alt={comment.user?.name} />
                      <AvatarFallback>{comment.user?.name?.charAt(0) || '?'}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{comment.user?.name}</span>
                    <span className="text-xs text-gray-500">
                      {formatDistanceToNow(new Date(comment.timestamp), { addSuffix: true })}
                    </span>
                  </div>
                  <p className="text-sm mt-1">{comment.content}</p>
                </div>
              ))
            ) : (
              <div>No comments yet</div>
            )}
          </div>
          <div className="mt-4 flex gap-2">
            <Textarea 
              placeholder="Add a comment..." 
              value={commentText}
              onChange={e => setCommentText(e.target.value)}
              className="min-h-[60px]"
            />
            <Button size="icon" onClick={handleAddComment}><Send className="h-4 w-4" /></Button>
          </div>
        </div>
      )}
    </div>
  );
}
