
import React from 'react';
import { Post } from '@/types';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreVertical, Users } from 'lucide-react';

interface UserDropdownProps {
  post: Post;
  userCount?: number;
}

const UserDropdown: React.FC<UserDropdownProps> = ({ post, userCount = 0 }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
          <div className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            <span className="text-xs">{userCount}</span>
            <MoreVertical className="h-3 w-3" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          View User Profile
        </DropdownMenuItem>
        <DropdownMenuItem>
          Follow User
        </DropdownMenuItem>
        <DropdownMenuItem>
          Share Post
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
