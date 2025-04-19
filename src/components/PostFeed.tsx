
import React, { useState, useEffect } from 'react';
import { mockPosts } from '@/mock/posts';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, Share2, MoreHorizontal } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { Post } from '@/types';

const PostFeed = () => {
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const filterPosts = (tab: string) => {
    setActiveTab(tab);
    setLoading(true);
    
    setTimeout(() => {
      if (tab === 'all') {
        setPosts(mockPosts);
      } else if (tab === 'following') {
        setPosts(mockPosts.filter(post => post.user.verified));
      } else if (tab === 'nearby') {
        setPosts(mockPosts.filter(post => post.location));
      }
      setLoading(false);
    }, 500);
  };

  const renderPostSkeleton = () => (
    <Card className="mb-4">
      <CardContent className="pt-6">
        <div className="flex items-center space-x-4 mb-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[150px]" />
          </div>
        </div>
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-2/3 mb-4" />
        <Skeleton className="h-[200px] w-full rounded-md" />
      </CardContent>
      <CardFooter className="flex justify-between">
        <Skeleton className="h-10 w-20" />
        <Skeleton className="h-10 w-20" />
        <Skeleton className="h-10 w-20" />
      </CardFooter>
    </Card>
  );

  return (
    <div className="space-y-4">
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="all" onClick={() => filterPosts('all')}>All</TabsTrigger>
          <TabsTrigger value="following" onClick={() => filterPosts('following')}>Following</TabsTrigger>
          <TabsTrigger value="nearby" onClick={() => filterPosts('nearby')}>Nearby</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          {loading ? (
            <>
              {renderPostSkeleton()}
              {renderPostSkeleton()}
            </>
          ) : (
            posts.map((post) => (
              <Card key={post.id} className="mb-4">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={post.user.avatar} alt={post.user.name} />
                        <AvatarFallback>{post.user.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center">
                          <p className="font-medium">{post.user.name}</p>
                          {post.user.verified && (
                            <span className="ml-1 text-blue-500">✓</span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {formatDistanceToNow(new Date(post.timestamp), { addSuffix: true })}
                          {post.location && (
                            <> · at <span className="font-medium">{post.location.name}</span></>
                          )}
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-5 w-5" />
                    </Button>
                  </div>
                  
                  <p className="mb-4">{post.content}</p>
                  
                  {post.media && post.media.length > 0 && (
                    <div className="rounded-md overflow-hidden mb-4">
                      <img 
                        src={post.media[0].url} 
                        alt="Post media" 
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  )}
                  
                  {post.vibes && post.vibes.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.vibes.map((vibe, index) => (
                        <Badge key={index} variant="secondary" className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200">
                          {vibe}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
                
                <CardFooter className="flex justify-between border-t px-6 py-3">
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    <Heart className="h-5 w-5 mr-1" />
                    {post.likes}
                  </Button>
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    <MessageCircle className="h-5 w-5 mr-1" />
                    {typeof post.comments === 'number' ? post.comments : post.comments.length}
                  </Button>
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    <Share2 className="h-5 w-5 mr-1" />
                    Share
                  </Button>
                </CardFooter>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PostFeed;
