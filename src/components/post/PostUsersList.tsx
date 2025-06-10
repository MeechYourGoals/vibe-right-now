
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { mockUsers } from "@/mock/users";
import { Location } from "@/types";

interface PostUsersListProps {
  venue: Location;
  setShowAllUsers: (show: boolean) => void;
}

const PostUsersList: React.FC<PostUsersListProps> = ({ venue, setShowAllUsers }) => {
  return (
    <Dialog open={true} onOpenChange={() => setShowAllUsers(false)}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>People at {venue.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {mockUsers.slice(0, 20).map((user) => (
            <div key={user.id} className="flex items-center p-3 hover:bg-muted rounded-md">
              <Avatar className="h-10 w-10 mr-3">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="font-medium">@{user.username}</div>
                <div className="text-sm text-muted-foreground">{user.name}</div>
              </div>
              <Button variant="outline" size="sm">
                Follow
              </Button>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PostUsersList;
