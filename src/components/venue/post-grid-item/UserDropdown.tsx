
import React from 'react';
import { MoreVertical, Trash2, Flag, UserX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Post } from '@/types';

interface UserDropdownProps {
  userCount: number;
  post: Post;
  canDelete?: boolean;
  onDelete?: () => void;
  onReport?: () => void;
  onBlock?: () => void;
}

const UserDropdown: React.FC<UserDropdownProps> = ({
  userCount,
  post,
  canDelete = false,
  onDelete,
  onReport,
  onBlock
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="text-xs text-white bg-black/50 px-2 py-1 rounded">
        {userCount} users
      </div>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => console.log('View all users')}>
            View All Users
          </DropdownMenuItem>
          
          {canDelete && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={onDelete}
                className="text-destructive"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Post
              </DropdownMenuItem>
            </>
          )}
          
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={onReport}>
            <Flag className="h-4 w-4 mr-2" />
            Report Post
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={onBlock}>
            <UserX className="h-4 w-4 mr-2" />
            Block User
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserDropdown;
