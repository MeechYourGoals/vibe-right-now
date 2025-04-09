
import React from "react";
import { Link } from "react-router-dom";
import { Location, Post, User } from "@/types";
import { formatDistanceToNow } from "date-fns";
import { MapPin, VerifiedIcon, Users, ChevronDown, ChevronUp, UserIcon, MoreHorizontal, PlusCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { mockUsers } from "@/mock/data";

interface PostHeaderProps {
  location: Location;
  isFollowed: boolean;
  onFollowVenue: () => void;
  locationPostCount: number;
  mainPost: Post;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setShowAllUsers: (show: boolean) => void;
}

const PostHeader: React.FC<PostHeaderProps> = ({
  location,
  isFollowed,
  onFollowVenue,
  locationPostCount,
  mainPost,
  isOpen,
  setIsOpen,
  setShowAllUsers
}) => {
  const getRandomUsers = (count: number) => {
    const shuffled = [...mockUsers].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const generateLocationUsers = () => {
    const count = locationPostCount > 100 ? 100 : locationPostCount;
    return getRandomUsers(count);
  };

  const previewUsers = generateLocationUsers().slice(0, 5);

  return (
    <div className="p-4 pb-0">
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
            onClick={onFollowVenue}
          >
            <PlusCircle className="h-4 w-4 mr-1" />
            {isFollowed ? "Following" : "Follow"}
          </Button>
          
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
    </div>
  );
};

export default PostHeader;
