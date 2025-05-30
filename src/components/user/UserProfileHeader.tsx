import React from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Calendar, Users, Heart, MessageCircle, Instagram, X } from "lucide-react";
import { User } from "@/types";

interface UserProfileHeaderProps {
  user: User;
  isCurrentUser?: boolean;
}

const UserProfileHeader: React.FC<UserProfileHeaderProps> = ({ user, isCurrentUser }) => {
  return (
    <Card className="bg-background">
      <CardContent className="p-0">
        {/* Cover Photo */}
        <div className="h-32 bg-muted relative">
          <img
            src={user.coverPhoto || "/placeholder-image.jpg"}
            alt="Cover"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* Profile Info */}
        <div className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                <AvatarFallback>{user.name?.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-lg font-semibold flex items-center space-x-1">
                  <span>{user.name}</span>
                  {user.isVerified && (
                    <Badge variant="secondary">Verified</Badge>
                  )}
                  {user.isCelebrity && (
                    <Badge>Celebrity</Badge>
                  )}
                </h2>
                <p className="text-sm text-muted-foreground">@{user.username}</p>
              </div>
            </div>
            {isCurrentUser ? (
              <Button variant="outline" size="sm">
                Edit Profile
              </Button>
            ) : (
              <Button size="sm">Follow</Button>
            )}
          </div>

          {/* Bio and Stats */}
          <div className="mt-3 space-y-2">
            <p className="text-sm">{user.bio || "No bio available."}</p>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Users className="h-4 w-4" />
                <span>{user.followers || 0} Followers</span>
              </div>
              <div className="flex items-center space-x-1">
                <Heart className="h-4 w-4" />
                <span>{user.following || 0} Following</span>
              </div>
            </div>
          </div>

          {/* Location and Joined Date */}
          <div className="mt-3 space-y-2 text-sm text-muted-foreground">
            {user.location && (
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>{user.location}</span>
              </div>
            )}
            {user.joinedDate && (
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>Joined {user.joinedDate}</span>
              </div>
            )}
          </div>

          {/* Social Links */}
          <div className="mt-4 flex space-x-3">
            <a href="#" className="hover:text-primary transition-colors">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              <X className="h-5 w-5" />
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              <MessageCircle className="h-5 w-5" />
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfileHeader;
