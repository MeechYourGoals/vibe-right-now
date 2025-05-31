
import React from 'react';
import { MoreHorizontal, MessageCircle, Share2, Flag } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { getUserByHash } from '@/mock/users';

interface UserDropdownProps {
  userId?: string;
  userCount?: number;
  post?: any;
  onMessage?: () => void;
  onShare?: () => void;
  onReport?: () => void;
}

const UserDropdown: React.FC<UserDropdownProps> = ({
  userId = '',
  userCount,
  post,
  onMessage,
  onShare,
  onReport
}) => {
  const user = getUserByHash(userId);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={onMessage}>
          <MessageCircle className="mr-2 h-4 w-4" />
          Message {user.name}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onShare}>
          <Share2 className="mr-2 h-4 w-4" />
          Share profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onReport} className="text-red-600">
          <Flag className="mr-2 h-4 w-4" />
          Report user
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
