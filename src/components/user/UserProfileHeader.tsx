import React from "react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { VerifiedIcon } from "lucide-react";
import {
  UserPlus,
  UserCheck,
  Bell,
  Users,
  Crown,
  Instagram as InstagramIcon,
  Twitter as TwitterIcon,
  Youtube as YoutubeIcon,
  Tiktok as TiktokIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { User } from "@/types";

interface UserProfileHeaderProps {
  user: User;
  isFollowing: boolean;
  onFollowToggle: () => void;
}

const UserProfileHeader = ({ user, isFollowing, onFollowToggle }: UserProfileHeaderProps) => {
  const timeAgo = user.joinedDate ? formatDistanceToNow(new Date(user.joinedDate), { addSuffix: true }) : null;
  
  return (
    <div className="pb-6">
      <div className="relative">
        <img
          src={user.coverPhoto || "https://source.unsplash.com/random/1200x400/?nature"}
          alt="Cover"
          className="w-full h-48 object-cover rounded-md"
        />
      </div>
      
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 px-4 pb-2 -mt-12 md:-mt-16 relative z-10">
        <div className="flex items-end gap-4">
          <Link to={`/user/${user.username}`}>
            <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-white">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </Link>
          
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">{user.name}</h1>
              {user.isVerified && (
                <VerifiedIcon className="h-5 w-5 text-blue-500" />
              )}
            </div>

            <p className="text-sm text-muted-foreground">
              @{user.username}
            </p>
            
            {user.isCelebrity && (
              <div className="mt-1">
                <Badge variant="outline" className="bg-gradient-to-r from-purple-100 to-pink-100 text-pink-800 border-pink-200">
                  <Crown className="h-3 w-3 mr-1 text-amber-500" />
                  Celebrity
                </Badge>
              </div>
            )}
            
            {timeAgo && (
              <p className="text-sm text-muted-foreground mt-1">
                Joined {timeAgo}
              </p>
            )}
            
            {user.isCelebrity && (
              <p className="text-sm text-muted-foreground mt-1">
                <Badge variant="secondary" className="mr-1 font-normal">
                  <Users className="h-3 w-3 mr-1" />
                  1.2M Followers
                </Badge>
              </p>
            )}
            
            {user.location && (
              <p className="text-sm text-muted-foreground mt-1">
                {user.location}
              </p>
            )}
            
            {user.isCelebrity && (
              <div className="flex items-center gap-1 mt-2">
                <InstagramIcon className="h-4 w-4 text-pink-600" />
                <TwitterIcon className="h-4 w-4 text-blue-400" />
                <TiktokIcon className="h-4 w-4" />
                <YoutubeIcon className="h-4 w-4 text-red-500" />
              </div>
            )}
          </div>
        </div>
        
        <div>
          {user.isCelebrity ? (
            <Button className="relative">
              <Bell className="h-4 w-4 mr-2" />
              Get Notifications
            </Button>
          ) : (
            <Button 
              variant={isFollowing ? "secondary" : "default"}
              onClick={onFollowToggle}
              className="relative"
            >
              {isFollowing ? (
                <>
                  <UserCheck className="h-4 w-4 mr-2" />
                  Following
                </>
              ) : (
                <>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Follow
                </>
              )}
            </Button>
          )}
        </div>
      </div>
      
      <div className="px-4">
        <p className="text-sm">{user.bio || "No bio provided."}</p>
      </div>
    </div>
  );
};

export default UserProfileHeader;
