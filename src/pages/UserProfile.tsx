
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Users, Heart, MessageSquare, Share2, MoreHorizontal } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import useUserProfile from "@/hooks/useUserProfile";

const UserProfile = () => {
  const { username } = useParams<{ username: string }>();
  const { profile: user } = useUserProfile(username!);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    // Mock follow status - replace with actual API call
    setTimeout(() => {
      setIsFollowing(username === 'vernon'); // Example: follow vernon by default
    }, 500);
  }, [username]);

  if (!user) {
    return <Layout>User not found</Layout>;
  }

  return (
    <Layout>
      <div className="container py-8">
        <Card className="w-full max-w-4xl mx-auto">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-2xl font-semibold">{user.name}</h2>
                  <p className="text-gray-500">@{user.username}</p>
                </div>
              </div>
              <div>
                <Button variant={isFollowing ? "outline" : "default"} onClick={() => setIsFollowing(!isFollowing)}>
                  {isFollowing ? "Unfollow" : "Follow"}
                </Button>
              </div>
            </div>

            <div className="mb-4">
              <p>{user.bio || "No bio provided."}</p>
            </div>

            <div className="flex items-center space-x-4 text-gray-600 mb-4">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                {user.location || "Unknown location"}
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                Joined {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Unknown'}
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-2" />
                {user.followersCount} Followers
              </div>
              <div className="flex items-center">
                <Heart className="h-4 w-4 mr-2" />
                {user.likesCount} Likes
              </div>
            </div>

            <div className="flex space-x-2">
              <Badge variant="secondary">Vibing</Badge>
              <Badge variant="secondary">Explorer</Badge>
              {user.isVerified && <Badge variant="default">Verified</Badge>}
            </div>

            <div className="mt-6 flex justify-between items-center">
              <div className="text-gray-500">
                <MessageSquare className="inline-block h-5 w-5 mr-1" />
                <Share2 className="inline-block h-5 w-5 mr-1" />
              </div>
              <MoreHorizontal className="h-5 w-5 text-gray-500 cursor-pointer" />
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default UserProfile;
