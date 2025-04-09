import { useState } from "react";
import { Link } from "react-router-dom";
import { Post, Comment } from "@/types";
import { formatDistanceToNow } from "date-fns";
import { 
  Heart, MessageSquare, Clock, MapPin, VerifiedIcon, Users, 
  ChevronDown, ChevronUp, User as UserIcon, MoreHorizontal, 
  Image, Eye, PlusCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import CommentList from "@/components/CommentList";
import { mockUsers } from "@/mock/data";
import { toast } from "@/hooks/use-toast";

interface PostCardProps {
  posts: Post[];
  locationPostCount?: number; // Number of posts at this location in the last 24h
  getComments?: (postId: string) => Comment[]; // Function to get comments for a post
}

const PostCard = ({ posts, locationPostCount = 1, getComments }: PostCardProps) => {
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});
  const [likeCounts, setLikeCounts] = useState<Record<string, number>>(
    posts.reduce((acc, post) => ({ ...acc, [post.id]: post.likes }), {})
  );
  const [isOpen, setIsOpen] = useState(false);
  const [showComments, setShowComments] = useState<Record<string, boolean>>({});
  const [showAllUsers, setShowAllUsers] = useState(false);
  const [expandedMedia, setExpandedMedia] = useState<string | null>(null);
  const [showAllPosts, setShowAllPosts] = useState(false);
  const [followedVenues, setFollowedVenues] = useState<Record<string, boolean>>({});

  const mainPost = posts[0];
  const location = mainPost.location;
  const isSinglePost = posts.length === 1;

  const handleLike = (postId: string) => {
    const isLiked = likedPosts[postId] || false;
    setLikedPosts({ ...likedPosts, [postId]: !isLiked });
    
    if (isLiked) {
      setLikeCounts({ ...likeCounts, [postId]: likeCounts[postId] - 1 });
    } else {
      setLikeCounts({ ...likeCounts, [postId]: likeCounts[postId] + 1 });
    }
  };

  const toggleComments = (postId: string) => {
    setShowComments({ 
      ...showComments, 
      [postId]: !showComments[postId] 
    });
  };

  const handleFollowVenue = () => {
    const isFollowed = followedVenues[location.id] || false;
    setFollowedVenues({ ...followedVenues, [location.id]: !isFollowed });
    
    if (isFollowed) {
      toast({
        title: "Unfollowed",
        description: `You are no longer following ${location.name}`,
      });
    } else {
      toast({
        title: "Following!",
        description: `You are now following ${location.name}`,
      });
    }
  };

  const getAllMedia = () => {
    const displayPosts = showAllPosts ? posts : posts.slice(0, 4);
    const allMedia: { postId: string; media: Post['media'][0]; user: Post['user'] }[] = [];
    
    displayPosts.forEach(post => {
      post.media.forEach(mediaItem => {
        allMedia.push({
          postId: post.id,
          media: mediaItem,
          user: post.user
        });
      });
    });
    
    return allMedia;
  };

  const formatTime = (timestamp: string) => {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  };

  const formatExpirationTime = (expiresAt: string) => {
    const now = new Date();
    const expiry = new Date(expiresAt);
    const diffHours = Math.max(0, Math.floor((expiry.getTime() - now.getTime()) / (1000 * 60 * 60)));
    
    if (diffHours < 24) {
      return `${diffHours}h`;
    } else if (diffHours < 24 * 7) {
      const days = Math.floor(diffHours / 24);
      return `${days} day${days > 1 ? 's' : ''}`;
    } else if (diffHours < 24 * 30) {
      const weeks = Math.floor(diffHours / (24 * 7));
      return `${weeks} week${weeks > 1 ? 's' : ''}`;
    } else {
      const months = Math.floor(diffHours / (24 * 30));
      return `${months} month${months > 1 ? 's' : ''}`;
    }
  };

  const getRandomUsers = (count: number) => {
    const shuffled = [...mockUsers].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const generateLocationUsers = () => {
    const count = locationPostCount > 100 ? 100 : locationPostCount;
    return getRandomUsers(count);
  };

  const previewUsers = generateLocationUsers().slice(0, 5);
  const allUsers = generateLocationUsers();

  const getLocationCategories = () => {
    const mainType = location.type;
    
    const secondaryTypes = [];
    
    if (mainType === "event") {
      if (location.name.toLowerCase().includes("festival")) {
        secondaryTypes.push("music");
      } else if (location.name.toLowerCase().includes("rodeo")) {
        secondaryTypes.push("sports");
      } else if (location.name.toLowerCase().includes("comedy") || location.name.toLowerCase().includes("laugh")) {
        secondaryTypes.push("comedy");
      }
    }
    
    if (mainType === "attraction") {
      if (location.name.toLowerCase().includes("ski") || location.name.toLowerCase().includes("snow")) {
        secondaryTypes.push("winter sports");
      } else if (location.name.toLowerCase().includes("beach") || location.name.toLowerCase().includes("ocean")) {
        secondaryTypes.push("beach");
      }
    }
    
    return [mainType, ...secondaryTypes];
  };

  const locationCategories = getLocationCategories();
  const displayedPosts = showAllPosts ? posts : posts.slice(0, 4);
  const hasMorePosts = posts.length > 4;
  const allMedia = getAllMedia();
  const isFollowed = followedVenues[location.id] || false;

  return (
    <Card className="vibe-card overflow-hidden mb-4">
      <CardHeader className="p-4 pb-0">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage 
                src={`https://source.unsplash.com/random/200x200/?${location.type}`} 
                alt={location.name} 
              />
              <AvatarFallback>{location.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium flex items-center">
                <Link to={`/venue/${location.id}`} className="hover:underline">
                  {location.name}
                </Link>
                {location.verified && (
                  <VerifiedIcon className="h-4 w-4 ml-1 text-primary" />
                )}
              </div>
              <div className="text-sm text-muted-foreground flex items-center">
                <MapPin className="h-3 w-3 mr-1" />
                <span>{location.city}, {location.state}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2">
            <Button
              variant={isFollowed ? "default" : "outline"}
              size="sm"
              className={isFollowed ? "bg-primary text-primary-foreground" : ""}
              onClick={handleFollowVenue}
            >
              <PlusCircle className="h-4 w-4 mr-1" />
              {isFollowed ? "Following" : "Follow"}
            </Button>
            
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="h-3 w-3 mr-1" />
              <span>Posts expire in {formatExpirationTime(mainPost.expiresAt)}</span>
            </div>
            
            {locationPostCount > 1 ? (
              <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                <CollapsibleTrigger asChild>
                  <Button variant="link" size="sm" className="p-0 h-auto text-sm">
                    <Users className="h-3 w-3 mr-1" />
                    <span className="font-medium">
                      {locationPostCount > 100 
                        ? "100+ people visited here in last 24hrs"  
                        : `${locationPostCount} people visited here in last 24hrs`}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="h-3 w-3 ml-1" />
                    ) : (
                      <ChevronDown className="h-3 w-3 ml-1" />
                    )}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="text-sm mt-1">
                  <div className="flex flex-col gap-2">
                    <div className="mt-1">
                      <h4 className="text-xs font-medium mb-2">Recent Visitors:</h4>
                      <div className="space-y-1 max-h-40 overflow-y-auto">
                        {previewUsers.map((user, index) => (
                          <div key={index} className="flex items-center">
                            <Avatar className="h-5 w-5 mr-1">
                              <AvatarImage src={user.avatar} alt={user.name} />
                              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <Link to={`/user/${user.id}`} className="hover:underline flex items-center">
                              <span className="text-xs">@{user.username}</span>
                            </Link>
                          </div>
                        ))}
                        
                        {locationPostCount > 5 && (
                          <Link 
                            to={`/venue/${location.id}/vibers`}
                            className="text-xs text-primary hover:underline flex items-center mt-2"
                            onClick={(e) => {
                              e.preventDefault();
                              setShowAllUsers(true);
                            }}
                          >
                            <span>Show all {locationPostCount} people</span>
                            <MoreHorizontal className="h-3 w-3 ml-1" />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ) : (
              <div className="flex items-center text-sm mt-1">
                <Avatar className="h-5 w-5 mr-1">
                  <AvatarImage src={mainPost.user.avatar} alt={mainPost.user.name} />
                  <AvatarFallback>{mainPost.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <Link to={`/user/${mainPost.user.id}`} className="hover:underline flex items-center">
                  <span>@{mainPost.user.username}</span>
                  <UserIcon className="h-3 w-3 ml-1 opacity-50" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex flex-wrap gap-2 mb-3">
          {locationCategories.map((category, index) => (
            <Badge key={index} variant="outline" className="bg-muted">
              {category}
            </Badge>
          ))}
        </div>
        
        <div className="mb-4">
          <div className="relative">
            <Carousel className="w-full">
              <CarouselContent>
                {allMedia.map((item, index) => (
                  <CarouselItem 
                    key={`${item.postId}-${index}`} 
                    className={isSinglePost ? "basis-full" : "md:basis-1/2 lg:basis-1/3"}
                  >
                    <div className="relative group rounded-lg overflow-hidden aspect-square">
                      {item.media.type === "image" ? (
                        <img
                          src={item.media.url}
                          alt={`Post at ${location.name}`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <video
                          src={item.media.url}
                          controls
                          className="w-full h-full object-cover"
                          poster="https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                        />
                      )}
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="flex flex-col items-center text-white">
                          <Avatar className="h-8 w-8 mb-1 border-2 border-white">
                            <AvatarImage src={item.user.avatar} alt={item.user.name} />
                            <AvatarFallback>{item.user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="text-xs">@{item.user.username}</span>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>
          </div>
        </div>

        <div className="space-y-4">
          {displayedPosts.map((post) => (
            <div key={post.id} className="border-t pt-3 first:border-t-0 first:pt-0">
              <div className="flex items-center gap-2 mb-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={post.user.avatar} alt={post.user.name} />
                  <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Link to={`/user/${post.user.username}`} className="text-sm font-medium hover:underline">
                    @{post.user.username}
                  </Link>
                  <div className="text-xs text-muted-foreground">{formatTime(post.timestamp)}</div>
                </div>
              </div>
              <p className="mb-2">{post.content}</p>
              
              <div className="flex justify-between items-center mt-2">
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`flex items-center gap-1 px-2 ${likedPosts[post.id] ? 'text-accent' : ''}`}
                    onClick={() => handleLike(post.id)}
                  >
                    <Heart className={`h-4 w-4 ${likedPosts[post.id] ? 'fill-accent' : ''}`} />
                    <span>{likeCounts[post.id]}</span>
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="flex items-center gap-1 px-2"
                    onClick={() => toggleComments(post.id)}
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span>{post.comments}</span>
                  </Button>
                </div>
                <div className="text-xs text-muted-foreground">
                  {post.media.length > 0 && (
                    <span className="flex items-center">
                      <Image className="h-3 w-3 mr-1" />
                      {post.media.length}
                    </span>
                  )}
                </div>
              </div>
              
              {showComments[post.id] && getComments && (
                <CommentList 
                  postId={post.id} 
                  commentsCount={post.comments} 
                />
              )}
            </div>
          ))}
          
          {hasMorePosts && !showAllPosts && (
            <Button 
              variant="outline" 
              className="w-full mt-2" 
              onClick={() => setShowAllPosts(true)}
            >
              <Eye className="mr-2 h-4 w-4" />
              View all {posts.length} posts
            </Button>
          )}
          
          {showAllPosts && hasMorePosts && (
            <Button 
              variant="outline" 
              className="w-full mt-2" 
              onClick={() => setShowAllPosts(false)}
            >
              Show fewer posts
            </Button>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <div className="text-xs text-muted-foreground">
          {allMedia.length} media items from {displayedPosts.length} posts
        </div>
        <Button variant="default" size="sm" asChild>
          <Link to={`/venue/${location.id}`}>View Location</Link>
        </Button>
      </CardFooter>
      
      {showAllUsers && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowAllUsers(false)}>
          <div className="bg-background rounded-lg max-w-md w-full max-h-[80vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="font-bold">People who visited {location.name}</h3>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setShowAllUsers(false)}>×</Button>
            </div>
            <div className="p-4 overflow-y-auto max-h-[calc(80vh-4rem)]">
              <div className="grid gap-2">
                {allUsers.map((user, index) => (
                  <Link key={index} to={`/user/${user.username}`} className="flex items-center p-2 hover:bg-muted rounded-md">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-sm">@{user.username}</div>
                      <div className="text-xs text-muted-foreground">{user.name}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default PostCard;
