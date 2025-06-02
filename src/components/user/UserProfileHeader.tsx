
import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Users, Award, Share2, Sparkles, Crown, Brain } from "lucide-react";
import VerifiedIcon from "@/components/icons/VerifiedIcon";
import { User, UserSubscriptionTier } from "@/types";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface UserProfileHeaderProps {
  user: User;
  getUserBio: () => string;
}

const UserProfileHeader = ({ user, getUserBio }: UserProfileHeaderProps) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Trigger entrance animation after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

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
    <div 
      className={cn(
        "glass-effect p-6 rounded-xl mb-6 transition-all duration-500 transform",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      )}
    >
      <div className="flex items-start gap-6">
        <Avatar className="h-24 w-24 border-2 border-primary transition-transform hover:scale-105 duration-300">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback>{user.name[0]}</AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                {user.name}
                {user.verified && (
                  <VerifiedIcon className="h-5 w-5 text-primary animate-pulse-slow" />
                )}
              </h1>
              <p className="text-muted-foreground">@{user.username}</p>
              
              <div className="flex flex-wrap items-center gap-4 mt-2">
                <div className="flex items-center text-sm transition-all duration-300 hover:text-primary">
                  <Users className="h-4 w-4 mr-2" />
                  <span>{user.isCelebrity ? Math.floor(Math.random() * 90 + 10) + "M" : Math.floor(Math.random() * 900 + 100) + "K"} Followers</span>
                </div>
                <div className="flex items-center text-sm transition-all duration-300 hover:text-primary">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>Joined {user.isCelebrity ? "Jan 2020" : "Aug 2023"}</span>
                </div>
                <div className="flex items-center text-sm transition-all duration-300 hover:text-primary">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{user.isCelebrity ? "Los Angeles, CA" : "New York, NY"}</span>
                </div>
              </div>
              
              <div className="mt-4 flex flex-wrap gap-2">
                {user.isCelebrity && (
                  <Badge 
                    variant="outline" 
                    className="bg-blue-500/20 text-blue-500 transition-all duration-300 hover:bg-blue-500/30"
                  >
                    Verified
                  </Badge>
                )}
                <Badge 
                  variant="outline" 
                  className="bg-primary/20 transition-all duration-300 hover:bg-primary/30"
                >
                  Top Vibe Creator
                </Badge>
                {user.isCelebrity ? (
                  <Badge 
                    variant="outline" 
                    className="bg-rose-500/20 text-rose-500 transition-all duration-300 hover:bg-rose-500/30"
                  >
                    Celebrity
                  </Badge>
                ) : (
                  <Badge 
                    variant="outline" 
                    className="bg-purple-500/20 text-purple-600 transition-all duration-300 hover:bg-purple-500/30"
                  >
                    VIP Member
                  </Badge>
                )}
                <Badge 
                  variant="outline" 
                  className="bg-amber-500/20 text-amber-600 transition-all duration-300 hover:bg-amber-500/30"
                >
                  <Award className="h-3 w-3 mr-1" />
                  <span>Vibe Enthusiast</span>
                </Badge>

                {/* Subscription Tier Badge */}
                {user.subscription && user.subscription !== 'free' && (
                  <Badge
                    variant="outline"
                    className={cn(
                      "font-semibold",
                      user.subscription === 'plus' && "bg-sky-100 text-sky-700 border-sky-300 hover:bg-sky-200",
                      user.subscription === 'premium' && "bg-purple-100 text-purple-700 border-purple-300 hover:bg-purple-200",
                      user.subscription === 'pro' && "bg-red-100 text-red-700 border-red-300 hover:bg-red-200"
                    )}
                  >
                    {user.subscription === 'plus' && <Sparkles className="h-3 w-3 mr-1.5" />}
                    {user.subscription === 'premium' && <Crown className="h-3 w-3 mr-1.5" />}
                    {user.subscription === 'pro' && <Brain className="h-3 w-3 mr-1.5" />}
                    {user.subscription.charAt(0).toUpperCase() + user.subscription.slice(1)} Tier
                  </Badge>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="h-9 transition-all duration-300 hover:bg-accent/30"
                onClick={handleShareProfile}
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button 
                variant={isFollowing ? "default" : "outline"}
                size="sm"
                className={cn(
                  "h-9 transition-all duration-300",
                  isFollowing 
                    ? "bg-primary hover:bg-primary/90" 
                    : "hover:bg-primary/20"
                )}
                onClick={handleFollowToggle}
              >
                {isFollowing ? "Following" : "Follow"}
              </Button>
            </div>
          </div>
          
          <p className="mt-4 text-sm transition-all duration-500 hover:text-foreground">
            {getUserBio()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserProfileHeader;
