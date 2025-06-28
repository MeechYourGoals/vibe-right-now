
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
      {/* Cover/Banner area with proper spacing */}
      <div className="h-48 bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 relative">
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
      
      {/* Profile content with fixed spacing */}
      <div className="px-6 pb-6 -mt-20 relative">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          {/* Avatar section */}
          <div className="flex items-end gap-4">
            <div className="relative">
              <Avatar className="h-32 w-32 border-4 border-background bg-background shadow-lg">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="text-3xl font-bold">{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              {/* Vibe glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-teal-400 rounded-full blur opacity-30"></div>
            </div>
            
            {/* User info */}
            <div className="pt-12">
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-3xl font-bold text-foreground">{user.name}</h1>
                {user.verified && (
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    ✓ Verified
                  </Badge>
                )}
              </div>
              
              <p className="text-muted-foreground text-lg mb-1">@{user.username}</p>
              <p className="text-sm text-muted-foreground">Chief Vibe Officer</p>
            </div>
          </div>
        </div>
        
        {/* Stats and info row */}
        <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span><strong className="text-foreground">{user.followers?.toLocaleString() || 0}</strong> Followers</span>
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

        {/* Rich user badges */}
        <div className="flex flex-wrap gap-2 mt-4">
          <Badge variant="outline" className="bg-gradient-to-r from-teal-100 to-cyan-100 text-teal-800 border-teal-300 dark:from-teal-900 dark:to-cyan-900 dark:text-teal-200 px-3 py-1">
            🎯 Top Vibe Creator
          </Badge>
          <Badge variant="outline" className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border-purple-300 dark:from-purple-900 dark:to-pink-900 dark:text-purple-200 px-3 py-1">
            👑 VIP Member
          </Badge>
          <Badge variant="outline" className="bg-gradient-to-r from-orange-100 to-red-100 text-orange-800 border-orange-300 dark:from-orange-900 dark:to-red-900 dark:text-orange-200 px-3 py-1">
            🔥 Vibe Enthusiast
          </Badge>
        </div>
        
        {/* Bio */}
        {user.bio && (
          <div className="mt-4">
            <p className="text-foreground leading-relaxed">{user.bio}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfileHeader;
