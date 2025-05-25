
import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Location } from "@/types";
import { mockUsers } from "@/mock/users";
import { hashString } from "@/mock/users";

interface PostUsersListProps {
  location: Location;
  setShowAllUsers: (show: boolean) => void;
}

const PostUsersList: React.FC<PostUsersListProps> = ({ location, setShowAllUsers }) => {
  // Deterministically select users for each location based on location ID
  const getLocationUsers = useMemo(() => {
    const locationSeed = parseInt(location.id) || hashString(location.name);
    
    // Always include our 5 main profile users
    const featuredUsernames = ['sarah_vibes', 'jay_experiences', 'adventure_alex', 'marco_travels', 'local_explorer'];
    const featuredUsers = mockUsers.filter(user => featuredUsernames.includes(user.username));
    
    // Select additional random users based on location seed
    const otherUsers = mockUsers.filter(user => !featuredUsernames.includes(user.username));
    const shuffled = [...otherUsers].sort(() => 0.5 - (locationSeed * 0.0001));
    const additionalUsers = shuffled.slice(0, 95); // Get 95 more for a total of 100
    
    return [...featuredUsers, ...additionalUsers];
  }, [location.id, location.name]);

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowAllUsers(false)}>
      <div className="bg-background rounded-lg max-w-md w-full max-h-[80vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="font-bold">People who visited {location.name}</h3>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setShowAllUsers(false)}>×</Button>
        </div>
        <div className="p-4 overflow-y-auto max-h-[calc(80vh-4rem)]">
          <div className="grid gap-2">
            {getLocationUsers.map((user, index) => (
              <Link key={index} to={`/user/${user.username}`} className="flex items-center p-2 hover:bg-muted rounded-md">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium text-sm">@{user.username}</div>
                  <div className="text-xs text-muted-foreground">{user.name}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostUsersList;
