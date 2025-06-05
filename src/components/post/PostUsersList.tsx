
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Location } from "@/types";
import { mockUsers } from "@/mock/users";

interface PostUsersListProps {
  location: Location;
  setShowAllUsers: (show: boolean) => void;
}

const PostUsersList: React.FC<PostUsersListProps> = ({ location, setShowAllUsers }) => {
  // Generate a list of users who have been to this location
  const usersAtLocation = mockUsers.slice(0, 15); // Show up to 15 users

  return (
    <Dialog open={true} onOpenChange={() => setShowAllUsers(false)}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>People at {location.name}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {usersAtLocation.map((user) => (
            <div key={user.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50">
              <Link
                to={`/user/${user.username}`}
                className="flex items-center space-x-3 flex-1"
                onClick={() => setShowAllUsers(false)}
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">@{user.username}</span>
                    {user.verified && (
                      <Badge variant="secondary" className="text-xs">
                        Verified
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{user.name}</p>
                  {user.bio && (
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                      {user.bio}
                    </p>
                  )}
                </div>
              </Link>
              
              <Button variant="outline" size="sm" className="ml-2">
                Follow
              </Button>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center pt-4">
          <Button variant="outline" onClick={() => setShowAllUsers(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PostUsersList;
