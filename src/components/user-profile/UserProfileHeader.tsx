
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Users, Heart } from "lucide-react";
import { UserProfileData } from "@/types";

interface UserProfileHeaderProps {
  user: UserProfileData;
}

const UserProfileHeader = ({ user }: UserProfileHeaderProps) => {
  return (
    <Card className="bg-card border-border">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex flex-col items-center md:items-start">
            <Avatar className="h-24 w-24 md:h-32 md:w-32">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
              <h1 className="text-2xl font-bold text-foreground">{user.name}</h1>
              {user.verified && (
                <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                  Verified
                </Badge>
              )}
            </div>
            
            <p className="text-muted-foreground mb-2">@{user.username}</p>
            
            {user.bio && (
              <p className="text-foreground mb-4">{user.bio}</p>
            )}
            
            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{user.followers || 0} followers</span>
              </div>
              <div className="flex items-center gap-1">
                <Heart className="h-4 w-4" />
                <span>{user.following || 0} following</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{user.posts || 0} posts</span>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-2">
              <Button variant="outline" size="sm">
                Follow
              </Button>
              <Button variant="outline" size="sm">
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
