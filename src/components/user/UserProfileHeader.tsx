import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  UserPlus, 
  MessageSquare, 
  MoreHorizontal, 
  MapPin, 
  Calendar, 
  Verified,
  Instagram,
  Twitter,
  Youtube
} from "lucide-react";
import { User } from "@/types";

interface UserProfileHeaderProps {
  user: User;
  isOwner?: boolean;
  isFollowing?: boolean;
  onFollow?: () => void;
  onMessage?: () => void;
}

const UserProfileHeader: React.FC<UserProfileHeaderProps> = ({
  user,
  isOwner = false,
  isFollowing = false,
  onFollow,
  onMessage
}) => {
  
  return (
    <div className="relative">
      {/* Cover Photo */}
      <div className="h-48 md:h-64 bg-gradient-to-r from-purple-500 to-blue-600 relative">
        {user.coverPhoto && (
          <img 
            src={user.coverPhoto} 
            alt="Cover" 
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Profile Content */}
      <div className="px-4 pb-4 -mt-16 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-4">
          {/* Avatar and Basic Info */}
          <div className="flex flex-col md:flex-row md:items-end gap-4">
            <Avatar className="w-32 h-32 border-4 border-background">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="text-2xl">{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            
            <div className="md:mb-4">
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl md:text-3xl font-bold">{user.name}</h1>
                {user.isVerified && (
                  <Verified className="h-6 w-6 text-blue-500 fill-current" />
                )}
              </div>
              <p className="text-muted-foreground text-lg">@{user.username}</p>
              {user.location && (
                <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                  <MapPin className="h-4 w-4" />
                  <span>{user.location}</span>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          {!isOwner && (
            <div className="flex gap-2 mt-4 md:mt-0">
              <Button 
                variant={isFollowing ? "outline" : "default"}
                onClick={onFollow}
                className="flex-1 md:flex-none"
              >
                <UserPlus className="h-4 w-4 mr-2" />
                {isFollowing ? "Following" : "Follow"}
              </Button>
              <Button variant="outline" onClick={onMessage}>
                <MessageSquare className="h-4 w-4 mr-2" />
                Message
              </Button>
              <Button variant="outline" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Bio */}
        {user.bio && (
          <p className="text-foreground mb-4 max-w-2xl">{user.bio}</p>
        )}

        {/* Stats and Additional Info */}
        <div className="flex flex-wrap items-center gap-6 text-sm mb-4">
          <div className="flex gap-4">
            <span><strong>{user.followers?.toLocaleString() || 0}</strong> followers</span>
            <span><strong>{user.following?.toLocaleString() || 0}</strong> following</span>
          </div>
          
          {user.joinedDate && (
            <div className="flex items-center gap-1 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Joined {new Date(user.joinedDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
            </div>
          )}
        </div>

        {/* Vibe Tags */}
        {user.vibeTags && user.vibeTags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {user.vibeTags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="bg-primary/10 text-primary">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Social Links */}
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <Instagram className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Twitter className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Youtube className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserProfileHeader;
