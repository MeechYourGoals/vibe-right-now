
import React from "react";
import { Button } from "@/components/ui/button";
import { Lock, Share, UserPlus, MapPin, Calendar, Users } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User } from "@/types";

interface PrivateProfileContentProps {
  user: User;
}

const PrivateProfileContent = ({ user }: PrivateProfileContentProps) => {
  const joinedDate = new Date(user.createdAt || '').toLocaleDateString('en-US', { 
    month: 'short', 
    year: 'numeric' 
  });

  return (
    <div className="bg-card rounded-lg overflow-hidden">
      {/* Cover/Banner area */}
      <div className="h-32 bg-gradient-to-r from-teal-500 via-blue-500 to-purple-600 relative">
        <div className="absolute top-4 right-4 flex gap-2">
          <Button variant="outline" size="sm" className="bg-background/80 backdrop-blur-sm">
            <Share className="h-4 w-4 mr-1" />
            Share
          </Button>
          <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
            <UserPlus className="h-4 w-4 mr-1" />
            Follow
          </Button>
        </div>
      </div>
      
      {/* Profile content */}
      <div className="px-6 pb-6 -mt-16 relative">
        <div className="flex items-start gap-6">
          <Avatar className="h-24 w-24 border-4 border-background bg-background">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="text-2xl">{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          
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

      {/* Private Profile Message */}
      <div className="text-center py-16 px-4 border-t">
        <div className="max-w-md mx-auto">
          <div className="mb-6 flex justify-center">
            <div className="p-4 rounded-full bg-muted">
              <Lock className="h-12 w-12 text-muted-foreground" />
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-2">This profile is private</h2>
          <p className="text-muted-foreground mb-8">
            @{user.username} has chosen to keep their profile private. 
            Follow them to request access to their content.
          </p>
          <Button className="bg-teal-600 hover:bg-teal-700">
            Request to Follow
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PrivateProfileContent;
