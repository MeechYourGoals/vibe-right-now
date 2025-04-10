
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { VerifiedIcon } from "lucide-react";
import { mockUsers } from "@/mock/data";
import { User } from "@/types";

interface RecommendedForYouProps {
  featuredUsers?: string[];
}

const RecommendedForYou: React.FC<RecommendedForYouProps> = ({ featuredUsers }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [followStates, setFollowStates] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // If featured users are provided, use them
    if (featuredUsers && featuredUsers.length > 0) {
      // Filter and map for easy lookup
      const userMap = new Map(mockUsers.map(user => [user.username.toLowerCase(), user]));
      
      // Get users that match the featured usernames (case insensitive)
      const filteredUsers = featuredUsers
        .map(username => userMap.get(username.toLowerCase()))
        .filter((user): user is User => user !== undefined);
      
      setUsers(filteredUsers);
    } else {
      // Otherwise, just get random users from the mock data
      const randomUsers = [...mockUsers]
        .sort(() => 0.5 - Math.random())
        .slice(0, 5);
      setUsers(randomUsers);
    }

    // Initialize follow states
    const initialFollowStates: Record<string, boolean> = {};
    mockUsers.forEach(user => {
      initialFollowStates[user.id] = false;
    });
    setFollowStates(initialFollowStates);
  }, [featuredUsers]);

  const toggleFollow = (userId: string, e: React.MouseEvent) => {
    e.preventDefault();
    setFollowStates(prev => ({
      ...prev,
      [userId]: !prev[userId]
    }));
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Recommended For You</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {users.map((user) => (
            <div key={user.id} className="flex items-center justify-between">
              <Link 
                to={`/user/${user.username}`} 
                className="flex items-center space-x-3"
              >
                <Avatar>
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center">
                    <p className="font-medium text-sm">{user.name}</p>
                    {user.verified && (
                      <VerifiedIcon className="h-3.5 w-3.5 text-blue-500 ml-1" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">@{user.username}</p>
                </div>
              </Link>
              <Button
                variant="outline"
                size="sm"
                className={followStates[user.id] ? "bg-primary/10" : ""}
                onClick={(e) => toggleFollow(user.id, e)}
              >
                {followStates[user.id] ? "Following" : "Follow"}
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecommendedForYou;
