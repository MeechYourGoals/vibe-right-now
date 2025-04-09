
import React from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Location } from "@/types";
import { mockUsers } from "@/mock/data";

interface PostUsersListProps {
  location: Location;
  setShowAllUsers: (show: boolean) => void;
}

const PostUsersList: React.FC<PostUsersListProps> = ({ location, setShowAllUsers }) => {
  const getRandomUsers = (count: number) => {
    const shuffled = [...mockUsers].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };
  
  const allUsers = getRandomUsers(100);

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowAllUsers(false)}>
      <div className="bg-background rounded-lg max-w-md w-full max-h-[80vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="font-bold">People who visited {location.name}</h3>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setShowAllUsers(false)}>×</Button>
        </div>
        <div className="p-4 overflow-y-auto max-h-[calc(80vh-4rem)]">
          <div className="grid gap-2">
            {allUsers.map((user, index) => (
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
