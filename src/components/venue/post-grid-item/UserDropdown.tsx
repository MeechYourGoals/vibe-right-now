
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
import PostUsersList from '@/components/post/PostUsersList';
import { MockUserProfile } from '@/mock/users';

interface UserDropdownProps {
  users: MockUserProfile[];
  setShowAllUsers: React.Dispatch<React.SetStateAction<boolean>>;
  canDelete?: boolean;
  onDelete?: () => void;
  onReport?: () => void;
  onBlock?: () => void;
}

const UserDropdown: React.FC<UserDropdownProps> = ({
  users,
  setShowAllUsers,
  canDelete = false,
  onDelete,
  onReport,
  onBlock
}) => {
  return (
    <div className="flex items-center justify-between">
      <PostUsersList 
        users={users}
        maxVisible={3}
        onUserClick={(userId) => console.log('User clicked:', userId)}
      />
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setShowAllUsers(true)}>
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
