
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Users, Award, Share2 } from "lucide-react";
import VerifiedIcon from "@/components/icons/VerifiedIcon";
import { User } from "@/types";
import { toast } from "sonner";

interface UserProfileHeaderProps {
  user: User;
  getUserBio: () => string;
}

const UserProfileHeader = ({ user, getUserBio }: UserProfileHeaderProps) => {
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
    
    if (isFollowing) {
      toast.success(`Unfollowed @${user?.username}`);
    } else {
      toast.success(`Now following @${user?.username}`);
    }
  };
  
  const handleShareProfile = () => {
    if (navigator.share) {
      navigator.share({
        title: `Check out ${user?.name}'s profile on Vibe Right Now!`,
        text: `I found ${user?.name} (@${user?.username}) on Vibe Right Now and thought you might want to follow them!`,
        url: `${window.location.origin}/user/${user?.username}`
      })
      .then(() => toast.success("Shared successfully!"))
      .catch((error) => {
        console.error('Error sharing:', error);
        toast.error("Couldn't share. Try copying the link instead.");
      });
    } else {
      // Fallback for browsers that don't support navigator.share
      const url = `${window.location.origin}/user/${user?.username}`;
      navigator.clipboard.writeText(url)
        .then(() => toast.success("Profile link copied to clipboard!"))
        .catch(() => toast.error("Couldn't copy link. Please try again."));
    }
  };

  return (
    <div className="glass-effect p-6 rounded-xl mb-6">
      <div className="flex items-start gap-6">
        <Avatar className="h-24 w-24 border-2 border-primary">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback>{user.name[0]}</AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                {user.name}
                {user.verified && <VerifiedIcon className="h-5 w-5 text-primary" />}
              </h1>
              <p className="text-muted-foreground">@{user.username}</p>
              
              <div className="flex flex-wrap items-center gap-4 mt-2">
                <div className="flex items-center text-sm">
                  <Users className="h-4 w-4 mr-2" />
                  <span>{user.isCelebrity ? Math.floor(Math.random() * 90 + 10) + "M" : Math.floor(Math.random() * 900 + 100) + "K"} Followers</span>
                </div>
                <div className="flex items-center text-sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>Joined {user.isCelebrity ? "Jan 2020" : "Aug 2023"}</span>
                </div>
                <div className="flex items-center text-sm">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{user.isCelebrity ? "Los Angeles, CA" : "New York, NY"}</span>
                </div>
              </div>
              
              <div className="mt-4 flex flex-wrap gap-2">
                {user.isCelebrity && (
                  <Badge variant="outline" className="bg-blue-500/20 text-blue-500">Verified</Badge>
                )}
                <Badge variant="outline" className="bg-primary/20">Top Vibe Creator</Badge>
                {user.isCelebrity ? (
                  <Badge variant="outline" className="bg-rose-500/20 text-rose-500">Celebrity</Badge>
                ) : (
                  <Badge variant="outline" className="bg-purple-500/20 text-purple-600">VIP Member</Badge>
                )}
                <Badge variant="outline" className="bg-amber-500/20 text-amber-600">
                  <Award className="h-3 w-3 mr-1" />
                  <span>Vibe Enthusiast</span>
                </Badge>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="h-9"
                onClick={handleShareProfile}
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button 
                variant={isFollowing ? "default" : "outline"}
                size="sm"
                className="h-9"
                onClick={handleFollowToggle}
              >
                {isFollowing ? "Following" : "Follow"}
              </Button>
            </div>
          </div>
          
          <p className="mt-4 text-sm">
            {getUserBio()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserProfileHeader;
