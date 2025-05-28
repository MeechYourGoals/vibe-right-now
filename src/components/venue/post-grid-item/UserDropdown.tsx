
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, User, UserPlus, UserMinus } from "lucide-react";
import { regularUsers } from '@/mock/users/regularUsers';

interface UserDropdownProps {
  selectedUserId?: string;
  onUserSelect: (userId: string) => void;
}

const UserDropdown: React.FC<UserDropdownProps> = ({ selectedUserId, onUserSelect }) => {
  const users = regularUsers.slice(0, 5);
  const selectedUser = users.find(user => user.id === selectedUserId);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full justify-between bg-neutral-800 border-neutral-600 text-white">
          <div className="flex items-center space-x-2">
            {selectedUser ? (
              <>
                <img 
                  src={selectedUser.profileImage} 
                  alt={selectedUser.displayName}
                  className="w-5 h-5 rounded-full"
                />
                <span>{selectedUser.displayName}</span>
              </>
            ) : (
              <>
                <User className="h-4 w-4" />
                <span>Select User</span>
              </>
            )}
          </div>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-neutral-800 border-neutral-600">
        {users.map((user) => (
          <DropdownMenuItem 
            key={user.id} 
            onClick={() => onUserSelect(user.id)}
            className="text-white hover:bg-neutral-700 cursor-pointer"
          >
            <div className="flex items-center space-x-3 w-full">
              <img 
                src={user.profileImage} 
                alt={user.displayName}
                className="w-8 h-8 rounded-full"
              />
              <div className="flex-1">
                <p className="font-medium">{user.displayName}</p>
                <p className="text-xs text-neutral-400">@{user.username}</p>
              </div>
              {user.isVerified && (
                <Badge variant="secondary" className="text-xs">
                  Verified
                </Badge>
              )}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
