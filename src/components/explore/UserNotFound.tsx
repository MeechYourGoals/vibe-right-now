
import React from "react";
import { User } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { mockUsers } from "@/mock/users";

interface UserNotFoundProps {
  searchTerm: string;
}

const UserNotFound: React.FC<UserNotFoundProps> = ({ searchTerm }) => {
  const navigate = useNavigate();

  const handleUserClick = (username: string) => {
    navigate(`/user/${username}`);
  };

  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
        <User className="h-8 w-8 text-muted-foreground" />
      </div>
      <h2 className="text-xl font-semibold mb-2">User Not Found</h2>
      <p className="text-muted-foreground mb-6">
        We couldn't find the user "{searchTerm}". Here are some suggested users you might like.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        {mockUsers.slice(0, 6).map(user => (
          <div 
            key={user.id}
            className="flex flex-col items-center cursor-pointer transition hover:scale-105"
            onClick={() => handleUserClick(user.username)}
          >
            <Avatar className="h-16 w-16 mb-2">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <p className="font-medium text-sm">{user.name}</p>
            <p className="text-xs text-muted-foreground">@{user.username}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserNotFound;
