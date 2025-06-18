
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Calendar, Link as LinkIcon, MessageCircle, UserPlus, Settings } from "lucide-react";
import { User } from "@/types";

interface UserProfileHeaderProps {
  user: User;
  isOwnProfile?: boolean;
  isFollowing?: boolean;
  onFollow?: () => void;
  onMessage?: () => void;
}

const UserProfileHeader = ({ 
  user, 
  isOwnProfile = false, 
  isFollowing = false,
  onFollow,
  onMessage 
}: UserProfileHeaderProps) => {
  const [following, setFollowing] = useState(isFollowing);

  const handleFollow = () => {
    setFollowing(!following);
    onFollow?.();
  };

  const formatJoinDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long' 
    });
  };

  return (
    <Card className="overflow-hidden">
      <div className="h-32 bg-gradient-to-r from-blue-400 to-purple-500"></div>
      <CardContent className="relative p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end space-y-4 sm:space-y-0 sm:space-x-6">
          {/* Profile Picture */}
          <Avatar className="h-24 w-24 border-4 border-white -mt-16 relative z-10">
            <AvatarImage src={user.avatar} alt={user.username} />
            <AvatarFallback className="text-2xl font-bold">
              {user.username[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>

          {/* User Info */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <h1 className="text-2xl font-bold truncate">{user.displayName}</h1>
                  {user.verified && (
                    <Badge variant="secondary" className="text-xs">
                      ✓ Verified
                    </Badge>
                  )}
                </div>
                <p className="text-muted-foreground text-sm">@{user.username}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                {isOwnProfile ? (
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                ) : (
                  <>
                    <Button
                      variant={following ? "outline" : "default"}
                      size="sm"
                      onClick={handleFollow}
                    >
                      <UserPlus className="h-4 w-4 mr-2" />
                      {following ? "Following" : "Follow"}
                    </Button>
                    <Button variant="outline" size="sm" onClick={onMessage}>
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Message
                    </Button>
                  </>
                )}
              </div>
            </div>

            {/* Bio */}
            {user.bio && (
              <p className="mt-3 text-sm">{user.bio}</p>
            )}

            {/* Stats and Meta */}
            <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>Joined {formatJoinDate(user.createdAt)}</span>
              </div>
              
              <div className="flex space-x-4">
                <span>
                  <strong className="text-foreground">{user.posts || 0}</strong> posts
                </span>
                <span>
                  <strong className="text-foreground">{user.followers || 0}</strong> followers
                </span>
                <span>
                  <strong className="text-foreground">{user.following || 0}</strong> following
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfileHeader;
