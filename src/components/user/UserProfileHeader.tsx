
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Share, UserPlus, MapPin, Calendar, Users } from "lucide-react";
import { User } from '@/types';

interface UserProfileHeaderProps {
  user: User;
  onFollow?: (userToFollow: string) => Promise<boolean>;
  onUnfollow?: (userToUnfollow: string) => Promise<boolean>;
  onUpdateBio?: (newBio: string) => Promise<boolean>;
  onBlock?: (userToBlock: string) => Promise<boolean>;
  onReport?: (userToReport: string, reason: string) => Promise<boolean>;
  isPrivate?: boolean;
  getUserBio?: () => string;
}

const UserProfileHeader: React.FC<UserProfileHeaderProps> = ({ user }) => {
  const joinedDate = new Date(user.createdAt || '').toLocaleDateString('en-US', { 
    month: 'short', 
    year: 'numeric' 
  });

  return (
    <div className="bg-card rounded-lg overflow-hidden mb-6">
      {/* Cover/Banner area */}
      <div className="h-32 bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 relative">
        <div className="absolute top-4 right-4 flex gap-2">
          <Button variant="outline" size="sm" className="bg-background/80 backdrop-blur-sm">
            <Share className="h-4 w-4 mr-1" />
            Share
          </Button>
          <Button size="sm" className="bg-white text-black hover:bg-gray-100">
            <UserPlus className="h-4 w-4 mr-1" />
            Follow
          </Button>
        </div>
      </div>
      
      {/* Profile content */}
      <div className="px-6 pb-6 -mt-16 relative">
        <div className="flex items-start gap-6">
          <div className="relative">
            <Avatar className="h-24 w-24 border-4 border-background bg-background">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="text-2xl">{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-teal-400 rounded-full blur opacity-30"></div>
          </div>
          
          <div className="flex-1 pt-16">
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-2xl font-bold">{user.name}</h1>
              {user.verified && (
                <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  ✓ Verified
                </Badge>
              )}
            </div>
            
            <p className="text-muted-foreground mb-2">@{user.username}</p>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span><strong>{user.followers?.toLocaleString() || 0}</strong> Followers</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>Joined {joinedDate}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>New York, NY</span>
              </div>
            </div>

            {/* Badges */}
            <div className="flex gap-2 mb-3">
              <Badge variant="outline" className="bg-teal-100 text-teal-800 border-teal-300 dark:bg-teal-900 dark:text-teal-200">
                Top Vibe Creator
              </Badge>
              <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-900 dark:text-purple-200">
                VIP Member
              </Badge>
              <Badge variant="outline" className="bg-orange-100 text-orange-800 border-orange-300 dark:bg-orange-900 dark:text-orange-200">
                🔥 Vibe Enthusiast
              </Badge>
            </div>
            
            {user.bio && (
              <p className="text-foreground leading-relaxed">{user.bio}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileHeader;
