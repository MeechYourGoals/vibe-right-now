import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MapPin, Link, Calendar, MessageSquare } from "lucide-react";
import VerifiedBadge from "@/components/icons/VerifiedIcon";

interface UserProfileHeaderProps {
  user: {
    id: string;
    name: string;
    username: string;
    avatar: string;
    isVerified: boolean;
    bio?: string;
    location?: string;
    joinedDate?: string;
    website?: string;
    followerCount?: number;
    followingCount?: number;
  };
  onFollowToggle?: () => void;
  onMessageClick?: () => void;
}

const UserProfileHeader = ({ user, onFollowToggle, onMessageClick }: UserProfileHeaderProps) => {
  const handleFollowToggle = () => {
    if (onFollowToggle) {
      onFollowToggle();
    }
  };

  const handleMessageClick = () => {
    if (onMessageClick) {
      onMessageClick();
    }
  };

  return (
    <Card className="vibe-card">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex flex-col items-center md:items-start">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="text-lg">{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            
            <div className="text-center md:text-left">
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl font-bold">{user.name}</h1>
                {user.isVerified && <VerifiedBadge />}
              </div>
              <p className="text-muted-foreground mb-2">{user.username}</p>
              {user.bio && <p className="text-sm mb-3">{user.bio}</p>}
              
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                {user.location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{user.location}</span>
                  </div>
                )}
                {user.website && (
                  <div className="flex items-center gap-1">
                    <Link className="h-4 w-4" />
                    <a href={`https://${user.website}`} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                      {user.website}
                    </a>
                  </div>
                )}
                {user.joinedDate && (
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>Joined {user.joinedDate}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex flex-col justify-between">
            <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
              <div className="text-center">
                <p className="font-bold text-lg">{user.followerCount}</p>
                <p className="text-muted-foreground text-sm">Followers</p>
              </div>
              <div className="text-center">
                <p className="font-bold text-lg">{user.followingCount}</p>
                <p className="text-muted-foreground text-sm">Following</p>
              </div>
            </div>
            
            <div className="flex justify-center md:justify-start gap-2">
              <Button onClick={handleFollowToggle}>Follow</Button>
              <Button variant="outline" onClick={handleMessageClick}>
                <MessageSquare className="mr-2 h-4 w-4" />
                Message
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfileHeader;
