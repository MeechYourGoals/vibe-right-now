import { useState } from "react";
import { Link } from "react-router-dom";
import { Post, Comment, User } from "@/types";
import { formatDistanceToNow } from "date-fns";
import { Heart, MessageSquare, Clock, MapPin, VerifiedIcon, Users, ChevronDown, ChevronUp, User as UserIcon, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import CommentList from "@/components/CommentList";
import { mockUsers } from "@/mock/data";

interface PostCardProps {
  post: Post;
  locationPostCount?: number; // Number of posts at this location in the last 24h
  comments?: Comment[]; // Array of comments for this post
}

const PostCard = ({ post, locationPostCount = 1 }: PostCardProps) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [isOpen, setIsOpen] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showAllUsers, setShowAllUsers] = useState(false);

  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setLiked(!liked);
  };

  // Calculate time remaining before expiration
  const now = new Date();
  const expiresAt = new Date(post.expiresAt);
  const hoursRemaining = Math.max(0, Math.floor((expiresAt.getTime() - now.getTime()) / (1000 * 60 * 60)));

  // Format when the post was created
  const timeAgo = formatDistanceToNow(new Date(post.timestamp), { addSuffix: true });

  // Generate a list of random users who have vibed at this location
  const getRandomUsers = (count: number) => {
    const shuffled = [...mockUsers].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  // Get list of users who have vibed here
  const generateLocationUsers = () => {
    const count = locationPostCount > 100 ? 100 : locationPostCount;
    return getRandomUsers(count);
  };

  // Get a preview of users who have vibed here
  const previewUsers = generateLocationUsers().slice(0, 5);
  const allUsers = generateLocationUsers();

  // Determine location type categories for badges
  const getLocationCategories = () => {
    const mainType = post.location.type;
    
    // Add secondary categories for certain location types
    const secondaryTypes = [];
    
    if (mainType === "event") {
      if (post.location.name.toLowerCase().includes("festival")) {
        secondaryTypes.push("music");
      } else if (post.location.name.toLowerCase().includes("rodeo")) {
        secondaryTypes.push("sports");
      } else if (post.location.name.toLowerCase().includes("comedy") || post.location.name.toLowerCase().includes("laugh")) {
        secondaryTypes.push("comedy");
      }
    }
    
    if (mainType === "attraction") {
      if (post.location.name.toLowerCase().includes("ski") || post.location.name.toLowerCase().includes("snow")) {
        secondaryTypes.push("winter sports");
      } else if (post.location.name.toLowerCase().includes("beach") || post.location.name.toLowerCase().includes("ocean")) {
        secondaryTypes.push("beach");
      }
    }
    
    return [mainType, ...secondaryTypes];
  };

  const locationCategories = getLocationCategories();

  // User profile link
  const userProfileLink = `/user/${post.user.id}`;

  return (
    <Card className="vibe-card overflow-hidden mb-4">
      <CardHeader className="p-4 pb-0">
        <div className="flex justify-between items-start">
          {/* Location information (on the left side) */}
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage 
                src={`https://source.unsplash.com/random/200x200/?${post.location.type}`} 
                alt={post.location.name} 
              />
              <AvatarFallback>{post.location.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium flex items-center">
                <Link to={`/venue/${post.location.id}`} className="hover:underline">
                  {post.location.name}
                </Link>
                {post.location.verified && (
                  <VerifiedIcon className="h-4 w-4 ml-1 text-primary" />
                )}
              </div>
              <div className="text-sm text-muted-foreground flex items-center">
                <MapPin className="h-3 w-3 mr-1" />
                <span>{post.location.city}, {post.location.state}</span>
              </div>
            </div>
          </div>

          {/* User/post count and expiration (on the right side) */}
          <div className="flex flex-col items-end">
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="h-3 w-3 mr-1" />
              <span>Expires in {hoursRemaining}h</span>
            </div>
            
            {locationPostCount > 1 ? (
              <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                <CollapsibleTrigger asChild>
                  <Button variant="link" size="sm" className="p-0 h-auto text-sm">
                    <Users className="h-3 w-3 mr-1" />
                    <span className="font-medium">
                      {locationPostCount > 100 
                        ? "100+ people vibed here in last 24hrs"  
                        : `${locationPostCount} people vibed here in last 24hrs`}
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
                    {/* User who made this post */}
                    <div className="flex items-center">
                      <Avatar className="h-6 w-6 mr-1">
                        <AvatarImage src={post.user.avatar} alt={post.user.name} />
                        <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <Link to={userProfileLink} className="hover:underline flex items-center">
                        <span>@{post.user.username}</span>
                        <UserIcon className="h-3 w-3 ml-1 opacity-50" />
                      </Link>
                      <span className="ml-1">{timeAgo}</span>
                    </div>
                    
                    {/* Other users who vibed here */}
                    <div className="mt-1">
                      <h4 className="text-xs font-medium mb-2">Recent Vibers:</h4>
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
                            to={`/venue/${post.location.id}/vibers`}
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
                  <AvatarImage src={post.user.avatar} alt={post.user.name} />
                  <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <Link to={userProfileLink} className="hover:underline flex items-center">
                  <span>@{post.user.username}</span>
                  <UserIcon className="h-3 w-3 ml-1 opacity-50" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <p className="mb-3">{post.content}</p>
        <div className="grid grid-cols-1 gap-2">
          {post.media.map((media, index) => (
            <div key={index} className="rounded-lg overflow-hidden">
              {media.type === "image" ? (
                <img
                  src={media.url}
                  alt={`Media at ${post.location.name}`}
                  className="w-full h-auto object-cover"
                />
              ) : (
                <video
                  src={media.url}
                  controls
                  className="w-full h-auto"
                  poster="https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2 mt-3">
          {locationCategories.map((category, index) => (
            <Badge key={index} variant="outline" className="bg-muted">
              {category}
            </Badge>
          ))}
          <span className="text-xs text-muted-foreground ml-auto">{timeAgo}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex flex-col">
        <div className="flex justify-between w-full">
          <Button
            variant="ghost"
            size="sm"
            className={`flex items-center gap-1 ${liked ? 'text-accent' : ''}`}
            onClick={handleLike}
          >
            <Heart className={`h-4 w-4 ${liked ? 'fill-accent' : ''}`} />
            <span>{likeCount}</span>
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center gap-1"
            onClick={() => setShowComments(!showComments)}
          >
            <MessageSquare className="h-4 w-4" />
            <span>{post.comments}</span>
          </Button>
          <Button variant="default" size="sm" className="ml-auto" asChild>
            <Link to={`/venue/${post.location.id}`}>View Location</Link>
          </Button>
        </div>
        
        {showComments && (
          <CommentList postId={post.id} commentsCount={post.comments} />
        )}
        
        {/* Modal for showing all users who vibed here */}
        {showAllUsers && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowAllUsers(false)}>
            <div className="bg-background rounded-lg max-w-md w-full max-h-[80vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
              <div className="p-4 border-b flex justify-between items-center">
                <h3 className="font-bold">People who vibed at {post.location.name}</h3>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setShowAllUsers(false)}>×</Button>
              </div>
              <div className="p-4 overflow-y-auto max-h-[calc(80vh-4rem)]">
                <div className="grid gap-2">
                  {allUsers.map((user, index) => (
                    <Link key={index} to={`/user/${user.id}`} className="flex items-center p-2 hover:bg-muted rounded-md">
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
      </CardFooter>
    </Card>
  );
};

export default PostCard;
